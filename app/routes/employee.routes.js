// const express = require("express");
// const router = express.Router();
// const Employee = require("../models/employee.model");


// router.post("/", async (req, res) => {
//   try {
//     const employee = await Employee.create(req.body);
//     res.status(201).json(employee);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// router.get("/", async (req, res) => {
//   try {
//     const { search, department, designation, status } = req.query;

//     let filter = {};

//     if (search) {
//       filter.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { _id: search }
//       ];
//     }
//     if (department) filter.department = department;
//     if (designation) filter.designation = designation;
//     if (status) filter.status = status;

//     const employees = await Employee.find(filter).sort({ createdAt: -1 });

//     const list = employees.map(emp => ({
//       id: emp._id,
//       name: emp.name,
//       department: emp.department,
//       designation: emp.designation,
//       status: emp.status
//     }));

//     res.status(200).json(list);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// router.get("/:id", async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.params.id);
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     const profile = {
//       id: employee._id,
//       name: employee.name,
//       email: employee.email || null,
//       phone: employee.phone || null,
//       department: employee.department,
//       designation: employee.designation,
//       status: employee.status,
//       joiningDate: employee.createdAt
//     };

//     res.status(200).json(profile);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     res.status(200).json(employee);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// router.patch("/:id/status", async (req, res) => {
//   try {
//     const { status } = req.body;
//     if (!["Active", "Inactive"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status value" });
//     }

//     const employee = await Employee.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );

//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     res.status(200).json({
//       id: employee._id,
//       name: employee.name,
//       status: employee.status
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// router.delete("/:id", async (req, res) => {
//   try {
//     const employee = await Employee.findByIdAndDelete(req.params.id);

//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     res.status(200).json({ message: "Employee deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model");


// ➕ CREATE EMPLOYEE
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// 📄 GET ALL EMPLOYEES (Search & Filter)
router.get("/", async (req, res) => {
  try {
    const { search, department, role, status } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } }
      ];
    }

    if (department) filter.department = department;
    if (role) filter.role = role;
    if (status) filter.status = status;

    const employees = await Employee.find(filter).sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 👤 GET SINGLE EMPLOYEE
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✏️ UPDATE EMPLOYEE
router.put("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// 🔁 UPDATE STATUS ONLY
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ❌ DELETE EMPLOYEE
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
