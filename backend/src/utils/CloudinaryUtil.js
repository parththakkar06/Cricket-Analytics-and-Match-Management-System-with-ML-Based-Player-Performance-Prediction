const   cloundinary = require('cloudinary').v2;




const uploadFileToCloudinary = async (file) => {

    //conif
    cloundinary.config({
        api_key : "228139221227862",
        cloud_name : "dbqv6jqyh",
        api_secret : "UBvXttGJCvKqKma31X726ZPr3dI"
    })
    
    // const cloundinaryResponse = await cloundinary.uploader.upload(file.path);
    const cloundinaryResponse = await cloundinary.uploader.upload(file.path)
    return cloundinaryResponse;



};
module.exports = {
    uploadFileToCloudinary
}