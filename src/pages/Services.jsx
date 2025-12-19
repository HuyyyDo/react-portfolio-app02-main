// // src/pages/Services.jsx
// import { FaFacebook, FaInstagram } from "react-icons/fa";

// const services = [
//   { title:'Web Development', desc:'React, Vite, SPA routing, REST APIs' },
//   { title:'Backend & Databases', desc:'Node, Express, SQL/NoSQL' },
//   { title:'C# / .NET', desc:'WinForms/WPF, OOP, unit testing' },
//   { title:'Hyperopt AI Training', desc:'XGBoost AI training' },
// ];

// const socials = [
//   { label: "Facebook", href: "https://facebook.com/huy.doss", Icon: FaFacebook },
//   { label: "Instagram", href: "https://www.instagram.com/huy_doss/", Icon: FaInstagram },
// ];

// export default function Services(){
//   return (
//     <section>
//       <p className="kicker">Services</p>
//       <h2>What I can help with</h2>

//       {/* Replace the old <img src="/src/assets/services.svg" /> with icons */}
//       <div
//         className="card"
//         style={{
//           display: "flex",
//           gap: "1.25rem",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: "2rem",
//           marginTop: ".75rem",
//         }}
//       >
//         {socials.map(({ label, href, Icon }) => (
//           <a
//             key={label}
//             href={href}
//             target="_blank"
//             rel="noreferrer"
//             aria-label={label}
//             title={label}
//             style={{
//               width: 120,
//               height: 120,
//               borderRadius: "9999px",
//               border: "2px solid var(--accent)",
//               display: "inline-flex",
//               justifyContent: "center",
//               alignItems: "center",
//               color: "var(--accent-2)",
//             }}
//           >
//             <Icon size={56} />
//           </a>
//         ))}
//       </div>

//       <div className="grid" style={{ marginTop: "1rem" }}>
//         {services.map((s) => (
//           <article className="card" key={s.title}>
//             <h3>{s.title}</h3>
//             <p>{s.desc}</p>
//           </article>
//         ))}
//       </div>
//     </section>
//   );
// }

// src/pages/Services.jsx
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

// Local examples to fall back to if the API is empty/unavailable
const FALLBACK = [
  { title: "Web Development", desc: "React, Vite, SPA routing, REST APIs" },
  { title: "Backend & Databases", desc: "Node, Express, SQL/NoSQL" },
  { title: "C# / .NET", desc: "WinForms/WPF, OOP, unit testing" },
  { title: "Hyperopt AI Training", desc: "XGBoost AI training" },
];

const socials = [
  { label: "Facebook", href: "https://facebook.com/huy.doss", Icon: FaFacebook },
  { label: "Instagram", href: "https://www.instagram.com/huy_doss/", Icon: FaInstagram },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  // Use env var in prod, default to localhost in dev
  const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API}/api/services`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Backend uses { title, description }; map to { title, desc }
        const mapped = (Array.isArray(data) ? data : []).map(s => ({
          title: s.title,
          desc: s.description,
        }));

        if (alive) setServices(mapped.length ? mapped : FALLBACK);
      } catch (e) {
        console.error(e);
        if (alive) {
          setError("Could not load services from the server.");
          setServices(FALLBACK);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [API]);

  return (
    <section>
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
        borderRadius: '1.5rem',
        padding: '3rem 2rem',
        marginBottom: '2rem',
        border: '1px solid rgba(100, 200, 255, 0.2)',
        backdropFilter: 'blur(10px)',
      }}>
        <p className="kicker" style={{ fontSize: '0.875rem', letterSpacing: '0.15em' }}>SERVICES</p>
        <h2 style={{
          background: 'linear-gradient(135deg, #64c8ff 0%, #a78bfa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>What I can help with</h2>
      </div>

      {/* Social icons */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          marginTop: ".75rem",
          background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(100, 200, 255, 0.2)',
        }}
      >
        {socials.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            style={{
              width: 120,
              height: 120,
              borderRadius: "9999px",
              border: "2px solid var(--accent)",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              color: "var(--accent-2)",
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(100, 200, 255, 0.5)'
              e.currentTarget.style.transform = 'scale(1.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <Icon size={56} />
          </a>
        ))}
      </div>

      {loading ? (
        <p style={{ marginTop: "1rem", textAlign: 'center' }}>Loading services…</p>
      ) : (
        <>
          {error && (
            <p className="small" style={{ marginTop: "1rem", color: "#f59e0b", textAlign: 'center' }}>
              {error} Showing local examples.
            </p>
          )}
          <div className="grid" style={{ marginTop: "2rem" }}>
            {services.map((s) => (
              <article className="card" key={s.title} style={{
                background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%)',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(100, 200, 255, 0.15) 0%, rgba(167, 139, 250, 0.1) 100%)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.2)'
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(100, 200, 255, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%)'
              }}>
                <h3 style={{color: 'var(--accent-2)'}}>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
