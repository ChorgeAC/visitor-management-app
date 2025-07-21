import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";
import { registerUser } from "../services/authApi";

const AddSecurity = () => {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'security', // fixed role
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await registerUser(formData) // update if needed
      toast.success('Security user registered');
      setFormData({ name: '', email: '', password: '', role: 'security' });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
    <AdminNavbar/>
    <div className="max-w-md mt-6 mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add Security Personnel</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Register Security
        </button>
      </form>
    </div>
    </>
  );
};

export default AddSecurity;