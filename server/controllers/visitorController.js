const db = require('../models/db');

const getAllVisitors = (req, res) => {
  db.execute('SELECT * FROM visitors ORDER BY visit_time DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const addVisitor = (req, res) => {
  const { full_name, contact_number, email, purpose } = req.body;
  const created_by = req.user.id;

  const sql = `INSERT INTO visitors (full_name, contact_number, email, purpose, created_by)
               VALUES (?, ?, ?, ?, ?)`;

  db.execute(sql, [full_name, contact_number, email, purpose, created_by], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Visitor added successfully' });
  });
};

const updateVisitor = (req, res) => {
  const { id } = req.params;
  const { full_name, contact_number, email, purpose } = req.body;

  const sql = `UPDATE visitors SET full_name=?, contact_number=?, email=?, purpose=? WHERE id=?`;

  db.execute(sql, [full_name, contact_number, email, purpose, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Visitor updated successfully' });
  });
};

const deleteVisitor = (req, res) => {
  const { id } = req.params;

  db.execute('DELETE FROM visitors WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Visitor deleted successfully' });
  });
};

const checkInVisitor = (req, res) => {
  const { id } = req.params;
  db.execute('UPDATE visitors SET check_in_time = NOW(), status = "IN" WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Visitor checked in' });
  });
};

const checkOutVisitor = (req, res) => {
  const { id } = req.params;
  db.execute('UPDATE visitors SET check_out_time = NOW(), status = "OUT" WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Visitor checked out' });
  });
};

module.exports = {
    getAllVisitors,
    addVisitor,
    updateVisitor,
    checkOutVisitor,
    deleteVisitor,
    checkInVisitor
};