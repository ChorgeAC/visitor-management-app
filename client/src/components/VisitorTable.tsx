import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchVisitors, checkoutVisitor, deleteVisitor } from "../services/visitorApi";
import { useAuth } from '../context/AuthContext';

const VisitorTable = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["visitors"],
    queryFn: fetchVisitors,
  });

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (id: number) => checkoutVisitor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
    },
  });

  const { mutate: deleteItem, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteVisitor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
    },
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <p className="text-red-500">Failed to load visitors.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Full Name</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Purpose</th>
            <th className="p-2 border">Visit Time</th>
            {user?.role === "admin" && <th className="p-2 border">Added By</th>}
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((visitor: any, index: number) => (
            <tr key={visitor.id} className="text-center">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{visitor.full_name}</td>
              <td className="p-2 border">{visitor.contact_number}</td>
              <td className="p-2 border">{visitor.email}</td>
              <td className="p-2 border">{visitor.purpose}</td>
              <td className="p-2 border">
                {new Date(visitor.visit_time).toLocaleString()}
              </td>
              {user?.role === "admin" && (
                <td className="p-2 border">{visitor.added_by}</td>
              )}
              <td className="p-2 border">
                {visitor.status === "IN" ? "IN" : "Checkout"}
              </td>
              <td className="p-2 border flex gap-2 justify-center">
                {visitor.status === "IN" ? (
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => checkout(visitor.id)}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Checking out..." : "Checkout"}
                  </button>
                ) : "--"}
                {user?.role === "admin" && (
                  <button
                    className="bg-gray-700 hover:bg-black text-white px-3 py-1 rounded"
                    onClick={() => deleteItem(visitor.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorTable;