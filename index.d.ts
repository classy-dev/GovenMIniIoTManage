type Identifier = string | number;

type ServerResponse<T> = {
    code: string;
    data: T;
    message: string;
}