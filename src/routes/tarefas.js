const express = require("express");
const router = express.Router();
const connectDB = require("../middleware/connectDB");

router.use(express.json());
router.use(connectDB);

router.post("/", (req, res) => {
  const db = req.dbConnection;
  const { descricao, concluido } = req.body;

  const sql = "INSERT INTO tarefas (descricao, concluido) VALUES (?,?)";
  const values = [descricao, concluido];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Erro ao criar cliente no banco de dados:", err);
      return res.status(500).json({ error: err });
    }

    res.status(200).json({ data: results });
  });
});

router.get("/", (req, res) => {
  const db = req.dbConnection;
  db.query("SELECT * FROM tarefas", (err, results) => {
    if (err) {
      console.error("Erro na consulta ao banco de dados:", err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }

    res.status(200).json({ data: results });

    db.release();
  });
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
