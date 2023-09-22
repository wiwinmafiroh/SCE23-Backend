const router = require("express").Router();
const apiController = require("../controllers/apiControllers");

router.get("/", apiController.landingPage);
router.post("/login", apiController.login);
router.post("/books", apiController.addBook);
router.get("/books", apiController.getBooks);
router.get("/books/:id", apiController.getBookByID);
router.put("/books/:id", apiController.updateBookByID);
router.delete("/books/:id", apiController.deleteBookByID);

module.exports = router;
