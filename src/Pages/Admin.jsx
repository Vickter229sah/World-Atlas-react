import { useState, useEffect } from "react";
import { auth, db } from "../components/Layout/firebaseConfig";
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where, onSnapshot, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
// Import chart components
import { 
  UserGrowthChart, 
  PopularDestinationsChart, 
  BlogPerformanceChart, 
  PlatformUsageChart 
} from "../components/Admin/AnalyticsCharts";


// Icons
import { FaUsers, FaGlobe, FaChartBar, FaBell, FaShieldAlt, FaDatabase, FaSearch, FaUserEdit, FaTrash, FaFilter } from "react-icons/fa";

// Mock data for users
const mockUsers = [
  { 
    id: "user1", 
    displayName: "John Doe", 
    email: "john@example.com", 
    role: "admin" 
  },
  { 
    id: "user2", 
    displayName: "Jane Smith", 
    email: "jane@example.com", 
    role: "user" 
  },
  { 
    id: "user3", 
    displayName: "Alex Johnson", 
    email: "alex@example.com", 
    role: "user" 
  },
  { 
    id: "user4", 
    displayName: "Mike Wilson", 
    email: "mike@example.com", 
    role: "user" 
  },
  { 
    id: "user5", 
    displayName: "Sarah Brown", 
    email: "sarah@example.com", 
    role: "admin" 
  }
];

// Mock data for blogs
const mockBlogs = [
  {
    id: "blog1",
    title: "Top 10 Places to Visit in Japan",
    description: "Discover the most beautiful and culturally rich destinations across Japan, from Tokyo's bustling streets to Kyoto's serene temples.",
    imageUrl: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "blog2",
    title: "European Road Trip Guide",
    description: "Plan your perfect European road trip with this comprehensive guide covering routes, accommodations, and must-see attractions.",
    imageUrl: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?q=80&w=2010&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "blog3",
    title: "Ultimate Safari Experience in Africa",
    description: "Everything you need to know about planning an unforgettable safari in Africa's most stunning national parks and reserves.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3"
  },
  {
    id: "blog4",
    title: "Hidden Beaches of Southeast Asia",
    description: "Escape the crowds and discover these pristine, lesser-known beaches across Thailand, Vietnam, Philippines, and Indonesia.",
    imageUrl: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=2035&auto=format&fit=crop&ixlib=rb-4.0.3"
  }
];

// Mock data for contact messages
const mockContactMessages = [
  {
    id: "message1",
    name: "David Miller",
    email: "david@example.com",
    subject: "Question about booking",
    message: "I'm trying to book a trip to Paris but having some issues with the payment process. Can you help?",
    timestamp: { toDate: () => new Date(2023, 8, 15) },
    status: "pending"
  },
  {
    id: "message2",
    name: "Lisa Wong",
    email: "lisa@example.com",
    subject: "Feedback on travel guide",
    message: "I just wanted to say that your Barcelona travel guide was incredibly helpful during my recent trip. Thank you!",
    timestamp: { toDate: () => new Date(2023, 8, 12) },
    status: "resolved"
  },
  {
    id: "message3",
    name: "Robert Johnson",
    email: "robert@example.com",
    subject: "Trip cancellation policy",
    message: "Could you please explain your cancellation policy? I might need to reschedule my upcoming trip to Tokyo.",
    timestamp: { toDate: () => new Date(2023, 8, 10) },
    status: "in-progress"
  }
];

