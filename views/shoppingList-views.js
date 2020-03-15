const shoppingLists_view = ((data) =>{
    let html =`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shopping lists</title>
        </head>
        <body>
            Logged in as user: ${data.user_name}
            <form action="/logout" method="POST">
                <button type="submit">Log out</button>
            </form>
            <form action="/add-shopping-list" method="POST">
                <input type="text" name="list_name" placeholder="name of list">
                <button type="submit">Add shopping list</button>
            </form>`;
    data.shoppingLists.forEach((shoppingList) => {
        html += `
            <div>
                <a href="/shoppinglist/${shoppingList.name}?id=${shoppingList._id}">${shoppingList.name}</a>
                <form action="/delete-shopping-list" method="POST">
                    <input type="hidden" name="list_id", value="${shoppingList._id}">
                    <button type="submit" class="delete_button">Delete shopping list</button>
                </form>
            </div>`;
    });
    html += `
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
            <title>Shopping list ${data.shopping_list_name}</title>
        </head>
        <body>
            <a href="/">Back to shopping lists view</a><br>
            Shopping list: ${data.shopping_list_name}
            <form action="/add-product" method="POST">
                <input type="text" name="product_name" placeholder="name of product">
                <input type="number" name="quantity" min="1" value="1">
                <input type="text" name="product_image" placeholder="url for image">
                <input type="hidden" name="list_id", value="${data.shoppingList_id}">
                <button type="submit">Add product to list</button>
            </form>`;
    data.products.forEach((product) => {
        html += `
            <div>
                ${product.name}, ${product.quantity}
                <form action="/delete-product" method="POST">
                    <input type="hidden" name="product_id", value="${product._id}">
                    <input type="hidden" name="list_id", value="${data.shoppingList_id}">
                    <button type="submit" class="delete_button">Delete product</button>
                </form>
            </div>`;
    });

    html += `
        </body>
        </html>
    `;
    return html;
});

module.exports.shoppingLists_view = shoppingLists_view;
module.exports.shoppingList_view = shoppingList_view;