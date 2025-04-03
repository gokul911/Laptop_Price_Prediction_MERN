import React, { useState } from "react";
import axios from "axios";

const LaptopPricePredictor = () => {
  const [formData, setFormData] = useState({
      brand: "",
      processor: "",
      CPU: "",
      GPU: "",
      OS: "",
      Ram: 8,
      ROM: 256
  });

  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleChange = (e) => {
    const {name, value} = e.target;

      setFormData(
        { 
          ...formData, 
          [name]: name === "Ram" || name === "ROM" ? parseInt(value) : value 
        }
      );
  };

  const handleSubmit = async () => {
      try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/predict`, formData);
          setPredictedPrice(response.data.predicted_price);
      } catch (error) {
          setPredictedPrice(0);
          console.error("Error fetching prediction:", error);
      }
  };

  return (
    <div className="container">
      <h1>Laptop Price Predictor</h1>

      <div className="form-group">
        <label>Brand</label>
        <select name="brand" onChange={handleChange}>
          <option value="">Select Brand</option>
          <option value="Dell">Dell</option>
          <option value="HP">HP</option>
          <option value="Lenovo">Lenovo</option>
          <option value="Asus">Asus</option>
          <option value="Apple">Apple</option>
        </select>
      </div>

      <div className="form-group">
        <label>Processor</label>
        <select  name="processor" onChange={handleChange}>
          <option value="">Select Processor</option>
          <option value="Intel Core i3">Intel Core i3</option>
          <option value="Intel Core i5">Intel Core i5</option>
          <option value="Intel Core i7">Intel Core i7</option>
          <option value="Ryzen 5">AMD Ryzen 5</option>
          <option value="Ryzen 7">AMD Ryzen 7</option>
        </select>
      </div>

      <div className="form-group">
        <label>CPU</label>
        <select name="CPU" onChange={handleChange}>
            <option value="">Select</option>
            <option value="Dual Core">Dual Core</option>
            <option value="Quad Core">Quad Core</option>
            <option value="Hexa Core">Hexa Core</option>
            <option value="Octa Core">Octa Core</option>
        </select>
      </div>

      <div className="form-group">
        <label>GPU</label>
        <select name="GPU" onChange={handleChange}>
            <option value="">Select</option>
            <option value="Intel">Intel</option>
            <option value="NVIDIA">NVIDIA</option>
            <option value="AMD">AMD</option>
        </select>
      </div>

      <div className="form-group">
        <label>OS</label>
        <select name="OS" onChange={handleChange}>
            <option value="">Select</option>
            <option value="Windows">Windows</option>
            <option value="macOS">Mac</option>
            <option value="Linux">Linux</option>
        </select>
      </div>

      <div className="form-group">
        <label>RAM (GB)</label>
        <input
          type="range"
          min="4"
          max="32"
          step="4"
          name="Ram"
          onChange={handleChange}
        />
        <span>{formData.Ram} GB</span>
      </div>

      <div className="form-group">
        <label>ROM (GB)</label>
        <input
          type="range"
          min="128"
          max="2048"
          step="128"
          name="ROM"
          onChange={handleChange}
        />
        <span>{formData.ROM} GB</span>
      </div>

      <button onClick={handleSubmit}>Predict Price</button>

      { predictedPrice !== null  ? (
        predictedPrice !== 0 
          ? <div id="priceResult"> Predicted Price: ₹{predictedPrice} </div> 
          : <div id="priceResult">Wrong Specifications</div>
      ) : (
        <div id="priceResult">Enter Specifications</div>
      )}
    </div>
  );
};

export default LaptopPricePredictor;
