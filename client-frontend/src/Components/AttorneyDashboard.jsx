import React, { useState } from 'react';
import './ClientDashboard.css';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearAuthSession } from '../auth';

export default function AttorneyDashboard() {
  const navigate = useNavigate();

  // Assigned Cases State (Read-only view for attorney)
  const [assignedCases] = useState([
    { id: 'CAS-2026-001', client: 'Jane Doe', title: 'Property Transfer Agreement', status: 'In Progress', nextDeadline: '2026-10-15' }
  ]);

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Draft deed of sale document', caseId: 'CAS-2026-001', dueDate: '2026-10-05', completed: false }
  ]);

  // Modal State for Adding Task
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCaseId, setTaskCaseId] = useState('CAS-2026-001');
  const [taskDueDate, setTaskDueDate] = useState('');

  // Logout Handler
  const handleLogout = () => {
    clearAuthSession(); // Clears JWT token from localStorage
    navigate('/');      // Redirects to login page
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      caseId: taskCaseId,
      dueDate: taskDueDate || '2026-10-30',
      completed: false
    };
    setTasks([...tasks, newTask]);
    setShowTaskModal(false);
    setTaskTitle(''); setTaskDueDate('');
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  return (
    <Container fluid className="dashboard-container p-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="text-white mb-1">Attorney Portal</h2>
          <p className="text-light mb-0">Manage your assigned legal cases and track daily tasks.</p>
        </Col>
        <Col xs="auto">
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      {/* Assigned Cases Section */}
      <Card className="case-card p-4 shadow-sm mb-4">
        <h5 className="mb-3">Assigned Legal Cases</h5>
        <Table responsive hover className="align-middle">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Client Name</th>
              <th>Case Title</th>
              <th>Status</th>
              <th>Next Deadline</th>
            </tr>
          </thead>
          <tbody>
            {assignedCases.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.client}</td>
                <td>{c.title}</td>
                <td><Badge bg="warning" text="dark">{c.status}</Badge></td>
                <td>{c.nextDeadline}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Task Tracking Section */}
      <Card className="case-card p-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Task Tracker & To-Do List</h5>
          <Button variant="primary" size="sm" onClick={() => setShowTaskModal(true)}>
            + Add New Task
          </Button>
        </div>

        <Table responsive hover className="align-middle">
          <thead>
            <tr>
              <th>Status</th>
              <th>Task Description</th>
              <th>Related Case</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td>
                  <Badge bg={t.completed ? 'success' : 'secondary'}>
                    {t.completed ? 'Completed' : 'Pending'}
                  </Badge>
                </td>
                <td className={t.completed ? 'text-muted text-decoration-line-through' : ''}>{t.title}</td>
                <td>{t.caseId}</td>
                <td>{t.dueDate}</td>
                <td>
                  <Button 
                    variant={t.completed ? 'outline-secondary' : 'outline-success'} 
                    size="sm"
                    onClick={() => toggleTaskCompletion(t.id)}
                  >
                    {t.completed ? 'Mark Pending' : 'Mark Complete'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Add Task Modal */}
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddTask}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Task Description</Form.Label>
              <Form.Control type="text" placeholder="e.g. Review contract clauses" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Associated Case</Form.Label>
              <Form.Select value={taskCaseId} onChange={(e) => setTaskCaseId(e.target.value)}>
                {assignedCases.map(c => (
                  <option key={c.id} value={c.id}>{c.id} - {c.title}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowTaskModal(false)}>Cancel</Button>
            <Button variant="success" type="submit">Save Task</Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </Container>
  );
}