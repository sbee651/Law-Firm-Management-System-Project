import React, { useState } from 'react';
import './ClientDashboard.css';
import { Container, Row, Col, Card, Table, Button, Tabs, Tab, Modal, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearAuthSession } from '../auth';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Firm Data State
  const [clients, setClients] = useState([
    { id: 'CLI-001', name: 'Jane Doe', email: 'jane@example.com', phone: '+27415550192', gender: 'Female', address: '123 Main Road, Gqeberha' }
  ]);

  const [attorneys, setAttorneys] = useState([
    { id: 'ATT-001', name: 'Adv. M. Smith', specialization: 'Property Law', email: 'smith@justicelaw.co.za', phone: '+27415550188' }
  ]);

  const [cases, setCases] = useState([
    { id: 'CAS-2026-001', client: 'Jane Doe', title: 'Property Transfer Agreement', attorney: 'Adv. M. Smith', status: 'In Progress' }
  ]);

  // Search States
  const [clientSearch, setClientSearch] = useState('');
  const [attorneySearch, setAttorneySearch] = useState('');
  const [caseSearch, setCaseSearch] = useState('');

  // Validation Error State
  const [formError, setFormError] = useState('');

  // Modal State for Adding Client
  const [showClientModal, setShowClientModal] = useState(false);
  const [clientNumber, setClientNumber] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientGender, setClientGender] = useState('Female');
  const [clientAddress, setClientAddress] = useState('');

  // Modal State for Adding Attorney
  const [showAttorneyModal, setShowAttorneyModal] = useState(false);
  const [attorneyId, setAttorneyId] = useState('');
  const [attorneyName, setAttorneyName] = useState('');
  const [attorneySpecialization, setAttorneySpecialization] = useState('Property Law');
  const [attorneyEmail, setAttorneyEmail] = useState('');
  const [attorneyPhone, setAttorneyPhone] = useState('');

  // Modal State for Adding Case
  const [showCaseModal, setShowCaseModal] = useState(false);
  const [caseId, setCaseId] = useState('');
  const [caseTitle, setCaseTitle] = useState('');
  const [selectedClient, setSelectedClient] = useState(clients[0]?.name || '');
  const [selectedAttorney, setSelectedAttorney] = useState(attorneys[0]?.name || '');
  const [caseStatus, setCaseStatus] = useState('In Progress');

  // Logout Handler with Session Clearing
  const handleLogout = () => {
    clearAuthSession(); // Clears JWT token and user info from localStorage
    navigate('/');      // Redirects to login page
  };

  // Filter Logic
  const filteredClients = clients.filter(cli => 
    cli.name.toLowerCase().includes(clientSearch.toLowerCase()) || 
    cli.id.toLowerCase().includes(clientSearch.toLowerCase())
  );

  const filteredAttorneys = attorneys.filter(att => 
    att.name.toLowerCase().includes(attorneySearch.toLowerCase()) || 
    att.specialization.toLowerCase().includes(attorneySearch.toLowerCase()) ||
    att.id.toLowerCase().includes(attorneySearch.toLowerCase())
  );

  const filteredCases = cases.filter(c => 
    c.title.toLowerCase().includes(caseSearch.toLowerCase()) || 
    c.id.toLowerCase().includes(caseSearch.toLowerCase()) ||
    c.client.toLowerCase().includes(caseSearch.toLowerCase()) ||
    c.attorney.toLowerCase().includes(caseSearch.toLowerCase())
  );

  const handleAddClient = (e) => {
    e.preventDefault();
    setFormError('');

    // Validation checks
    if (!clientEmail.includes('@') || !clientEmail.includes('.')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (clientPhone && clientPhone.length < 10) {
      setFormError('Phone number must be at least 10 characters long.');
      return;
    }

    const newClient = {
      id: clientNumber || `CLI-00${clients.length + 1}`,
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      gender: clientGender,
      address: clientAddress
    };

    setClients([...clients, newClient]);
    setShowClientModal(false);
    setClientNumber(''); setClientName(''); setClientEmail(''); setClientPhone(''); setClientAddress('');
  };

  const handleAddAttorney = (e) => {
    e.preventDefault();
    const newAttorney = {
      id: attorneyId || `ATT-00${attorneys.length + 1}`,
      name: attorneyName,
      specialization: attorneySpecialization,
      email: attorneyEmail,
      phone: attorneyPhone
    };
    setAttorneys([...attorneys, newAttorney]);
    setShowAttorneyModal(false);
    setAttorneyId(''); setAttorneyName(''); setAttorneySpecialization('Property Law'); setAttorneyEmail(''); setAttorneyPhone('');
  };

  const handleAddCase = (e) => {
    e.preventDefault();
    const newCase = {
      id: caseId || `CAS-2026-00${cases.length + 1}`,
      client: selectedClient,
      title: caseTitle,
      attorney: selectedAttorney,
      status: caseStatus
    };
    setCases([...cases, newCase]);
    setShowCaseModal(false);
    setCaseId(''); setCaseTitle(''); setCaseStatus('In Progress');
  };

  return (
    <Container fluid className="dashboard-container p-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="text-white mb-1">Administrator Portal</h2>
          <p className="text-light mb-0">Manage firm clients, attorneys, and cases.</p>
        </Col>
        <Col xs="auto">
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      <Card className="case-card p-4 shadow-sm">
        <Tabs defaultActiveKey="clients" id="admin-tabs" className="mb-3">
          
          {/* Clients Tab */}
          <Tab eventKey="clients" title="Manage Clients">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h5 className="mb-0">Registered Clients</h5>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control 
                  type="text" 
                  placeholder="Search clients..." 
                  size="sm"
                  style={{ width: '220px' }}
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                />
                <Button variant="primary" size="sm" onClick={() => setShowClientModal(true)}>
                  + Add New Client
                </Button>
              </div>
            </div>
            
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Client ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length > 0 ? (
                  filteredClients.map((cli) => (
                    <tr key={cli.id}>
                      <td>{cli.id}</td>
                      <td>{cli.name}</td>
                      <td>{cli.gender}</td>
                      <td>{cli.email}</td>
                      <td>{cli.phone}</td>
                      <td>{cli.address}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">No clients found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>

          {/* Cases Tab */}
          <Tab eventKey="cases" title="Manage Cases">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h5 className="mb-0">All Firm Cases</h5>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control 
                  type="text" 
                  placeholder="Search cases..." 
                  size="sm"
                  style={{ width: '220px' }}
                  value={caseSearch}
                  onChange={(e) => setCaseSearch(e.target.value)}
                />
                <Button variant="primary" size="sm" onClick={() => setShowCaseModal(true)}>
                  + Add New Case
                </Button>
              </div>
            </div>
            
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Client</th>
                  <th>Title</th>
                  <th>Assigned Attorney</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.length > 0 ? (
                  filteredCases.map((c) => (
                    <tr key={c.id}>
                      <td>{c.id}</td>
                      <td>{c.client}</td>
                      <td>{c.title}</td>
                      <td>{c.attorney}</td>
                      <td><span className="badge bg-warning text-dark">{c.status}</span></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">No cases found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>

          {/* Attorneys Tab */}
          <Tab eventKey="attorneys" title="Manage Attorneys">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h5 className="mb-0">Firm Attorneys</h5>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control 
                  type="text" 
                  placeholder="Search attorneys..." 
                  size="sm"
                  style={{ width: '220px' }}
                  value={attorneySearch}
                  onChange={(e) => setAttorneySearch(e.target.value)}
                />
                <Button variant="primary" size="sm" onClick={() => setShowAttorneyModal(true)}>
                  + Add New Attorney
                </Button>
              </div>
            </div>
            
            <Table responsive hover className="align-middle">
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttorneys.length > 0 ? (
                  filteredAttorneys.map((att) => (
                    <tr key={att.id}>
                      <td>{att.id}</td>
                      <td>{att.name}</td>
                      <td><span className="badge bg-info text-dark">{att.specialization}</span></td>
                      <td>{att.email}</td>
                      <td>{att.phone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">No attorneys found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Tab>

        </Tabs>
      </Card>

      {/* Add Client Modal */}
      <Modal show={showClientModal} onHide={() => { setShowClientModal(false); setFormError(''); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Client Record</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddClient}>
          <Modal.Body>
            {formError && <Alert variant="danger" className="py-2">{formError}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Client Number (Unique ID)</Form.Label>
              <Form.Control type="text" placeholder="e.g. CLI-002" value={clientNumber} onChange={(e) => setClientNumber(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Name & Surname</Form.Label>
              <Form.Control type="text" placeholder="e.g. John Smith" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select value={clientGender} onChange={(e) => setClientGender(e.target.value)}>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="+27..." value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Home Address</Form.Label>
              <Form.Control type="text" placeholder="Street address, City" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowClientModal(false); setFormError(''); }}>Cancel</Button>
            <Button variant="success" type="submit">Save Client</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Add Attorney Modal */}
      <Modal show={showAttorneyModal} onHide={() => setShowAttorneyModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Attorney Record</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddAttorney}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Staff ID (Unique Identifier)</Form.Label>
              <Form.Control type="text" placeholder="e.g. ATT-002" value={attorneyId} onChange={(e) => setAttorneyId(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Attorney Name & Title</Form.Label>
              <Form.Control type="text" placeholder="e.g. Adv. L. Dlamini" value={attorneyName} onChange={(e) => setAttorneyName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Select value={attorneySpecialization} onChange={(e) => setAttorneySpecialization(e.target.value)}>
                <option value="Property Law">Property Law</option>
                <option value="Criminal Law">Criminal Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Corporate Law">Corporate Law</option>
                <option value="Labour Law">Labour Law</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="dlamini@justicelaw.co.za" value={attorneyEmail} onChange={(e) => setAttorneyEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="+27..." value={attorneyPhone} onChange={(e) => setAttorneyPhone(e.target.value)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAttorneyModal(false)}>Cancel</Button>
            <Button variant="success" type="submit">Save Attorney</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Add Case Modal */}
      <Modal show={showCaseModal} onHide={() => setShowCaseModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Open New Legal Case</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddCase}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Case ID / Number</Form.Label>
              <Form.Control type="text" placeholder="e.g. CAS-2026-002" value={caseId} onChange={(e) => setCaseId(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Case Title / Description</Form.Label>
              <Form.Control type="text" placeholder="e.g. Commercial Lease Agreement" value={caseTitle} onChange={(e) => setCaseTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Client</Form.Label>
              <Form.Select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
                {clients.map(cli => (
                  <option key={cli.id} value={cli.name}>{cli.name} ({cli.id})</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assign Attorney</Form.Label>
              <Form.Select value={selectedAttorney} onChange={(e) => setSelectedAttorney(e.target.value)}>
                {attorneys.map(att => (
                  <option key={att.id} value={att.name}>{att.name} ({att.specialization})</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Initial Status</Form.Label>
              <Form.Select value={caseStatus} onChange={(e) => setCaseStatus(e.target.value)}>
                <option value="In Progress">In Progress</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCaseModal(false)}>Cancel</Button>
            <Button variant="success" type="submit">Create Case</Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </Container>
  );
}