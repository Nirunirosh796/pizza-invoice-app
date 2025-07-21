import { useState, useEffect } from "react";
import ItemForm from "../components/ItemForm";
import ItemList from "../components/ItemTable";
import api from "../api/api";

export default function Items() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const res = await api.get("/pizzas");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Item Management</h1>
      <ItemForm fetchItems={fetchItems} />
      <ItemList items={items} fetchItems={fetchItems} />
    </div>
  );
}
