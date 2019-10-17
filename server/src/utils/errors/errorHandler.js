const errorHandler = (err, req, res, next) => {
    if(!err.status) {
        res.status(500).send(err.message);
    }
    else {
        res.status(err.status).send(err.message);
    }
};

module.exports = errorHandler;