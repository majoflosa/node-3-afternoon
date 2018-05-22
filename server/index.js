require( 'dotenv' ).config();
const express = require( 'express' ),
    session = require( 'express-session' ),
    {json} = require( 'body-parser' ),
    // cors = require( 'cors' ),
    port = process.env.PORT || 3000;

const app = express();
const checkForSession = require( './middlewares/checkForSession' );

app.use( json() );
// app.use( cors() );
app.use( session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false
    // cookie: {
    //     maxAge: 7 * 24 * 60 * 60 * 1000
    // }
}) );

app.use( checkForSession );
app.use( express.static(`${__dirname}/build`) );

const { read } = require( './controllers/swag_controller' );
app.get( '/api/swag', read );

const { login, register, signout, getUser } = require( './controllers/auth_controller');
app.post( '/api/login', login );
app.post( '/api/register', register );
app.post( '/api/signout', signout );
app.get( '/api/user', getUser );

const cart_controller = require( './controllers/cart_controller' );
app.post( '/api/cart', cart_controller.add );
app.post( '/api/cart/checkout', cart_controller.checkout );
app.delete( '/api/cart', cart_controller.delete );

const search_controller = require( './controllers/search_controller' );
app.get( '/api/search/', search_controller.search );

app.listen( port, () => console.log(`Listening on port ${port}`) );