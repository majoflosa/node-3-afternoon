const swag = require( '../models/swag' );

module.exports = {
    add: (req, res, next) => {
        let { id } = req.query;

        let matchSwag = req.session.user.cart.find( item => item.id == id );
        if ( matchSwag ) {
            return res.status(200).json(req.session.user);
        } else {
            let swagItem = swag.find( item => item.id == id );
            req.session.user.cart.push( swagItem );
            req.session.user.total += swagItem.price;
            return res.status(200).json(req.session.user);
        }
    },

    delete: (req, res, next) => {
        let { id } = req.query;

        let itemToDelete = req.session.user.cart.find( item => item.id == id );

        req.session.user.cart = req.session.user.cart.filter( item => itemToDelete != item );
        req.session.user.total -= itemToDelete.price;

        return res.status(200).json(req.session.user);
    },

    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;

        return res.status(200).json(req.session.user);
    }
}