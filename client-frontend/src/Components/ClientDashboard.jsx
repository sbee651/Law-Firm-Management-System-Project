import React, { useState } from 'react';
import './ClientDashboard.css';
import { Container, Row, Col, Card, Table, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearAuthSession } from '../auth';

export default function ClientDashboard() {
  const navigate = useNavigate();

  // Client's Cases State
  const [clientCases] = useState([
    { id: 'CAS-2026-001', title: 'Property Transfer Agreement', attorney: 'Adv. M. Smith', status: 'In Progress', lastUpdated: '2026-09-10' }
  ]);

  // Logout Handler
  const handleLogout = () => {
    clearAuthSession(); // Clears JWT token from localStorage
    navigate('/');      // Redirects to login page
  };

  return (
    <Container fluid className="dashboard-container p-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="text-white mb-1">Client Portal</h2>
          <p className="text-light mb-0">View your active legal cases and track firm updates.</p>
        </Col>
        <Col xs="auto">
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      {/* Active Cases Section */}
      <Card className="case-card p-4 shadow-sm mb-4">
        <h5 className="mb-3">My Legal Cases</h5>
        <Table responsive hover className="align-middle">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Case Title</th>
              <th>Assigned Attorney</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {clientCases.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.title}</td>
                <td>{c.attorney}</td>
                <td><Badge bg="warning" text="dark">{c.status}</Badge></td>
                <td>{c.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}