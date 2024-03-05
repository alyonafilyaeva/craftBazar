const db = require("../db");

class FavouriteEventController {
  async createFavouriteEvent(req, res) {
    const { event_id, user_id } = req.body;
    const newFavouriteEvent = await db.query(
      "INSERT INTO favourite_events (event_id, user_id) VALUES ($1, $2) RETURNING *",
      [event_id, user_id]
    );
    res.json(newFavouriteEvent.rows[0]);
  }

  async getFavouriteEvents(req, res) {
    const user_id = req.query.user_id;
    const favouriteEvents = await db.query(
      "SELECT * FROM favourite_events, events WHERE favourite_events.user_id = $1 AND favourite_events.event_id = events.id ",
      [user_id]
    );
    res.json(favouriteEvents.rows)
  }

  async deleteFavouriteEvent(req, res) {
    const id = req.params.id;
    const favouriteEvent = await db.query(
      "DELETE FROM favourite_events WHERE id = $1",
      [id]
    );
    res.json(favouriteEvent.rows);
  }
}

module.exports = new FavouriteEventController();
