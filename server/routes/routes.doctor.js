const express=require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const doctorController=require("../controllers/doctorController");

router.get("/",doctorController.getAlldoctors);
router.get("/top",doctorController.getTopdoctors);
router.get("/:id",doctorController.getdoctorbyId);
router.post("/",upload.single("profile_pic"),doctorController.registerDoctor);


module.exports=router;