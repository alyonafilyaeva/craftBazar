const db = require("../db");

class UserController {
  async createUser(req, res) {
    const { login, password } = req.body;
    const role = 'user'
    const newUser = await db.query(
      "WITH first_insert AS (INSERT INTO users (login, role) VALUES ($1, $2) RETURNING id) INSERT INTO passwords (user_id, hash_password) VALUES ((SELECT id FROM first_insert), $3)",
      [login, role, password]
    );
    res.json(newUser.rows[0]);
  }

  async getUsers(req, res) {
    const users = await db.query("SELECT * FROM users");
    res.json(users.rows)
  }

  async getUser(req, res) {
    const id = req.params.id
    const user = await db.query("SELECT FROM users WHERE id = $1", [id]);
    res.json(user.rows)
  }

  async deleteUser(req, res) {
    const id = req.params.id
    const user = await db.query("DELETE FROM users WHERE id = $1", [id]);
    res.json(user.rows)
  }
}

module.exports = new UserController();
