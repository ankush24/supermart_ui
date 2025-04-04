import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cart, setCart] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setError(null);
    setResult(null);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/checkout/", {
        items: cart,
      });
      setResult(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.items?.[0] || "Invalid input.");
      } else {
        setError("Something went wrong. Try again.");
      }
    }
  };

  return (
    <div className="app-container">
      <h2>🛒 Supermarket Checkout</h2>
      <input
        className="input-box"
        type="text"
        placeholder="Enter items (e.g. AABBD)"
        value={cart}
        onChange={(e) => setCart(e.target.value.toUpperCase())}
      />
      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-box">
          <h3>Total Price: ₹ {result.total_price}</h3>
          <h4>Breakdown:</h4>
          <ul>
            {Object.entries(result.breakdown).map(([item, details]) => (
              <li key={item}>
                {item}: {details.quantity} x ₹{details.unit_price} = ₹{details.subtotal}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
