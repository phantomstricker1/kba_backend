const mysql = require('mysql2');
require('dotenv').config();

// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

const connection = mysql.createConnection({
    host: "sql.freedb.tech",
    port: 3306, 
    user: "freedb_nauser",
    password: "wH*t%cBWb#E*c2%",
    database: "freedb_kba123"
    
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection error: ', err);
        return;
    }
    console.log('Connected to MySQL database.');

    //* create table query

    // const createTableQuery = `
    //     CREATE TABLE IF NOT EXISTS users (
    //         id INT AUTO_INCREMENT PRIMARY KEY,
    //         roll_no INT UNIQUE NOT NULL,
    //         name VARCHAR(255) NOT NULL,
    //         email VARCHAR(100) UNIQUE NOT NULL,
    //         pass VARCHAR(100) NOT NULL,
    //         role VARCHAR(50) NOT NULL,
    //         isActive BOOLEAN DEFAULT TRUE,
    //         created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //         modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    //     );
    // `;

    // connection.query(createTableQuery, (err, result) => {
    //     if (err) {
    //         console.error('Error creating table: ', err);
    //         return;
    //     }
    //     console.log('Users table created or already exists.');
    // });


});

module.exports = connection;
