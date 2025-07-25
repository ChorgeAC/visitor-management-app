import { useState } from 'react';
import AddVisitorForm from '../components/AddVisitorForm';
import VisitorTable from '../components/VisitorTable';
import AdminNavbar from '../components/AdminNavbar';

const AdminDashboard = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
    <AdminNavbar />
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Visitor List</h2>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Back to Visitors' : 'Add Visitor'}
        </button>
      </div>

      {showForm ? (
        <AddVisitorForm onSuccess={() => setShowForm(false)} />
      ) : (
        <VisitorTable/>
      )}
    </div>
    </>
  );
};

export default AdminDashboard;