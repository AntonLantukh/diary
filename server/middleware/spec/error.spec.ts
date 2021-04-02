import {handleDuplicateKeyError, handleValidationError} from '../error';

const send = jest.fn(() => '');
const mockSend = {send};
const status = jest.fn(() => mockSend);
const mockRes = {status};

describe('handleDuplicateKeyError', () => {
    it('Should return correct object for one duplicate error', () => {
        const errorCode = 409;
        const inError = {
            driver: true,
            name: 'MongoError',
            index: 0,
            code: 11000,
            keyPattern: {
                email: 1,
            },
            keyValue: {
                email: 'abc@abc.ru',
            },
        };

        const outError = {
            message: 'Data already exists',
            type: 'VALIDATION_ERROR',
            code: 409,
            errors: [
                {
                    field: 'email',
                    type: 'DUPLICATE_KEY',
                    value: 'abc@abc.ru',
                },
            ],
        };
        // @ts-expect-error
        handleDuplicateKeyError(inError, mockRes);

        expect(status).toHaveBeenCalledWith(errorCode);
        expect(send).toHaveBeenCalledWith(outError);
    });

    it('Should return correct object for several duplicate errors', () => {
        const errorCode = 409;
        const inError = {
            driver: true,
            name: 'MongoError',
            index: 0,
            code: 11000,
            keyPattern: {
                email: 1,
                name: 1,
            },
            keyValue: {
                email: 'abc@abc.ru',
                name: 'Anton',
            },
        };

        const outError = {
            message: 'Data already exists',
            type: 'VALIDATION_ERROR',
            code: 409,
            errors: [
                {
                    field: 'email',
                    type: 'DUPLICATE_KEY',
                    value: 'abc@abc.ru',
                },
                {
                    field: 'name',
                    type: 'DUPLICATE_KEY',
                    value: 'Anton',
                },
            ],
        };
        // @ts-expect-error
        handleDuplicateKeyError(inError, mockRes);

        expect(status).toHaveBeenCalledWith(errorCode);
        expect(send).toHaveBeenCalledWith(outError);
    });
});

describe('handleValidationError', () => {
    it('Should return correct object for validation error', () => {
        const errorCode = 400;
        const inError = {
            name: 'ValidationError' as const,
            message: 'Validation failed',
            errors: [
                {
                    properties: {
                        message: 'Error',
                        value: 1231,
                    },
                    kind: 'String',
                    path: 'password',
                    value: 1231,
                    reason: {
                        code: 'INVAILD_TYPE',
                    },
                },
            ],
        };

        const outError = {
            message: 'Validation failed',
            type: 'VALIDATION_ERROR',
            code: 400,
            errors: [
                {
                    field: 'password',
                    type: 'INVAILD_TYPE',
                    value: 1231,
                    requiredKind: 'String',
                },
            ],
        };
        // @ts-expect-error
        handleValidationError(inError, mockRes);

        expect(status).toHaveBeenCalledWith(errorCode);
        expect(send).toHaveBeenCalledWith(outError);
    });
});
