const db=require("../config/db");

exports.getAlldoctors = async (req, res) => {
  try {
    const { search, city, speciality, page = 1 } = req.query;

    const limit = 12;
    const offset = (page - 1) * limit;
    let query = "SELECT * FROM doctors WHERE 1=1";
    let values = [];
    if (search) {
      query += " AND name LIKE ?";
      values.push(`%${search}%`);
    }
    if (city) {
      query += " AND city = ?";
      values.push(city);
    }
    if (speciality) {
      query += " AND speciality = ?";
      values.push(speciality);
    }
    query += " LIMIT ? OFFSET ?";
    values.push(limit, offset);
    const [rows] = await db.query(query, values);
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getdoctorbyId=async(req,res)=>{
   
    try{
         const {id}=req.params;
        await db.query(
            "update doctors SET search_count=search_count+1 WHERE id=?",[id]
        );
        const [rows]=await db.query("select * from doctors where id=?",[id]);
        res.json(rows[0]);
    }catch(error){
       console.log(error);
    }
};

exports.getTopdoctors=async (req,res)=>{
    try{
        const [rows]=await db.query("select * from doctors order by search_count desc limit 4");
        res.json(rows);
    }
    catch(error){
        console.log(error);
    }
}

exports.registerDoctor = async (req, res) => {
  try {
    const {
      name,
      gender,
      age,
      email,
      phone,
      city,
      institute_name,
      degree_name,
      speciality,
      years_of_experience,
      consultation_fee
    } = req.body;

    const profilePicUrl = req.file ? req.file.path : null;

    const query = `
      INSERT INTO doctors
      (name, gender, age, email, phone, city, profile_pic,
       institute_name, degree_name, speciality,
       years_of_experience, consultation_fee)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name,
      gender,
      age,
      email,
      phone,
      city,
      profilePicUrl,
      institute_name,
      degree_name,
      speciality,
      years_of_experience,
      consultation_fee
    ];

    const [result] = await db.query(query, values);

    res.json({
      message: "registered successfully",
      doctorId: result.insertId
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
