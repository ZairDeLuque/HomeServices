const multer = require('multer');

const storageConfigProfilePic = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'bin/disks/profileImgs/')
    },
    filename: (req, file, cb) => {
        cb(null, 'subject-' + file.originalname)
    }
});

const storageConfigProfileData = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'bin/disks/profileData/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const data = multer({ storage: storageConfigProfileData });
const imgs = multer({ storage: storageConfigProfilePic });

module.exports = {
    data: data,
    imgs: imgs
};
