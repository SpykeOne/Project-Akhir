const express = require("express")
const router = express.Router()
const multer = require("multer")
const {authorizedLoggedInUser} = require("../middleware/authMiddleware")

const upload = multer({
    limits: {
        fileSize: 1000000000000000, //Byte
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("File must be PNG, JPG, JPEG"), false)
        }
        cb(null,true)
    },
})

const userController = require("../controller/user")
const fileUploader = require("../lib/uploader")

router.post("/login", userController.login)

router.post("/register", userController.register)

module.exports = router;