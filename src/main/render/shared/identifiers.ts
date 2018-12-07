import * as ts from 'typescript'

export const COMMON_IDENTIFIERS = {
    _serviceName: ts.createIdentifier('_serviceName'),
    break: ts.createIdentifier('break'),
    callback: ts.createIdentifier('callback'),
    requestId: ts.createIdentifier('requestId'),
    err: ts.createIdentifier('err'),
    args: ts.createIdentifier('args'),
    undefined: ts.createIdentifier('undefined'),
    input: ts.createIdentifier('input'),
    data: ts.createIdentifier('data'),
    writer: ts.createIdentifier('writer'),
    reader: ts.createIdentifier('reader'),
    output: ts.createIdentifier('output'),
    protocol: ts.createIdentifier('protocol'),
    transport: ts.createIdentifier('transport'),
    connection: ts.createIdentifier('connection'),
    messageType: ts.createIdentifier('messageType'),
    ftype: ts.createIdentifier('ftype'),
    fname: ts.createIdentifier('fname'),
    fid: ts.createIdentifier('fid'),
    fieldType: ts.createIdentifier('fieldType'),
    fieldName: ts.createIdentifier('fieldName'),
    fieldId: ts.createIdentifier('fieldId'),
    context: ts.createIdentifier('context'),
    Context: ts.createIdentifier('Context'),
    Client: ts.createIdentifier('Client'),
    Processor: ts.createIdentifier('Processor'),
    Map: ts.createIdentifier('Map'),
    Array: ts.createIdentifier('Array'),
    Set: ts.createIdentifier('Set'),
    String: ts.createIdentifier('String'),
    Buffer: ts.createIdentifier('Buffer'),
    Boolean: ts.createIdentifier('Boolean'),
    Promise: ts.createIdentifier('Promise'),
    Number: ts.createIdentifier('Number'),
    void: ts.createIdentifier('void'),
    Int64: ts.createIdentifier('thrift.Int64'),
}
