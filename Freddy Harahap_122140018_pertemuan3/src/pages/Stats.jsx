import { useBookStats } from "../hooks/useBookStats";

const Stats = () => {
  const stats = useBookStats(); // Ambil data statistik buku

  const statCards = [
    { title: "Total Buku", value: stats.total, color: "is-primary" },
    { title: "Sudah Dimiliki", value: stats.owned, color: "is-info" },
    { title: "Ingin Dibeli", value: stats.wishlist, color: "is-warning" },
    { title: "Sedang Dibaca", value: stats.reading, color: "is-link" },
    {
      title: "Rating Rata-rata",
      value: stats.avgRating.toFixed(1),
      color: "is-success",
      subtitle: `(berdasarkan ${stats.reading} buku)`,
    },
  ];

  return (
    <div className="box">
      <h2 className="title is-3 has-text-centered">Statistik Buku</h2>
      <div className="columns is-multiline is-centered">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="column is-one-third-desktop is-half-tablet"
          >
            <div className={`notification ${card.color}`}>
              <p className="title">{card.value}</p>
              <p className="subtitle">
                {card.title}
                {card.subtitle && (
                  <span className="is-size-7">
                    <br />
                    {card.subtitle}
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
