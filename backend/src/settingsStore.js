import { Settings } from "./models/Settings.js";

// Default settings values
const DEFAULT_SETTINGS = {
  languageToggleVisible: false,
  comingSoonPages: [
    'about',
    'academics',
    'courses-pdq',
    'teachers',
    'student-life',
    'student-support',
    'faq',
    'contact'
  ]
  // Note: 'admissions' and 'archive' are available but not set to coming soon by default
};

export async function initializeSettings() {
  try {
    // Check if settings already exist
    const existingCount = await Settings.countDocuments();

    if (existingCount === 0) {
      // Create default settings
      for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
        await Settings.create({
          key,
          value,
          updatedBy: 'system'
        });
      }
      console.log('Settings initialized with defaults');
    }
  } catch (error) {
    console.error('Error initializing settings:', error);
  }
}

export async function getSetting(key) {
  try {
    const setting = await Settings.findOne({ key });
    return setting ? setting.value : DEFAULT_SETTINGS[key];
  } catch (error) {
    console.error('Error getting setting:', error);
    return DEFAULT_SETTINGS[key];
  }
}

export async function getAllSettings() {
  try {
    const settings = await Settings.find({});
    const result = {};

    settings.forEach(setting => {
      result[setting.key] = setting.value;
    });

    // Fill in any missing settings with defaults
    for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
      if (!(key in result)) {
        result[key] = value;
      }
    }

    return result;
  } catch (error) {
    console.error('Error getting all settings:', error);
    return DEFAULT_SETTINGS;
  }
}

export async function updateSetting(key, value, adminId = 'system') {
  try {
    // Validate key
    if (!DEFAULT_SETTINGS.hasOwnProperty(key)) {
      throw new Error(`Invalid setting key: ${key}`);
    }

    const setting = await Settings.findOneAndUpdate(
      { key },
      {
        value,
        updatedAt: new Date().toISOString(),
        updatedBy: adminId
      },
      { upsert: true, new: true }
    );

    return setting;
  } catch (error) {
    console.error('Error updating setting:', error);
    throw error;
  }
}

export async function updateMultipleSettings(updates, adminId = 'system') {
  try {
    const results = {};

    for (const [key, value] of Object.entries(updates)) {
      const setting = await updateSetting(key, value, adminId);
      results[key] = setting.value;
    }

    return results;
  } catch (error) {
    console.error('Error updating multiple settings:', error);
    throw error;
  }
}
