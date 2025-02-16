import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import "./Categories.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["a1.jpg", "a2.jpg", "a3.jpg", "a4.jpg"];

  useEffect(() => {
    const loggedInEmail = sessionStorage.getItem("loggedInEmail") || Cookies.get("loggedInEmail");
    const userRole = sessionStorage.getItem("userRole") || Cookies.get("userRole");
  
    // Redirect if no logged-in user or incorrect role
    if (!loggedInEmail || userRole !== "Admin") {
      navigate("/", { replace: true });
      return;
    }
  
    fetchCategories();
  
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
  
    return () => clearInterval(interval);
  }, [images.length, navigate]); // Added navigate to dependencies
  

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const validateCategoryName = () => {
    if (!newCategoryName.trim()) {
      setError("Category name is required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddOrEditCategory = async () => {
    if (!validateCategoryName()) return;

    try {
      if (editCategoryId) {
        await axios.put(`http://localhost:8080/api/category/${editCategoryId}`, {
          categoryName: newCategoryName,
        });
      } else {
        await axios.post("http://localhost:8080/api/addcategory", {
          categoryName: newCategoryName,
        });
      }
      fetchCategories();
      setNewCategoryName("");
      setEditCategoryId(null);
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error adding/updating category:", error);
    }
  };

  const handleRemoveCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/category/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Error removing category:", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditCategoryId(category.categoryId);
    setNewCategoryName(category.categoryName);
    setIsFormVisible(true);
  };

  return (
    <div><Header />
    <div className="categories-page">
      
      <div className="background-slideshow" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/${images[currentImageIndex]})` }}></div>
      
      <div className="categories-layout">
        {/* Left Side Message Box */}
        <div className="admin-message-box">
          <h2>Manage Categories</h2>
          <br></br>
          <p>Organizing e-waste into categories helps streamline disposal, improve tracking, and promote responsible recycling, ensuring a more sustainable future.</p>
        
          <button onClick={() => setIsFormVisible(true)} className="toggle-form-btn">Add Category</button>
        </div>

        {/* Right Side Table */}
        <table 
  className="categories-table" 
  style={{ marginTop: "-130px", backgroundColor: "rgba(255, 255, 255, 0.4)" }} // Adjust opacity as needed
>


          <thead>
            <tr>
              <th style={{ backgroundColor: "green" }}>ID</th>
              <th style={{ backgroundColor: "green" }}>Category Name</th>
              <th style={{ backgroundColor: "green" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.categoryId}>
                <td>{category.categoryId}</td>
                <td>{category.categoryName}</td>
                <td>
                  <button onClick={() => handleEditCategory(category)} className="edit-btn">Edit</button>
                  <button onClick={() => handleRemoveCategory(category.categoryId)} className="remove-btn">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Centered Form */}
      {isFormVisible && (
        <div className="form-overlay">
          <div className="form-container">
            <label htmlFor="category-name" className="form-label">
              {editCategoryId ? "Edit Category Name:" : "Category Name:"}
            </label>
            <input
              id="category-name"
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="input-field"
              placeholder="Enter category name"
            />
            {error && <div className="error-message">{error}</div>}
            <div className="form-actions">
              <button onClick={handleAddOrEditCategory} className="submit-btn">{editCategoryId ? "Update" : "Submit"}</button>
              <button onClick={() => setIsFormVisible(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 GreenBoard. Making e-waste management sustainable.</p>
        </div>
      </footer>
    </div></div>
  );
}

export default Categories;
