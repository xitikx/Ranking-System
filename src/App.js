import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css"; // Import custom styles

// Header Component
function Header() {
  return (
    <header className="header">
      <h1 className="animated-title">Ranking System</h1>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="address">
        <p>Address: 123 Main Street, City, Country</p>
      </div>
      <div className="social-media">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </footer>
  );
}

// Welcome Page
function WelcomePage() {
  return (
    <div className="welcome">
      <h2>Welcome to the Ranking System!</h2>
      <p>Click below to start ranking your items.</p>
      <Link to="/add-items">
        <button className="add-item-btn">Add Item</button>
      </Link>
    </div>
  );
}

// Thank You Page
function ThankYouPage() {
  return (
    <div className="thank-you-page">
      <h2>Thank You!</h2>
      <p>Your item selection has been successfully submitted.</p>
    </div>
  );
}

// Item Selection Page
function ItemSelectionPage() {
  const items = [
    "Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10"
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // For navigation

  const toggleItemSelection = (item) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(item)
        ? prevItems.filter((i) => i !== item)
        : [...prevItems, item]
    );
  };

  const handleSubmit = () => {
    if (selectedItems.length < 2 || selectedItems.length > 5) {
      alert("You need to select between 2 and 5 items.");
    } else {
      setIsModalOpen(true); // Open the modal when the "Okay" button is clicked
    }
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("draggedItemIndex", index); // Store index of the dragged item
  };

  const handleDrop = (e, index) => {
    const draggedItemIndex = e.dataTransfer.getData("draggedItemIndex");
    const updatedItems = [...selectedItems];

    // Move the dragged item to the new position
    const draggedItem = updatedItems[draggedItemIndex];
    updatedItems.splice(draggedItemIndex, 1); // Remove from the old position
    updatedItems.splice(index, 0, draggedItem); // Insert at the new position

    setSelectedItems(updatedItems); // Update the state with the new order
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow dropping
  };

  // Navigate to Thank You page when the modal is submitted
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    navigate("/thank-you"); // Navigate to Thank You page
  };

  return (
    <div className="item-selection">
      <h2>Select Items</h2>
      <div className="items-list">
        {items.map((item) => (
          <div key={item} className="item">
            <input
              type="checkbox"
              id={item}
              checked={selectedItems.includes(item)}
              onChange={() => toggleItemSelection(item)}
            />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Okay</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Selected Items</h3>
            <ul>
              {selectedItems.map((item, index) => (
                <li
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragOver={handleDragOver}
                >
                  {item}
                </li>
              ))}
            </ul>
            <button onClick={handleCloseModal}>Submit</button> {/* Close and navigate */}
          </div>
        </div>
      )}
    </div>
  );
}

// App Component (Main Entry)
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/add-items" element={<ItemSelectionPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} /> {/* Thank You Page Route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
