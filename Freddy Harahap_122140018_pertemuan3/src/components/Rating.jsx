import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

const Rating = ({ rating, onRate, editable = false }) => {
  // Handle klik bintang (kalau boleh di-edit)
  const handleClick = (star) => {
    if (editable && onRate) {
      onRate(star);
    }
  };

  return (
    <div className="rating-stars" style={{ display: "inline-flex" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          // Warna emas kalau aktif, abu-abu kalau belum
          color={star <= rating ? "#FFD700" : "#ddd"}
          onClick={() => handleClick(star)}
          onMouseEnter={() => editable && handleClick(star)} // Hover bisa trigger juga kalau editable
          style={{
            cursor: editable ? "pointer" : "default", // Jadi pointer kalau bisa diklik
            marginRight: 5,
            fontSize: "1.5em",
            transition: "color 0.2s", // Animasi halus saat berubah warna
          }}
          role="button"
          aria-label={`Rate ${star} star`}
          tabIndex={editable ? 0 : -1} // Fokus keyboard hanya saat bisa edit
        />
      ))}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired, // Nilai rating saat ini
  onRate: PropTypes.func, // Fungsi callback saat user kasih rating
  editable: PropTypes.bool, // Apakah rating bisa diklik?
};

export default Rating;
