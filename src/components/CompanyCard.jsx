import "./CompanyCard.css";
const statusEmoji = {
  Applied: "🟢",
  Interview: "🟡",
  OA: "🔵",
  Offer: "🟣",
  Rejected: "🔴",
};
function CompanyCard({ company, status, deadline, onDelete, onEdit }) {
  return (
    <div className="card">
      <h2>{company}</h2>
      <p>Status: {statusEmoji[status]} {status}</p>
      <p>📅 Deadline: {deadline}</p>
      <div className="buttons">
        <button className="view-btn">👁️ View</button>
        <button onClick={onDelete} className="delete-btn">🗑️ Delete</button>
        <button onClick={onEdit} className="edir-btn">✏️ Edit</button>
      </div>
    </div>
  );
}

export default CompanyCard;