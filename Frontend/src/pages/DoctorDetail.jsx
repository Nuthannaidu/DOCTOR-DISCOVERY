import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDoctorById } from "../store/doctorSlice";

const DoctorDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedDoctor} = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctorById(id));
  },[id]);
  if (!selectedDoctor) return null;
  let imageUrl = "";
  let cleanName="";
  if (selectedDoctor.profile_pic && selectedDoctor.profile_pic.startsWith("http")) {
    imageUrl = selectedDoctor.profile_pic;
  } else {
    if(selectedDoctor.name){
      cleanName=selectedDoctor.name;
      if(cleanName.startsWith("Dr ")){
        cleanName=cleanName.replace("Dr ","");
      }
      if(cleanName.startsWith("Dr.")){
        cleanName=cleanName.replace("Dr.","");
      }
    }else {
      cleanName="Doctor";
    }
      imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=2563EB&color=fff&size=500&font-size=0.4`;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white border border-gray-200 rounded-xl">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={imageUrl}
          alt={selectedDoctor.name}
          className="w-full md:w-64 h-64 object-cover rounded-lg bg-gray-50"
        />

        <div>
            <h2 className="text-3xl font-bold text-gray-800">{selectedDoctor.name}</h2>
            {selectedDoctor.isTop10 && (
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1">
                Top 10 Most Searched
              </span>
            )}
          <p className="text-xl text-blue-600 mb-4">{selectedDoctor.speciality}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-gray-600">
            <p><strong>Experience:</strong> {selectedDoctor.years_of_experience} years</p>
            <p><strong>Fee:</strong> ₹{selectedDoctor.consultation_fee}</p>
            <p><strong>City:</strong> {selectedDoctor.city}</p>
            <p><strong>Degree:</strong> {selectedDoctor.degree_name}</p>
            <p><strong>Institute:</strong> {selectedDoctor.institute_name}</p>
            <p><strong>Gender:</strong> {selectedDoctor.gender}</p>
            <p><strong>Email:</strong> {selectedDoctor.email}</p>
            <p><strong>Phone:</strong> {selectedDoctor.phone}</p>
          </div>
          <div className="mt-6 pt-6 border-gray-100  text-gray-400">
            Search Count: {selectedDoctor.search_count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;