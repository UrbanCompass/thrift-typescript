/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @uc/thrift-typescript v{{VERSION}}
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "test-lib";
import * as __ROOT_NAMESPACE__ from "./../../..";
export interface IInvalidResult {
    __name: "InvalidResult";
    message?: string;
    code?: __ROOT_NAMESPACE__.ICode;
}
export interface IInvalidResultArgs {
    message?: string;
    code?: __ROOT_NAMESPACE__.ICodeArgs;
}
export const InvalidResultCodec: thrift.IStructCodec<IInvalidResultArgs, IInvalidResult> = {
    encode(args: IInvalidResultArgs, output: thrift.TProtocol): void {
        const obj: any = {
            message: args.message,
            code: args.code
        };
        output.writeStructBegin("InvalidResult");
        if (obj.message != null) {
            output.writeFieldBegin("message", thrift.TType.STRING, 1);
            output.writeString(obj.message);
            output.writeFieldEnd();
        }
        if (obj.code != null) {
            output.writeFieldBegin("code", thrift.TType.STRUCT, 2);
            __ROOT_NAMESPACE__.CodeCodec.encode(obj.code, output);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    },
    decode(input: thrift.TProtocol): IInvalidResult {
        let _args: any = {};
        input.readStructBegin();
        while (true) {
            const ret: thrift.IThriftField = input.readFieldBegin();
            const fieldType: thrift.TType = ret.fieldType;
            const fieldId: number = ret.fieldId;
            if (fieldType === thrift.TType.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.TType.STRING) {
                        const value_1: string = input.readString();
                        _args.message = value_1;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRUCT) {
                        const value_2: __ROOT_NAMESPACE__.ICode = __ROOT_NAMESPACE__.CodeCodec.decode(input);
                        _args.code = value_2;
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                default: {
                    input.skip(fieldType);
                }
            }
            input.readFieldEnd();
        }
        input.readStructEnd();
        return {
            __name: "InvalidResult",
            message: _args.message,
            code: _args.code
        };
    }
};
export class InvalidResult extends thrift.StructLike implements IInvalidResult {
    public message?: string;
    public code?: __ROOT_NAMESPACE__.ICode;
    public readonly __name = "InvalidResult";
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: IInvalidResultArgs = {}) {
        super();
        if (args.message != null) {
            const value_3: string = args.message;
            this.message = value_3;
        }
        if (args.code != null) {
            const value_4: __ROOT_NAMESPACE__.ICode = new __ROOT_NAMESPACE__.Code(args.code);
            this.code = value_4;
        }
    }
    public static read(input: thrift.TProtocol): InvalidResult {
        return new InvalidResult(InvalidResultCodec.decode(input));
    }
    public static write(args: IInvalidResultArgs, output: thrift.TProtocol): void {
        return InvalidResultCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return InvalidResultCodec.encode(this, output);
    }
}
