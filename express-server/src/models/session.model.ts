import mongoose, { Schema, Document, Model } from 'mongoose';
import { ISession } from '../types/session.types';

// Extend ISession interface to include the deactivate method
interface ISessionDocument extends ISession, Document {
  deactivate(): Promise<ISessionDocument>;
}

const sessionSchema = new Schema<ISessionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    loginAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    logoutAt: {
      type: Date,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    deviceInfo: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
sessionSchema.index({ userId: 1, isActive: 1 });
sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 }); // Auto-delete after 30 days

// Method to deactivate session
sessionSchema.methods.deactivate = function (): Promise<ISessionDocument> {
  this.isActive = false;
  this.logoutAt = new Date();
  return this.save();
};

const Session: Model<ISessionDocument> = mongoose.model<ISessionDocument>('Session', sessionSchema);

export default Session;
