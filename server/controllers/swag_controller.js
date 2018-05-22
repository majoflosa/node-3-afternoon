const swag = require( '../models/swag.js' );

module.exports = {
    read: (req, res, next) => {
        res.status(200).json( swag );
    }
}