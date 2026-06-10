const { default: mongoose } = require('mongoose');
const userprofilemodel = require('../models/UserProfile')
const cloudinaryutil = require('../utils/CloudinaryUtil')
const multer = require("multer");
const path = require("path");




//-----------upload profile pic----------------------------------------------------------------------


const Storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
// const Storage = multer.diskStorage({
//     destination:"/upload",
//     filename : function (req,file,cb){
//         cb(null,file.originalname)
//     }
// })



const  upload = multer({
    storage:Storage


}).single("image")


// ------------------------ user create api =----------------------------------------------------------------------------

const createuserprofile = async (req, res) => {

    const userprofileobj = {
        userId: req.body.userId,
        profilePicPath: req.body.profilePicPath,
        location: req.body.location,
        playingRole: req.body.playingRole,
        battingStyle: req.body.battingStyle,
        bowlingStyle: req.body.bowlingStyle
    }
    try {

        const userprofile = await userprofilemodel.create(userprofileobj)
        res.status(201).json({
            message: "user profile created successfully.....",
            data: userprofile

        })

    } catch (err) {

        res.status(500).json({
            message: "internal server error"
        })
    }

}


//----------------------get all user profile api----------------------------------------------------------------------------


const getuserprofile = async (req, res) => {
    try {
        const userprofile = await userprofilemodel.find()
        res.status(200).json({
            message: "all user profile data",
            data: userprofile
        })


    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }

}

//-----------------------delete user profile--------------------------------------------

const deleteuserprofile = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProfile = await userprofilemodel.findByIdAndDelete(id);
        if (deletedProfile==null) {
             res.status(404).json({
                message: "User profile not found"
            });
        }
        res.status(200).json({
            message: "User profile deleted successfully",
            data: deletedProfile
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// ---------------------- update user profile by id api -------------------------------------------------
const updateuserprofile = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProfile = await userprofilemodel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProfile) {
            return res.status(404).json({
                message: "User profile not found"
            });
        }
        res.status(200).json({
            message: "User profile updated successfully",
            data: updatedProfile
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};


//----------------------------------user profile with database ------------------------


const adduserprofilewithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "File upload failed",
        data: err
      });
    }

    try {
      // Upload to Cloudinary
      const cloundinaryResponse = await cloudinaryutil.uploadFileToCloudinary(req.file);
      console.log(cloundinaryResponse);
      console.log(req.body);

      // Extract userId and add Cloudinary URL to body
    //   const { userId } = req.body;
      req.body.profilePicPath = cloundinaryResponse.secure_url;

      // Validate userId
    //   if (!mongoose.Types.ObjectId.isValid(userId)) {
    //     return res.status(400).json({ message: 'Invalid or missing userId' });
    //   }

      // Save profile
      const saveUserProfile = await userprofilemodel.create(req.body);

      res.status(201).json({
        message: "User profile saved successfully.",
        data: saveUserProfile
      });

    } catch (error) {
      console.error("Error saving profile:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
  });
};

//get user profile by id

const getuserprofilebyid = async (req, res) => {    
    const userId  = req.params.userId;
    console.log("userId...",userId);
    try {
        const userprofile = await userprofilemodel.find({userId:userId}).populate('userId', 'firstname lastname');
        if (!userprofile) {
            return res.status(404).json({ message: "User profile not found" });
        }
        res.status(200).json({
            message: "User profile fetched successfully",
            data: userprofile
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }


}


module.exports ={
    createuserprofile,
    getuserprofile,
    deleteuserprofile,
    updateuserprofile,
    adduserprofilewithFile,
    getuserprofilebyid
}