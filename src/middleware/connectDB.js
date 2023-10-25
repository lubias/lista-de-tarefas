const mysql = require("mysql2/promise");

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
    });

    console.log('Conectado ao banco de dados!');
    
    return connection;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


module.exports = connectDB;



