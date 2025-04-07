import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../components/Layout/firebaseConfig"; // Adjust path if needed
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaEllipsisV } from "react-icons/fa"; // ThreeDotsVertical icon
import "./BlogPage.css"; // Add external CSS for styles

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [menuOpen, setMenuOpen] = useState(null); // Tracks which menu is open

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    fetchBlogs();
  }, []);

  // Fetch blog posts
  const fetchBlogs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : null,
      }));
      setBlogs(blogData);
    } catch (error) {
      console.error("Error fetching blog posts: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown date";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(timestamp);
  };

  // Delete a blog post
  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "blogs", blogId));
        setBlogs(blogs.filter((blog) => blog.id !== blogId));
      } catch (error) {
        console.error("Error deleting blog post: ", error);
      }
    }
  };

  // Start editing
  const handleEdit = (blog) => {
    setEditingPost(blog.id);
    setUpdatedTitle(blog.title);
    setUpdatedContent(blog.content);
    setMenuOpen(null); // Close menu
  };

  // Save update
  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "blogs", editingPost), {
        title: updatedTitle,
        content: updatedContent,
      });

      setBlogs(
        blogs.map((blog) =>
          blog.id === editingPost ? { ...blog, title: updatedTitle, content: updatedContent } : blog
        )
      );

      setEditingPost(null);
    } catch (error) {
      console.error("Error updating blog post: ", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-page">
      <h2 className="page-title">Blog Posts</h2>
      {blogs.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <div className="blog-posts">
          {blogs.map((blog, index) => (
            <div key={blog.id} className={`blog-post ${index % 2 === 0 ? "text-left" : "text-right"}`}>
              
              {/* ThreeDotsVertical Menu (Only for Post Owner) */}
              {currentUser && currentUser.uid === blog.authorId && (
                <div className="post-options">
                  <FaEllipsisV
                    className="options-icon"
                    onClick={() => setMenuOpen(menuOpen === blog.id ? null : blog.id)}
                  />
                  {menuOpen === blog.id && (
                    <div className="dropdown-menu">
                      <button onClick={() => handleEdit(blog)}>✏️ Edit Post</button>
                      <button onClick={() => handleDelete(blog.id)}>🗑️ Delete Post</button>
                    </div>
                  )}
                </div>
              )}

              {/* Author's Profile Image */}
              <div className="text-content">
                <img
                  src={blog.authorPhoto || "https://via.placeholder.com/150"}
                  alt={blog.authorName}
                  className="profile-image"
                />
                <h3>{blog.title}</h3>
                <p style={{ color: "#06b0bc" }}>
                  <strong>Posted on: </strong>{formatTimestamp(blog.timestamp)}
                </p>
                <p style={{ color: "#69d5e8" }}>
                  <strong>Author:</strong> {blog.authorName}
                </p>

                {/* Edit Mode */}
                {editingPost === blog.id ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <textarea
                      value={updatedContent}
                      onChange={(e) => setUpdatedContent(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingPost(null)}>Cancel</button>
                  </div>
                ) : (
                  <p>{blog.content}</p>
                )}
              </div>

              {/* Blog Post Image */}
              {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
