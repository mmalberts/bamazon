WELCOME TO BAMAZON

* This is a command-line application that mimicks the functionality of an Amazon-like online store.
* Please remember to install your package.json, including inquirer and mysql.

* To use this application as a customer, run the bamazonCustomer.js file from your terminal.
    * From here, you will be shown a list of items available and how much each costs.
    * You will be prompted to select an item for purchase based on its ID number, and then to enter a desired quantity
    * If this quantity is not available, the application will alert you and your order will not be processed
    * If this item is available in the desired quantity, the order will be processed and the application will tell you how much your total cost was
    * Every time an order is processed, the info is updated in the database
    
* Here is a demo of the working bamazonCustomer interface
https://github.com/mmalberts/bamazon/files/1777631/bamazonCustomer_working.zip

* To use this application as a manager, run the bamazonManager.js file from your terminal.
* Manager view provides the user with four options
    * To view all available products, including the available quantity of each, select VIEW ALL PRODUCTS
        * See the working demo here:
        https://github.com/mmalberts/bamazon/files/1777641/bamazonManager_viewAll.zip
    * To view only the products with fewer than five units left in stock, select VIEW LOW INVENTORY
        * See the working demo here:
        https://github.com/mmalberts/bamazon/files/1777647/bamazonManager_viewLow.zip
    * To restock any of the items, select RESTOCK INVENTORY
        * You will then be prompted to enter the ID number of the item you would like to restock, and the quantity you would like to add to the store
        * See the working demo here:
        https://github.com/mmalberts/bamazon/files/1777649/bamazonManager_restock.zip
    * To add a new product to the store, select ADD NEW PRODUCT
        * You will then be prompted to enter the item name, the department it is in, the price per unit, and the stock quantity
        * See the working demo here:
        https://github.com/mmalberts/bamazon/files/1777651/bamazonManager_addProduct.zip
