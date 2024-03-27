const db = require("../db");

class EventController {
  async createEvent(req, res) {
    const {
      title,
      description,
      date_start,
      date_finish,
      time_start,
      time_finish,
      city,
      address,
      link,
      cost,
      path_picture,
      organizer_id,
      count_masters,
    } = req.body;
    const date_created = new Date().toISOString().slice(0, 10);
    const newEvent = await db.query(
      "INSERT INTO events ( title, description, date_start, date_finish, time_start, time_finish, city,address, link, cost, path_picture, date_created, organizer_id, count_masters) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
      [
        title,
        description,
        date_start,
        date_finish,
        time_start,
        time_finish,
        city,
        address,
        link,
        cost,
        path_picture,
        date_created,
        organizer_id,
        count_masters,
      ]
    );
    res.json(newEvent.rows[0]);
  }

  async getEvents(req, res) {
    const org_id = req.query.org_id;
    /* var events = []; */
    /* 
    const cost = req.query.cost;
    events = await db.query("SELECT * FROM events WHERE organizer_id = $1 AND cost <= $2", [
      org_id, cost
    ]) */
    if (org_id) {
      let events = await db.query("SELECT * FROM events WHERE organizer_id = $1", [org_id]);
      res.json(events.rows);
    }
    else {
      let events = await db.query("SELECT * FROM events")
      res.json(events.rows);
    }
    
  }

  async getEvent(req, res) {
    const id = req.params.id;
    const event = await db.query(
      "SELECT * FROM events, organizers WHERE events.id = $1",
      [id]
    );
    res.json(event.rows);
  }

  async updateEvent(req, res) {
    const id = req.params.id;
    const {
      title,
      description,
      date_start,
      date_finish,
      time_start,
      time_finish,
      city,
      address,
      link,
      cost,
      path_picture,
      count_masters,
    } = req.body;
    const updateEvent = await db.query(
      "UPDATE events SET title = $1, description = $2, date_start = $3, date_finish = $4, time_start = $5, time_finish = $6, city = $7, address = $8, link = $9, cost = $10, path_picture = $11, count_masters = $12 WHERE id = $13",
      [
        title,
        description,
        date_start,
        date_finish,
        time_start,
        time_finish,
        city,
        address,
        link,
        cost,
        path_picture,
        count_masters,
        id,
      ]
    );
    res.json(updateEvent.rows);
  }

  async deleteEvent(req, res) {
    const id = req.params.id;
    const event = await db.query("DELETE FROM events WHERE id = $1", [id]);
    res.json(event.rows);
  }
}

module.exports = new EventController();
