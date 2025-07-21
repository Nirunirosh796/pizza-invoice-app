import api from "../api/api";

export default function ItemList({ items, fetchItems }) {
  const deleteItem = async (id) => {
    await api.delete(`/pizzas/${id}`);
    fetchItems(); // refresh list after deletion
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Item List</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">₹{item.price}</td>
              <td className="border p-2">{item.category}</td>
              <td className="border p-2">
                <button
                  onClick={() => deleteItem(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
