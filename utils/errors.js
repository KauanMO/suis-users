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