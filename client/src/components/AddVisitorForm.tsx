import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addVisitor } from '../services/visitorApi';
import { toast } from 'react-hot-toast';

interface Props {
  onSuccess: () => void;
}

const AddVisitorForm = ({ onSuccess }: Props) => {
  const [formData, setFormData] = useState({
    full_name: '',
    contact_number: '',
    email: '',
    purpose: '',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addVisitor,
    onSuccess: () => {
      toast.success('Visitor added successfully!');
      setFormData({ full_name: '', contact_number: '', email: '', purpose: '' });
      onSuccess();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || 'Something went wrong');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Add Visitor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="contact_number"
          placeholder="Contact Number"
          value={formData.contact_number}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="purpose"
          placeholder="Purpose of Visit"
          value={formData.purpose}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Submitting...' : 'Add Visitor'}
        </button>
      </form>
    </div>
  );
};

export default AddVisitorForm;