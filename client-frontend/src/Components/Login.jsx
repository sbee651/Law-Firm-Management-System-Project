import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { saveAuthToken } from '../auth';
import './Login.css';

export default function Login() {
  const [role, setRole] = useState('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simulate receiving a JWT token from ASP.NET Core backend
    const mockToken = `fake-jwt-token-${role}-${Date.now()}`;
    saveAuthToken(mockToken, role, email);

    if (role === 'client') {
      navigate('/client-dashboard');
    } else if (role === 'attorney') {
      navigate('/attorney-dashboard');
    } else if (role === 'admin') {
      navigate('/admin-dashboard');
    }
  };

  return (
    <Container fluid className="login-container d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="login-card p-4 shadow-lg">
            <div className="text-center mb-4">
              <h3 className="fw-bold">JusticeLaw Attorneys</h3>
              <p className="text-muted small">Sign in to your portal</p>
            </div>

            {/* Role Toggle Buttons */}
            <div className="d-flex mb-4 role-toggle-container p-1 bg-light rounded justify-content-around">
              <Button 
                variant={role === 'client' ? 'primary' : 'light'} 
                size="sm"
                className="border-0 flex-grow-1 mx-1"
                onClick={() => setRole('client')}
              >
                Client
              </Button>
              <Button 
                variant={role === 'attorney' ? 'primary' : 'light'} 
                size="sm"
                className="border-0 flex-grow-1 mx-1"
                onClick={() => setRole('attorney')}
              >
                Attorney
              </Button>
              <Button 
                variant={role === 'admin' ? 'primary' : 'light'} 
                size="sm"
                className="border-0 flex-grow-1 mx-1"
                onClick={() => setRole('admin')}
              >
                Admin
              </Button>
            </div>

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address ({role})</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 py-2 fw-bold">
                Sign In
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}