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
    console.log('             Welcome to Bamazon                 ')
    console.log('------------------------------------------------')
})

var makeTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " || " + res[i].product_name + " || "
                + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + "\n");
        }
        promptCustomer(res);
    })
}

var promptCustomer = function (res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What would you like to purchase? [Press Q to Quit]"
    }]).then(function (answer) {
        var correct = false;
        if(answer.choice.toUpperCase() === "Q") {
        process.exit();
       }
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;
                var totalCost = answer.quantity * res[i].price
                console.log(totalCost);
                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "How many would you like to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function (answer) {
                    if ((res[id].stock_quantity - answer.quantity) > 0) {
                        connection.query("UPDATE products  SET  stock_quantity ='" + (res[id].stock_quantity -
                            answer.quantity) + "' WHERE product_name = '" + product
                            + "'", function (err, res2) {
                                console.log("Product Purchased.  Your total is: + answer.quantity *");
                                makeTable();
                            })
                    } else {
                        console.log("Not a valid choice");
                        promptCustomer(res);
                    }
                })
            }
        }
    if(i === res.length && correct === false) {
        console.log("Sorry This Item Is Currently Not Available");
        promptCustomer(res);
    }
    })
}