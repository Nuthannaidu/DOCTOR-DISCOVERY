import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  let imageUrl = "";
  let cleanName="";
  if (doctor.profile_pic && doctor.profile_pic.startsWith("http")) {
    imageUrl = doctor.profile_pic;
  } 
  else {
    if(doctor.name){
      cleanName=doctor.name;
      if(cleanName.startsWith("Dr ")){
        cleanName=cleanName.replace("Dr ","");
      }
      if(cleanName.startsWith("Dr.")){
        cleanName=cleanName.replace("Dr.","");
      }
    }else {
      cleanName="Doctor";
    }
    imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=2563EB&color=fff&size=250&font-size=0.4`;
  }

  return (
    <div
      onClick={() => navigate(`/doctors/${doctor.id}`)}
      className="bg-white border border-gray-200 rounded-lg cursor-pointer overflow-hidden w-64"
    >
      <img
        src={imageUrl}
        alt={doctor.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg truncate">{doctor.name}</h3>
        <p className="text-sm text-blue-600 font-medium">{doctor.speciality}</p>
        <p className="text-sm text-gray-500">{doctor.city}</p>
        <p className="text-md font-bold text-gray-900 mt-2">₹{doctor.consultation_fee}</p>
      </div>
    </div>
  );
};

export default DoctorCard;