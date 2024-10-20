const mysql = require('mysql2');
require('dotenv').config();


const dbUrl = process.env.RAILWAY_DB_LINK;

const pool = mysql.createConnection(dbUrl);

// const pool = mysql.createPool({

//     connectionLimit:process.env.CON_LIMIT,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

// const createTableQuery = `
//         CREATE TABLE IF NOT EXISTS users (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             roll_no INT UNIQUE NOT NULL,
//             name VARCHAR(255) NOT NULL,
//             email VARCHAR(100) UNIQUE NOT NULL,
//             pass VARCHAR(100) NOT NULL,
//             role VARCHAR(50) NOT NULL,
//             isActive BOOLEAN NOT NULL DEFAULT TRUE,
//             created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//         );
//     `;



    // const createTableQuery = `
    //     CREATE TABLE subjects (
    //         id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    //         sub_name VARCHAR(100) NOT NULL,
    //         sub_code VARCHAR(50) NOT NULL,
    //         class_group VARCHAR(50),
    //         class_section VARCHAR(10),
    //         subject_teacher VARCHAR(100),
    //         term VARCHAR(50)
    //     );
    // `;

    // pool.query(createTableQuery, (err, result) => {
    //     if (err) {
    //         console.error('Error creating table: ', err);
    //         return;
    //     }
    //     console.log('Users table created or already exists.');
    // });

// pool.query("SHOW STATUS WHERE `variable_name` = 'Threads_connected';", (err, results) => {
//     if (err) {
//         console.error('Error executing query:', err);
//         return;
//     }
//     console.log('Number of connected threads:', results[0].Value);
// });

// pool.getConnection((err, connection) => {
//     if (err) {
//         console.error('Database connection error: ', err);
//         return;
//     }
//     console.log('Connected to MySQL database using connection pool.');
//     connection.release(); 
// });




console.log("DB Connected");

module.exports = pool;