const Admin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // State management
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [travelGuides, setTravelGuides] = useState([]);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [contentSearchQuery, setContentSearchQuery] = useState("");
  const [contentTypeFilter, setContentTypeFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [securityLogs, setSecurityLogs] = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);
  const [contactMessages, setContactMessages] = useState([]);

  // Check if the user is logged in
  useEffect(() => {
    // Simple delay to simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  // Load mock user data instead of fetching from Firestore
  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  // Load mock blog data instead of fetching from Firestore
  useEffect(() => {
    setBlogs(mockBlogs);
    setLoadingContent(false);
  }, []);

  // Load mock contact messages instead of fetching from Firestore
  useEffect(() => {
    setContactMessages(mockContactMessages);
  }, []);

  // Filter users based on search query and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email?.toLowerCase().includes(userSearchQuery.toLowerCase()) || 
                         user.displayName?.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesRole = userRoleFilter === "all" || user.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  // Filter content based on search query and type filter
  const filteredContent = () => {
    const allContent = [...blogs, ...countries, ...travelGuides];
    return allContent.filter(item => {
      const matchesSearch = item.title?.toLowerCase().includes(contentSearchQuery.toLowerCase()) || 
                           item.description?.toLowerCase().includes(contentSearchQuery.toLowerCase());
      const matchesType = contentTypeFilter === "all" || 
                        (contentTypeFilter === "blogs" && blogs.includes(item)) ||
                        (contentTypeFilter === "countries" && countries.includes(item)) ||
                        (contentTypeFilter === "guides" && travelGuides.includes(item));
      return matchesSearch && matchesType;
    });
  };

  // Handle deleting a user (mock function)
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        // Mock deletion - just update the state
        setUsers(users.filter(user => user.id !== userId));
        alert("User deleted successfully");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      }
    }
  };

  // Handle updating user role (mock function)
  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      // Mock update - just update the state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      alert(`User role updated to ${newRole}`);
    } catch (error) {
      console.error("Error updating user role:", error);
      alert("Failed to update user role");
    }
  };

  // Loading screen
  if (isLoading) {
    return <div className="loading-container">Loading admin panel...</div>;
  }

  // Render Admin Dashboard
  return (
    <div className="admin-dashboard">

       <aside className="admin-sidebar">
        <h2>🌍 Admin Panel</h2>
        
        <ul>
        <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
          <FaUsers /> User Management
        </li>        
        <li className={activeTab === "content" ? "active" : ""} onClick={() => setActiveTab("content")}>
          <FaGlobe /> Content Management
        </li>
        <li className={activeTab === "analytics" ? "active" : ""} onClick={() => setActiveTab("analytics")}>
          <FaChartBar /> Analytics & Reports
        </li>
        <li className={activeTab === "notifications" ? "active" : ""} onClick={() => setActiveTab("notifications")}>
          <FaBell /> Notifications & Support
        </li>
        <li className={activeTab === "security" ? "active" : ""} onClick={() => setActiveTab("security")}>
          <FaShieldAlt /> Security & Logs
        </li>
        <li className={activeTab === "backup" ? "active" : ""} onClick={() => setActiveTab("backup")}>
          <FaDatabase /> Backup & Restore
        </li>
        </ul>
      </aside>
      {/* Sidebar */}
      
    
      {/* Main Content */}
      <main className="admin-content">
        <header className="admin-header">
          <h1>WorldAtlas Admin Dashboard</h1>
          <div className="admin-user">
            <img src="https://i.pravatar.cc/40" alt="Admin" />
            <span>Admin User</span>
          </div>
        </header>

        {/* User Management */}
        {activeTab === "users" && (
          <div className="admin-panel">
            <h2>User Management</h2>
            
            <div className="panel-actions">
              <div className="search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="filter-box">
                <FaFilter />
                <select 
                  value={userRoleFilter} 
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="user">Users</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.id.substring(0, 8)}...</td>
                      <td>{user.displayName || "N/A"}</td>
                      <td>{user.email}</td>
                      <td>
                        <select 
                          defaultValue={user.role || "user"}
                          onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="action-buttons">
                        <button className="edit-btn"><FaUserEdit /></button>
                        <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Content Management */}
        {activeTab === "content" && (
          <div className="admin-panel">
            <h2>Content Management</h2>
            
            <div className="panel-actions">
              <div className="search-box">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={contentSearchQuery}
                  onChange={(e) => setContentSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="filter-box">
                <FaFilter />
                <select 
                  value={contentTypeFilter} 
                  onChange={(e) => setContentTypeFilter(e.target.value)}
                >
                  <option value="all">All Content</option>
                  <option value="countries">Countries</option>
                  <option value="blogs">Blogs</option>
                  <option value="guides">Travel Guides</option>
                </select>
              </div>
            </div>

            <div className="content-tabs">
              <button className={contentTypeFilter === "all" || contentTypeFilter === "blogs" ? "active" : ""} onClick={() => setContentTypeFilter("blogs")}>Blogs</button>
              <button className={contentTypeFilter === "countries" ? "active" : ""} onClick={() => setContentTypeFilter("countries")}>Countries</button>
              <button className={contentTypeFilter === "guides" ? "active" : ""} onClick={() => setContentTypeFilter("guides")}>Travel Guides</button>
            </div>

            <div className="content-grid">
              {loadingContent ? (
                <p>Loading content...</p>
              ) : (
                contentTypeFilter === "all" || contentTypeFilter === "blogs" ? (
                  blogs.map(blog => (
                    <div className="content-card" key={blog.id}>
                      <img src={blog.imageUrl || "https://placehold.co/600x400?text=Blog+Image"} alt={blog.title} />
                      <div className="content-info">
                        <h3>{blog.title}</h3>
                        <p>{blog.description?.substring(0, 100)}...</p>
                        <div className="content-actions">
                          <button className="edit-btn">Edit</button>
                          <button className="delete-btn">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No content to display for this type</p>
                )
              )}
            </div>
          </div>
        )}

        {/* Analytics & Reports */}
        {activeTab === "analytics" && (
          <div className="admin-panel">
            <h2>Analytics & Reports</h2>
            
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>User Analytics</h3>
                <UserGrowthChart />
              </div>
              
              <div className="analytics-card">
                <h3>Popular Destinations</h3>
                <PopularDestinationsChart />
              </div>
              
              <div className="analytics-card">
                <h3>Blog Performance</h3>
                <BlogPerformanceChart />
              </div>
              
              <div className="analytics-card">
                <h3>Platform Usage</h3>
                <PlatformUsageChart />
              </div>
            </div>
          </div>
        )}

        {/* Notifications & Support */}
        {activeTab === "notifications" && (
          <div className="admin-panel">
            <h2>Notifications & Support</h2>
            
            <div className="sub-tabs">
              <button className="active">Contact Messages</button>
              <button>Send Notifications</button>
            </div>
            
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contactMessages.length > 0 ? (
                    contactMessages.map(message => (
                      <tr key={message.id}>
                        <td>{message.id.substring(0, 8)}...</td>
                        <td>{message.name}</td>
                        <td>{message.email}</td>
                        <td>{message.subject || "N/A"}</td>
                        <td>{message.message.substring(0, 50)}...</td>
                        <td>{message.timestamp ? new Date(message.timestamp.toDate()).toLocaleDateString() : "N/A"}</td>
                        <td>
                          <select defaultValue={message.status || "pending"}>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </td>
                        <td className="action-buttons">
                          <button className="view-btn">View</button>
                          <button className="reply-btn">Reply</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8">No contact messages found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="notification-form" style={{ display: "none" }}>
              <h3>Send Notification</h3>
              <form>
                <div className="form-group">
                  <label>Recipient Type</label>
                  <select>
                    <option value="all">All Users</option>
                    <option value="admins">Admins Only</option>
                    <option value="specific">Specific Users</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="Notification subject" />
                </div>
                
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="Notification message"></textarea>
                </div>
                
                <button type="submit" className="send-btn">Send Notification</button>
              </form>
            </div>
          </div>
        )}

        {/* Security & Logs */}
        {activeTab === "security" && (
          <div className="admin-panel">
            <h2>Security & Logs</h2>
            
            <div className="security-stats">
              <div className="stat-card">
                <h3>Failed Login Attempts</h3>
                <p className="stat-value">24</p>
                <p className="stat-period">Last 7 days</p>
              </div>
              
              <div className="stat-card">
                <h3>New Account Creations</h3>
                <p className="stat-value">12</p>
                <p className="stat-period">Last 7 days</p>
              </div>
              
              <div className="stat-card">
                <h3>Password Resets</h3>
                <p className="stat-value">8</p>
                <p className="stat-period">Last 7 days</p>
              </div>
              
              <div className="stat-card">
                <h3>Security Alerts</h3>
                <p className="stat-value">3</p>
                <p className="stat-period">Last 7 days</p>
              </div>
            </div>
            
            <div className="log-container">
              <h3>Recent Activity Logs</h3>
              
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>User</th>
                      <th>IP Address</th>
                      <th>Action</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2023-09-10 14:23:45</td>
                      <td>admin@worldatlas.com</td>
                      <td>192.168.1.1</td>
                      <td>Login</td>
                      <td className="success">Success</td>
                    </tr>
                    <tr>
                      <td>2023-09-10 13:45:12</td>
                      <td>user@example.com</td>
                      <td>192.168.1.2</td>
                      <td>Login</td>
                      <td className="failed">Failed</td>
                    </tr>
                    <tr>
                      <td>2023-09-10 12:30:08</td>
                      <td>admin@worldatlas.com</td>
                      <td>192.168.1.1</td>
                      <td>Updated country data</td>
                      <td className="success">Success</td>
                    </tr>
                    <tr>
                      <td>2023-09-10 11:15:33</td>
                      <td>newuser@example.com</td>
                      <td>192.168.1.3</td>
                      <td>Account creation</td>
                      <td className="success">Success</td>
                    </tr>
                    <tr>
                      <td>2023-09-10 10:05:21</td>
                      <td>user@example.com</td>
                      <td>192.168.1.2</td>
                      <td>Password reset</td>
                      <td className="success">Success</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Backup & Restore */}
        {activeTab === "backup" && (
          <div className="admin-panel">
            <h2>Backup & Restore</h2>
            
            <div className="backup-actions">
              <button className="backup-btn">Create New Backup</button>
              <button className="restore-btn">Restore from Backup</button>
            </div>
            
            <div className="backup-history">
              <h3>Backup History</h3>
              
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Size</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2023-09-10 00:00:00</td>
                      <td>24.5 MB</td>
                      <td>Full Backup</td>
                      <td className="success">Completed</td>
                      <td className="action-buttons">
                        <button className="download-btn">Download</button>
                        <button className="restore-btn">Restore</button>
                        <button className="delete-btn">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>2023-09-09 00:00:00</td>
                      <td>24.2 MB</td>
                      <td>Full Backup</td>
                      <td className="success">Completed</td>
                      <td className="action-buttons">
                        <button className="download-btn">Download</button>
                        <button className="restore-btn">Restore</button>
                        <button className="delete-btn">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>2023-09-08 00:00:00</td>
                      <td>23.8 MB</td>
                      <td>Full Backup</td>
                      <td className="success">Completed</td>
                      <td className="action-buttons">
                        <button className="download-btn">Download</button>
                        <button className="restore-btn">Restore</button>
                        <button className="delete-btn">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td>2023-09-07 00:00:00</td>
                      <td>23.5 MB</td>
                      <td>Full Backup</td>
                      <td className="success">Completed</td>
                      <td className="action-buttons">
                        <button className="download-btn">Download</button>
                        <button className="restore-btn">Restore</button>
                        <button className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="backup-settings">
              <h3>Backup Settings</h3>
              
              <form>
                <div className="form-group">
                  <label>Automatic Backup</label>
                  <select>
                    <option value="daily">Daily</option>
                    <option value="weekly" selected>Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Backup Retention</label>
                  <select>
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30" selected>30 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Backup Type</label>
                  <select>
                    <option value="full" selected>Full Backup</option>
                    <option value="incremental">Incremental Backup</option>
                  </select>
                </div>
                
                <button type="submit" className="save-btn">Save Settings</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin; 