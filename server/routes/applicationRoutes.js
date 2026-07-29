const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  reorderApplications,
} = require('../controllers/applicationController');

router.use(protect); // every route below this requires a valid token

router.get('/', getApplications);
router.post('/', createApplication);
router.patch('/reorder', reorderApplications);
router.patch('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;