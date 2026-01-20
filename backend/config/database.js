const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Punpun@2002',
  database: process.env.DB_NAME || 'tannmann_foundation',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection on startup
pool.getConnection()
  .then(connection => {
    console.log('✅ Connected to MySQL database successfully!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    console.log('Please check:');
    console.log('1. Is MySQL service running? (net start MySQL80)');
    console.log('2. Are database credentials correct?');
    console.log('3. Does database "tannmann_foundation" exist?');
  });

module.exports = pool;