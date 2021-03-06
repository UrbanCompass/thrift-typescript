import {
    ConstValue,
    FieldDefinition,
    FunctionDefinition,
    FunctionType,
    PropertyAssignment,
    SyntaxType,
    ThriftStatement,
} from '@creditkarma/thrift-parser'

import { IResolveContext, IResolveResult } from '../types'
import { resolveIdentifierDefinition } from './resolveIdentifierDefinition'
import { resolveIdentifierWithAccessor } from './resolveIdentifierWithAccessor'

interface IIdentifiersForFieldTypeConfig {
    // Is this identifier being resolved in a context where we need to know the underlying type of typedefs?
    resolveTypedefs?: boolean
    // This flag toggles whether we need to continue recursing along typedefs and struct defs
    recursiveResolve?: boolean
}

/**
 * Resolve all identifiers used by a given field type
 * @param fieldType The field type we are checking for identifiers
 * @param results (MUTATED) result set which will contain all fieldtype identifiers
 * @param context Resolver context used for finding identifier definitions
 * @param config Further behavior configuration
 */
function identifiersForFieldType(
    fieldType: FunctionType,
    results: Set<string>,
    context: IResolveContext,
    config: IIdentifiersForFieldTypeConfig = {},
): void {
    const { resolveTypedefs = false, recursiveResolve = false } = config
    switch (fieldType.type) {
        case SyntaxType.Identifier:
            results.add(fieldType.value)
            if (resolveTypedefs) {
                const result: IResolveResult = resolveIdentifierDefinition(
                    fieldType,
                    {
                        currentNamespace: context.currentNamespace,
                        namespaceMap: context.namespaceMap,
                    },
                )

                const definition = result.definition
                const namespace = result.namespace

                if (definition.type === SyntaxType.TypedefDefinition) {
                    identifiersForFieldType(
                        definition.definitionType,
                        results,
                        context,
                    )
                }

                if (
                    recursiveResolve &&
                    definition.type === SyntaxType.StructDefinition
                ) {
                    for (const field of definition.fields) {
                        // HACK(josh): If the definition namespace is not part of an identifier
                        // fieldtype we must stub it in for it to be referenced properly. This is
                        // because of how resolveIdentifierDefinition works. There should be a better
                        // way which preserves current namespace
                        let { fieldType: defFieldType } = field
                        if (defFieldType.type === SyntaxType.Identifier) {
                            defFieldType = resolveIdentifierWithAccessor(
                                defFieldType,
                                namespace,
                                context.currentNamespace,
                            )

                            // Do result check to avoid infinite tail recursion
                            if (!results.has(defFieldType.value)) {
                                identifiersForFieldType(
                                    defFieldType,
                                    results,
                                    context,
                                    config,
                                )
                            }
                        } else {
                            identifiersForFieldType(
                                defFieldType,
                                results,
                                context,
                            )
                        }
                    }
                }
            }
            break

        case SyntaxType.MapType:
            identifiersForFieldType(fieldType.keyType, results, context)
            identifiersForFieldType(fieldType.valueType, results, context)
            break

        case SyntaxType.SetType:
        case SyntaxType.ListType:
            identifiersForFieldType(fieldType.valueType, results, context)
            break
    }
}

function identifiersForConstValue(
    constValue: ConstValue | null,
    results: Set<string>,
): void {
    if (constValue !== null) {
        switch (constValue.type) {
            case SyntaxType.Identifier:
                results.add(constValue.value)
                break

            case SyntaxType.ConstList:
                constValue.elements.forEach((next: ConstValue) => {
                    identifiersForConstValue(next, results)
                })
                break

            case SyntaxType.ConstMap:
                constValue.properties.forEach((next: PropertyAssignment) => {
                    identifiersForConstValue(next.name, results)
                    identifiersForConstValue(next.initializer, results)
                })
        }
    }
}

/**
 * We're going to loop through the provided statements and find the Identifiers being used by these statements.
 *
 * The complicating factor here is that this is used to determine imports for a given file. In some cases a
 * file may need an identifier not explicitly in the AST node. For instance if a Identifer refers to a typedef
 * that aliases a map we may need to know the key and value types of the map so the including file can import
 * those types to handle encoding/decoding of those types.
 */
export function identifiersForStatements(
    statements: Array<ThriftStatement>,
    context: IResolveContext,
): Array<string> {
    const results: Set<string> = new Set()

    statements.forEach((next: ThriftStatement) => {
        switch (next.type) {
            case SyntaxType.IncludeDefinition:
            case SyntaxType.CppIncludeDefinition:
            case SyntaxType.NamespaceDefinition:
            case SyntaxType.EnumDefinition:
                // Ignore
                break

            case SyntaxType.ConstDefinition:
                identifiersForFieldType(next.fieldType, results, context, {
                    recursiveResolve: true,
                    resolveTypedefs: true,
                })
                identifiersForConstValue(next.initializer, results)
                break

            case SyntaxType.TypedefDefinition:
                identifiersForFieldType(next.definitionType, results, context)
                break

            case SyntaxType.StructDefinition:
            case SyntaxType.UnionDefinition:
            case SyntaxType.ExceptionDefinition:
                next.fields.forEach((field: FieldDefinition) => {
                    identifiersForFieldType(field.fieldType, results, context, {
                        resolveTypedefs: true,
                    })
                    identifiersForConstValue(field.defaultValue, results)
                })
                break

            case SyntaxType.ServiceDefinition:
                if (next.extends) {
                    results.add(next.extends.value)
                }

                next.functions.forEach((func: FunctionDefinition) => {
                    func.fields.forEach((field: FieldDefinition) => {
                        identifiersForFieldType(
                            field.fieldType,
                            results,
                            context,
                            {
                                resolveTypedefs: true,
                            },
                        )
                        identifiersForConstValue(field.defaultValue, results)
                    })

                    func.throws.forEach((field: FieldDefinition) => {
                        identifiersForFieldType(
                            field.fieldType,
                            results,
                            context,
                            {
                                resolveTypedefs: true,
                            },
                        )
                        identifiersForConstValue(field.defaultValue, results)
                    })

                    identifiersForFieldType(func.returnType, results, context, {
                        resolveTypedefs: true,
                    })
                })

                break

            default:
                const _exhaustiveCheck: never = next
                throw new Error(`Non-exhaustive match for ${_exhaustiveCheck}`)
        }
    })

    return Array.from(results)
}
