class ResponseMessage {
    create(data: any, message: string, status: string) {
        return ({
            data,
            message,
            status
        });
    }
}

export default ResponseMessage;