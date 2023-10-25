const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");

router.use(express.json());
router.use(connectDB);

router.post("/", async (req, res) => {
  try{
    const connection = await connectDB();
    const { descricao, concluido } = req.body;

    const sql = "INSERT INTO tarefas (descricao, concluido) VALUES (?,?)";
    const values = [descricao, concluido];

    const [result] = await connection.query(sql, values);
    await connection.end();

    res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error while creating user in database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const connection = await connectDB();
    const [result] = await connection.query("SELECT * FROM tarefas");
    await connection.end();
    res.json({ data: result });
  } catch (error) {
    console.error("Error in the database query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/getByText", (req, res) => {
  const db = req.dbConnection;
  const {descricao} = req.body;
  const sql = "SELECT * FROM tarefas WHERE descricao LIKE ?";
  db.query(sql, [`%${descricao}%`], (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.status(200).json({ data: results });

    db.release();
  });
});

router.put("/:id", (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;
  const { descricao, concluido } = req.body;
  const updatedFields = req.body;

  const sql = "UPDATE tarefas SET ? WHERE id = ?";
  const values = [updatedFields, id];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao editar tarefa no banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.json({ data: results });

    db.release();
  });
});

router.delete("/:id", (req, res) => {
  const db = req.dbConnection;
  const id = req.params.id;

  const sql = "DELETE FROM tarefas WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao excluir tarefa do banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.status(200).json({ data: results });

    db.release();
  });
});

module.exports = router;
