import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../components/Layout/firebaseConfig";


const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("cloud_name", "dxqlgdcpu");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dxqlgdcpu/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return response.ok ? data.secure_url : null;
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      alert("Cloudinary upload failed.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to post a blog.");
      return;
    }

    setLoading(true);
    let imageUrl = "";

    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
      if (!imageUrl) {
        alert("Image upload failed.");
        setLoading(false);
        return;
      }
    }

    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
        timestamp: serverTimestamp(),
        imageUrl,
      });

      alert("Blog post added!");
      setTitle("");
      setContent("");
      setImage(null);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert("Failed to save blog post.");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Scrollable Form */}
      <div className="blog-container">
        <h2 className="blog-title">Add New Blog Post</h2>
        <div className="scrollable-container">
          <form onSubmit={handleSubmit} className="blog-form">
            <input
              type="text"
              placeholder="Enter Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input-field"
            />
            <textarea
              placeholder="Write your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="textarea-field"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="file-input"
            />
            {uploadProgress > 0 && (
              <p className="upload-progress">Uploading: {uploadProgress.toFixed(0)}%</p>
            )}
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
