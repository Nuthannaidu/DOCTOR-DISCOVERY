import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchDoctors, clearDoctors } from "../store/doctorSlice";
import DoctorCard from "../components/DoctorCard";

const DoctorListing = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { doctorList, loading } = useSelector((state) => state.doctors);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(queryParams.entries());

  useEffect(() => {
    dispatch(clearDoctors());
    setPage(1);
    setHasMore(true);
  }, [location.search, dispatch]);

  useEffect(() => {
    const loadData = async () => {
      const result = await dispatch(fetchDoctors({ ...params, page }));
      if (!result.payload || result.payload.length < 12) {
        setHasMore(false);
      }
    };
    loadData();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        hasMore && !loading &&
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {params.speciality ? `${params.speciality}s` : "All Doctors"}
      </h2>

      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        {doctorList.map((doctor, index) => (
          <DoctorCard key={`${doctor.id}-${index}`} doctor={doctor} />
        ))}
      </div>

      <div className="mt-10 text-center py-4">
        {loading && <p className="text-blue-600 animate-pulse font-medium">Loading doctors...</p>}
        {!hasMore && doctorList.length > 0 && (
          <p className="text-gray-400 italic">No more doctors found.</p>
        )}
        {!loading && doctorList.length === 0 && (
          <div className="bg-gray-50 p-10 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No doctors match your current filters.</p>
            <button 
              onClick={() => window.location.href='/doctors'}
              className="mt-4 text-blue-600 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorListing;