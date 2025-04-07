import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// User Growth Data (mock data)
const userGrowthData = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 150 },
  { month: 'Mar', users: 190 },
  { month: 'Apr', users: 250 },
  { month: 'May', users: 310 },
  { month: 'Jun', users: 370 },
  { month: 'Jul', users: 420 },
];

// Popular Destinations Data (mock data)
const popularDestinationsData = [
  { country: 'USA', visits: 1200 },
  { country: 'Japan', visits: 980 },
  { country: 'France', visits: 860 },
  { country: 'Italy', visits: 750 },
  { country: 'Australia', visits: 620 },
];

// Blog Performance Data (mock data)
const blogPerformanceData = [
  { month: 'Jan', views: 320 },
  { month: 'Feb', views: 480 },
  { month: 'Mar', views: 590 },
  { month: 'Apr', views: 820 },
  { month: 'May', views: 950 },
  { month: 'Jun', views: 1100 },
  { month: 'Jul', views: 1250 },
];

// Platform Usage Data (mock data)
const platformUsageData = [
  { name: 'Mobile', value: 65 },
  { name: 'Desktop', value: 30 },
  { name: 'Tablet', value: 5 },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export const UserGrowthChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={userGrowthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="users" stroke="#3498db" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const PopularDestinationsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={popularDestinationsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="country" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="visits" fill="#3498db" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const BlogPerformanceChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={blogPerformanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="views" stroke="#2ecc71" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};


export const PlatformUsageChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={platformUsageData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {platformUsageData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}; 