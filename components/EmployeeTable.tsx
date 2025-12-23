"use client";

import { useState } from "react";
import { employees } from "@/data/employees";
import { Employee } from "@/types/employee";
import Status from "./Status";
import SearchFilter from "./SearchFilter";
import Filters from "./Filters";
import Link from "next/link";

export default function EmployeeTable() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [role, setRole] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredEmployees = employees.filter((emp: Employee) => {
    const matchSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.employeeId.includes(search);

    const matchDepartment = department === "all" || emp.department === department;
    const matchRole = role === "all" || emp.role === role;
    const matchStatus = status === "all" || emp.status === status;

    return matchSearch && matchDepartment && matchRole && matchStatus;
  });

  return (
    <div className="space-y-4">
      <SearchFilter onSearch={setSearch} />
      <Filters
        department={department}
        role={role}
        status={status}
        setDepartment={setDepartment}
        setRole={setRole}
        setStatus={setStatus}
      />

      <table className="w-full border rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Employee ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp: Employee) => (
              <tr key={emp._id} className="hover:bg-gray-50">
                <td className="p-2 border">
                  <Link
                    href={`/employees/${emp._id}`}
                    className="text-blue-600"
                  >
                    {emp.employeeId}
                  </Link>
                </td>
                <td className="p-2 border">{emp.name}</td>
                <td className="p-2 border">{emp.department}</td>
                <td className="p-2 border">{emp.role}</td>
                <td className="p-2 border">
                  <Status status={emp.status} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
