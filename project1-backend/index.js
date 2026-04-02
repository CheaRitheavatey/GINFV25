const db = require('./connectDB');

async function testConnection() {
    try {
        const res = await db.query('SELECT NOW()');
        console.log('Database connected successfully!');
        console.log('Current Postgres Time:', res.rows[0].now);
    } catch (err) {
        console.error('Error connecting to the database:', err.stack);
    }
}

testConnection();