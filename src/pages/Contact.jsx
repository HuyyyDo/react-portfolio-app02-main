// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// export default function Contact(){
//   const [form, setForm] = useState({
//     firstName: '', lastName: '', phone: '', email: '', message: ''
//   })
//   const navigate = useNavigate()

//   function update(e){
//     const { name, value } = e.target
//     setForm(prev => ({ ...prev, [name]: value }))
//   }

//   function submit(e){
//     e.preventDefault()
//     // Capture data (for demo, store in localStorage)
//     try {
//       const entries = JSON.parse(localStorage.getItem('contactEntries') || '[]')
//       entries.push({ ...form, at: new Date().toISOString() })
//       localStorage.setItem('contactEntries', JSON.stringify(entries))
//     } catch {}
//     // Redirect to Home with state
//     navigate('/', { state: { submitted: true, firstName: form.firstName } })
//   }

//   return (
//     <section>
//       <p className="kicker">Contact</p>
//       <h2>Let&apos;s work together</h2>
//       <div className="grid" style={{marginTop:'1rem'}}>
//         <div className="card">
//           <p><strong>Email:</strong> huyhoang.ais@gmail.com</p>
//           <p><strong>GitHub:</strong> <a href="https://github.com/HuyyyDo/react-portfolio-app02" target="_blank" rel="noreferrer">https://github.com/HuyyyDo/react-portfolio-app02</a></p>
//         </div>
//         <form className="card" onSubmit={submit} aria-label="Contact form">
//           <div className="row">
//             <div>
//               <label htmlFor="firstName">First Name</label>
//               <input id="firstName" name="firstName" value={form.firstName} onChange={update} required />
//             </div>
//             <div>
//               <label htmlFor="lastName">Last Name</label>
//               <input id="lastName" name="lastName" value={form.lastName} onChange={update} required />
//             </div>
//           </div>
//           <div className="row">
//             <div>
//               <label htmlFor="phone">Contact Number</label>
//               <input id="phone" name="phone" value={form.phone} onChange={update} />
//             </div>
//             <div>
//               <label htmlFor="email">Email</label>
//               <input id="email" type="email" name="email" value={form.email} onChange={update} required />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="message">Message</label>
//             <textarea id="message" name="message" value={form.message} onChange={update} required />
//           </div>
//           <div className="actions">
//             <button className="btn" type="submit">Send</button>
//           </div>
//         </form>
//       </div>
//     </section>
//   )
// }

// src/pages/Contact.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaGithub, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "", message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  function update(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Map UI -> API. The backend uses 'firstname', 'lastname', 'email'
      // We’ll also send phone/message if you add them to the schema (section B below).
      const payload = {
        firstname: form.firstName,
        lastname: form.lastName,
        email: form.email,
        phone: form.phone,       // optional, if schema updated
        message: form.message,   // optional, if schema updated
      };

      const res = await fetch(`${API}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed (${res.status})`);
      }

      // Success: redirect to Home with a little state for a toast/banner
      navigate("/", { state: { submitted: true, firstName: form.firstName } });
    } catch (err) {
      console.error(err);
      setError("Could not send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

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
        <p className="kicker" style={{ fontSize: '0.875rem', letterSpacing: '0.15em' }}>CONTACT</p>
        <h2 style={{
          background: 'linear-gradient(135deg, #64c8ff 0%, #a78bfa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>Let&apos;s work together</h2>
      </div>

      <div className="grid" style={{ marginTop: "2rem" }}>
        <div className="card" style={{
          background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%)',
          border: '1px solid rgba(100, 200, 255, 0.3)',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{marginBottom: '1.5rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem'}}>
              <FaEnvelope size={20} style={{color: 'var(--accent)'}} />
              <strong>Email:</strong>
            </div>
            <a href="mailto:huyhoang.ais@gmail.com" style={{
              color: 'var(--accent)',
              textDecoration: 'none',
              transition: 'opacity 0.3s',
            }}>
              huyhoang.ais@gmail.com
            </a>
          </div>
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem'}}>
              <FaGithub size={20} style={{color: 'var(--accent)'}} />
              <strong>GitHub:</strong>
            </div>
            <a
              href="https://github.com/HuyyyDo"
              target="_blank"
              rel="noreferrer"
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
                transition: 'opacity 0.3s',
              }}
            >
              github.com/HuyyyDo
            </a>
          </div>
        </div>

        <form className="card" onSubmit={submit} aria-label="Contact form" noValidate style={{
          background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%)',
          border: '1px solid rgba(100, 200, 255, 0.3)',
          backdropFilter: 'blur(10px)',
        }}>
          <div className="row">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" value={form.firstName} onChange={update} required style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                color: 'inherit',
              }} />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" value={form.lastName} onChange={update} required style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                color: 'inherit',
              }} />
            </div>
          </div>

          <div className="row">
            <div>
              <label htmlFor="phone">Contact Number</label>
              <input id="phone" name="phone" value={form.phone} onChange={update} style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                color: 'inherit',
              }} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" value={form.email} onChange={update} required style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                color: 'inherit',
              }} />
            </div>
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={update} required style={{
              background: 'rgba(30, 41, 59, 0.5)',
              border: '1px solid rgba(100, 200, 255, 0.2)',
              color: 'inherit',
            }} />
          </div>

          {error && (
            <p className="small" style={{ color: "#f59e0b", marginTop: ".5rem" }}>
              {error}
            </p>
          )}

          <div className="actions">
            <button className="btn" type="submit" disabled={submitting} style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #64c8ff 100%)',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <FaPaperPlane size={16} /> {submitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
