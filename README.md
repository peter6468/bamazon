#BAMAZON

###Overview
Bamazon is an Amazon-like store front using a CLI(command line interface).  All information is stored in mySQL.  All users in all apps are notified right away they are connected by the message, "Connected as id: ' '"

How to Get Started
1.clone repo
2.run 'npm install'
3.run 'node.bamazonCustomer.js'

What The Different Javascript files do:
1.bamazonCustomer.js
-Prints the 10 things available for purchase
-Prompts customers which product they would like to purchase by item_id
-Asks for quantity
    -If there is sufficient inventory, it will process the order.  Once the order has been processed, the customer will see a message thats says, "Congratulations, Your total is "$"  Your item(s) will be shipped shortly.  It will then exit.
    -User can only submit 1-10 for the id of the product.  All other entries will be taken, erasesd and user will be prompted again.
    -If there is not enough in stock, the user wil get, "Sorry This Item Is Currently Not Available."  At this point, the customer must press command C 2x to exit the app.

2.bamazonManager.js
    -Allows for 5 choices
        1.View Products for Sale: allows manager to see all itmes for sale
        2.View Low Inventory: allows manager to see all items with an inventory of <= 5
        3 + 4 are currently under contruction but here is the mySQL script to update and insert new products directly into mySQL.
                insert into products(product_name, department_name, price, stock_quantity)
                values ("LOL SUPRISE DOLL", "toys", 12.88, 207),
	                ("UNO", "toys", 4.99, 500),
                    ("Playdoh", "toys", 39.99, 100),
                    ("Echo Dot", "electronics", 49.99, 1000),
                    ("Kindle", "electronics", 119.99, 1500),
                    ("Firestick", "electronics", 39.99, 6000),
                    ("Call of Duty", "videogames", 59.99, 2000),
                    ("Minecraft", "videogames", 39.99, 1975),
                    ("Mariokart", "videogames", 49.99, 900),
                    ("Tetris", "videogames", 29.99, 500);

3.bamazonSupervisor.js is currently under construction and will be available shortly

4.PLEASE REMEMBER WHILE THINGS WILL BE TRACKED HERE CORRECTLY, TO UPDATE IN mySQL: 
***YOU HAVE TO GOTO mySQL, HIGHLIGHT: SELECT * FROM bamazon_DB.products, AND PRESS THE LIGHTENING BOLT TO UPDATE***

5.PLEASE VISIT: https://www.youtube.com/watch?v=zCoP6k-SOsE&feature=youtu.be
FOR A QUICK YOUTUBE PRESENTATION ON BAMAZON!!!!!
              
This Project in maintained by peter6468 and users can contact him to get help.

