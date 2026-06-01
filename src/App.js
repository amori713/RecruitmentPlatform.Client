import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [showApplications, setShowApplications] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showRegister, setShowRegister] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: ""
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://localhost:7059/api/Jobs");
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7059/api/Auth/login",
        loginData
      );

      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);

      alert("Login successful!");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  const register = async () => {
    try {
      await axios.post("https://localhost:7059/api/Auth/register", {
        fullName: registerData.fullName,
        email: registerData.email,
        password: registerData.password,
        role: "Candidate"
      });

      alert("Registration successful!");
      setShowRegister(false);
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowApplications(false);
  };

  const applyJob = async (jobId) => {
    try {
      await axios.post(
        "https://localhost:7059/api/Applications",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Application sent!");
    } catch (error) {
      console.log(error);
      alert("Could not apply");
    }
  };

  const viewApplications = async () => {
    try {
      const response = await axios.get("https://localhost:7059/api/Applications");

      setApplications(response.data);
      setShowApplications(true);
    } catch (error) {
      console.log(error);
      alert("Could not load applications");
    }
  };

  const createJob = async () => {
    try {
      await axios.post(
        "https://localhost:7059/api/Jobs",
        {
          title: newJob.title,
          description: newJob.description,
          location: newJob.location,
          salary: parseFloat(newJob.salary)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Job added!");

      setNewJob({
        title: "",
        description: "",
        location: "",
        salary: ""
      });

      fetchJobs();
    } catch (error) {
      console.log(error);
      alert("Could not add job");
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  if (!token) {
    return (
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ background: "#f4f4f4" }}
      >
        <div
          className="card shadow p-4"
          style={{
            width: "450px",
            borderRadius: "20px"
          }}
        >
          <h1 className="text-center mb-4">Recruitment Platform</h1>

          {!showRegister ? (
            <>
              <h4 className="mb-3">Login</h4>

              <input
                type="email"
                placeholder="Email"
                className="form-control mb-3"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value
                  })
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value
                  })
                }
              />

              <button className="btn btn-primary w-100" onClick={login}>
                Login
              </button>

              <button
                className="btn btn-link mt-3"
                onClick={() => setShowRegister(true)}
              >
                Create Account
              </button>
            </>
          ) : (
            <>
              <h4 className="mb-3">Register</h4>

              <input
                type="text"
                placeholder="Full Name"
                className="form-control mb-3"
                value={registerData.fullName}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    fullName: e.target.value
                  })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="form-control mb-3"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email: e.target.value
                  })
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value
                  })
                }
              />

              <button className="btn btn-success w-100" onClick={register}>
                Register
              </button>

              <button
                className="btn btn-outline-secondary w-100 mt-3"
                onClick={() => setShowRegister(false)}
              >
                Back To Login
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh" }}>
      <nav className="navbar navbar-dark bg-dark px-4">
        <span className="navbar-brand">Recruitment Platform</span>

        <div>
          <button
            className="btn btn-outline-light me-3"
            onClick={viewApplications}
          >
            View Applications
          </button>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container py-5">
        <div
          className="p-5 rounded-4 text-white mb-5 shadow"
          style={{
            background: "linear-gradient(135deg,#0b132b,#1c2541)"
          }}
        >
          <h1 className="display-4 fw-bold">Recruitment Platform</h1>

          <p className="lead">
            Find your dream job or recruit the best developers in Sweden.
          </p>
        </div>

        <div className="row text-center mb-5">
          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4 p-4">
              <h1 className="text-primary fw-bold">{jobs.length}</h1>
              <p>Active Jobs</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4 p-4">
              <h1 className="text-primary fw-bold">120+</h1>
              <p>Companies</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4 p-4">
              <h1 className="text-primary fw-bold">{applications.length}</h1>
              <p>Loaded Applications</p>
            </div>
          </div>
        </div>

        <div className="card shadow border-0 rounded-4 p-4 mb-5">
          <h2 className="mb-4">Create New Job</h2>

          <div className="row g-3">
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Title"
                className="form-control"
                value={newJob.title}
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    title: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-3">
              <input
                type="text"
                placeholder="Description"
                className="form-control"
                value={newJob.description}
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    description: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-2">
              <input
                type="text"
                placeholder="Location"
                className="form-control"
                value={newJob.location}
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    location: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                placeholder="Salary"
                className="form-control"
                value={newJob.salary}
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    salary: e.target.value
                  })
                }
              />
            </div>

            <div className="col-md-2">
              <button className="btn btn-primary w-100" onClick={createJob}>
                Add Job
              </button>
            </div>
          </div>
        </div>

        {showApplications && (
          <div className="card shadow border-0 rounded-4 p-4 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="mb-0">Applications</h2>

              <button
                className="btn btn-outline-danger"
                onClick={() => setShowApplications(false)}
              >
                Close
              </button>
            </div>

            {applications.length === 0 ? (
              <p className="text-muted mb-0">No applications found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Job</th>
                      <th>Candidate</th>
                      <th>Email</th>
                      <th>Applied At</th>
                    </tr>
                  </thead>

                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id}>
                        <td>{app.id}</td>
                        <td>{app.jobTitle}</td>
                        <td>{app.candidateName}</td>
                        <td>{app.candidateEmail}</td>
                        <td>{new Date(app.appliedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search jobs by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <h3 className="text-center">Loading jobs...</h3>
        ) : (
          <div className="row">
            {filteredJobs.map((job) => (
              <div className="col-md-4 mb-4" key={job.id}>
                <div className="card shadow border-0 rounded-4 h-100">
                  <div className="card-body d-flex flex-column">
                    <h2 className="fw-bold mb-2">{job.title}</h2>

                    <p className="text-secondary mb-2">
                      TechNova Sweden
                    </p>

                    <p className="text-muted">{job.description}</p>

                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>

                    <p>
                      <strong>Salary:</strong> {job.salary} SEK
                    </p>

                    <div className="mb-3">
                      <span className="badge bg-primary me-2">Hybrid</span>
                      <span className="badge bg-success">Full Time</span>
                    </div>

                    <button
                      className="btn btn-success mt-auto"
                      onClick={() => applyJob(job.id)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="col-12">
                <div className="alert alert-warning">
                  No jobs matched your search.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p className="mb-0">
          Recruitment Platform © 2026 — Built with React, ASP.NET Core and SQL Server
        </p>
      </footer>
    </div>
  );
}

export default App;