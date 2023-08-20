const mysql = require('mysql2/promise');
const inquirer = require('inquirer');

let connection;

async function connect() {
    const dbConfig = {
        host: 'localhost',
        user: 'your_username',
        password: 'your_password',
        database: 'your_database'
    };

    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to the database.');
        showMenu();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

async function disconnect() {
    if (connection) {
        try {
            await connection.end();
            console.log('Disconnected from the database.');
        } catch (error) {
            console.error('Error disconnecting from the database:', error);
        }
    }
}

async function showMenu() {
    while (true) {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Select an option:',
                choices: [
                    'List products',
                    'Insert products',
                    'Update products',
                    'Delete products',
                    'Exit'
                ]
            }
        ]);

        switch (answer.option) {
            case 'List products':
                listProducts();
                break;
            case 'Insert products':
                insertProduct();
                break;
            case 'Update products':
                updateProduct();
                break;
            case 'Delete products':
                deleteProduct();
                break;
            case 'Exit':
                console.log('Exiting the program...');
                disconnect();
                return;
        }
    }
}

async function listProducts() {
    try {
        const [rows] = await connection.query('SELECT * FROM products');

        // Code to display the products retrieved from the database

    } catch (error) {
        console.error('Error listing products:', error);
    }
}

async function insertProduct() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the product:'
        },
        {
            type: 'input',
            name: 'price',
            message: 'Enter the price of the product:'
        },
        {
            type: 'input',
            name: 'stock',
            message: 'Enter the stock quantity:'
        }
    ]);

    try {
        const [result] = await connection.query('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)', [
            answers.name,
            answers.price,
            answers.stock
        ]);

        if (result.affectedRows === 1) {
            console.log('Product inserted successfully!');
        } else {
            console.log('Failed to insert product.');
        }

    } catch (error) {
        console.error('Error inserting product:', error);
    }
}

async function updateProduct() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the ID of the product you want to update:'
        }
    ]);

    try {
        const [rows] = await connection.query('SELECT * FROM products WHERE id = ?', [answer.id]);

        if (rows.length === 0) {
            console.log('Product not found.');
            return;
        }

        const updatedAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the new name of the product:',
                default: rows[0].name
            },
            {
                type: 'input',
                name: 'price',
                message: 'Enter the new price of the product:',
                default: rows[0].price
            },
            {
                type: 'input',
                name: 'stock',
                message: 'Enter the new stock quantity:',
                default: rows[0].stock
            }
        ]);

        const [result] = await connection.query('UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?', [
            updatedAnswers.name,
            updatedAnswers.price,
            updatedAnswers.stock,
            answer.id
        ]);

        if (result.affectedRows === 1) {
            console.log('Product updated successfully!');
        } else {
            console.log('Failed to update product.');
        }

    } catch (error) {
        console.error('Error updating product:', error);
    }
}

async function deleteProduct() {
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Enter the ID of the product you want to delete:'
        }
    ]);

    try {
        const [rows] = await connection.query('SELECT * FROM products WHERE id = ?', [answer.id]);

        if (rows.length === 0) {
            console.log('Product not found.');
            return;
        }

        const confirmAnswer = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: `Are you sure you want to delete the product "${rows[0].name}"?`,
                default: false
            }
        ]);

        if (!confirmAnswer.confirm) {
            console.log('Deletion canceled.');
            return;
        }

        const [result] = await connection.query('DELETE FROM products WHERE id = ?', [answer.id]);

        if (result.affectedRows === 1) {
            console.log(`Product "${rows[0].name}" deleted successfully!`);
        } else {
            console.log('Failed to delete product.');
        }

    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

// Start the program by connecting to the database and showing the menu
connect();
