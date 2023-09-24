async function UploadProfilePic(req, res){
    if(!req.file){
        return error;
    }
    
    
}

module.exports = {
    profile: UploadProfilePic
}