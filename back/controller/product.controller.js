const db = require("../db");

class ProductController {
  async createProduct(req, res) {
    const { title, description, path_picture, cost, master_id } = req.body;
    const newProduct = await db.query(
      "INSERT INTO products (title, description, path_picture, cost, master_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, path_picture, cost, master_id]
    );
    res.json(newProduct.rows[0]);
  }

  async getProducts(req, res) {
    const master_id = req.query.master_id;
    const products = await db.query(
      "SELECT * FROM products WHERE master_id = $1",
      [master_id]
    );
    res.json(products.rows);
  }

  async getProduct(req, res) {
    const id = req.params.id;
    const product = await db.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    res.json(product.rows);
  }

  async updateProduct(req, res) {
    const id = req.params.id;
    const { title, description, path_picture, cost, master_id } = req.body;
    const updateProduct = await db.query(
      "UPDATE products SET title = $1, description = $2, path_picture = $3, cost = $4, master_id = $5 WHERE id = $6",
      [title, description, path_picture, cost, master_id, id]
    );
    res.json(updateProduct.rows);
  }

  async deleteProduct(req, res) {
    const id = req.params.id;
    const product = await db.query("DELETE FROM products WHERE id = $1", [
      id,
    ]);
    res.json(product.rows);
  }
}

module.exports = new ProductController();
