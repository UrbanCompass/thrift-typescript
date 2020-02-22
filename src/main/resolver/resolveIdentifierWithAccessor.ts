import { Identifier } from '@creditkarma/thrift-parser'

import { INamespace } from '../types'
import { stubIdentifier } from '../utils'

/**
 * Checks whether an Identifier is coming from another namespace or the current one. If it's from another
 * then stub it with the proper accessor. If it's coming from the current then no stub necessary.
 * @param id Id being checked
 * @param idNamespace Namespace associated with id. Returned from resolveIdentifierDefinition()
 * @param parentId Id of parent
 * @param parentNamespace Namespace of the parent id
 */
export function resolveIdentifierWithAccessor(
    id: Identifier,
    idNamespace: INamespace,
    parentId: Identifier,
    parentNamespace: INamespace,
): Identifier {
    // Extract accessor from parent ID
    const parentAccessor = parentId.value
        .split('.')
        .slice(0, -1)
        .join('.')

    // Only need to adjust id when id namespace is not in parent namespace
    if (idNamespace.namespace.accessor !== parentNamespace.namespace.accessor) {
        let newIdValue = id.value
        // If the parent has an accessor that includes the id
        if (
            parentAccessor.length &&
            parentAccessor.includes(idNamespace.namespace.accessor)
        ) {
            newIdValue = parentAccessor + '.' + newIdValue
        } else if (parentAccessor.length) {
            // If the parent has an accessor that doesnt include id
            newIdValue =
                parentAccessor +
                '.' +
                idNamespace.namespace.accessor +
                '.' +
                newIdValue
        } else {
            // If there is no parent accessor
            newIdValue = idNamespace.namespace.accessor + '.' + newIdValue
        }
        return stubIdentifier(newIdValue)
    }

    return id
}
