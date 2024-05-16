module.exports.badRequest = message => {
    return {
        message,
        status: 400
    };
}

module.exports.conflict = message => {
    return {
        message,
        status: 409
    };
}

module.exports.notFound = message => {
    return {
        message,
        status: 404
    }
}