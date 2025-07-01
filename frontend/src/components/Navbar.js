import React from 'react';  
import { Navbar as RBNavbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const firstName = user?.name ? user.name.split(' ')[0] : '';

  return (
    <RBNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <RBNavbar.Brand as={NavLink} to="/">📚 Book Library</RBNavbar.Brand>
        <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
        <RBNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">

            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About Us</Nav.Link>

            {!user && (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </>
            )}

            {user && (
              <>
                {/* ✅ Show Dashboard for all logged-in users */}
                <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>

                {/* ✅ Admin-only link */}
                {user.role === 'admin' && (
                  <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>
                )}

                {/* ✅ Safe welcome text */}
                {firstName && (
                  <span className="navbar-text text-light mx-2">
                    👋 Hi, {firstName}
                    {user.role === 'admin' && (
                      <span className="badge bg-danger ms-1">Admin</span>
                    )}
                  </span>
                )}

                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}

          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};

export default Navbar;
