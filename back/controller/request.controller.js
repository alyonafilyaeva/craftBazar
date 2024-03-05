const db = require("../db");

class RequestController {
  async createRequest(req, res) {
    const { master_id, event_id } = req.body;
    const newRequest = await db.query(
      "INSERT INTO requests (master_id, event_id, is_active) VALUES ($1, $2, true) RETURNING *",
      [master_id, event_id]
    );
    res.json(newRequest.rows[0]);
  }

  async getRequests(req, res) {
    const id_organizer = req.query.id_organizer
    const requests = await db.query("SELECT * FROM requests, masters, events WHERE requests.master_id = masters.id AND requests.event_id = events.id AND events.organizer_id = $1",
    [id_organizer]);
    res.json(requests.rows)
  }

  async getReqest(req, res) {
    const id = req.params.id
    const request = await db.query("SELECT * FROM requests, masters, events WHERE requests.master_id = masters.id AND requests.event_id = events.id AND requests.id = $1",
    [id])
    res.json(request.rows)
  }

  async rejectRequest(req, res) {
    const id = req.params.id;
    const updateRequest = await db.query("UPDATE requests SET is_active = false WHERE id = $1",[id])
    res.json(updateRequest.rows)
  }

  async acceptRequest(req, res) {
    const id = req.params.id
    const request = await db.query("DELETE FROM requests WHERE id = $1", [id])
    res.json(request.rows)
  }
}

module.exports = new RequestController();