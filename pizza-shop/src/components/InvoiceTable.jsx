import { useEffect, useState } from 'react';
import api from '../api/api';

const InvoiceTable = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    api.get('/invoices').then(res =>  {console.log(res.data);
    setInvoices(res.data)
  });
  }, []);

  return (
    <div className="mt-8 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Invoices</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">#</th>
            <th className="border p-2">Items</th>
            <th className="border p-2">Tax</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv, idx) => (
            <tr key={idx} className="text-center">
              <td className="border p-2">{idx + 1}</td>
              <td className="border p-2">
                {(inv.items || []).map(i => `${i.name} (x${i.quantity})`).join(', ')}
              </td>
              <td className="border p-2">Rs{Number(inv.tax || 0).toFixed(2)}</td>
              <td className="border p-2">Rs{Number(inv.grand_total||0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
