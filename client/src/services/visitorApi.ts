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

export const checkoutVisitor = async (id: number) => {
  const res = await axiosInstance.patch(`/api/visitors/${id}/checkout`, {}, {
    withCredentials: true,
  });
  return res.data;
};

export const deleteVisitor = async (id: number) => {
  const res = await axiosInstance.delete(`/api/visitors/${id}`);
  return res.data;
};