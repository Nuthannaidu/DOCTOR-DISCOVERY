import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopDoctors } from "../store/doctorSlice";
import DoctorCard from "../components/DoctorCard";
import SpecialityTags from "../components/SpecialityTags";
import SearchFilter from "../components/SearchFilter";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { topDoctors, loading, error } = useSelector((state) => state.doctors);

  useEffect(() => {
    dispatch(fetchTopDoctors());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <section className="bg-blue-50 p-8 rounded-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your Doctor</h2>
        <SearchFilter />
      </section>
     <section>
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Want to be part of this...</h2>
          <button 
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline font-medium"
          >
           Register here..
          </button>
        </div>
     </section>
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Most Searched Doctors</h2>
          <button 
            onClick={() => navigate("/doctors")}
            className="text-blue-600 hover:underline font-medium"
          >
            Explore All
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        
        <div className="flex flex-wrap gap-6">
          {topDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Speciality</h2>
        <SpecialityTags />
      </section>
    </div>
  );
};

export default Home;