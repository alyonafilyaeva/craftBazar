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
    const user_id = req.query.user_id;
    if (user_id) {
      const master = await db.query(
        "SELECT * FROM masters WHERE user_id = $1",
        [user_id]
      );
      res.json(master.rows);
    } else {
      const masters = await db.query("SELECT * FROM masters");
      res.json(masters.rows);
    }
  }

  async getMaster(req, res) {
    const id = req.params.id;
    const master = await db.query(
      "SELECT * FROM masters WHERE masters.id = $1 ",
      [id]
    );
    res.json(master.rows);
  }

  async updateMaster(req, res) {
    const id = req.params.id;
    const {
      nickname,
      title_master,
      description,
      city,
      contacts,
      picture_path,
      category_id,
      link,
      time,
    } = req.body;
    const updateMaster = await db.query(
      "UPDATE masters SET nickname = $1, title_master = $2, description = $3, city = $4, contacts = $5, picture_path = $6, category_id = $7, link = $8, time = $9 WHERE id = $10",
      [
        nickname,
        title_master,
        description,
        city,
        contacts,
        picture_path,
        category_id,
        link,
        time,
        id,
      ]
    );
    res.json(updateMaster.rows);
  }

  async updateMasterData(req, res) {
    const id = req.params.id;
    const { nickname, city, contacts } = req.body;
    if (nickname) {
      const updateMaster = await db.query(
        "UPDATE masters SET nickname = $1 WHERE id = $2",
        [nickname, id]
      );
      res.json(updateMaster.rows);
    }
    if (city) {
      const updateMaster = await db.query(
        "UPDATE masters SET city = $1 WHERE id = $2",
        [city, id]
      );
      res.json(updateMaster.rows);
    }
    if (contacts) {
      const updateMaster = await db.query(
        "UPDATE masters SET contacts = $1 WHERE id = $2",
        [contacts, id]
      );
      res.json(updateMaster.rows);
    }
  }
}

module.exports = new MasterController();
