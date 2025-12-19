import { Link, useLocation } from 'react-router-dom'
import { FaArrowRight, FaCode, FaBrain, FaRocket } from 'react-icons/fa'

export default function Home(){
  const location = useLocation()
  const submitted = location.state?.submitted
  const firstName = location.state?.firstName

  const highlights = [
    { icon: FaCode, title: 'Web Development', desc: 'React, Vite, Node.js' },
    { icon: FaBrain, title: 'AI & ML', desc: 'XGBoost, Hyperopt' },
    { icon: FaRocket, title: 'Performance', desc: 'Fast & Scalable' },
  ]

  return (
    <section>
      {submitted ? (
        <div className="notice" role="status" aria-live="polite">
          Thanks{firstName ? `, ${firstName}` : ''}! Your message was captured. I&apos;ll get back to you soon.
        </div>
      ) : null}

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
        borderRadius: '1.5rem',
        padding: '3rem 2rem',
        marginBottom: '2rem',
        border: '1px solid rgba(100, 200, 255, 0.2)',
        backdropFilter: 'blur(10px)',
      }}>
        <div className="hero">
          <div>
            <p className="kicker" style={{ fontSize: '0.875rem', letterSpacing: '0.15em' }}>WELCOME TO MY PORTFOLIO</p>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #64c8ff 0%, #a78bfa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Hi, I&apos;m Trong Do Huy Hoang
            </h1>
            <p className="lead" style={{ fontSize: '1.125rem', opacity: 0.95, marginBottom: '2rem' }}>
              I craft responsive, accessible web applications with <span style={{color:'var(--accent)'}}>React</span>, 
              <span style={{color:'var(--accent)'}}> Node.js</span>, and modern technologies. I also train AI models to find optimal solutions for your challenges.
            </p>
            <div style={{display:'flex', gap:'1rem', marginTop:'2rem', flexWrap: 'wrap'}}>
              <Link to="/about" className="btn" style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, #64c8ff 100%)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                About Me <FaArrowRight size={16} />
              </Link>
              <Link to="/projects" className="btn" style={{
                background: 'rgba(100, 200, 255, 0.1)',
                color: 'var(--accent)',
                border: '2px solid var(--accent)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                View Projects <FaArrowRight size={16} />
              </Link>
            </div>
          </div>
          
          {/* Mission Card */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.1) 0%, rgba(167, 139, 250, 0.05) 100%)',
            border: '1px solid rgba(100, 200, 255, 0.3)',
            backdropFilter: 'blur(10px)',
          }}>
            <p className="kicker">MISSION</p>
            <h3 style={{color: 'var(--accent-2)', marginBottom: '0.75rem'}}>Ship Useful Software</h3>
            <p className="small" style={{opacity: 0.9}}>Clean code. Accessible UI. Measurable impact. Fast performance.</p>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div style={{ marginTop: '3rem', marginBottom: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>What I Offer</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {highlights.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="card" style={{
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%)',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                transition: 'all 0.3s ease',
              }} onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(100, 200, 255, 0.15) 0%, rgba(167, 139, 250, 0.1) 100%)'
              }} onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.2)'
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(100, 200, 255, 0.05) 0%, rgba(167, 139, 250, 0.05) 100%)'
              }}>
                <Icon size={40} style={{color: 'var(--accent)', marginBottom: '1rem'}} />
                <h3 style={{color: 'var(--accent-2)', marginBottom: '0.5rem'}}>{item.title}</h3>
                <p className="small">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%)',
        borderRadius: '1.5rem',
        padding: '3rem 2rem',
        textAlign: 'center',
        border: '1px solid rgba(100, 200, 255, 0.3)',
        marginTop: '3rem',
      }}>
        <h2 style={{marginBottom: '1rem'}}>Let&apos;s Work Together</h2>
        <p style={{opacity: 0.9, marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem'}}>
          Have a project in mind or want to collaborate? Let&apos;s connect and create something amazing.
        </p>
        <Link to="/contact" className="btn" style={{
          background: 'linear-gradient(135deg, var(--accent) 0%, #64c8ff 100%)',
          border: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          Get in Touch <FaArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
