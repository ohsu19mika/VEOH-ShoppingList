const shoppingList_model = require('../models/shoppingList-model');
const shoppingList_views = require('../views/shoppingList-views');
const product_model = require('../models/product-model');

//User's shopping lists view
const get_shoppingLists = (req,res,next)=>{
    const user = req.user;
    user.populate('shoppingLists').execPopulate().then(()=>{
        res.send(shoppingList_views.shoppingLists_view({
            user_name: user.name,
            shoppingLists: user.shoppingLists})
        );
    });
};

//Shopping list view
const get_shoppingList = (req,res,next) =>{
    console.log(req.params);
    console.log(req.query);
    const shopping_list_id = req.query.id;
    shoppingList_model.findById({
        _id: shopping_list_id
    }).then((shopping_list) => {
        shopping_list.populate('products').execPopulate().then(()=>{
            res.send(shoppingList_views.shoppingList_view({
                shopping_list_name: shopping_list.name,
                shoppingList_id: shopping_list_id,
                products: shopping_list.products})
            );
        });
    });
};

const post_shoppingList = (req,res,next)=>{
    if(!req.body.list_name){
        return res.redirect('/');
    }
    console.log(req.body.list_name);
    //Creates new shoppinglist
    let new_shoppingList = shoppingList_model({
        name: req.body.list_name
    });
    //Adds shopping list to user list and database
    new_shoppingList.save().then( () => {
        req.user.shoppingLists.push(new_shoppingList);
        req.user.save().then(()=>{
            console.log('new shopping list saved');
            return res.redirect('/');
        });
    });
};

//Removes products from database which was on removed shopping list
const delete_shoppingList_products = async (removed_shopping_list)=>{
    await removed_shopping_list.products.forEach(product => {
        product_model.findByIdAndRemove(product._id).then(()=>{
            console.log('poistettu');
        });
    });
};

const post_delete_shoppingList = (req,res,next) =>{
    const user = req.user;
    const shopping_list_id_to_delete = req.body.list_id;

    //Remove shopping list from user list
    const updated_shopping_lists = user.shoppingLists.filter((list_id)=>{
        return list_id != shopping_list_id_to_delete;
    });
    user.shoppingLists = updated_shopping_lists;
    user.save().then(()=>{
        //Delete shopping list from database
        shoppingList_model.findByIdAndRemove(shopping_list_id_to_delete).then((removed_shopping_list)=>{
            delete_shoppingList_products(removed_shopping_list);
            res.redirect('/');
        });
    });
};

const post_add_product = (req,res,next) => {
    if(!req.body.product_name){
        return res.redirect('/');
    }
    console.log(req.body.product_name);
    //Check image url
    let product_image ="";
    if(!req.body.product_image){
        product_image = "https://icons-for-free.com/iconfiles/png/512/cart+essential+product+shopping+ui+icon-1320166477493898567.png";
    }
    else{
        product_image = req.body.product_image;
    }
    //Creates new product
    let new_product = product_model({
        name: req.body.product_name,
        quantity: req.body.quantity,
        image: product_image
    });
    //Adds product to shopping list and database
    new_product.save().then( () => {
        shoppingList_model.findById({
            _id: req.body.list_id
        }).then((shopping_list)=>{
            shopping_list.products.push(new_product);
            shopping_list.save().then(()=>{
                console.log('new product to list saved');
                return res.redirect('/shoppinglist/'+shopping_list.name+'?id='+shopping_list._id);
            });
        });
    });
};

const post_delete_product = (req,res,next) =>{
    const shopping_list_id = req.body.list_id;
    const product_id_to_delete = req.body.product_id;

    //Find shopping list
    shoppingList_model.findById({
        _id: shopping_list_id
    }).then((shopping_list)=>{
        //Remove product from shopping list
        const updated_products = shopping_list.products.filter((product_id)=>{
            return product_id != product_id_to_delete;
        });
        shopping_list.products = updated_products;
        shopping_list.save().then(()=>{
            //Delete product from database
            product_model.findByIdAndRemove(product_id_to_delete).then(()=>{
                res.redirect('/shoppinglist/'+shopping_list.name+'?id='+shopping_list._id);
            });
        });
    });
};

module.exports.get_shoppingLists = get_shoppingLists;
module.exports.get_shoppingList = get_shoppingList;
module.exports.post_shoppingList = post_shoppingList;
module.exports.post_delete_shoppingList = post_delete_shoppingList;
module.exports.post_add_product = post_add_product;
module.exports.post_delete_product = post_delete_product;