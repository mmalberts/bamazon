
//  * * * B U I L D I N G  M A N A G E R  I N T E R F A C E * * *

// this app will list a set of menu options
	// view products for sale
		// lists every available item incl. item ids, names, prices, and quantities
	// view low inventory
		// lists all items with an inventory count lower than five
	// add to inventory
		// displays a prompt that will let the manager add more of any item currently in store
	// add new product
		// allows manager to add a completely new product to the store

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon_db"
});

inquirer.prompt([
	{
		name: "action",
		type: "list",
		message: "\nWhat would you like to do?",
		choices: ["VIEW ALL PRODUCTS", "VIEW LOW INVENTORY", "RESTOCK INVENTORY", "ADD NEW PRODUCT"]
	}
]).then(function(response) {
	switch (response.action) {
		case "VIEW ALL PRODUCTS":
			viewProducts();
			connection.end();
			break;
		case "VIEW LOW INVENTORY":
			viewLow();
			break;
		case "RESTOCK INVENTORY":
			restock();
		case "ADD NEW PRODUCT":
			addProduct();
	};
});

function viewProducts() {
	//read from database
	console.log("\nItems available: \n");
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		// console.log(res);
		for (var i = 0; i < res.length; i++) {
			var row = res[i];
			console.log("\n----------\n");
			console.log("Item ID: " + row.item_id);
			console.log("Product Name: " + row.product_name);
			console.log("Department Name: " + row.department_name);
			console.log("Price: $" + row.price);
			console.log("Quantity In Inventory: " + row.stock_quantity);
		};
	});
};

function viewLow() {
	//read from database
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		console.log("\nChecking inventory...");
		var okayArray = [];
		for (var i = 0; i < res.length; i++) {
			if (res[i].stock_quantity < 5) {
				var row = res[i];
				console.log("\n----------\n");
				console.log("PLEASE RESTOCK THE FOLLOWING:")
				console.log("Item ID: " + row.item_id);
				console.log("Product Name: " + row.product_name);
				console.log("Quantity In Inventory: " + row.stock_quantity);
			}
			else {
				okayArray.push("Okay");
				if (okayArray.length === res.length) {
					console.log("\nAll items are stocked.\n");
				};
			};
		};
		connection.end();
	});
};

function restock() {
	//update database
	inquirer.prompt([
		{
			name: "id",
			type: "input",
			message: "Please enter the ID number of the product you would like to restock"
		}, {
			name: "amount",
			type: "input",
			message: "How many of this item would you like to add to the inventory?"
		}
	]).then(function(response) {
		var chosenId = parseFloat(response.id);
		var addAmount = parseFloat(response.amount);
		// var currentAmount;
		connection.query("SELECT * FROM products", function(err, res) {
			if (err) throw err;
			for (var i = 0; i < res.length; i++) {
				if (res[i].item_id === chosenId) {
					currentAmount = parseFloat(res[i].stock_quantity);
					// console.log(currentAmount);
				};
			};
			var newAmount = currentAmount + addAmount;
			// console.log(newAmount);
			connection.query("UPDATE products SET ? WHERE ?",
				[
					{
						stock_quantity: newAmount
					},
					{
						item_id: chosenId
					}
				],
				function(err, res) {
					if (err) throw err;
					console.log("\nInventory restocked successfully");
				}
			);
			viewProducts();
			connection.end();
		});
	});
};

function addProduct() {
	//create in database
	inquirer.prompt([
		{
			name: "name",
			type: "input",
			message: "Product name"
		}, {
			name: "department",
			type: "input",
			message: "Department name"
		}, {
			name: "price",
			type: "input",
			message: "Price"
		}, {
			name: "stock",
			type: "input",
			message: "Quantity available"
		}
	]).then(function(response) {
		var name = response.name;
		var department = response.department;
		var price = parseFloat(response.price);
		var stock = parseFloat(response.stock);
		connection.query(
			"INSERT INTO products SET ?",
			{
				product_name: name,
				department_name: department,
				price: price,
				stock_quantity: stock
			},
			function(err, res) {
				if (err) throw err;
				console.log("Item successfully added");
			}
		);
		viewProducts();
		connection.end();
	});
};