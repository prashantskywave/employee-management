import { employees } from "@/data/employees";

export default async function EmployeeProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const employee = employees.find(
    (e) => String(e._id) === String(id)
  );

  if (!employee) {
    return <p className="p-6">Employee not found</p>;
  }

  return (
    <div className="p-6">
      <h1><b>{employee.name}</b></h1>
      <p><b>Email:</b> {employee.email}</p>
      <p><b>Contact:</b> {employee.contact}</p>
      <p><b>Department:</b> {employee.department}</p>
      <p><b>Role:</b> {employee.role}</p>
      <p><b>Joining Date:</b> {employee.joiningDate}</p>
      <p><b>Status:</b> {employee.status}</p>
    </div>
  );
}
