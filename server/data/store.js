import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Feedback from '../models/Feedback.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'feedback.json');

const INITIAL_FEEDBACK = [
  {
    _id: 'seed-fb-1',
    name: 'Sarah Chen',
    message: 'Loved exploring your projects! The attention to detail in responsive UI design and micro-interactions is outstanding.',
    email: 'sarah.c@techinnovations.io',
    rating: 5,
    status: 'published',
    publicConsent: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'seed-fb-2',
    name: 'David Rodriguez',
    message: 'Super clean portfolio architecture! The braided color theme and daylight switch look slick across my phone and monitor.',
    email: 'd.rodriguez@codecraft.org',
    rating: 5,
    status: 'published',
    publicConsent: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'seed-fb-3',
    name: 'Aisha Patel',
    message: 'Impressive full-stack projects. Great code structure and clear problem-solving approaches in your case studies.',
    email: 'aisha.dev@buildfuture.com',
    rating: 5,
    status: 'published',
    publicConsent: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    approvedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'seed-fb-4',
    name: 'Michael Vance',
    message: 'Would love to see unit test coverage badges on the project cards, but overall this is one of the best engineer portfolios I have seen.',
    email: 'michael@cloudscale.net',
    rating: 4,
    status: 'pending',
    publicConsent: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  }
];

function isMongoActive() {
  return mongoose.connection.readyState === 1;
}

function loadLocalFeedback() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_FEEDBACK, null, 2), 'utf8');
      return INITIAL_FEEDBACK;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading local feedback file, using defaults:', err.message);
    return INITIAL_FEEDBACK;
  }
}

function saveLocalFeedback(items) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving local feedback file:', err.message);
  }
}

export const feedbackStore = {
  async getPublished() {
    if (isMongoActive()) {
      return await Feedback.find({ status: 'published', publicConsent: true })
        .sort({ createdAt: -1 })
        .select('-email');
    }
    const all = loadLocalFeedback();
    return all
      .filter((item) => item.status === 'published' && item.publicConsent)
      .map(({ email, ...rest }) => rest)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getAllAdmin(statusFilter) {
    if (isMongoActive()) {
      const query = statusFilter && statusFilter !== 'all' ? { status: statusFilter } : {};
      return await Feedback.find(query).sort({ createdAt: -1 });
    }
    const all = loadLocalFeedback();
    const filtered = statusFilter && statusFilter !== 'all'
      ? all.filter((item) => item.status === statusFilter)
      : all;
    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async create(data) {
    if (isMongoActive()) {
      const newFeedback = new Feedback({
        name: data.name?.trim() || 'Anonymous Visitor',
        message: data.message?.trim(),
        email: data.email?.trim() || '',
        rating: Number(data.rating) || 5,
        publicConsent: data.publicConsent !== false,
        status: 'pending',
      });
      return await newFeedback.save();
    }
    const all = loadLocalFeedback();
    const item = {
      _id: 'fb-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: data.name?.trim() || 'Anonymous Visitor',
      message: data.message?.trim(),
      email: data.email?.trim() || '',
      rating: Number(data.rating) || 5,
      publicConsent: data.publicConsent !== false,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    all.unshift(item);
    saveLocalFeedback(all);
    return item;
  },

  async updateStatus(id, newStatus) {
    if (isMongoActive()) {
      const updateData = { status: newStatus };
      if (newStatus === 'published') {
        updateData.approvedAt = new Date();
      }
      return await Feedback.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });
    }
    const all = loadLocalFeedback();
    const index = all.findIndex((item) => String(item._id) === String(id));
    if (index === -1) return null;
    all[index].status = newStatus;
    if (newStatus === 'published') {
      all[index].approvedAt = new Date().toISOString();
    }
    saveLocalFeedback(all);
    return all[index];
  },

  async delete(id) {
    if (isMongoActive()) {
      return await Feedback.findByIdAndDelete(id);
    }
    const all = loadLocalFeedback();
    const item = all.find((i) => String(i._id) === String(id));
    if (!item) return null;
    const filtered = all.filter((i) => String(i._id) !== String(id));
    saveLocalFeedback(filtered);
    return item;
  },

  async getStats() {
    if (isMongoActive()) {
      const total = await Feedback.countDocuments();
      const pending = await Feedback.countDocuments({ status: 'pending' });
      const published = await Feedback.countDocuments({ status: 'published' });
      const rejected = await Feedback.countDocuments({ status: 'rejected' });
      return { total, pending, published, rejected };
    }
    const all = loadLocalFeedback();
    return {
      total: all.length,
      pending: all.filter((i) => i.status === 'pending').length,
      published: all.filter((i) => i.status === 'published').length,
      rejected: all.filter((i) => i.status === 'rejected').length,
    };
  },
};
