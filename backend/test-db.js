const mysql = require('mysql2');

// Create connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Punpun@2002',
  database: 'tannmann_foundation'
});

// Test connection
connection.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    console.log('\nTroubleshooting steps:');
    console.log('1. Run: net start MySQL80');
    console.log('2. Check if database exists in MySQL Workbench');
    console.log('3. Verify password is "Punpun@2002"');
    return;
  }
  
  console.log('✅ Connected to MySQL!');
  
  // Test query
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Query error:', err.message);
    } else {
      console.log(`📊 Found ${results.length} users:`);
      results.forEach(user => {
        console.log(`   - ${user.name} (${user.email})`);
      });
    }
    
    connection.end();
  });
});