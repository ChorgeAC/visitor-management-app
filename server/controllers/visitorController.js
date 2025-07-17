const db = require('../models/db');

const getAllVisitors = (req, res) => {
  const { id, role } = req.user;

  let sql;
  let params = [];

  if (role === 'admin') {
    sql = `
      SELECT 
        visitors.*, 
        users.name AS added_by 
      FROM 
        visitors 
      JOIN 
        users 
      ON 
        visitors.created_by = users.id 
      ORDER BY 
        visit_time DESC
    `;
  } else {
    sql = `
      SELECT 
        visitors.*, 
        users.name AS added_by 
      FROM 
        visitors 
      JOIN 
        users 
      ON 
        visitors.created_by = users.id 
      WHERE 
        visitors.created_by = ? 
      ORDER BY 
        visit_time DESC
    `;
    params.push(id);
  }

  db.execute(sql, params, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch visitors' });
    }
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