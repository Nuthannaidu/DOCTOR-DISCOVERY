CREATE DATABASE IF NOT EXISTS doctor_app;
USE doctor_app;
CREATE TABLE doctors(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    age INT NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
     city ENUM(
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Chandigarh'
 ) NOT NULL,
    profile_pic VARCHAR(200) DEFAULT NULL
    
    institute_name VARCHAR(150) NOT NULL,
    degree_name VARCHAR(150) NOT NULL,


  speciality ENUM(
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic',
  'Gynecologist',
  'Neurologist',
  'Psychiatrist',
  'ENT Specialist',
  'Ophthalmologist'
  ) NOT NULL,

    years_of_experience INT NOT NULL,
    consultation_fee DECIMAL(10,2) NOT NULL,
    
    search_count INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);