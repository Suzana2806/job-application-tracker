const Application = require('../models/Application');

// GET /api/applications
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.userId }).sort('order');
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/applications
const createApplication = async (req, res) => {
  try {
    const { company, role, notes, appliedDate } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: 'Company and role are required' });
    }

    const count = await Application.countDocuments({ userId: req.userId, status: 'applied' });

    const application = await Application.create({
      userId: req.userId,
      company,
      role,
      notes,
      appliedDate,
      order: count,
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/applications/:id
const updateApplication = async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, userId: req.userId });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    Object.assign(application, req.body);
    await application.save();

    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/applications/:id
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/applications/reorder
const reorderApplications = async (req, res) => {
  try {
    const updates = req.body; // [{ id, status, order }, ...]

    const bulkOps = updates.map((u) => ({
      updateOne: {
        filter: { _id: u.id, userId: req.userId },
        update: { status: u.status, order: u.order },
      },
    }));

    await Application.bulkWrite(bulkOps);

    res.status(200).json({ message: 'Reordered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  reorderApplications,
};