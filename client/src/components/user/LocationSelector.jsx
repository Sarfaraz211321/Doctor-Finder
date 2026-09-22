import { useEffect, useState } from "react";

import { getLocations } from "../../services/locationService.js";

const LocationSelector = ({ value, onChange }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const response = await getLocations();
        setLocations(response.locations || []);
      } catch (error) {
        console.error("Failed to load locations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, []);

  // Remove duplicate cities
  const uniqueCities = [
    ...new Map(
      locations.map((location) => [
        location.city.toLowerCase(),
        location,
      ])
    ).values(),
  ];

  return (
    <div>
      <label className="form-label fw-semibold">
        <i className="bi bi-geo-alt me-2 text-mint"></i>
        Location
      </label>

      <input
        type="text"
        className="form-control"
        placeholder={
          loading
            ? "Loading locations..."
            : "Search or enter city"
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
        list="location-options"
        disabled={loading}
      />

      <datalist id="location-options">
        {uniqueCities.map((location) => (
          <option
            key={location._id}
            value={location.city}
          />
        ))}
      </datalist>

      
    </div>
  );
};

export default LocationSelector;