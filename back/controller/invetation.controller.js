const db = require("../db");

class InvetationController {
  async createInvetation(req, res) {
    const { master_id, event_id } = req.body;
    const newRequest = await db.query(
      "INSERT INTO invetations (master_id, event_id, is_active) VALUES ($1, $2, true) RETURNING *",
      [master_id, event_id]
    );
    res.json(newRequest.rows[0]);
  }

  async getInvetations(req, res) {
    const id_master = req.query.id_master
    const invetations = await db.query("SELECT * FROM invetations, masters, events WHERE invetations.master_id = masters.id AND invetations.event_id = events.id AND masters.id = $1",
    [id_master]);
    res.json(invetations.rows);
    console.log('okey')
  }

  async getInvetation(req, res) {
    const id = req.params.id
    const invetation = await db.query("SELECT * FROM invetations, masters, events WHERE invetations.master_id = masters.id AND invetations.event_id = events.id AND invetations.invetation_id = $1",
    [id])
    res.json(invetation.rows)
  }

  async rejectInvetation(req, res) {
    const id = req.params.id;
    const updateInvetation = await db.query("UPDATE invetations SET is_active = false WHERE invetation_id = $1",[id])
    res.json(updateInvetation.rows)
  }

  async acceptInvetation(req, res) {
    const id = req.params.id
    const invetation = await db.query("DELETE FROM invetations WHERE invetation_id = $1", [id])
    res.json(invetation.rows)
  }
}

module.exports = new InvetationController();