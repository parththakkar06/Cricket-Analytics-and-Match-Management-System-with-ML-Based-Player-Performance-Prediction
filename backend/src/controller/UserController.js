const usermodel = require('../models/UserModel');
const encrypt = require('../utils/EncryptUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenUser = require('../utils/tokenUser')
const mailUtil = require('../utils/MailUtils');
const config = require('../config/config');

// ------------------------ Create User API ------------------------
const createuser = async (req, res) => {
    try {
        const hashpassword = await encrypt.encryptpassword(req.body.password);
        
        const jwtSecret = config.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined. Check your environment configuration.');
        }

        const verificationToken = jwt.sign({ email: req.body.email }, jwtSecret, { expiresIn: '1h' });

        const userobj = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashpassword,
            roleId: req.body.roleId,
            contact: req.body.contact,
            gender: req.body.gender,
            DOB: req.body.DOB,
            active: false,
            verificationToken
        };

        const user = await usermodel.create(userobj);

        const verifyLink = `${config.BASE_URL}/user/verify?token=${verificationToken}`;
        
      
        const emailBody = `
            <div>
            
                <span>Welcome to eAdvertisement</spn>
            </div>

            <h1>Welcome to eAdvertisement!</h1>
            <p>Click the button below to verify your email:</p>
            <a href="${verifyLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
                Verify Email
            </a>
        `;

        await mailUtil.sendingMail(user.email, emailBody);

        res.status(201).json({
            message: "User created successfully. Please check your email to verify your account.",
            data: user
        });
    } catch (err) {
        console.error('Error creating user:', err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


// ------------------------ Verify User API ------------------------
const verifyUser = async (req, res) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        const user = await usermodel.findOneAndUpdate(
            { email: decoded.email },
            { active: true, verificationToken: null },
            { new: true }
        );

        if (!user) {
             res.status(404).send('<h1>Invalid token or user not found</h1>');
        }

        res.status(200).send(`
            <h1>Email Verified Successfully!</h1>
            <p>You can now login to your account.</p>
        `);
    } catch (err) {
        res.status(400).send('<h1>Invalid or expired token</h1>');
    }
};


// ------------------------ Login User API ------------------------
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; // Extract email & password

        // Check if email was provided
        if (!email || !password) {
           return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user by email
        const loginuser = await usermodel.findOne({ email: email }).populate("roleId");

        if (!loginuser) {
           return  res.status(400).json({ message: "Email not found" });
        }
if(loginuser.active === true) {

        // Compare password
        const isMatch = await bcrypt.compare(password, loginuser.password);

        if (!isMatch) {
          return res.status(400).json({ message: "Password does not match" });
        }

        // Generate token (uncomment this part if needed)
        const token = tokenUser.generateToken(loginuser.toObject());

       return res.status(201).json({
            message: "Login successful",
            data: loginuser,
            token: token  // Uncomment if token is needed
        });}else{
            res.status(400).json({
                message: "Please verify your email before logging in."
            });
        }

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};



// const loginUser = async(req,res)=>{
    
//     const email = req.body.email
//     const password = req.body.password
//     const loginuser = await usermodel.findOne({email:email})
//     if(email){
//         const ismatch  = await bcrypt.compare(password,loginuser.password)
//         if(ismatch){
//             const token  = tokenUser.generateToken(loginuser.toObject());
//             res.status(200).json({
//                 message:"login successfully",
//                 data:loginuser,
//                 token:token
//             })
//         }else{
//             res.status(400).json({
//                 message:"password not match"
//             })
//         }
//     }else{
//         res.status(400).json({
//             message:"email not found"
//         })
//     }


// }

// ------------------------ Get All Users API ------------------------
const getalluser = async (req, res) => {
    try {
        const users = req.user;
        res.status(201).json({
            message: "users fetched successfully",
            data: users
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

//------get all user without authmiddeleware --------------
const getuser = async (req, res) => {
    try {
        const user = await usermodel.find();
        res.status(201).json({
            message: "users fetched successfully",
            data: user
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};


// ------------------------ Delete User API ------------------------
const deleteduser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await usermodel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted successfully",
            data: deletedUser
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createuser,
    getalluser,
    deleteduser,
    loginUser,
    verifyUser,
    getuser
};
