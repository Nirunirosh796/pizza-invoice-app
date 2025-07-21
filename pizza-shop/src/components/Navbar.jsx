import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Pizza Shop
        </Link>
        <div className="space-x-4">
          <Link 
            to="/" 
            className="hover:bg-blue-700 px-3 py-2 rounded transition"
          >
            Items
          </Link>
          <Link 
            to="/invoice" 
            className="hover:bg-blue-700 px-3 py-2 rounded transition"
          >
            Invoices
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;