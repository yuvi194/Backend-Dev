// Get a single employee by id
export const getEmployeeById = (req, res) => {
	const { id } = req.params;
	const employee = employeeData.find(emp => emp.id.toString() === id);
	if (!employee) {
		return res.status(404).json({ error: 'Employee not found.' });
	}
	res.status(200).json(employee);
};

import { employeeData } from '../model/data.js';

// Render employee profile page
export const renderEmployeeProfile = (req, res) => {
	const { id } = req.params;
	const employee = employeeData.find(emp => emp.id.toString() === id);
	if (!employee) {
		return res.status(404).render('profile', { error: 'Employee not found.' });
	}
	res.render('profile', { employee });
};

// Create a new employee
export const createEmployee = (req, res) => {
	// Support both JSON and form submissions
	const isJson = req.is('application/json');
	let { name, email, department, basicSalary, gender, startDate, salary } = req.body;

	// If JSON, require all fields as before
	if (isJson) {
		if (!name || !gender || !department || !salary || !startDate) {
			return res.status(400).json({ error: 'All fields are required.' });
		}
		const newEmployee = {
			id: Date.now().toString(),
			name,
			gender,
			department,
			salary,
			startDate
		};
		employeeData.push(newEmployee);
		return res.status(201).json(newEmployee);
	}

	// For form submissions (from EJS form), require only the form fields
	if (!name || !email || !department || !basicSalary) {
		// Render the form again with an error message
		return res.status(400).render('employeeForm', { error: 'All fields are required.' });
	}
	const newEmployee = {
		id: Date.now(),
		name,
		email,
		department,
		basicSalary: Number(basicSalary)
	};
	employeeData.push(newEmployee);
	res.redirect('/');
};

// Get all employees
export const getEmployee = (req, res) => {
	res.status(200).json(employeeData);
};

// Update an employee by id
export const updateEmployee = (req, res) => {
	const { id } = req.params;
	// Try to find employee by id (number or string)
	let employee = employeeData.find(emp => emp.id.toString() === id || emp.id === Number(id));
	if (!employee) {
		// For form submissions, redirect with error
		if (req.is('application/x-www-form-urlencoded')) {
			return res.status(404).render('employeeEdit', { employee: null, error: 'Employee not found.' });
		}
		return res.status(404).json({ error: 'Employee not found.' });
	}
	// Support both JSON and form submissions
	const { name, email, department, basicSalary, gender, startDate, salary } = req.body;
	if (name) employee.name = name;
	if (email) employee.email = email;
	if (department) employee.department = department;
	if (basicSalary) employee.basicSalary = Number(basicSalary);
	if (gender) employee.gender = gender;
	if (salary) employee.salary = salary;
	if (startDate) employee.startDate = startDate;
	// If form submission, redirect to home
	if (req.is('application/x-www-form-urlencoded')) {
		return res.redirect('/');
	}
	res.status(200).json(employee);
};

// Delete an employee by id
export const deleteEmployee = (req, res) => {
	const { id } = req.params;
	const index = employeeData.findIndex(emp => emp.id.toString() === id || emp.id === Number(id));
	if (index === -1) {
		if (req.is('application/x-www-form-urlencoded')) {
			return res.status(404).redirect('/');
		}
		return res.status(404).json({ error: 'Employee not found.' });
	}
	const deleted = employeeData.splice(index, 1);
	if (req.is('application/x-www-form-urlencoded')) {
		return res.redirect('/');
	}
	res.status(200).json({ message: 'Employee deleted.', employee: deleted[0] });
};