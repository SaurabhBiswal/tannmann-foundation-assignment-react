const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/database');

const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({
    message: 'Tann Mann Foundation API',
    endpoints: {
      register: 'POST /api/users',
      getUsers: 'GET /api/users',
      health: 'GET /api/health'
    }
  });
});


app.post('/api/users', async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    
    
    if (!name || !phone || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    
    const [result] = await db.execute(
      'INSERT INTO users (name, phone, email) VALUES (?, ?, ?)',
      [name, phone, email]
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully!',
      userId: result.insertId
    });
    
  } catch (error) {
    console.error('Error:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});


app.get('/api/users', async (req, res) => {
  try {
    const [users] = await db.execute(
      'SELECT * FROM users ORDER BY created_at DESC'
    );
    
    res.json({
      success: true,
      count: users.length,
      users: users
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});


app.get('/api/health', async (req, res) => {
  try {
    await db.execute('SELECT 1');
    res.json({
      success: true,
      message: 'API is healthy',
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed'
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
  console.log(`📊 Database: ${process.env.DB_NAME}`);
});