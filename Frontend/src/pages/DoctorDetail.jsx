import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDoctorById } from "../store/doctorSlice";

const DoctorDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedDoctor, loading, error } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchDoctorById(id));
  }, [id, dispatch]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;
  if (!selectedDoctor) return null;

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={selectedDoctor.profile_pic}
          alt={selectedDoctor.name}
          className="w-full md:w-64 h-64 object-cover rounded-lg shadow-inner"
        />

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-gray-800">
              {selectedDoctor.name}
            </h2>

            {selectedDoctor.isTop10 && (
              <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                🔥 Top 10 Most Searched
              </span>
            )}
          </div>

          <p className="text-xl text-blue-600 mb-4">
            {selectedDoctor.speciality}
          </p>

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

          <div className="mt-6 pt-6 border-t border-gray-100 text-sm text-gray-400">
            Search Count: {selectedDoctor.search_count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
