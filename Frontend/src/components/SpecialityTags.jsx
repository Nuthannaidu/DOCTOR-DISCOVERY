import { useNavigate } from "react-router-dom";

const SpecialityTags = () => {
  const navigate = useNavigate();
  const specialityData = [
    { name: "Gynecologist", icon: "🤰", desc: "Period doubts or Pregnancy" },
    { name: "Dermatologist", icon: "🧴", desc: "Acne, pimple or skin issues" },
    { name: "General Physician", icon: "🩺", desc: "Cold, cough or fever" },
    { name: "Pediatrician", icon: "👶", desc: "Child not feeling well" },
    { name: "Psychiatrist", icon: "🧠", desc: "Depression or anxiety" },
    { name: "Cardiologist", icon: "❤️", desc: "Heart & blood pressure" },
    { name: "Orthopedic", icon: "🦴", desc: "Bone & joint issues" },
    { name: "Neurologist", icon: "⚡", desc: "Brain & nerve issues" },
    { name: "ENT Specialist", icon: "👂", desc: "Ear, nose & throat" },
    { name: "Ophthalmologist", icon: "👁️", desc: "Eye care & vision" }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-10 py-6">
      {specialityData.map((spec, index) => (
        <div
          key={index}
          onClick={() => navigate(`/doctors?speciality=${encodeURIComponent(spec.name)}`)}
          className="flex flex-col items-center cursor-pointer group w-36"
        >
          <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-4xl mb-4 group-hover:shadow-md group-hover:bg-blue-100 transition-all duration-300">
            {spec.icon}
          </div>
          <p className="text-sm font-semibold text-gray-800 text-center leading-snug mb-2 h-10">
            {spec.desc}
          </p>
          <span className="text-xs font-bold text-cyan-500 uppercase tracking-wide group-hover:text-cyan-600 transition-colors">
            Consult Now
          </span>
        </div>
      ))}
    </div>
  );
};

export default SpecialityTags;