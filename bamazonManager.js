var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId);
    makeTable();
})

var start = function () {
    inquirer.prompt([{
        type: "list",
        name: "doThing",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
    }]).then(function (ans) {
        switch (ans.doThing) {
            case "View Products for Sale": makeTable();
                break;
            case "View Low Inventory": viewLowInventory();
                break;
            case "Add to Inventory": addToInventory();
                break;
            case "Add New Product": addNewProduct();
                break;
            case "Quit": console.log("Goodbye")
                break;
        }
    });
}

var itemArray = [];

var getFromProducts = function() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            itemArray.push(res[i])
            console.log(res[i].item_id + " || " + res[i].product_name + " || "
                + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + "\n");
        }
    })
}


var makeTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            itemArray.push(res[i].product_name);
            console.log('u suck');
            console.log(res[i].product_name);
            console.log(res[i].item_id + " || " + res[i].product_name + " || "
                + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + "\n");
        }
        start();
    });
}

var viewLowInventory = function () {
    console.log('---------------------Low Inventory List-------------------------');
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                console.log(res[i].item_id + " || " + res[i].product_name + " || "
                    + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + "\n");
            }
        }
        start();
    });
}

var addToInventory = function () {
    console.log('-------------------Add To Inventory-------------------------------');
   for(var i = 0; i < itemArray.length; i++) {
    console.log(itemArray[i]);
    }


    inquirer.prompt([{
        type: "list",
        name: "product",
        choices: itemArray,
        message: "What item would you like to add to inventory?"
    }, {
        type: "input",
        name: "qty",
        message: "How many would you like to add?",
        validate: function (value) {
            if (isNaN(value) === false) { return true; }
            else { return false; }
        }
    }]).then(function (ans) {
        var currentQty;
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === ans.product) {
                currentQty = res[i].stock_quantity;
            }
        }
        connection.query('UPDATE Products SET ? WHERE ?',
            { stock_quantity: currentQty + parseInt(ans.qty) },
            { product_name: ans.product },
            function (err, res) {
                console.log("Quantity was updated.");
                start();
            });
    })
};