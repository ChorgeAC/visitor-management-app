import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-400 text-white px-4 py-3 shadow-md flex gap-6">
      <Link
        to="/admin"
        className={`hover:underline ${location.pathname === '/admin' ? 'font-bold underline' : ''}`}
      >
        <span className="text-xl">Dashboard</span>
      </Link>
      <Link
        to="/admin/add-security"
        className={`hover:underline ${location.pathname === '/admin/add-security' ? 'font-bold underline' : ''}`}
      >
        <span className='text-xl'>Add Security</span>
      </Link>
    </nav>
  );
};

export default AdminNavbar;