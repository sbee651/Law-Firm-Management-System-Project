import React, { useState } from 'react';
import './ClientDashboard.css'; // Reusing our immersive background styles
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function StaffDashboard() {
  const navigate = useNavigate();

  // Staff and firm case management state
  const [cases, setCases] = useState([
    { id: 'CAS-2026-001', client: 'Jane Doe', title: 'Property Transfer Agreement', attorney: 'Adv. M. Smith', status: 'In Progress' },
    { id: 'CAS-2026-002', client: 'John Smith', title: 'Corporate Merger Advisory', attorney: 'Adv. M. Smith', status: 'In Progress' },
    { id: 'CAS-2026-042', client: 'Jane Doe', title: 'Consultation - Contract Review', attorney: 'Ms. L. Johnson', status: 'Completed' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  // Open modal to update case status
  const handleEditClick = (c) => {
    setSelectedCase(c);
    setNewStatus(c.status);
    setShowModal(true);
  };

  // Save updated case status
  const handleSaveStatus = (e) => {
    e.preventDefault();
    setCases(cases.map(item => item.id === selectedCase.id ? { ...item, status: newStatus } : item));
    setShowModal(false);
  };

  return (
    <Container fluid className="dashboard-container p-4">
      {/* Top Header Section */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="text-white mb-1">Staff & Attorney Portal</h2>
          <p className="text-light mb-0">Manage all firm cases, client records, and statuses.</p>
        </Col>
        <Col xs="auto">
          <Button variant="outline-light" onClick={() => navigate('/')}>
            Logout
          </Button>
        </Col>
      </Row>

      {/* Main Content Layout */}
      <Row>
        <Col md={12}>
          <Card className="case-card p-4 shadow-sm">
            <h4 className="mb-3">All Active Firm Cases</h4>
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Client Name</th>
                  <th>Case Title</th>
                  <th>Assigned Attorney</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.client}</td>
                    <td>{c.title}</td>
                    <td>{c.attorney}</td>
                    <td>
                      <span className={`badge bg-${c.status === 'Completed' ? 'success' : 'warning text-dark'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <Button size="sm" variant="outline-primary" onClick={() => handleEditClick(c)}>
                        Update Status
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      {/* Status Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Case Status: {selectedCase?.id}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveStatus}>
          <Modal.Body>
            <p><strong>Client:</strong> {selectedCase?.client}</p>
            <p><strong>Case:</strong> {selectedCase?.title}</p>
            
            <Form.Group className="mb-3 mt-3" controlId="statusSelect">
              <Form.Label>Change Status</Form.Label>
              <Form.Control 
                as="select" 
                value={newStatus} 
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="In Progress">In Progress</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Completed">Completed</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Update Status
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}