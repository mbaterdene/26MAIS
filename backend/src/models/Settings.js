import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'languageToggleVisible',
      'comingSoonPages'
    ]
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  updatedAt: {
    type: String,
    default: () => new Date().toISOString()
  },
  updatedBy: {
    type: String,
    default: 'system'
  }
});

export const Settings = mongoose.model('Settings', settingsSchema);
