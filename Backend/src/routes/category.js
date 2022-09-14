const express = require("express")
const router = express.Router()

const categoryController = require("../controller/category")

router.get("/", categoryController.getAllCategory)

router.post("/addCategory", categoryController.addCategory)

router.delete("/:id", categoryController.deleteCategory)

router.patch("/:id", categoryController.editCategory)

module.exports = router;