import { useQuery } from "@tanstack/react-query";
import { fetchVisitors } from "../services/visitorApi";


const VisitorTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["visitors"],
    queryFn: ()=>fetchVisitors(),
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
            <th className="p-2 border">Status</th>
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
              <td className="p-2 border">{visitor.status || "IN"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorTable;
