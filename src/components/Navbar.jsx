// import { NavLink } from 'react-router-dom'

// export default function Navbar(){
//   return (
//     <header className="navbar">
//       <div className="container navbar-inner">
//         <a className="brand" href="/">
//           <img src="/logo.svg" alt="Logo" width="32" height="32" />
//           <span>
//             <strong>Trong Do Huy Hoang</strong>
//             <small className="mono">Software Developer</small>
//           </span>
//         </a>
//         <nav className="nav-links" aria-label="Main Navigation">
//           <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
//           <NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>About</NavLink>
//           <NavLink to="/projects" className={({isActive}) => isActive ? 'active' : ''}>Projects</NavLink>
//           <NavLink to="/services" className={({isActive}) => isActive ? 'active' : ''}>Services</NavLink>
//           <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink>
//           <NavLink to="/admin/users" className={({isActive}) => isActive ? "active" : ""}>Admin</NavLink>
//         </nav>
//       </div>
//     </header>
//   )
// }

// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { to: '/projects', label: 'Projects' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header style={{
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
      borderBottom: '1px solid rgba(100, 200, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Brand/Logo */}
        <Link to="/" style={{
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          background: 'linear-gradient(135deg, #64c8ff 0%, #a78bfa 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          transition: 'opacity 0.3s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          My Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            display: 'none',
          },
        }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              textDecoration: 'none',
              color: 'var(--accent-2)',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.background = 'rgba(100, 200, 255, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--accent-2)'
              e.currentTarget.style.background = 'transparent'
            }}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}>
          {!token ? (
            <>
              <Link to="/signin" style={{
                textDecoration: 'none',
                color: 'var(--accent-2)',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.background = 'rgba(100, 200, 255, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--accent-2)'
                e.currentTarget.style.background = 'transparent'
              }}>
                <FaSignInAlt size={16} /> Sign In
              </Link>
              <Link to="/signup" style={{
                textDecoration: 'none',
                background: 'linear-gradient(135deg, var(--accent) 0%, #64c8ff 100%)',
                color: '#0f172a',
                padding: '0.5rem 1.25rem',
                borderRadius: '0.5rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(100, 200, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
                <FaUserPlus size={16} /> Sign Up
              </Link>
            </>
          ) : (
            <button onClick={handleSignOut} style={{
              background: 'rgba(220, 38, 38, 0.2)',
              color: '#ef4444',
              border: '1px solid #ef4444',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#ef4444'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)'
              e.currentTarget.style.color = '#ef4444'
            }}>
              <FaSignOutAlt size={16} /> Sign Out
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMobileMenu} style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: 'var(--accent)',
          fontSize: '1.5rem',
          cursor: 'pointer',
          '@media (max-width: 768px)': {
            display: 'block',
          },
        }}>
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(15, 23, 42, 0.98)',
          padding: '1rem 2rem',
          borderTop: '1px solid rgba(100, 200, 255, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              textDecoration: 'none',
              color: 'var(--accent-2)',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease',
            }}
            onClick={() => setMobileMenuOpen(false)}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.background = 'rgba(100, 200, 255, 0.1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--accent-2)'
              e.currentTarget.style.background = 'transparent'
            }}>
              {link.label}
            </Link>
          ))}
          {!token ? (
            <>
              <Link to="/signin" style={{
                textDecoration: 'none',
                color: 'var(--accent-2)',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
              }} onClick={() => setMobileMenuOpen(false)}>
                Sign In
              </Link>
              <Link to="/signup" style={{
                textDecoration: 'none',
                background: 'linear-gradient(135deg, var(--accent) 0%, #64c8ff 100%)',
                color: '#0f172a',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: 500,
              }} onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          ) : (
            <button onClick={handleSignOut} style={{
              background: 'rgba(220, 38, 38, 0.2)',
              color: '#ef4444',
              border: '1px solid #ef4444',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}>
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
}

