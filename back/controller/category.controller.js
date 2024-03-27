const db = require("../db");

class CategoryController {
  async getCategories(req, res) {
    const categories = await db.query("SELECT * FROM categories");
    res.json(categories.rows);
  }

  async getCategory(req, res) {
    const id = req.params.id;
    const category = await db.query("SELECT * FROM categories WHERE id = $1", [id]);
    res.json(category.rows)
  }
}

module.exports = new CategoryController();
