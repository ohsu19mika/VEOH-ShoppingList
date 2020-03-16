
const login_view = ()=>{
    let html = `
    <html>
    <head><title>Shopping list app</title>
        <meta http-equiv="Content-Type", content="text/html;charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="style.css">
        <link rel="shortcut icon" href="https://icons.iconarchive.com/icons/iconsmind/outline/512/Shopping-Cart-icon.png"/>
    </head>
    <body>
        <div class="full">
        <div class="middle-main">
            <h2>Shopping list app</h2>
            <form action="/login" method="POST">
                <input type="text" name="user_name">
                <button type="submit">Log in</button>
            </form>
            <form action="/register" method="POST">
                <input type="text" name="user_name">
                <button type="submit">Register</button>
            </form>
        </div>
        </div>
    </body>
    </html>
    `;
    return html;
}

module.exports.login_view = login_view;