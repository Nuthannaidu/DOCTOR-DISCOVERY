import { useEffect, useState } from "react";
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
    let scrollTimeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (
          hasMore &&
          !loading &&
          window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100
        ) {
          setPage((prev) => prev + 1);
        }
      }, 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [hasMore, loading]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl mb-6">
        {params.speciality ? `${params.speciality}` : "All Doctors"}
      </h2>
      <div className="flex flex-wrap gap-6">
        {doctorList.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
      <div className="mt-8 text-center">
        {loading && <p>Loading doctors..</p>}
        {!hasMore && doctorList.length > 0 && (
          <p>No more doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorListing;
