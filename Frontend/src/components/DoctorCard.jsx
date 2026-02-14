import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  const imageUrl = doctor.profile_pic?.startsWith("http")
    ? doctor.profile_pic
    : `http://localhost:5000/${doctor.profile_pic}`;

  return (
    <div
      onClick={() => navigate(`/doctors/${doctor.id}`)}
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden w-64"
    >
      <img
        src={imageUrl}
        alt={doctor.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{doctor.name}</h3>
        <p className="text-sm text-blue-600 font-medium">{doctor.speciality}</p>
        <p className="text-sm text-gray-500">{doctor.city}</p>
        <p className="text-md font-bold text-gray-900 mt-2">₹{doctor.consultation_fee}</p>
      </div>
    </div>
  );
};

export default DoctorCard;