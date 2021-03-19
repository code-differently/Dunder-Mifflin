
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Employee = require('../models/Dunder-Mifflin-Model');

// CRUD
// GET, POST, PUT, DELETE Employee by id


// @desc      Get single employee
// @route     GET /api/v1/employees/:id
// @access    Public
exports.Employee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);
  
    if (!employee) {
      return next(
        new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
      );
    }
  
    res.status(200).json({ success: true, data: employee });
  });

// @desc      Create new employee
// @route     POST /api/v1/employees
// @access    Private
exports.createEmployee = asyncHandler(async (req, res, next) => {
    // Add user to req,body
    req.body.user = req.user.id;
  
    // Check for employee
    const employeeAlreadyExists = await Employee.findOne({ user: req.user.id });
});
 // If the user is not an admin or if employee exists, they can't add an employee 
 if (employeeAlreadyExists || req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} does not have permission to create an employee, or employee already exists`,
        400
      )
    );
  }

  const employee = await Employee.create(req.body);

  res.status(201).json({
    success: true,
    data: employee
  });


// @desc      Update Employee
// @route     PUT /api/v1/employees/:id
// @access    Private
exports.updateEmployees = asyncHandler(async (req, res, next) => {
    let employee = await Employee.findById(req.params.id);
  
    if (!employee) {
      return next(
        new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure user is admin and verify user permissions 
    if (employee.user.toString() !== req.user.id && req.user.role === 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this employee`,
          401
        )
      );
    }
  
    employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({ success: true, data: employee });
  });

// @desc      Delete employee
// @route     DELETE /api/v1/employee/:id
// @access    Private
exports.deleteEmployee = asyncHandler(async (req, res, next) => {
    const employee = await Employee.findById(req.params.id);
  
    if (!employee) {
      return next(
        new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure employee exists and user is admin
    if (employee.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this employee`,
          401
        )
      );
    }
  
    await employee.remove();
  
    res.status(200).json({ success: true, data: {} });
  });


