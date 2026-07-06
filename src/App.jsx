
import CompanyCard from "./components/CompanyCard";
import "./App.css";
import { useState } from "react";

function App() {
  const [companies, setCompanies] = useState([
    {
      company: "Amazon",
      status: "Applied",
      deadline: "10 July",
    },
    {
      company: "Google",
      status: "Interview",
      deadline: "15 July",
    },
    {
      company: "Microsoft",
      status: "OA",
      deadline: "20 July",
    },
  ]);
  const [companyName, setCompanyName] = useState("");
  const [companyStatus, setCompanyStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  return (
    <div className="app">
      <h1>Placement Tracker</h1>
      <div className="form-container">
      <input
        type="text"
        placeholder="🔎 Search Company "
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
              setCompanies([
                ...companies,
                {
                  company: companyName,
                  status: companyStatus,
                  deadline: deadline,
                },
              ]);

              setCompanyName("");
              setCompanyStatus("");
              setDeadline("");
            }

            else {
              setCompanies(
                companies.map((company, index) => {
                  if (index === editingIndex) {
                    return {
                      company: companyName,
                      status: companyStatus,
                      deadline: deadline
                    };
                  }
                  return company;
                })
              );
              setCompanyName("");
              setCompanyStatus("");
              setDeadline("");
              setEditingIndex(null);
            }
          }
        }}
      >
        {editingIndex === null ? "Add Company" : "Save Changes"}
      </button>
      <input
        type="text"
        placeholder="Search Company Name"
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
                setCompanies(
                  companies.filter(
                    (company) => company.company !== item.company
                  )
                );
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