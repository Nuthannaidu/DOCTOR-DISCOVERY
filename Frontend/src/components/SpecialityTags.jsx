import { useNavigate } from "react-router-dom";

const SpecialityTags = () => {
  const navigate = useNavigate();

  const specialities = ["General Physician", "Cardiologist", "Dermatologist", "Pediatrician", "Orthopedic", "Gynecologist", "Neurologist", "Psychiatrist", "ENT Specialist", "Ophthalmologist"];

  return (
    <div className="flex flex-wrap gap-3">
      {specialities.map((spec, index) => (
        <button
          key={index}
          onClick={() => navigate(`/doctors?speciality=${encodeURIComponent(spec)}`)}
          className="px-4 py-2 rounded-full border border-blue-100 bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
        >
          {spec}
        </button>
      ))}
    </div>
  );
};

export default SpecialityTags;