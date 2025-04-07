import "./Dashboard.css";
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🌍 WorldAtlas</h2>
        <ul>
          <li><a href="/">🏠 Home</a></li>
          <li><a href="/add-blog">📝 Add Blog</a></li>
          <li><a href="#">📌 Saved Trips</a></li>
          <li><a href="#">🔍 Search Destinations</a></li>
          <li><a href="#">💼 My Bookings</a></li>
          <li><a href="#">📅 Travel Planner</a></li>
          <li><a href="#">⚙️ Settings</a></li>
          <li><a href="#">🚪 Logout</a></li>
        </ul>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        {/* Profile Section */}
        <div className="profile-card">
          <img src="https://i.pravatar.cc/100" alt="User Avatar" />
          <h3>Hello, Traveler! ✈️</h3>
          <p>Welcome back to your travel hub</p>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <button>+ Add New Trip</button>
          <button>📌 View Saved Trips</button>
          <button>🗺️ Explore Destinations</button>
        </div>

        {/* Dashboard Cards */}
        <div className="cards1-container">
          <div className="card2">
            <h3>Saved Trips</h3>
            <p>View and edit your saved destinations.</p>
          </div>
          <div className="card2">
            <h3>Recent Searches</h3>
            <p>Access your past searches easily.</p>
          </div>
          <div className="card2">
            <h3>Travel Planner</h3>
            <p>Plan your upcoming trips efficiently.</p>
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default Dashboard;
