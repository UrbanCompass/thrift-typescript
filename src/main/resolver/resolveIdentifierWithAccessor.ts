import { Identifier } from '@creditkarma/thrift-parser'

import { INamespace } from '../types'
import { stubIdentifier } from '../utils'

/**
 * Checks whether an Identifier is coming from another namespace or the current one. If it's from another
 * then stub it with the proper accessor. If it's coming from the current then no stub necessary.
 * @param id Id being checked
 * @param idNamespace Namespace associated with id. Returned from resolveIdentifierDefinition()
 * @param parentNamespace Namespace of the parent id
 */
export function resolveIdentifierWithAccessor(
    id: Identifier,
    idNamespace: INamespace,
    parentNamespace: INamespace,
): Identifier {
    // Only need to adjust id when id namespace is not in parent namespace
    if (idNamespace.namespace.accessor !== parentNamespace.namespace.accessor) {
        return stubIdentifier(idNamespace.namespace.accessor + '.' + id.value)
    }

    return id
}
