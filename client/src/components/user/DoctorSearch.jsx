// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { searchDoctors } from "../../services/doctorService.js";
// import { getSpecializations } from "../../services/specializationService.js";
// import LocationSelector from "./LocationSelector.jsx";

// const DoctorSearch = () => {
//   const navigate = useNavigate();

//   const [specializations, setSpecializations] = useState([]);
//   const [specialization, setSpecialization] = useState("");
//   const [city, setCity] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [loadingOptions, setLoadingOptions] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadSpecializations = async () => {
//       try {
//         const response = await getSpecializations();

//         setSpecializations(
//           response.specializations || []
//         );
//       } catch (error) {
//         console.error(
//           "Failed to load specializations:",
//           error
//         );

//         setError("Unable to load search options.");
//       } finally {
//         setLoadingOptions(false);
//       }
//     };

//     loadSpecializations();
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();

//     if (!specialization && !city) {
//       setError(
//         "Please select a specialization or location."
//       );
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const response = await searchDoctors(
//         specialization,
//         city
//       );

//       navigate("/doctors", {
//         state: {
//           doctors: response.doctors || [],
//           specialization,
//           city,
//         },
//       });
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "Failed to search doctors."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClear = () => {
//     setSpecialization("");
//     setCity("");
//     setError("");
//   };

//   return (
//     <div className="card border-0 shadow-lg p-3 p-md-4">

//       <form onSubmit={handleSearch}>

//         <div className="row g-3 align-items-end">

//           {/* Specialization */}
//           <div className="col-lg-5">
//             <label className="form-label fw-semibold">
//               <i className="bi bi-heart-pulse me-2 text-mint"></i>
//               Find a Doctor
//             </label>

//             <select
//               className="form-select"
//               value={specialization}
//               onChange={(e) =>
//                 setSpecialization(e.target.value)
//               }
//               disabled={loadingOptions}
//             >
//               <option value="">
//                 {loadingOptions
//                   ? "Loading specializations..."
//                   : "Select specialization"}
//               </option>

//               {specializations.map((item) => (
//                 <option
//                   key={item._id}
//                   value={item.name}
//                 >
//                   {item.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Location */}
//           <div className="col-lg-5">
//             <LocationSelector
//               value={city}
//               onChange={setCity}
//             />
//           </div>

//           {/* Search */}
//           <div className="col-lg-2">
//             <button
//               type="submit"
//               className="btn btn-primary w-100 py-2"
//               disabled={loading || loadingOptions}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm me-2"></span>
//                   Searching
//                 </>
//               ) : (
//                 <>
//                   <i className="bi bi-search me-2"></i>
//                   Search
//                 </>
//               )}
//             </button>
//           </div>

//         </div>

//         {/* Error */}
//         {error && (
//           <div className="text-danger small mt-3">
//             <i className="bi bi-exclamation-circle me-1"></i>
//             {error}
//           </div>
//         )}

//         {/* Clear */}
//         {(specialization || city) && !loading && (
//           <button
//             type="button"
//             className="btn btn-sm btn-link text-muted mt-2 p-0"
//             onClick={handleClear}
//           >
//             <i className="bi bi-x-circle me-1"></i>
//             Clear Search
//           </button>
//         )}

//       </form>

//     </div>
//   );
// };

// export default DoctorSearch;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { searchDoctors } from "../../services/doctorService.js";
import { getSpecializations } from "../../services/specializationService.js";
import LocationSelector from "./LocationSelector.jsx";

const DoctorSearch = () => {
const navigate = useNavigate();

const [specializations, setSpecializations] = useState([]);
const [specialization, setSpecialization] = useState("");
const [city, setCity] = useState("");

const [loading, setLoading] = useState(false);
const [loadingOptions, setLoadingOptions] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
const loadSpecializations = async () => {
try {
const response = await getSpecializations();


    setSpecializations(
      response.specializations || []
    );
  } catch (error) {
    console.error(
      "Failed to load specializations:",
      error
    );

    setError("Unable to load search options.");
  } finally {
    setLoadingOptions(false);
  }
};

loadSpecializations();

}, []);

const handleSearch = async (e) => {
e.preventDefault();

// Login check
const userToken = localStorage.getItem("userToken");

if (!userToken) {
  navigate("/login");
  return;
}

// Search validation
if (!specialization && !city) {
  setError(
    "Please select a specialization or location."
  );
  return;
}

try {
  setLoading(true);
  setError("");

  const response = await searchDoctors(
    specialization,
    city
  );

  navigate("/doctors", {
    state: {
      doctors: response.doctors || [],
      specialization,
      city,
    },
  });
} catch (error) {
  setError(
    error.response?.data?.message ||
      "Failed to search doctors."
  );
} finally {
  setLoading(false);
}


};

const handleClear = () => {
setSpecialization("");
setCity("");
setError("");
};

return ( <div className="card border-0 shadow-lg p-3 p-md-4"> <form onSubmit={handleSearch}> <div className="row g-3 align-items-end">


      {/* Specialization */}
      <div className="col-lg-5">
        <label className="form-label fw-semibold">
          <i className="bi bi-heart-pulse me-2 text-mint"></i>
          Find a Doctor
        </label>

        <select
          className="form-select"
          value={specialization}
          onChange={(e) =>
            setSpecialization(e.target.value)
          }
          disabled={loadingOptions}
        >
          <option value="">
            {loadingOptions
              ? "Loading specializations..."
              : "Select specialization"}
          </option>

          {specializations.map((item) => (
            <option
              key={item._id}
              value={item.name}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div className="col-lg-5">
        <LocationSelector
          value={city}
          onChange={setCity}
        />
      </div>

      {/* Search */}
      <div className="col-lg-2">
        <button
          type="submit"
          className="btn btn-primary w-100 py-2"
          disabled={loading || loadingOptions}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Searching
            </>
          ) : (
            <>
              <i className="bi bi-search me-2"></i>
              Search
            </>
          )}
        </button>
      </div>
    </div>

    {/* Error */}
    {error && (
      <div className="text-danger small mt-3">
        <i className="bi bi-exclamation-circle me-1"></i>
        {error}
      </div>
    )}

    {/* Clear */}
    {(specialization || city) && !loading && (
      <button
        type="button"
        className="btn btn-sm btn-link text-muted mt-2 p-0"
        onClick={handleClear}
      >
        <i className="bi bi-x-circle me-1"></i>
        Clear Search
      </button>
    )}
  </form>
</div>


);
};

export default DoctorSearch;
