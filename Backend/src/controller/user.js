const { User } = require("../lib/sequelize")
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")
const {generateToken, verifyToken} = require("../lib/jwt")
const mailer = require("../lib/mailer")

async function SendVerification(id, email, username){
    const verToken = await generateToken({id, isEmailVerification: true})
    const url_verify = process.env.LINK_VERIFY + verToken

    await mailer({
        to: email,
        subject: "Account Verification",
        html: `<div> <h1> Hello ${username}, your account has been registered </h1> </div>
        <div> Please verify your account with the button below </div>
        <div> <button> <a href="${url_verify}"> Verify </a> </button>`,
    })

    return verToken
}


const userController = {
    login: async (req, res) => {
        try{
            const { email, password, username } = req.body

            const user = await User.findOne({
                where: {
                    [Op.or]: [{username}, {email}],
                },
            })

            if(!user) {
                throw new Error("Username/Email not found")
            }

            const checkPw = await bcrypt.compareSync(password, user.password)
            console.log(checkPw)

            if(!checkPw){
                throw new Error("Password is incorrect")
            }
            const token = generateToken({id:user.id})

            delete user.dataValues.createdAt
            delete user.dataValues.updatedAt

            console.log(user)

            res.status(200).json({
                message: "Login succeed",
                result: {user, token}
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                message: err.toString()
            })
        }
    },
    register: async(req, res) => {
        try{
            const {username, password, email, name, gender, dob} = req.body
            const findUser = await User.findOne({
                where: {
                    [Op.or]: [{username},{email}]
                }
            })

            if(findUser){
                throw new Error("Username/Email has been taken")
            }

            console.log(findUser)

            const hashedPassword = bcrypt.hashSync(password,5)

            const user = await User.create({
                username,
                password: hashedPassword,
                email,
                name,
                gender,
                dob,
            })

            const token = await generateToken({ id: user.id, isEmailVerification: true })

            const verToken = await SendVerification(user.id, email, username)

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: err.toString()
            })
        }
    },
    stayLoggedIn: async(req, res) => {
        try{
            const { token } = req

            const renewedToken = generateToken({id: token.id, password: token.password})

            const findUser = await User.findByPk(token.id)
            console.log(findUser)

            delete findUser.password

            return res.status(200).json({
                message: "Renewed user token",
                result: {
                    user: findUser,
                    token: renewedToken,
                }
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: "Server Error",
            })
        }
    },
    editProfile: async (req, res) => {
        try{
            const {id_user} = req.params
            const {username, name, gender, email, dob} = req.body
            console.log(req.body)

            await User.update({
                username,
                name,
                email,
                dob,
            },
            {
                where: {
                    id: id_user
                }
            })

            const user = await User.findByPk(id_user)
            console.log(user)

            return res.status(200).json({
                message: "Changes Saved",
                result: user
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: "Error",
            })
        }
    },
    editProfilePic: async (req, res) => {
        try{
            const {id_user} = req.params
            const {filename} = req.file

            await User.update({
                profile_picture: `${process.env.UPLOAD_FILE_DOMAIN}/${process.env.PATH_PROFILEPIC}/${filename}`
            },
            {
                where: {
                    id: id_user
                },
            })

            return res.status(200).json ({
                message: "Profile Picture Updated"
            })
        } catch(err){
            console.log(err)
            return res.status(500).json({
                message: "Error in updating profile picture"
            })
        }
    },
}

module.exports = userController