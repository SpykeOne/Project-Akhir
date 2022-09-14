const { User } = require("../lib/sequelize")
const { Token } = require("../lib/sequelize")
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")
const {generateToken, verifyToken} = require("../lib/jwt")
const mailer = require("../lib/mailer")
const mustache = require("mustache");
const fs = require("fs")
const { nanoid } = require("nanoid")
const moment = require("moment")

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

async function resetPassword(email){

    const token = generateToken({email, isEmailVerification: true}, "600s")
    const url_reset = process.env.LINK_RESET + token
    const template = fs.readFileSync(__dirname + '/../templates/forgot.html').toString()
    const renderedTemplate = mustache.render(template, {
        email,
        reset_password_url: url_reset,
    })

    await mailer({
        to: email,
        subject: "Reset Password",
        html: renderedTemplate
    })
 
    return token
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
            const {username, password, email, phoneNum} = req.body
            const findUser = await User.findOne({
                where: {
                    [Op.or]: [{username},{email}]
                }
            })

            if(findUser){
                throw new Error("PhoneNumber/Email has been taken")
            }

            console.log(findUser)

            const hashedPassword = bcrypt.hashSync(password,5)

            const user = await User.create({
                username,
                phoneNum,
                password: hashedPassword,
                email,
            })

            const token = await generateToken({ id: user.id, isEmailVerification: true })

            const verToken = await SendVerification(user.id, email, username)

            return res.status(200).json({
                message: "new user has been created",
                result: { user, token, verToken}
            })

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
                name,
                email,
                dob,
                gender,
                username,
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
    verifyUser: async (req,res) => {
    
        try{
          const { vertoken } = req.params
          console.log(vertoken)
    
          const isTokenVerified= verifyToken(vertoken, process.env.JWT_SECRET_KEY)
     
          if(!isTokenVerified || !isTokenVerified.isEmailVerification){
            throw new Error("token is invalid")
          }
    
          await User.update({ is_verified: true}, {where: {
            id: isTokenVerified.id
          }})
    
          return res.status(200).json({
            message: "User is Verified",
            success:  true
          })
    
        }
        catch(err) {
          console.log(err);
          res.status(400).json({
            message: err.toString(),
            success : false
          })
        }
      },
    registerV2: async (req, res) => {
    try {
      const { username, password, phoneNum, email } = req.body;

      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
      console.log(findUser);

      const hashedPassword = bcrypt.hashSync(password, 5);

      const user = await User.create({
        username,
        phoneNum,
        password: hashedPassword,
        email,
      });

      // Verification email
      const verificationToken = nanoid(40);

      await Token.create({
        token: verificationToken,
        id_user: user.id,
        valid_until: moment().add(1, "hour"),
        is_valid: true
      })

      const verificationLink =
        `http://localhost:3000/verification/${verificationToken}`

      const template = fs.readFileSync(__dirname + "/../templates/verify.html").toString()

      const renderedTemplate = mustache.render(template, {
        username,
        verify_url: verificationLink,
      })

      await mailer({
        to: email,
        subject: "Verify your account!",
        html: renderedTemplate
      })

      return res.status(201).json({
        message: "Registered user"
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error"
      })
    }
  },
  loginV2: async (req, res) => {
    try {
      const { email, password, username } = req.body;

      const user = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (!user) {
        throw new Error("username/email/password not found");
      }

      const checkPass = await bcrypt.compareSync(password, user.password);
      console.log(checkPass);
      if (!checkPass) {
        throw new Error("Wrong Password");
      }
      const token = nanoid(64);

      // Create new session for logged in user
      await Token.create({
        id_user: user.id,
        is_valid: true,
        token: token,
        valid_until: moment().add(1, "day")
      })

      delete user.dataValues.password;
      delete user.dataValues.createdAt;
      delete user.dataValues.updatedAt;

      console.log(user);

      res.status(200).json({
        message: "login succeed",
        result: { user, token },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },
  sendResetPassword: async (req,res) => {
    try{
        const {email} = req.body

        const token = generateToken({email: email, isEmailVerification: true})

        const resetToken = await resetPassword(email)

        return res.status(200).json({
            message: "A link to reset your password has been sent to your email",
            result: {token, resetToken}
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.toString()
        })
    }
  },
  resetPassword: async (req,res) => {
    try{
      const { resetToken } = req.params;
      const { password } = req.body;
      console.log(resetToken);
      const isTokenVerified = verifyToken(resetToken, process.env.JWT_SECRET_KEY)

      if(!isTokenVerified || !isTokenVerified.isEmailVerification){
      throw new Error("token is invalid")
      }
      
      const hashedPassword = bcrypt.hashSync(password, 5);

      await User.update({password: hashedPassword,},
        {where: {email: isTokenVerified.email}} );

    return res.status(200).json({
      message: "Password Changed",
      success: true,
    })
    }
    catch(err) {
      console.log(err);
      res.status(400).json({
        message: err.toString()
      })
    }
  },
}

module.exports = userController