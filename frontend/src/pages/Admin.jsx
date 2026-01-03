import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Phone, Building2, Calendar, MessageSquare, Send, Trash2, CheckCircle, Clock, Eye, X, LogOut, RefreshCw, Users, Inbox, CheckCheck } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, responded: 0 });
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('adminAuth');
    if (savedAuth) {
      const { username, password } = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      fetchData(username, password);
    }
  }, []);

  const getAuthHeader = () => {
    const savedAuth = sessionStorage.getItem('adminAuth');
    if (savedAuth) {
      const { username, password } = JSON.parse(savedAuth);
      return {
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      };
    }
    return {};
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/admin/login`, {
        username,
        password
      });
      if (response.data.success) {
        sessionStorage.setItem('adminAuth', JSON.stringify({ username, password }));
        setIsAuthenticated(true);
        toast.success('Login successful!');
        fetchData(username, password);
      }
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setSubmissions([]);
    setUsername('');
    setPassword('');
    toast.success('Logged out successfully');
  };

  const fetchData = async (user, pass) => {
    setLoading(true);
    try {
      const authHeader = {
        'Authorization': 'Basic ' + btoa(`${user}:${pass}`)
      };
      
      const [submissionsRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/submissions`, { headers: authHeader }),
        axios.get(`${API_URL}/api/admin/stats`, { headers: authHeader })
      ]);
      
      setSubmissions(submissionsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    const savedAuth = sessionStorage.getItem('adminAuth');
    if (savedAuth) {
      const { username, password } = JSON.parse(savedAuth);
      fetchData(username, password);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `${API_URL}/api/admin/submissions/${id}/status`,
        { status },
        { headers: getAuthHeader() }
      );
      toast.success(`Status updated to ${status}`);
      refreshData();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleRespond = async () => {
    if (!responseText.trim()) {
      toast.error('Please enter a response');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/api/admin/submissions/${selectedSubmission.id}/respond`,
        {
          submission_id: selectedSubmission.id,
          response_text: responseText,
          send_email: sendEmail
        },
        { headers: getAuthHeader() }
      );
      toast.success(response.data.message);
      setShowResponseModal(false);
      setResponseText('');
      setSelectedSubmission(null);
      refreshData();
    } catch (error) {
      toast.error('Failed to send response');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API_URL}/api/admin/submissions/${deleteId}`,
        { headers: getAuthHeader() }
      );
      toast.success('Submission deleted');
      setShowDeleteModal(false);
      setDeleteId(null);
      refreshData();
    } catch (error) {
      toast.error('Failed to delete submission');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      responded: 'bg-green-500/20 text-green-400 border-green-500/50',
      archived: 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    };
    return styles[status] || styles.pending;
  };

  // Login Form
  if (!isAuthenticated) {
    return (
      <div className="page-container">
        <section className="page-hero">
          <div className="page-hero-content">
            <h1 className="page-hero-title">Admin Portal</h1>
            <p className="page-hero-description">Secure access to manage contact submissions</p>
          </div>
        </section>
        
        <section className="contact-section">
          <div className="admin-login-container">
            <div className="admin-login-card">
              <div className="admin-login-icon">
                <Lock size={48} />
              </div>
              <h2 className="admin-login-title">Admin Login</h2>
              <form onSubmit={handleLogin} className="admin-login-form">
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary btn-large w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                  <Lock size={20} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="page-container">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-hero-title">Admin Dashboard</h1>
          <p className="page-hero-description">Manage contact submissions and respond to queries</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="admin-stats-section">
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon">
              <Users size={32} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-number">{stats.total}</span>
              <span className="admin-stat-label">Total Submissions</span>
            </div>
          </div>
          <div className="admin-stat-card pending">
            <div className="admin-stat-icon">
              <Inbox size={32} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-number">{stats.pending}</span>
              <span className="admin-stat-label">Pending</span>
            </div>
          </div>
          <div className="admin-stat-card responded">
            <div className="admin-stat-icon">
              <CheckCheck size={32} />
            </div>
            <div className="admin-stat-info">
              <span className="admin-stat-number">{stats.responded}</span>
              <span className="admin-stat-label">Responded</span>
            </div>
          </div>
        </div>
        <div className="admin-actions">
          <button onClick={refreshData} className="btn-secondary" disabled={loading}>
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </section>

      {/* Submissions Table */}
      <section className="admin-table-section">
        <h2 className="section-title">Contact Submissions</h2>
        {submissions.length === 0 ? (
          <div className="admin-empty-state">
            <Inbox size={64} />
            <p>No submissions yet</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub.id}>
                    <td>
                      <div className="admin-date">
                        <Calendar size={14} />
                        {formatDate(sub.submitted_at)}
                      </div>
                    </td>
                    <td className="admin-name">{sub.name}</td>
                    <td>
                      <div className="admin-email">
                        <Mail size={14} />
                        {sub.email}
                      </div>
                    </td>
                    <td>{sub.company || '-'}</td>
                    <td>
                      <span className={`admin-status-badge ${getStatusBadge(sub.status || 'pending')}`}>
                        {sub.status || 'pending'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions-cell">
                        <button
                          onClick={() => setSelectedSubmission(sub)}
                          className="admin-action-btn view"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSubmission(sub);
                            setShowResponseModal(true);
                          }}
                          className="admin-action-btn respond"
                          title="Respond"
                        >
                          <Send size={16} />
                        </button>
                        <button
                          onClick={() => updateStatus(sub.id, sub.status === 'responded' ? 'pending' : 'responded')}
                          className="admin-action-btn status"
                          title="Toggle Status"
                        >
                          {sub.status === 'responded' ? <Clock size={16} /> : <CheckCircle size={16} />}
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(sub.id);
                            setShowDeleteModal(true);
                          }}
                          className="admin-action-btn delete"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* View Details Modal */}
      {selectedSubmission && !showResponseModal && (
        <div className="admin-modal-overlay" onClick={() => setSelectedSubmission(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Submission Details</h3>
              <button onClick={() => setSelectedSubmission(null)} className="admin-modal-close">
                <X size={24} />
              </button>
            </div>
            <div className="admin-modal-content">
              <div className="admin-detail-row">
                <span className="admin-detail-label">Name:</span>
                <span className="admin-detail-value">{selectedSubmission.name}</span>
              </div>
              <div className="admin-detail-row">
                <span className="admin-detail-label">Email:</span>
                <span className="admin-detail-value">{selectedSubmission.email}</span>
              </div>
              <div className="admin-detail-row">
                <span className="admin-detail-label">Phone:</span>
                <span className="admin-detail-value">{selectedSubmission.phone || 'Not provided'}</span>
              </div>
              <div className="admin-detail-row">
                <span className="admin-detail-label">Company:</span>
                <span className="admin-detail-value">{selectedSubmission.company || 'Not provided'}</span>
              </div>
              <div className="admin-detail-row">
                <span className="admin-detail-label">Submitted:</span>
                <span className="admin-detail-value">{formatDate(selectedSubmission.submitted_at)}</span>
              </div>
              <div className="admin-detail-row full">
                <span className="admin-detail-label">Message:</span>
                <p className="admin-detail-message">{selectedSubmission.message}</p>
              </div>
              {selectedSubmission.admin_response && (
                <div className="admin-detail-row full">
                  <span className="admin-detail-label">Your Response:</span>
                  <p className="admin-detail-response">{selectedSubmission.admin_response}</p>
                  <small className="admin-detail-meta">
                    Sent: {formatDate(selectedSubmission.response_sent_at)}
                    {selectedSubmission.response_email_sent && ' (Email sent)'}
                  </small>
                </div>
              )}
            </div>
            <div className="admin-modal-footer">
              <button
                onClick={() => {
                  setShowResponseModal(true);
                }}
                className="btn-primary"
              >
                <Send size={18} />
                Respond
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Response Modal */}
      {showResponseModal && selectedSubmission && (
        <div className="admin-modal-overlay" onClick={() => setShowResponseModal(false)}>
          <div className="admin-modal large" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Respond to {selectedSubmission.name}</h3>
              <button onClick={() => setShowResponseModal(false)} className="admin-modal-close">
                <X size={24} />
              </button>
            </div>
            <div className="admin-modal-content">
              <div className="admin-original-message">
                <strong>Original Message:</strong>
                <p>{selectedSubmission.message}</p>
              </div>
              <div className="form-group">
                <label className="form-label">Your Response</label>
                <textarea
                  className="form-textarea"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type your response here..."
                  rows={6}
                />
              </div>
              <div className="admin-checkbox-group">
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                  />
                  <span>Send email to customer</span>
                  <small>(Email will be sent if SMTP is configured)</small>
                </label>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button onClick={() => setShowResponseModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleRespond} className="btn-primary" disabled={loading}>
                {loading ? 'Sending...' : 'Send Response'}
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="admin-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="admin-modal small" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Confirm Delete</h3>
              <button onClick={() => setShowDeleteModal(false)} className="admin-modal-close">
                <X size={24} />
              </button>
            </div>
            <div className="admin-modal-content">
              <p>Are you sure you want to delete this submission? This action cannot be undone.</p>
            </div>
            <div className="admin-modal-footer">
              <button onClick={() => setShowDeleteModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn-danger">
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
