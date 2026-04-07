/**
 * Content Editor Service
 * Manages editable content with session storage for temporary changes
 */

export interface ContentChange {
  file: string;
  path: string;
  oldValue: any;
  newValue: any;
  timestamp: number;
}

export interface PendingChanges {
  [fileKey: string]: ContentChange[];
}

const SESSION_STORAGE_KEY = 'mai_pending_changes';

export const contentEditorService = {
  /**
   * Get all pending changes from session storage
   */
  getPendingChanges(): PendingChanges {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Failed to get pending changes:', error);
      return {};
    }
  },

  /**
   * Add a change to pending changes
   */
  addChange(file: string, path: string, oldValue: any, newValue: any): void {
    const pending = this.getPendingChanges();
    const fileKey = file;

    if (!pending[fileKey]) {
      pending[fileKey] = [];
    }

    // Check if this path already has a change
    const existingIndex = pending[fileKey].findIndex(c => c.path === path);
    
    const change: ContentChange = {
      file,
      path,
      oldValue,
      newValue,
      timestamp: Date.now(),
    };

    if (existingIndex >= 0) {
      // Update existing change
      pending[fileKey][existingIndex] = change;
    } else {
      // Add new change
      pending[fileKey].push(change);
    }

    this.savePendingChanges(pending);
  },

  /**
   * Revert a specific change
   */
  revertChange(file: string, path: string): void {
    const pending = this.getPendingChanges();
    const fileKey = file;

    if (pending[fileKey]) {
      pending[fileKey] = pending[fileKey].filter(c => c.path !== path);
      if (pending[fileKey].length === 0) {
        delete pending[fileKey];
      }
      this.savePendingChanges(pending);
    }
  },

  /**
   * Clear all pending changes for a file
   */
  clearFileChanges(file: string): void {
    const pending = this.getPendingChanges();
    delete pending[file];
    this.savePendingChanges(pending);
  },

  /**
   * Clear all pending changes
   */
  clearAllChanges(): void {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  },

  /**
   * Save pending changes to session storage
   */
  savePendingChanges(changes: PendingChanges): void {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(changes));
    } catch (error) {
      console.error('Failed to save pending changes:', error);
    }
  },

  /**
   * Get count of total pending changes
   */
  getChangeCount(): number {
    const pending = this.getPendingChanges();
    return Object.values(pending).reduce((sum, changes) => sum + changes.length, 0);
  },

  /**
   * Get changed files
   */
  getChangedFiles(): string[] {
    const pending = this.getPendingChanges();
    return Object.keys(pending);
  },
};
