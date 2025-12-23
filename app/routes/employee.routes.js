const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model");

router.get("/", async (req, res) => {
  try {
    const { search, department, designation, status } = req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { _id: search }
      ];
    }
    if (department) filter.department = department;
    if (designation) filter.designation = designation;
    if (status) filter.status = status;

    const employees = await Employee.find(filter).sort({ createdAt: -1 });

    const list = employees.map(emp => ({
      id: emp._id,
      name: emp.name,
      department: emp.department,
      designation: emp.designation,
      status: emp.status
    }));

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const profile = {
      id: employee._id,
      name: employee.name,
      email: employee.email || null,
      phone: employee.phone || null,
      department: employee.department,
      designation: employee.designation,
      status: employee.status,
      joiningDate: employee.createdAt
    };

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      id: employee._id,
      name: employee.name,
      status: employee.status
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
