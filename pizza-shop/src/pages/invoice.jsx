import InvoiceForm from '../components/InvoiceForm';
import InvoiceTable from '../components/InvoiceTable';
import { useState } from 'react';

const Invoice = () => {
  const [reload, setReload] = useState(false);

  const handleAddInvoice = () => {
    setReload(!reload);
  };

  return (
    <div className="p-6">
      <InvoiceForm onAddInvoice={handleAddInvoice} />
      <InvoiceTable key={reload} />
    </div>
  );
};

export default Invoice;
