const db = require("../db");

class MasterEventController {
  async createMasterEvent(req, res) {
    const { master_id, event_id } = req.body;
    const newMasterEvent = await db.query(
      "INSERT INTO masters_events (master_id, event_id, is_paid) VALUES ($1, $2, false) RETURNING *",
      [master_id, event_id]
    );
    res.json(newMasterEvent.rows[0]);
  }

  async getMastersEvent(req, res) {
    const master_id = req.query.master_id;
    const event_id = req.query.event_id;
    if (master_id) {
      const products = await db.query(
        "SELECT * FROM masters_events, events WHERE masters_events.master_id = $1 AND masters_events.event_id = events.id ",
        [master_id]
      );
      res.json(products.rows);
    }
    if (event_id) {
        const products = await db.query(
          "SELECT * FROM masters_events, masters WHERE masters_events.event_id = $1 AND masters_events.master_id = masters.id ",
          [event_id]
        );
        res.json(products.rows);
      }
  }

  async updateMasterEvent(req, res) {
    const id = req.params.id;
    const updateMasterEvent = await db.query("UPDATE masters_events SET is_paid = true WHERE id = $1",[id])
    res.json(updateMasterEvent.rows)
  }
}

module.exports = new MasterEventController();
