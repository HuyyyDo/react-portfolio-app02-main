// // src/pages/Projects.jsx
// const projects = [
//   {
//     title: 'Hyperopt AI Training',
//     img: '/assets/hyperopt.png', // put hyperopt.png in public/assets/
//     role: 'Full-stack Developer',
//     description: 'To train the AI to find the best stocks',
//     link: '/assets/hyperopt_results_20250722_152314.csv', // <-- your file in public/assets/
//     download: true, // flag to add download attr
//   },
//   {
//     title: 'Fraction Calculator (C#)',
//     img: '/assets/fraction.png', // put fraction.png in public/assets/
//     role: 'C# Developer',
//     description:
//       'WinForms app implementing a Fraction class with operator overloading and unit tests.',
//     link: '/assets/fractioncalculator.zip', // replace with your repo or file when ready
//   },
// ];

// export default function Projects() {
//   return (
//     <section>
//       <p className="kicker">Projects</p>
//       <h2>Highlighted Work</h2>
//       <div className="grid" style={{ marginTop: '1rem' }}>
//         {projects.map((p) => (
//           <article className="card" key={p.title}>
//             <img
//               src={p.img}
//               alt={p.title}
//               style={{ width: '100%', borderRadius: '.75rem' }}
//             />
//             <h3>{p.title}</h3>
//             <p className="small">{p.role}</p>
//             <p>{p.description}</p>
//             <div style={{ display: 'flex', gap: '.5rem' }}>
//               <a
//                 className="btn"
//                 href={p.link}
//                 {...(p.download ? { download: '' } : {})}
//                 target={p.link?.startsWith('http') ? '_blank' : undefined}
//                 rel={p.link?.startsWith('http') ? 'noreferrer' : undefined}
//                 aria-label={`Open ${p.title}`}
//               >
//                 Open
//               </a>
//             </div>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

// src/pages/Projects.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Optional: keep these as a fallback if the API is empty/unavailable
const FALLBACK = [
  {
    title: "Hyperopt AI Training",
    img: "/assets/hyperopt.png",
    role: "Full-stack Developer",
    description: "To train the AI to find the best stocks",
    link: "/assets/hyperopt_results_20250722_152314.csv",
    download: true,
  },
  {
    title: "Fraction Calculator (C#)",
    img: "/assets/fraction.png",
    role: "C# Developer",
    description:
      "WinForms app implementing a Fraction class with operator overloading and unit tests.",
    link: "/assets/fractioncalculator.zip",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [token, setToken]       = useState(null);

  // Use env var when deployed, fallback to localhost in dev
  const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken);
  }, []);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch(`${API}/api/projects`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Map backend fields to your UI fields (img/role/link may not exist yet)
        const mapped = (Array.isArray(data) ? data : []).map(p => ({
          _id: p._id,
          title: p.title,
          description: p.description,
          // Optional fields if you add them to the DB later:
          img: p.img || "/assets/project1.jpg",
          role: p.role || "Developer",
          link: p.link,
          download: Boolean(p.download),
          completion: p.completion, // ISO date from API (optional display)
        }));

        if (alive) setProjects(mapped.length ? mapped : FALLBACK);
      } catch (e) {
        console.error(e);
        if (alive) {
          setError("Could not load projects from the server.");
          setProjects(FALLBACK);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [API]);

  const handleDelete = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    if (!token) {
      alert('You must be signed in to delete a project');
      return;
    }

    try {
      const res = await fetch(`${API}/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      
      setProjects(projects.filter(p => p._id !== projectId));
      alert('Project deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete project: ' + err.message);
    }
  };

  if (loading) return <p>Loading projects…</p>;

  return (
    <section>
      <p className="kicker">Projects</p>
      <h2>Highlighted Work</h2>
      {token && (
        <Link to="/admin/add-project" style={{ marginTop: '1rem', display: 'inline-block' }} className="btn">
          + Add Project
        </Link>
      )}
      {error && (
        <p className="small" style={{ marginTop: "1rem", color: "#f59e0b" }}>{error} Showing local examples.</p>
      )}
      <ProjectGrid projects={projects} onDelete={handleDelete} isAdmin={!!token} />
    </section>
  );
}

function ProjectGrid({ projects, onDelete, isAdmin }) {
  return (
    <div className="grid" style={{ marginTop: "1rem" }}>
      {projects.map((p) => (
        <article className="card" key={p._id || p.title}>
          <img
            src={p.img}
            alt={p.title}
            style={{ width: "100%", borderRadius: ".75rem" }}
          />
          <h3>{p.title}</h3>
          {p.role && <p className="small">{p.role}</p>}
          <p>{p.description}</p>
          {p.completion && (
            <p className="small" style={{ opacity: 0.8 }}>
              Completed: {new Date(p.completion).toLocaleDateString()}
            </p>
          )}
          <div style={{ display: "flex", gap: ".5rem", flexWrap: 'wrap' }}>
            {p.link && (
              <a
                className="btn"
                href={p.link}
                {...(p.download ? { download: "" } : {})}
                target={p.link?.startsWith("http") ? "_blank" : undefined}
                rel={p.link?.startsWith("http") ? "noreferrer" : undefined}
                aria-label={`Open ${p.title}`}
              >
                Open
              </a>
            )}
            {isAdmin && p._id && (
              <button
                onClick={() => onDelete(p._id)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Delete
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
