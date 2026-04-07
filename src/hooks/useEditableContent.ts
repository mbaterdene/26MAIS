/**
 * useEditableContent Hook
 * Manages editable content with change tracking
 */

import { useState, useCallback, useEffect } from 'react';
import { contentEditorService, PendingChanges } from '../services/contentEditorService';

export interface EditableField {
  path: string;
  value: any;
  isChanged: boolean;
  originalValue: any;
}

export function useEditableContent(file: string, initialContent: Record<string, any>) {
  const [content, setContent] = useState(initialContent);
  const [pendingChanges, setPendingChanges] = useState<PendingChanges>({});

  // Load pending changes on mount and when file changes
  useEffect(() => {
    // Always reset to initial content for this file
    setContent({ ...initialContent });
    
    const pending = contentEditorService.getPendingChanges();
    setPendingChanges(pending);

    // Apply pending changes to display
    if (pending[file]) {
      const updated = { ...initialContent };
      pending[file].forEach(change => {
        // Set to new value if it exists in pending
        updateNestedValue(updated, change.path.split('.'), change.newValue);
      });
      setContent(updated);
    }
  }, [file, initialContent]);

  // Update a nested field
  const updateField = useCallback((path: string, value: any) => {
    const parts = path.split('.');
    
    // Update display content
    setContent(prev => {
      const updated = { ...prev };
      updateNestedValue(updated, parts, value);
      return updated;
    });

    // Get original value
    const originalValue = getNestedValue(initialContent, parts);
    
    // Track change
    contentEditorService.addChange(file, path, originalValue, value);
    
    // Update pending changes display
    const pending = contentEditorService.getPendingChanges();
    setPendingChanges(pending);
  }, [file, initialContent]);

  // Revert a field to original value
  const revertField = useCallback((path: string) => {
    const parts = path.split('.');
    const originalValue = getNestedValue(initialContent, parts);
    
    setContent(prev => {
      const updated = { ...prev };
      updateNestedValue(updated, parts, originalValue);
      return updated;
    });

    contentEditorService.revertChange(file, path);
    const pending = contentEditorService.getPendingChanges();
    setPendingChanges(pending);
  }, [file, initialContent]);

  // Get changed fields
  const getChangedFields = useCallback((): EditableField[] => {
    const changes = pendingChanges[file] || [];
    return changes.map(change => ({
      path: change.path,
      value: getNestedValue(content, change.path.split('.')),
      isChanged: true,
      originalValue: change.oldValue,
    }));
  }, [file, content, pendingChanges]);

  // Clear all changes for this file
  const clearChanges = useCallback(() => {
    setContent(initialContent);
    contentEditorService.clearFileChanges(file);
    const pending = contentEditorService.getPendingChanges();
    setPendingChanges(pending);
  }, [file, initialContent]);

  return {
    content,
    updateField,
    revertField,
    getChangedFields,
    clearChanges,
    hasChanges: !!(pendingChanges[file]?.length > 0),
    changeCount: pendingChanges[file]?.length || 0,
  };
}

/**
 * Helper to get nested value from object
 */
function getNestedValue(obj: any, path: string[]): any {
  let current = obj;
  for (const key of path) {
    if (current === null || current === undefined) return undefined;
    current = current[key];
  }
  return current;
}

/**
 * Helper to set nested value in object
 */
function updateNestedValue(obj: any, path: string[], value: any): void {
  let current = obj;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }
  current[path[path.length - 1]] = value;
}
