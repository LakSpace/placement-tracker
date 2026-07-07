
import CompanyCard from "./components/CompanyCard";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [companies, setCompanies] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [companyStatus, setCompanyStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const fetchCompanies = () => {
    fetch("http://localhost:3001/companies")
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      });
  };
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="app">
      <h1>Placement Tracker</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Enter Company Name "
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <select
          value={companyStatus}
          onChange={(e) => setCompanyStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Applied">Applied</option>
          <option value="OA">OA</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Enter Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button className="add-btn"
          onClick={() => {
            if (companyName !== "" && companyStatus !== "" && deadline !== "") {
              if (editingIndex === null) {
                fetch("http://localhost:3001/companies", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    company: companyName,
                    status: companyStatus,
                    deadline: deadline,
                  }),
                })
                  .then((response) => response.text())
                  .then((data) => {
                    console.log(data);
                    fetchCompanies();
                  });


                setCompanyName("");
                setCompanyStatus("");
                setDeadline("");
              }

              else {
                fetch(`http://localhost:3001/companies/${companies[editingIndex].id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    company: companyName,
                    status: companyStatus,
                    deadline: deadline,
                  }),
                })
                  .then((response) => response.text())
                  .then((data) => {
                    console.log(data);

                    fetchCompanies();

                    setCompanyName("");
                    setCompanyStatus("");
                    setDeadline("");
                    setEditingIndex(null);
                  });
              }
            }
          }}
        >
          {editingIndex === null ? "Add Company" : "Save Changes"}
        </button>
        <input
          type="text"
          placeholder=" 🔎 Search Company Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="container">
        {companies
          .filter((item) =>
            item.company.toLowerCase().includes(search.toLowerCase())
          )
          .map((item, index) => (
            <CompanyCard
              key={index}
              company={item.company}
              status={item.status}
              deadline={item.deadline}
              onDelete={() => {
                fetch(`http://localhost:3001/companies/${item.id}`, {
                  method: "DELETE",
                })
                  .then((response) => response.text())
                  .then((data) => {
                    console.log(data);
                    fetchCompanies();
                  });
              }}
              onEdit={() => {
                setEditingIndex(index);

                setCompanyName(item.company);

                setCompanyStatus(item.status);

                setDeadline(item.deadline);
              }}
            />
          ))}
      </div>
    </div>
  );
}

export default App;