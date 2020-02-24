/* tslint:disable */
/* eslint-disable */
/*
 * Autogenerated by @uc/thrift-typescript v{{VERSION}}
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/
import * as thrift from "test-lib";
export interface IOtherCommonUnionArgs {
    option1?: string;
    option2?: number;
}
export class OtherCommonUnion {
    public option1?: string;
    public option2?: number;
    constructor(args?: IOtherCommonUnionArgs) {
        let _fieldsSet: number = 0;
        if (args != null) {
            if (args.option1 != null) {
                _fieldsSet++;
                this.option1 = args.option1;
            }
            if (args.option2 != null) {
                _fieldsSet++;
                this.option2 = args.option2;
            }
            if (_fieldsSet > 1) {
                throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.INVALID_DATA, "Cannot read a TUnion with more than one set value!");
            }
            else if (_fieldsSet < 1) {
                throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.INVALID_DATA, "Cannot read a TUnion with no set value!");
            }
        }
    }
    public static fromOption1(option1: string): OtherCommonUnion {
        return new OtherCommonUnion({ option1 });
    }
    public static fromOption2(option2: number): OtherCommonUnion {
        return new OtherCommonUnion({ option2 });
    }
    public write(output: thrift.TProtocol): void {
        output.writeStructBegin("OtherCommonUnion");
        if (this.option1 != null) {
            output.writeFieldBegin("option1", thrift.Thrift.Type.STRING, 1);
            output.writeString(this.option1);
            output.writeFieldEnd();
        }
        if (this.option2 != null) {
            output.writeFieldBegin("option2", thrift.Thrift.Type.I32, 2);
            output.writeI32(this.option2);
            output.writeFieldEnd();
        }
        output.writeFieldStop();
        output.writeStructEnd();
        return;
    }
    public static read(input: thrift.TProtocol): OtherCommonUnion {
        let _fieldsSet: number = 0;
        let _returnValue: OtherCommonUnion | null = null;
        input.readStructBegin();
        while (true) {
            const ret: thrift.TField = input.readFieldBegin();
            const fieldType: thrift.Thrift.Type = ret.ftype;
            const fieldId: number = ret.fid;
            if (fieldType === thrift.Thrift.Type.STOP) {
                break;
            }
            switch (fieldId) {
                case 1:
                    if (fieldType === thrift.Thrift.Type.STRING) {
                        _fieldsSet++;
                        const value_1: string = input.readString();
                        _returnValue = OtherCommonUnion.fromOption1(value_1);
                    }
                    else {
                        input.skip(fieldType);
                    }
                    break;
                case 2:
                    if (fieldType === thrift.Thrift.Type.I32) {
                        _fieldsSet++;
                        const value_2: number = input.readI32();
                        _returnValue = OtherCommonUnion.fromOption2(value_2);
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
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.INVALID_DATA, "Cannot read a TUnion with more than one set value!");
        }
        else if (_fieldsSet < 1) {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.INVALID_DATA, "Cannot read a TUnion with no set value!");
        }
        if (_returnValue !== null) {
            return _returnValue;
        }
        else {
            throw new thrift.Thrift.TProtocolException(thrift.Thrift.TProtocolExceptionType.UNKNOWN, "Unable to read data for TUnion");
        }
    }
}
