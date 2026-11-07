import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: 'Anonymous Visitor',
    },
    message: {
      type: String,
      required: [true, 'Feedback message is required'],
      trim: true,
      maxlength: [1000, 'Feedback message cannot exceed 1000 characters'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    status: {
      type: String,
      enum: ['pending', 'published', 'rejected'],
      default: 'pending',
      index: true,
    },
    publicConsent: {
      type: Boolean,
      default: true,
    },
    approvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);

export default Feedback;
