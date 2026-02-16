import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchFilter = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [speciality, setSpeciality] = useState("");

  const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Chandigarh"];
  const specialities = ["General Physician", "Cardiologist", "Dermatologist", "Pediatrician", "Orthopedic", "Gynecologist", "Neurologist", "Psychiatrist", "ENT Specialist", "Ophthalmologist"];

  const handleSubmit = (e) => {
    e.preventDefault();
    let query = [];
    if (search) query.push(`search=${encodeURIComponent(search)}`);
    if (city) query.push(`city=${encodeURIComponent(city)}`);
    if (speciality) query.push(`speciality=${encodeURIComponent(speciality)}`);
    navigate(`/doctors?${query.join("&")}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 justify-center items-center">
      <input
        type="text"
        placeholder="Doctor name..."
        className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={city} onChange={(e) => setCity(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">All Cities</option>
        {cities.map((c, i) => <option key={i} value={c}>{c}</option>)}
</select>

      <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">All Specialities</option>
        {specialities.map((s, i) => <option key={i} value={s}>{s}</option>)}
      </select>

<button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
        Search
      </button>
    </form>
  );
};

export default SearchFilter;