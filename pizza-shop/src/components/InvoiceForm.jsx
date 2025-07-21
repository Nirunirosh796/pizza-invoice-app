import { useState, useEffect } from 'react';
import api from '../api/api';

const InvoiceForm = ({ onAddInvoice }) => {
  const [items, setItems] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);

  useEffect(() => {
    api.get('/pizzas').then(res => setItems(res.data));
  }, []);

  const handleAddItem = (itemId) => {
    const item = items.find(i => i.id === parseInt(itemId));
    if (!item) return;
    setInvoiceItems([...invoiceItems, { ...item, quantity: 1 }]);
  };

  const handleQuantityChange = (index, qty) => {
    const newList = [...invoiceItems];
    newList[index].quantity = parseInt(qty);
    setInvoiceItems(newList);
  };

  const handleSubmit = async () => {
    const total = invoiceItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = total * 0.1;
    const grandTotal = total + tax;

    await api.post('/invoices', {
      items: invoiceItems,
      total,
      tax,
      grandTotal,
    });

    onAddInvoice?.();
    setInvoiceItems([]);
  };

  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>
      <select onChange={e => handleAddItem(e.target.value)} className="mb-4 p-2 border rounded w-full">
        <option value="">-- Select Item --</option>
        {items.map(item => (
          <option key={item.id} value={item.id}>{item.name} - Rs. {item.price}</option>
        ))}
      </select>

      <ul>
        {invoiceItems.map((item, idx) => (
          <li key={idx} className="flex justify-between items-center my-2">
            {item.name} - Rs.{item.price} x
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={e => handleQuantityChange(idx, e.target.value)}
              className="w-16 border mx-2"
            />
            = Rs{item.price * item.quantity}
          </li>
        ))}
      </ul>

      <button onClick={handleSubmit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Save Invoice
      </button>
    </div>
  );
};

export default InvoiceForm;
