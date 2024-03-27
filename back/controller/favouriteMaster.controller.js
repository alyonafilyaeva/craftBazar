const db = require("../db");

class FavouriteMasterController {
  async createFavouriteMaster(req, res) {
    const { master_id, user_id } = req.body;
    const newFavouriteMaster = await db.query(
      "INSERT INTO favourite_masters (master_id, user_id) VALUES ($1, $2) RETURNING *",
      [master_id, user_id]
    );
    res.json(newFavouriteMaster.rows[0]);
  }

  async getFavouriteMasters(req, res) {
    const user_id = req.query.user_id;
    const favouriteMasters = await db.query(
      "SELECT * FROM favourite_masters, masters WHERE favourite_masters.user_id = $1 AND favourite_masters.master_id = masters.id ",
      [user_id]
    );
    res.json(favouriteMasters.rows)
  }

  async deleteFavouriteMaster(req, res) {
    const id = req.params.id;
    const favouriteMaster = await db.query(
      "DELETE FROM favourite_masters WHERE id_fv = $1",
      [id]
    );
    res.json(favouriteMaster.rows);
  }
}

module.exports = new FavouriteMasterController();