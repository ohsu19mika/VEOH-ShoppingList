const shoppingLists_view = ((data) =>{
    let html =`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="style.css">
            <link rel="shortcut icon" href="https://icons.iconarchive.com/icons/iconsmind/outline/512/Shopping-Cart-icon.png"/>
            <title>Shopping lists</title>
        </head>
        <body>
        <div class="full">
            Logged in as user: ${data.user_name}
            <form action="/logout" method="POST">
                <button type="submit">Log out</button>
            </form>
            <div class="middle">
            <form action="/add-shopping-list" method="POST">
                <input type="text" name="list_name" placeholder="name of list">
                <button type="submit">Add shopping list</button>
            </form>`;
    data.shoppingLists.forEach((shoppingList) => {
        html += `
            <hr>
            <div>
                <a href="/shoppinglist/${shoppingList.name}?id=${shoppingList._id}">${shoppingList.name}</a>
                <form action="/delete-shopping-list" method="POST">
                    <input type="hidden" name="list_id", value="${shoppingList._id}">
                    <button type="submit" class="delete_button">Delete shopping list</button>
                </form>
            </div>`;
    });
    html += `
        </div>
        </div>
        </body>
        </html>`;

    return html;
});

const shoppingList_view = ((data) => {
    let html =`
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" type="text/css" href="../style.css">
            <link rel="shortcut icon" href="https://icons.iconarchive.com/icons/iconsmind/outline/512/Shopping-Cart-icon.png"/>
            <title>Shopping list: ${data.shopping_list_name}</title>
        </head>
        <body>
        <div class="full">
            <a href="/">Back to shopping lists view</a>
            <div class="middle">
            <h3>Your shopping list: ${data.shopping_list_name}</h3>
            <form action="/add-product" method="POST" id="add-product">
                <p>Fill below to add new poduct on your list</p>
                <input type="text" name="product_name" placeholder="name of product">
                <input type="number" name="quantity" min="1" value="1">
                <input type="text" name="product_image" placeholder="url for image">
                <input type="hidden" name="list_id", value="${data.shoppingList_id}">
                <button type="submit">Add product to list</button>
            </form>`;
    if (data.products.length != 0){
        html += `
        <p>Products on your shopping list:
        <table>
        <thead>
            <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Count</th>
                <th>Delete</th>
            </tr>
        </thead>
        `;
        data.products.forEach((product) => {
            html += `
                <tbody>
                    <tr>
                        <th>${product.name}</th>
                        <td><img src="${product.image}" width="100"></img></td>
                        <td>${product.quantity}</td>
                        <td>
                            <form action="/delete-product" method="POST">
                            <input type="hidden" name="product_id", value="${product._id}">
                            <input type="hidden" name="list_id", value="${data.shoppingList_id}">
                            <button type="submit" class="delete_button">Delete product</button>
                            </form>
                        </td>
                    </tr>    
                </tbody>`;
        });
        html += `</table>`;
    }
    else{
        html += `
        <p>You not have any products on your list yet</p>
        `;
    }
    html += `
        </div>
        </div>
        </body>
        </html>
    `;
    return html;
});

module.exports.shoppingLists_view = shoppingLists_view;
module.exports.shoppingList_view = shoppingList_view;