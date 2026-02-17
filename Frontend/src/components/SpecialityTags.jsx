import { useNavigate } from "react-router-dom";

const SpecialityTags = () => {
  const navigate = useNavigate();

  const specialityData = [
    "Gynecologist",
    "Dermatologist",
    "General Physician",
    "Pediatrician",
    "Psychiatrist",
    "Cardiologist",
    "Orthopedic",
    "Neurologist",
    "ENT Specialist",
    "Ophthalmologist"
  ];

  return (
     <div className="mb-8">
          <h2 className="text-2xl font-bold py-5">Consult top doctors online for any health concern</h2>
     <div className="flex justify-between">
      {specialityData.map((spec, index) => (
        <button key={index}
          onClick={() =>
            navigate(`/doctors?speciality=${encodeURIComponent(spec)}`)
          }
          className="cursor-pointer hover:text-blue-500 border border-blue-100 p-2 mx-2 rounded"
        >
          {spec}
        </button>
      ))}
     </div>
    </div>
  );
};

export default SpecialityTags;
