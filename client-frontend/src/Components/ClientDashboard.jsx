import React, { useState } from 'react';
import './ClientDashboard.css';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ClientDashboard() {
  const navigate = useNavigate();
  
  // Client profile state
  const [clientInfo, setClientInfo] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+27 41 555 0192'
  });

  // Modal visibility states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCaseModal, setShowCaseModal] = useState(false);
  
  // Selected case for the details modal
  const [selectedCase, setSelectedCase] = useState(null);

  // Temporary profile form state
  const [formData, setFormData] = useState(clientInfo);

  const cases = [
    { 
      id: 'CAS-2026-001', 
      title: 'Property Transfer Agreement', 
      attorney: 'Adv. M. Smith', 
      status: 'In Progress',
      description: 'Drafting and finalising property transfer documents for title deed registration.',
      lastUpdate: 'All clearance certificates received. Awaiting deeds office lodgement.'
    },
    { 
      id: 'CAS-2026-042', 
      title: 'Consultation - Contract Review', 
      attorney: 'Ms. L. Johnson', 
      status: 'Completed',
      description: 'Comprehensive legal review of commercial vendor agreements.',
      lastUpdate: 'Contract successfully reviewed and signed by all parties.'
    }
  ];

  // Handle profile input changes
  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save profile changes
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setClientInfo(formData);
    setShowProfileModal(false);
  };

  // Handle clicking a case row
  const handleRowClick = (caseItem) => {
    setSelectedCase(caseItem);
    setShowCaseModal(true);
  };

  return (
    <Container fluid className="dashboard-container p-4">
      {/* Top Header Section */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="text-white mb-1">Client Portal</h2>
          <p className="text-light mb-0">Welcome back, {clientInfo.name}. View your case statuses and documents below.</p>
        </Col>
        <Col xs="auto">
          <Button variant="outline-light" onClick={() => navigate('/')}>
            Logout
          </Button>
        </Col>
      </Row>

      {/* Main Content Layout */}
      <Row>
        {/* Left Column: Profile Card */}
        <Col md={4} className="mb-4">
          <Card className="sidebar-card p-4 shadow-sm">
            <h4 className="mb-3">My Profile</h4>
            <p><strong>Name:</strong> {clientInfo.name}</p>
            <p><strong>Email:</strong> {clientInfo.email}</p>
            <p><strong>Phone:</strong> {clientInfo.phone}</p>
            <Button 
              variant="primary" 
              className="w-100 mt-2" 
              onClick={() => { setFormData(clientInfo); setShowProfileModal(true); }}
            >
              Update Details
            </Button>
          </Card>
        </Col>

        {/* Right Column: Active Cases Table */}
        <Col md={8}>
          <Card className="case-card p-4 shadow-sm">
            <h4 className="mb-3">My Active Cases</h4>
            <p className="text-muted small">Click on any case row to view detailed status and updates.</p>
            <Table responsive hover className="align-middle" style={{ cursor: 'pointer' }}>
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Case Title</th>
                  <th>Assigned Attorney</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((c) => (
                  <tr key={c.id} onClick={() => handleRowClick(c)}>
                    <td>{c.id}</td>
                    <td>{c.title}</td>
                    <td>{c.attorney}</td>
                    <td>
                      <span className={`badge bg-${c.status === 'Completed' ? 'success' : 'warning text-dark'}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      {/* Update Details Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Details</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveProfile}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="modalName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleProfileChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleProfileChange} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handleProfileChange} 
                required 
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Case Details Modal */}
      <Modal show={showCaseModal} onHide={() => setShowCaseModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Case Details: {selectedCase?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCase && (
            <div>
              <h5 className="text-primary mb-3">{selectedCase.title}</h5>
              <p><strong>Assigned Attorney:</strong> {selectedCase.attorney}</p>
              <p>
                <strong>Current Status:</strong>{' '}
                <span className={`badge bg-${selectedCase.status === 'Completed' ? 'success' : 'warning text-dark'}`}>
                  {selectedCase.status}
                </span>
              </p>
              <hr />
              <p><strong>Case Description:</strong></p>
              <p className="text-muted">{selectedCase.description}</p>
              <p><strong>Latest Progress Update:</strong></p>
              <p className="bg-light p-3 rounded">{selectedCase.lastUpdate}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCaseModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}