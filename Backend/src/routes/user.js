const express = require("express")
const router = express.Router()
const {authorizedLoggedInUser} = require("../middleware/authMiddleware")
const userController = require("../controller/user")

const fileUploader = require("../lib/uploader")

router.post("/login", userController.loginV2)

router.post("/register", userController.registerV2)

router.patch("/:id", userController.editProfile)

router.patch("/uploadprofpic/:id", fileUploader({
    destinationFolder: "profile_pict",
    fileType: "image",
    prefix: "PP",
}).single("image"), userController.editProfilePic)

router.patch("/verify/:vertoken", userController.verifyUser)

router.post("/sendResetPassword", userController.sendResetPassword)

router.post("/resetPassword/:resettoken", userController.resetPassword)

router.get("/refresh-token", authorizedLoggedInUser, userController.stayLoggedIn)

router.patch("/edit-pp/:id_user", userController.editProfilePic)

router.patch("/edit-profile/:id_user", userController.editProfile)

router.post("/resendVerification", userController.resendVerification)

// router.post("/loginV2", userController.loginV2)

// router.post("/registerV2", userController.registerV2)



module.exports = router;