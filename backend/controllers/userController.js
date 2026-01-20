const pool = require('../config/database');

const userController = {
  // Create a new user
  async createUser(req, res) {
    try {
      const { name, phone, email } = req.body;
      
      // Validate input
      if (!name || !phone || !email) {
        return res.status(400).json({ 
          message: 'Name, phone, and email are required' 
        });
      }
      
      // Check if email already exists
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ 
          message: 'Email already registered' 
        });
      }
      
      // Insert new user
      const newUser = await pool.query(
        `INSERT INTO users (name, phone, email) 
         VALUES ($1, $2, $3) 
         RETURNING *`,
        [name, phone, email]
      );
      
      res.status(201).json({
        message: 'User created successfully',
        user: newUser.rows[0]
      });
      
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ 
        message: 'Error creating user',
        error: error.message 
      });
    }
  },
  
  // Get all users
  async getAllUsers(req, res) {
    try {
      const allUsers = await pool.query(
        'SELECT * FROM users ORDER BY created_at DESC'
      );
      
      res.status(200).json(allUsers.rows);
      
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ 
        message: 'Error fetching users',
        error: error.message 
      });
    }
  }
};

module.exports = userController;