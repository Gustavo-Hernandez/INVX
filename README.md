# INVEX

This project is part of the web development class, it consists of an early version of an inventory system.

# Setup
Follow the next steps
 - Create a Firebase Project
 - Add the configuration data provided by Firebase to a .env file.
 - Generate an user in the Firebase auth section. 
 - Run the following commands:
```sh
$ cd invex
$ npm install
$ npm start
```
# Features
  - Email Login 
  - Create a product.
  - Delete a product.
  - Update a product.
  - Generate a QR label a product and download it.
  - Create folders to optimize the organization of your products.
  - Quick item units modifications.
  - See your current 'Low Stock' products 
  - See logs for each transaction within the system.

### Tech

INVEX uses a number of open source projects to work properly:

* [Material UI] - UI boilerplate and Styles management.
* [Firebase Auth] - Managing Email Authentication
* [Firestore] - NoSQL Database
* [React JS] - Frontend reusable components, Context API as state management
* [React-QR-Code] - Quick QR code generation for labels.
