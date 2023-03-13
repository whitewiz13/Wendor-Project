class ServiceMessage {
    create(user: any, message: string) {
        return ({
            user,
            message
        });
    }
}

export default ServiceMessage;