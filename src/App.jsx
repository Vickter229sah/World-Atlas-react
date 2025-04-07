import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/Layout/AppLayout";
import "./App.css";

// Define routes here.
import { Home } from "./Pages/Home";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { Country } from "./Pages/Country";
import { ErrorPage } from "./Pages/ErrorPage";
import CountryDetails from "./components/Layout/CountryDetails"; // ✅ Default import without curly braces
import ChatbotButton from "./components/Layout/ChatbotButton";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./User/UserDashboard";
import AddBlog from "./User/AddBlog";
import BlogList from "./User/BlogPage";
import Admin from "./Pages/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "country/:name", // ✅ Match "name" with CountryCard
        element: <CountryDetails />,
      },
      {
        path: "country",
        element: <Country />,
      },
      {
        path:"/login",
        element:<Login />,
      }, 
      {
        path: "/signup",
        element:<Signup />,
      },
      {
        path: "/dashboard",
        element:<Dashboard />,
      },
      {
        path:"/blogs",
        element:<BlogList />,
      },
      {
        path: "/add-blog",
        element: <AddBlog />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      {/* Add ChatbotButton here to make it available on all pages */}
      <ChatbotButton />
    </div>
  );
};
export default App;
