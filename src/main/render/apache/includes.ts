import * as ts from 'typescript'

import { COMMON_IDENTIFIERS } from '../shared/identifiers'

/**
 * import Int64 = require('node-int64');
 *
 * Creates an import for Int64 type if it is being used by the file we're
 * generating. We'll need to keep track of what each files uses.
 */
export function renderInt64Import(): ts.ImportDeclaration {
    return ts.createImportDeclaration(
        undefined,
        undefined,
        ts.createImportClause(COMMON_IDENTIFIERS.Node_Int64, undefined),
        ts.createLiteral('node-int64'),
    )
}
