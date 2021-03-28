import {ERROR_TYPE, ERROR_SUB_TYPE, REQUIRED_TYPE} from 'shared/constants/error';

export type ErrorTypeEnum = keyof ERROR_TYPE;
export type ErrorSubTypeEnum = keyof ERROR_SUB_TYPE;
export type RequiredTypeEnum = keyof REQUIRED_TYPE;

type FieldError = {
    field: string;
    value: string | number;
    type?: ErrorSubTypeEnum;
    requiredKind?: RequiredTypeEnum;
};

export type ServerError = {
    message: string;
    code: number;
    type: ErrorTypeEnum;
    errors?: FieldError[];
};
