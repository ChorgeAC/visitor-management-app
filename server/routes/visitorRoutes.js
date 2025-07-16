const express = require('express');
const router = express.Router();
const {
  getAllVisitors,
  addVisitor,
  updateVisitor,
  deleteVisitor,
  checkInVisitor,
  checkOutVisitor
} = require('../controllers/visitorController');

const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getAllVisitors);
router.post('/', verifyToken, addVisitor);
router.put('/:id', verifyToken, updateVisitor);
router.delete('/:id', verifyToken, deleteVisitor);
router.patch('/:id/checkin', verifyToken, checkInVisitor);
router.patch('/:id/checkout', verifyToken, checkOutVisitor);

module.exports = router;