class ResponseMessage {
    create(data: any, message: string, error: string) {
        return ({
            data,
            message,
            error
        });
    }
}

export default ResponseMessage;