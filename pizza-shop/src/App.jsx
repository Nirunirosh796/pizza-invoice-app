import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Items from './pages/Item';
import Invoice from './pages/invoice';
import Navbar from './components/Navbar'; // Add this import
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Items />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;