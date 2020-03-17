const express = require('express');
const PORT = process.env.PORT || 8080;
const body_parser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

//Controllers
const auth_controller = require('./controllers/auth-controllers');
const shoppingList_controller = require('./controllers/shoppingList-controllers')

let app = express();

app.use(body_parser.urlencoded({
    extended: true
}));

//Serve static files
app.use(express.static('public'));


app.use(session({
    secret: '1234qwerty',
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000000
    }
}));


const is_logged_handler = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/');
    }
    next();
};


//Auth
app.use(auth_controller.handle_user);
app.get('/', auth_controller.get_main);
app.post('/login', auth_controller.post_login);
app.post('/register', auth_controller.post_register);
app.post('/logout', auth_controller.post_logout);

//Shoppinglists
app.get('/', is_logged_handler, shoppingList_controller.get_shoppingLists);
app.get('/shoppingList/:name', is_logged_handler, shoppingList_controller.get_shoppingList)
app.post('/add-shopping-list', is_logged_handler, shoppingList_controller.post_shoppingList);
app.post('/delete-shopping-list', is_logged_handler, shoppingList_controller.post_delete_shoppingList);
app.post('/add-product', is_logged_handler, shoppingList_controller.post_add_product);
app.post('/shoppingList/:name', is_logged_handler, shoppingList_controller.post_update_count);
app.post('/delete-product', is_logged_handler, shoppingList_controller.post_delete_product);

//Not found
app.use((req, res, next) => {
    console.log('404');
    res.status(404);
    res.send('page not found')
});

//mongodb+srv://shoppinglistdb-user:HuhGj8nht8XfKqu5@cluster0-ozu87.mongodb.net/test?retryWrites=true&w=majority
const mongoose_url = 'mongodb+srv://shoppinglistdb-user:HuhGj8nht8XfKqu5@cluster0-ozu87.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoose_url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log('Mongoose connected');
    console.log('Start express server');
    app.listen(PORT);
});

