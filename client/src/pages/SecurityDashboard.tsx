import { useState } from 'react';
import AddVisitorForm from '../components/AddVisitorForm';
import VisitorTable from '../components/VisitorTable';

const SecurityDashboard = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Security Dashboard</h2>
        <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          color={showForm ? 'secondary' : 'primary'}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? 'Back to Visitors' : 'Add Visitor'}
        </button>
      </div>

      {showForm ? <AddVisitorForm onSuccess={() => setShowForm(false)} /> : <VisitorTable />}
    </div>
  );
};

export default SecurityDashboard;