const mysql = require("mysql2");

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'board_task',
};

const pool = mysql.createPool(dbConfig);

function connectDB(req, res, next) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
    req.dbConnection = connection;
    next();
  });
}

module.exports = connectDB;
