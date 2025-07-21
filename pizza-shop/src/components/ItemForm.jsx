import { useState } from "react";
import api from "../api/api";

export default function ItemForm({ fetchItems }) {
  const [formData, setFormData] = useState({ name: "", price: "", category: "pizza" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/pizzas", {
      ...formData,
      price: parseFloat(formData.price),
    });
    setFormData({ name: "", price: "", category: "pizza" });
    fetchItems(); // refresh list after adding
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-6">
      <h2 className="text-xl font-bold mb-4">Add Item</h2>
      <input
        name="name"
        placeholder="Item name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      />
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="border p-2 w-full mb-3 rounded"
      >
        <option value="pizza">Pizza</option>
        <option value="topping">Topping</option>
        <option value="drink">Drink</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add
      </button>
    </form>
  );
}
