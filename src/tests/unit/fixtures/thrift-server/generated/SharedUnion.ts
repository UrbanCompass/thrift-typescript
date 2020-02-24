/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @uc/thrift-typescript v{{VERSION}}
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "test-lib";
export interface ISharedUnion {
    __name: "SharedUnion";
    option1?: string;
    option2?: string;
}
export interface ISharedUnionArgs {
    option1?: string;
    option2?: string;
}
export const SharedUnionCodec: thrift.IStructCodec<ISharedUnionArgs, ISharedUnion> = {
    encode(args: ISharedUnionArgs, output: thrift.TProtocol): void {
        let _fieldsSet: number = 0;
        const obj: any = {
            option1: args.option1,
            option2: args.option2
        };
        output.writeStructBegin("SharedUnion");
        if (obj.option1 != null) {
            _fieldsSet++;
            output.writeFieldBegin("option1", thrift.TType.STRING, 1);
            output.writeString(obj.option1);
            output.writeFieldEnd();
        }
        if (obj.option2 != null) {
            _fieldsSet++;
            output.writeFieldBegin("option2", thrift.TType.STRING, 2);
            output.writeString(obj.option2);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        if (_fieldsSet > 1) {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.INVALID_DATA, "TUnion cannot have more than one value");
        }
        else if (_fieldsSet < 1) {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.INVALID_DATA, "TUnion must have one value set");
        }
        return;
    },
    decode(input: thrift.TProtocol): ISharedUnion {
        let _fieldsSet: number = 0;
        let _returnValue: any = null;
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
                        _fieldsSet++;
                        const value_1: string = input.readString();
                        _returnValue = { option1: value_1 };
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRING) {
                        _fieldsSet++;
                        const value_2: string = input.readString();
                        _returnValue = { option2: value_2 };
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
        if (_fieldsSet > 1) {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.INVALID_DATA, "TUnion cannot have more than one value");
        }
        else if (_fieldsSet < 1) {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.INVALID_DATA, "TUnion must have one value set");
        }
        if (_returnValue !== null) {
            if (_returnValue.option1 !== undefined) {
                return {
                    __name: "SharedUnion",
                    option1: _returnValue.option1
                };
            }
            else {
                return {
                    __name: "SharedUnion",
                    option2: _returnValue.option2
                };
            }
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read data for TUnion");
        }
    }
};
export class SharedUnion extends thrift.StructLike implements ISharedUnion {
    public option1?: string;
    public option2?: string;
    public readonly __name = "SharedUnion";
    public readonly _annotations: thrift.IThriftAnnotations = {};
    public readonly _fieldAnnotations: thrift.IFieldAnnotations = {};
    constructor(args: ISharedUnionArgs = {}) {
        super();
        let _fieldsSet: number = 0;
        if (args.option1 != null) {
            _fieldsSet++;
            const value_3: string = args.option1;
            this.option1 = value_3;
        }
        if (args.option2 != null) {
            _fieldsSet++;
            const value_4: string = args.option2;
            this.option2 = value_4;
        }
        if (_fieldsSet > 1) {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.INVALID_DATA, "TUnion cannot have more than one value");
        }
        else if (_fieldsSet < 1) {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.INVALID_DATA, "TUnion must have one value set");
        }
    }
    public static read(input: thrift.TProtocol): SharedUnion {
        return new SharedUnion(SharedUnionCodec.decode(input));
    }
    public static write(args: ISharedUnionArgs, output: thrift.TProtocol): void {
        return SharedUnionCodec.encode(args, output);
    }
    public write(output: thrift.TProtocol): void {
        return SharedUnionCodec.encode(this, output);
    }
}
