const db = require("../db");

class MasterController {
  async createMaster(req, res) {
    const { nickname, city, contacts, login, password } = req.body;
    const role = "master";
    const newMaster = await db.query(
      "WITH first_insert AS (INSERT INTO users (login, role) VALUES ($1, $2) RETURNING id), second_insert AS (INSERT INTO passwords (user_id, hash_password) VALUES ((SELECT id FROM first_insert), $3)) INSERT INTO masters ( nickname, city, contacts, user_id) VALUES ($4, $5, $6, (SELECT id FROM first_insert))",
      [login, role, password, nickname, city, contacts]
    );
    res.json(newMaster.rows[0]);
  }

  async getMasters(req, res) {
    const masters = await db.query("SELECT * FROM masters");
    res.json(masters.rows);
  }

  async getMaster(req, res) {
    const id = req.params.id;
    const master = await db.query("SELECT * FROM masters WHERE id = $1", [id]);
    res.json(master.rows)
  }

  async updateMaster(req, res) {
    const id = req.params.id;
    const { nickname, title, description, city, contacts, picture_path } = req.body;
    const updateMaster = await db.query("UPDATE masters SET nickname = $1, title = $2, description = $3, city = $4, contacts = $5, picture_path = $6 WHERE id = $7",
    [nickname, title, description, city, contacts, picture_path, id])
    res.json(updateMaster.rows)
  }
}

module.exports = new MasterController();
