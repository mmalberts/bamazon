
// * * * B U I L D I N G  C U S T O M E R  I N T E R F A C E * * *

// running this app will first display all the items available
	// this will include ids, names, and prices for each
// then prompt the user with two messages
	// first message asks the id of the product they would like to buy
	// second message asks how many of this item they would like to buy
// once the customer has placed the order, app should check if the store has enough of the product in stock to fill the order.
	// if not, the app should alert the customer and stop the order
	// if there is enough, fulfill the order
		// this means updating SQL database to reflect quantity
		// once the order goes through, show customer the total cost of their purchase

// * * * FOR SUPERVISOR VIEW * * *
// each purchase should add total cost to new product_sales column in products table (table must be modified first)

var mysql = require("mysql");
var inquirer = require("inquirer");

//making connection to database
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon_db"
});

connection.connect(function(err) {
	if (err) throw err;
	// console.log("Connected to bamazon_db"); //for debugging
	displayItems();
});

//function to display all available items
function displayItems() {
	console.log("\nWelcome, Customer!");
	console.log("\nItems available: \n");
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		// console.log(res);
		for (var i = 0; i < res.length; i++) {
			var row = res[i];
			console.log("\n----------\n");
			console.log("Item ID: " + row.item_id);
			console.log("Product Name: " + row.product_name);
			console.log("Price: $" + row.price);
		};
		promptCustomer();
	});
};

var chosenId;
var chosenQuant;


//function that uses inquirer to prompt customer to purchase items
function promptCustomer() {
	inquirer.prompt([
	{
		name: "id",
		type: "input",
		message: "\nPlease input the ID number of the item you would like to purchase"
	}, {
		name: "quantity",
		type: "input",
		message: "\nHow many of this item would you like to purchase?"
	}
	]).then(function(response) {
		chosenId = parseFloat(response.id);
		chosenQuant = parseFloat(response.quantity);
		var chosenItem;
		connection.query("SELECT * FROM products", function(err, res) {
			if (err) throw err;
			for (var i = 0; i < res.length; i++) {
				if (res[i].item_id === chosenId) {
					chosenItem = res[i];
				};
			};
			// console.log(chosenItem.product_name); //for debugging
			if (chosenItem.stock_quantity < chosenQuant) {
				console.log("\nWe do not have enough of this item in stock.\n");
				connection.end();
			}
			else {
				var totalCost = chosenItem.price * chosenQuant;
				var newStockQuant = chosenItem.stock_quantity - chosenQuant;
				// console.log(newStockQuant);
				// console.log(chosenItem.stock_quantity);
				// console.log(chosenId);
				console.log("\nThank you for your order. Your total is $" + totalCost +"\n");
				//function that updates inventory quantity
				connection.query(
					"UPDATE products SET ? WHERE ?",
					[
						{
							stock_quantity: newStockQuant
						},
						{
							item_id: chosenId
						}
					],
					function(err, res) {
						if (err) throw err;
						// console.log("Quantity updated");
					}
				);
			};
			// quantityCheck();
			connection.end();
		});
	});
}; 

//quantity check function for debugging
function quantityCheck() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].stock_quantity);
		}
	})
};