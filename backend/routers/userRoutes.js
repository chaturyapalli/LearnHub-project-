const express = require("express");
const multer = require("multer");
const path = require("path");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  postCourseController,
  getAllCoursesUserController,
  deleteCourseController,
  getAllCoursesController,
  enrolledCourseController,
  sendCourseContentController,
  completeSectionController,
  sendAllCoursesUserController,
} = require("../controllers/userControllers");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    const allowedExtensions = [".mp4", ".jpg", ".jpeg", ".png", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
      return callback(new Error("Only .mp4, .jpg, .jpeg, .png, and .webp files are allowed"));
    }

    callback(null, true);
  }
});



router.post("/register", registerController);

router.post("/login", loginController);

router.post(
  "/addcourse",
  authMiddleware,
  upload.fields([{ name: "S_content" }]), // ✅ Correct version
  postCourseController
);


router.get("/getallcourses", getAllCoursesController);

router.get(
  "/getallcoursesteacher",
  authMiddleware,
  getAllCoursesUserController
);

router.delete(
  "/deletecourse/:courseid",
  authMiddleware,
  deleteCourseController
);

router.post(
  "/enrolledcourse/:courseid",
  authMiddleware,
  enrolledCourseController
);

router.get(
  "/coursecontent/:courseid",
  authMiddleware,
  sendCourseContentController
);

router.post("/completemodule", authMiddleware, completeSectionController);

router.get("/getallcoursesuser", authMiddleware, sendAllCoursesUserController);

module.exports = router;