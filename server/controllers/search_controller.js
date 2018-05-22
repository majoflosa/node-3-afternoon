const swag = require( '../models/swag' );

module.exports = {
    search: ( req, res, next ) => {
        const { category } = req.query;

        if ( !category ) {
            return res.status(200).json(swag);
        } else {
            let filteredSwag = swag.filter( item => swag.category === category );

            return res.status(200).json(filteredSwag);
        }
    }
};