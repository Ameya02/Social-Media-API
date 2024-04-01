const express = require('express');
const { updatePassword, updateProfile, deleteProfile, getProfile, getOtherProfile } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authmiddleware');
const router = express.Router();
// Routes for managing user

// update password
router.put("/update-password/", protect, updatePassword);
// update profile
router.put("/update-profile/", protect, updateProfile);
// delete profile
router.delete("/delete-profile/", protect, deleteProfile);
// get profile
router.get("/:id", protect, getProfile);
// get other profile
router.get("/", protect, getOtherProfile);

module.exports = router;