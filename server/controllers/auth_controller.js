const users = require( '../models/users' );

let id = 1;

module.exports = {
    login: ( req, res, next ) => {
        let { username, password } = req.body;
        // users.forEach( user => {
        //     if ( user.username === username && user.password === password ) {
        //         req.session.user.username = user.username;
        //         return res.status(200).json(req.session);
        //     }
        
        // })
        let matchedUser = users.find( user => user.username === username && user.password === password );
        // console.log( matchedUser );
        if ( matchedUser ) {
            req.session.user.username = matchedUser.username;
            return res.status(200).json(req.session.user);
        }

        return res.status(500).json('not authorized');
    },

    register: ( req, res, next ) => {
        let { username, password } = req.body;
        
        users.push({
            id: id,
            username: username,
            password: password
        });

        id++;

        req.session.user.username = username;
        return res.status(200).json(req.session.user);
    },

    signout: ( req, res, next ) => {
        req.session.destroy();
        return res.status(200).json(req.session);
    },

    getUser: ( req, res, next ) => {
        return res.status(200).json(req.session.user);
    }
}