import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/authApi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type FormValues = { email: string; password: string };

export default function Login() {
  const { register, handleSubmit } = useForm<FormValues>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login({ token: data.token, role: data?.user?.role });
      navigate(data?.user?.role === 'admin' ? '/admin' : '/security');
    },
    onError: () => alert('Invalid credentials'),
  });

  const onSubmit = (data: FormValues) => mutation.mutate(data);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>
        <input type="email" {...register("email")} placeholder="Email" className="w-full border p-2 rounded" />
        <input type="password" {...register("password")} placeholder="Password" className="w-full border p-2 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}