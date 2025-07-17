import axiosInstance from '../lib/axios';

interface VisitorPayload {
  full_name: string;
  contact_number: string;
  email: string;
  purpose: string;
}

export const addVisitor = async (data: VisitorPayload) => {
  const res = await axiosInstance.post('/api/visitors', data);
  return res.data;
};

export const fetchVisitors = async () => {
  const { data } = await axiosInstance.get("/api/visitors", { withCredentials: true });
  return data;
};