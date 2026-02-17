import { useState } from "react";
import { createDoctor } from "../services/api";

const DoctorRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", gender: "", age: "", email: "", phone: "",
    city: "", profile_pic: null, institute_name: "",
    degree_name: "", speciality: "", years_of_experience: "", consultation_fee: "",
  });

  const cities = ["Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Pune","Kolkata","Ahmedabad","Jaipur","Chandigarh"];
  const specialities = ["General Physician","Cardiologist","Dermatologist","Pediatrician","Orthopedic","Gynecologist","Neurologist","Psychiatrist","ENT Specialist","Ophthalmologist"];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => {
    const { name, gender, age, email, phone, city } = formData;
    if (!name || !gender || !age || !email || !phone || !city) {
      alert("Please fill all fields");
      return;
    }
    setStep(2);
  };
  const handleSubmit = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
      });
      await createDoctor(data);
      alert("Doctor registered successfully");
    } catch (error) {
      alert("Error registering doctor");
    }
  };

  const inputClass = "w-full border p-2 mb-3 rounded-md focus:border-blue-500";
  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white border rounded-lg">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-700">Doctor Registration</h2>

      {step === 1 ? (
        <div>
          <input name="name" placeholder="Full Name" className={inputClass} onChange={handleChange} value={formData.name} />
          
          <select name="gender" className={inputClass} onChange={handleChange} value={formData.gender}>
            <option value="">Select Gender</option>
            <option>Male</option><option>Female</option>
          </select>

          <input name="age" type="number" placeholder="Age" className={inputClass} onChange={handleChange} value={formData.age} />
          <input name="email" type="email" placeholder="Email" className={inputClass} onChange={handleChange} value={formData.email} />
          <input name="phone" placeholder="Phone" className={inputClass} onChange={handleChange} value={formData.phone} />
          
          <select name="city" className={inputClass} onChange={handleChange} value={formData.city}>
            <option value="">Select City</option>
            {cities.map((city) => <option key={city}>{city}</option>)}
          </select>

          <label className="text-xs text-gray-500">Profile Picture</label>
          <input type="file" className={inputClass} onChange={(e) => setFormData({ ...formData, profile_pic: e.target.files[0] })} />

          <button onClick={handleNext} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Next
          </button>
        </div>
      ) : (
        <div>
          <input name="institute_name" placeholder="Institute Name" className={inputClass} onChange={handleChange} value={formData.institute_name} />
          <input name="degree_name" placeholder="Degree" className={inputClass} onChange={handleChange} value={formData.degree_name} />
          
          <select name="speciality" className={inputClass} onChange={handleChange} value={formData.speciality}>
            <option value="">Select Speciality</option>
            {specialities.map((spec) => <option key={spec}>{spec}</option>)}
          </select>

          <input name="years_of_experience" type="number" placeholder="Experience (Years)" className={inputClass} onChange={handleChange} value={formData.years_of_experience} />
          <input name="consultation_fee" type="number" placeholder="Fees (₹)" className={inputClass} onChange={handleChange} value={formData.consultation_fee} />
          
          <div className="flex gap-2">
            <button onClick={() => setStep(1)} className="w-1/2 border py-2 rounded">Back</button>
            <button onClick={handleSubmit} className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorRegistration;