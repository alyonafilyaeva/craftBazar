const Router = require("express");
const router = new Router();
const ProductController = require('../controller/product.controller')

router.get("/products", ProductController.getProducts);
router.post("/products", ProductController.createProduct);
router.get("/products/:id", ProductController.getProduct);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

module.exports = router;