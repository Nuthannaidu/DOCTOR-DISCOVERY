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
      alert("Please fill in all required fields before proceeding.");
      return; 
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    const { institute_name, degree_name, speciality, years_of_experience, consultation_fee } = formData;
    
    if (!institute_name || !degree_name || !speciality || !years_of_experience || !consultation_fee) {
      alert("Please fill in all professional details before submitting.");
      return;
    }
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
      console.error(error);
      alert("Error registering doctor");
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none";

  return (
    <div className="max-w-lg mx-auto my-12 p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Doctor Registration</h2>

      <div className="flex mb-6 justify-center gap-2">
        <div className={`h-2 w-16 rounded transition-colors ${step === 1 ? 'bg-blue-600' : 'bg-green-500'}`}></div>
        <div className={`h-2 w-16 rounded transition-colors ${step === 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
      </div>

      {step === 1 ? (
        <div className="animate-fadeIn">
          <input name="name" placeholder="Full Name *" className={inputClass} onChange={handleChange} value={formData.name} required/>
          
          <select name="gender" className={inputClass} onChange={handleChange} value={formData.gender}>
            <option value="">Select Gender *</option>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>

          <input name="age" type="number" placeholder="Age *" className={inputClass} onChange={handleChange} value={formData.age} required/>
          <input name="email" type="email" placeholder="Email *" className={inputClass} onChange={handleChange} value={formData.email} required/>
          <input name="phone" type="tel" placeholder="Phone *" className={inputClass} onChange={handleChange} value={formData.phone} required/>
          
          <select name="city" className={inputClass} onChange={handleChange} value={formData.city}>
            <option value="">Select City *</option>
            {cities.map((city, i) => <option key={i} value={city}>{city}</option>)}
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture (Optional)</label>
          <input
            type="file"
            name="profile_pic"
            className={inputClass}
            onChange={(e) => setFormData({ ...formData, profile_pic: e.target.files[0] })}
          />

          <button onClick={handleNext} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold transition-colors">
            Next: Professional Details
          </button>
        </div>
      ) : (
        <div className="animate-fadeIn">
          <input name="institute_name" placeholder="Institute *" className={inputClass} onChange={handleChange} value={formData.institute_name} required/>
          <input name="degree_name" placeholder="Degree *" className={inputClass} onChange={handleChange} value={formData.degree_name} required/>
          
          <select name="speciality" className={inputClass} onChange={handleChange} value={formData.speciality}>
            <option value="">Select Speciality *</option>
            {specialities.map((spec, i) => <option key={i} value={spec}>{spec}</option>)}
          </select>

          <input name="years_of_experience" type="number" placeholder="Years of Experience *" className={inputClass} onChange={handleChange} value={formData.years_of_experience} />
          <input name="consultation_fee" type="number" placeholder="Consultation Fee (₹) *" className={inputClass} onChange={handleChange} value={formData.consultation_fee} />
          
          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="w-1/2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 text-gray-600 transition-colors">
              Back
            </button>
            <button onClick={handleSubmit} className="w-1/2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 font-semibold transition-colors">
              Submit Registration
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorRegistration;