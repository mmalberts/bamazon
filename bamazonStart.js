
// * * * B A M A Z O N * * *

var inquirer = require("inquirer");
var fs = require("fs");

console.log("\nWELCOME TO BAMAZON\n")
inquirer.prompt([
	{
		name: "usertype",
		type: "list",
		message: "Are you a customer or a manager?",
		choices: ["CUSTOMER", "MANAGER"]
	}
]).then(function(response) {
	if (response.usertype === "MANAGER") {
		inquirer.prompt([
			{
				name: "password",
				message: "Please enter your password",
			}
		]).then(function(response) {
			if (response.password === "manager1") {
				fs.readFile("bamazonManager.js", function(err, res) {
					if (err) throw err;
				});
			}
			else {
				console.log("Incorrect password.");
			};
		});
	}
	else if (response.usertype === "CUSTOMER") {
		fs.readFile("bamazonCustomer.js", function(err, res) {
			if (err) throw err;
		});
	};
});