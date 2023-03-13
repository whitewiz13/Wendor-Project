class ServiceMessage {
    create(data: any, message: string) {
        return ({
            data,
            message
        });
    }
}

export default ServiceMessage;