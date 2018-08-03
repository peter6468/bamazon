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
    start();
    console.log('             Welcome to Bamazon                 ')
    console.log('------------------------------------------------')
})

var start = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " || " + "Product: " + res[i].product_name + " || "
                + "Department: " + res[i].department_name + " || " + "Price: " + res[i].price + " || " + res[i].stock_quantity + "\n");
        }
        promptCustomer(res);
    })
}

var promptCustomer = function (res) {
    //console.log(res);
    inquirer.prompt([{
        type: "input",
        name: "id",
        message: "What is the ID of the product you would like to purchase?",
        validate: function (value) {
            if (isNaN(value) === false && parseInt(value) <= res.length && parseInt(value) > 0) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
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
    }
    ]).then(function (answer) {
        var whatToBuy = (answer.id) - 1;
        var howManyToBuy = parseInt(answer.quantity);
        var grandTotal = parseFloat(((res[whatToBuy].price) * howManyToBuy).toFixed(2));

        if (res[whatToBuy].stock_quantity >= howManyToBuy) {
            //updates quantity after purchase in db
            connection.query("UPDATE products SET ? WHERE ?",
                [
                    { 
                        stock_quantity: (res[whatToBuy].stock_quantity - howManyToBuy) 
                        //console.log((res[whatToBuy].stock_quantity)
                    },
                    { 
                        item_id: answer.id
                     }
                ], function (err, result) {
                    if (err) throw err;
                    console.log("Congratulations!  Your total is $" + grandTotal.toFixed(2) + ".  Your item(s) will be shipped shortly");
                });
            //Department vs department_name
            connection.query("SELECT * FROM Departments", function (err, deptRes) {
                if (err) throw err;
                var index;
                for (var i = 0; i < deptRes.length; i++) {
                    if (deptRes[i].department_name === res[whatToBuy].department_name) {
                        index = i;
                    }
                }

                //updates totalSales in departments table
                //Department vs department_name
                connection.query("UPDATE Department SET ? WHERE ?",
                    [
                        { 
                            TotalSales: deptRes[index].TotalSales + grandTotal 
                        },
                        { 
                            department_name: res[whatToBuy.department_name] 
                        }
                    ], function (err, deptRes) {
                        if (err) throw err;
                    });
            });
        } else {
            console.log("Sorry This Item Is Currently Not Available");
        }

         reprompt();

    })
}



// asks if they would like to purchase another item
var reprompt = function () {
    inquirer.prompt([{
        type: "",
        name: "Confirmed",
        message: ":"
    }]).then(function (answer) {
        if (answer.reply) {
            start();
        } else {
            console.log("See you soon!");
        }
    });
}