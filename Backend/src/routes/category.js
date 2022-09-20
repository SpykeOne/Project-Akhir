const express = require("express")
const router = express.Router()
const multer = require("multer")
const categoryController = require("../controller/category")
const fileUploader = require("../lib/uploader")

router.get("/", categoryController.getAllCategory)

const upload = multer({
    limits: {
        fileSize: 10000000000000, //in bytes
    },
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error ("File must be png, jpg, or jpeg"), false)
        }
        cb(null, true)
    }
})

router.post(
    "/addCategory",
    fileUploader({
        destinationFolder: "category_img",
        fileType: "image",
        prefix: "CAT"
    }).single("category_img"),
categoryController.addCategory)

router.delete("/:id", categoryController.deleteCategory)

router.patch("/:id", 
    fileUploader({
        destinationFolder: "category_img",
        fileType: "image",
        prefix: "CAT"
    }).single("category_img"), categoryController.editCategory)

module.exports = router;