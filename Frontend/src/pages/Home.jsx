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
  const {topDoctors,loading,error }=useSelector((state)=>state.doctors);

  useEffect(() => {
    dispatch(fetchTopDoctors());
  },[dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      
      <section className="bg-blue-50 p-8 rounded-2xl text-center shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your Doctor</h2>
        <SearchFilter />
      </section>

      <section className="text-center md:text-left">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Consult top doctors online for any health concern</h2>
          <p className="text-gray-500 mt-1">Private online consultations with verified doctors in all specialists</p>
        </div>
        <SpecialityTags />
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <div className="mb-2 text-left">
            <h2 className="text-2xl font-bold text-gray-800">Book an appointment for an in-clinic consultation</h2>
            <p className="text-gray-500 mt-1">Here are the topmost searched doctors</p>
          </div>
          <button 
            onClick={() => navigate("/doctors")}
            className="hidden md:block text-cyan-600 border border-cyan-600 px-4 py-2 rounded-md hover:bg-cyan-50 font-medium transition-colors"
          >
            View All
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {topDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center border border-blue-100">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">Want to be part of this?</h2>
          <p className="text-gray-600 mt-1">Join our network</p>
        </div>
        <button 
          onClick={()=>navigate("/register")}
          className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-medium transition-colors shadow-sm"
        >
          Register Here
        </button>
      </section>

    </div>
  );
};

export default Home;