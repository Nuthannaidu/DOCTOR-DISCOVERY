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
      
      <section className="p-8 rounded-2xl text-center">
        <h2 className="text-3xl font-bold mb-4">Find Your Doctor</h2>
        <SearchFilter />
      </section>

      <section className="text-center md:text-left">
        <SpecialityTags />
      </section>

 <section>
  <div className="flex justify-between mb-6">
    <div>
      <h2 className="text-2xl font-bold">
        Book an appointment for an in-clinic consultation
      </h2>
      <p>Here are the topmost searched doctors</p>
    </div>
    <button onClick={() => navigate("/doctors")}>View All</button>
  </div>
  {loading && <p>Loading...</p>}
  {error && <p>Error: {error}</p>}
  <div className="flex flex-wrap gap-6">
    {topDoctors.map((doctor) => (
      <DoctorCard key={doctor.id} doctor={doctor}/>
    ))}
  </div>
</section>

      <section className="p-8 rounded-2xl flex justify-between border border-blue-100">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-800">Want to be part of this?</h2>
          <p className="text-gray-600 mt-1">Join our network</p>
        </div>
        <button
          onClick={()=>navigate("/register")}
          className="bg-blue-600 text-white px-8 py-3 rounded-md cursor-pointer font-medium"
        >
          Register Here
        </button>
      </section>

    </div>
  );
};

export default Home;