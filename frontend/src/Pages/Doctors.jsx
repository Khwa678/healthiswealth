import { useEffect, useState } from "react";
import "../App.css";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchDoctors(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        fetchDoctors(28.6139, 77.2090); // fallback Delhi
      }
    );
  };

  // ✅ REAL DATA using Foursquare API
  const fetchDoctors = async (lat, lng) => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.foursquare.com/v3/places/search?ll=${lat},${lng}&query=doctor&limit=8`,
        {
          headers: {
            Authorization: import.meta.env.VITE_FSQ_API_KEY,
          },
        }
      );

      const data = await res.json();

      const formatted = (data.results || []).map((place) => ({
        name: place.name,
        city:
          place.location?.locality ||
          place.location?.region ||
          "Nearby Area",
        speciality: "Healthcare Provider",
        rating: place.rating || null,
      }));

      setDoctors(formatted);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Top Doctors Near You</h2>

      {loading && <p>Loading doctors...</p>}

      {!loading && doctors.length === 0 && (
        <p>No doctors found in your area.</p>
      )}

      <div className="stats doctor-list">
        {doctors.map((doc, index) => (
          <div key={index} className="doctor-item">
            
            <h3>{doc.name}</h3>

            <p>🩺 {doc.speciality}</p>
            <p>📍 {doc.city}</p>

            <p style={{ color: "var(--brand-blue)", fontWeight: "600" }}>
              ⭐ {doc.rating ? `${doc.rating} / 10` : "Rating not available"}
            </p>

            {/* Divider */}
            {index !== doctors.length - 1 && (
              <div className="doctor-divider" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}