/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @uc/thrift-typescript v{{VERSION}}
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "test-lib";
export enum SharedUnionType {
    SharedUnionWithOption1 = "option1",
    SharedUnionWithOption2 = "option2"
}
export type SharedUnion = ISharedUnionWithOption1 | ISharedUnionWithOption2;
export interface ISharedUnionWithOption1 {
    __name: "SharedUnion";
    __type: SharedUnionType.SharedUnionWithOption1;
    option1: string;
    option2?: undefined;
}
export interface ISharedUnionWithOption2 {
    __name: "SharedUnion";
    __type: SharedUnionType.SharedUnionWithOption2;
    option1?: undefined;
    option2: string;
}
export type SharedUnionArgs = ISharedUnionWithOption1Args | ISharedUnionWithOption2Args;
export interface ISharedUnionWithOption1Args {
    option1: string;
    option2?: undefined;
}
export interface ISharedUnionWithOption2Args {
    option1?: undefined;
    option2: string;
}
export const SharedUnionCodec: thrift.IStructToolkit<SharedUnionArgs, SharedUnion> = {
    create(args: SharedUnionArgs): SharedUnion {
        let _fieldsSet: number = 0;
        let _returnValue: any = null;
        if (args.option1 != null) {
            _fieldsSet++;
            const value_1: string = args.option1;
            _returnValue = { option1: value_1 };
        }
        if (args.option2 != null) {
            _fieldsSet++;
            const value_2: string = args.option2;
            _returnValue = { option2: value_2 };
        }
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
                    __type: SharedUnionType.SharedUnionWithOption1,
                    option1: _returnValue.option1
                };
            }
            else {
                return {
                    __name: "SharedUnion",
                    __type: SharedUnionType.SharedUnionWithOption2,
                    option2: _returnValue.option2
                };
            }
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read data for TUnion");
        }
    },
    encode(args: SharedUnionArgs, output: thrift.TProtocol): void {
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
    decode(input: thrift.TProtocol): SharedUnion {
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
                        const value_3: string = input.readString();
                        _returnValue = { option1: value_3 };
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.TType.STRING) {
                        _fieldsSet++;
                        const value_4: string = input.readString();
                        _returnValue = { option2: value_4 };
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
                    __type: SharedUnionType.SharedUnionWithOption1,
                    option1: _returnValue.option1
                };
            }
            else {
                return {
                    __name: "SharedUnion",
                    __type: SharedUnionType.SharedUnionWithOption2,
                    option2: _returnValue.option2
                };
            }
        }
        else {
            throw new thrift.TProtocolException(thrift.TProtocolExceptionType.UNKNOWN, "Unable to read data for TUnion");
        }
    }
};
