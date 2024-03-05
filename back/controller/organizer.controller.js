const db = require("../db");

class OrganizerController {
  async createOrganizer(req, res) {
    const { name, contacts, login, password } = req.body;
    const role = "org";
    const NewOrg = await db.query(
      "WITH first_insert AS (INSERT INTO users (login, role) VALUES ($1, $2) RETURNING id), second_insert AS (INSERT INTO passwords (user_id, hash_password) VALUES ((SELECT id FROM first_insert), $3)) INSERT INTO organizers ( name, contacts, user_id) VALUES ($4, $5, (SELECT id FROM first_insert))",
      [login, role, password, name, contacts]
    );
    res.json(NewOrg.rows[0]);
  }

  async getOrganizers(req, res) {
    const organizers = await db.query("SELECT * FROM organizers");
    res.json(organizers.rows);
  }

  async getOrganizer(req, res) {
    const id = req.params.id;
    const organizer = await db.query("SELECT * FROM organizers WHERE id = $1", [id]);
    res.json(organizer.rows)
  }

  async updateOrganizer(req, res) {
    const id = req.params.id;
    const { name, contacts} = req.body;
    const updateOrganizer = await db.query("UPDATE organizers SET name = $1,  contacts = $2 WHERE id = $3",
    [name,  contacts, id])
    res.json(updateOrganizer.rows)
  }
}

module.exports = new OrganizerController();
