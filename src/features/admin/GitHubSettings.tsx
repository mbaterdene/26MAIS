import { useState } from 'react';
import { Github, Key, AlertCircle, CheckCircle } from 'lucide-react';
import { contentEditorService } from '../../services/contentEditorService';
import { githubAPIService } from '../../services/githubAPIService';

interface GitHubSettingsProps {
  onSettingsSaved?: () => void;
}

export function GitHubSettings({ onSettingsSaved }: GitHubSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(githubAPIService.getToken() || '');
  const [owner, setOwner] = useState(localStorage.getItem('github_owner') || '');
  const [repo, setRepo] = useState(localStorage.getItem('github_repo') || '');
  const [branch, setBranch] = useState(localStorage.getItem('github_branch') || 'main');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const pendingChanges = contentEditorService.getPendingChanges();
  const changedFiles = Object.keys(pendingChanges);

  const handleSaveSettings = () => {
    if (!token || !owner || !repo) {
      setSubmitError('Token, owner, and repo are required');
      return;
    }

    githubAPIService.setToken(token);
    localStorage.setItem('github_owner', owner);
    localStorage.setItem('github_repo', repo);
    localStorage.setItem('github_branch', branch);

    setSubmitMessage('Settings saved successfully');
    setTimeout(() => {
      setSubmitMessage('');
      setIsOpen(false);
    }, 2000);

    onSettingsSaved?.();
  };

  const handleCommit = async () => {
    if (!token || !owner || !repo || !message) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    try {
      let totalCommitted = 0;

      for (const file of changedFiles) {
        const changes = pendingChanges[file];
        const timestamp = new Date().toISOString();

        // Create commit message
        const commitMsg = `${message}\n\nFile: ${file}\nChanges: ${changes.length}\nTimestamp: ${timestamp}`;

        // Get current file content from GitHub
        try {
          const { content, sha } = await githubAPIService.getFileContent(
            owner,
            repo,
            `src/content/${file}.json`,
            branch
          );

          // Parse the content
          const fileData = JSON.parse(content);

          // Apply changes
          changes.forEach(change => {
            const parts = change.path.split('.');
            let current = fileData;
            for (let i = 0; i < parts.length - 1; i++) {
              current = current[parts[i]];
            }
            current[parts[parts.length - 1]] = change.newValue;
          });

          // Commit the updated content
          await githubAPIService.commitFile(
            owner,
            repo,
            `src/content/${file}.json`,
            JSON.stringify(fileData, null, 2),
            commitMsg,
            sha,
            branch
          );

          totalCommitted += changes.length;
        } catch (error) {
          console.error(`Failed to commit ${file}:`, error);
          // Continue with other files
        }
      }

      setSubmitMessage(`Successfully committed ${totalCommitted} changes across ${changedFiles.length} file(s)`);
      contentEditorService.clearAllChanges();
      setMessage('');
      setIsSubmitting(false);

      setTimeout(() => {
        setSubmitMessage('');
        window.location.reload();
      }, 2000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to commit changes');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
      >
        <Github size={16} />
        GitHub Settings
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Github size={20} />
            GitHub Settings & Commit
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-900 font-bold text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* GitHub Settings Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Key size={18} />
              GitHub Configuration
            </h3>

            <input
              type="password"
              placeholder="GitHub Personal Access Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Repository Owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Repository Name"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              type="text"
              placeholder="Branch (default: main)"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleSaveSettings}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Save Settings
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Commit Section */}
          {changedFiles.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Pending Changes ({contentEditorService.getChangeCount()})
              </h3>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Files to commit:</strong> {changedFiles.join(', ')}
                </p>
              </div>

              <textarea
                placeholder="Describe your changes (commit message)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />

              <button
                onClick={handleCommit}
                disabled={isSubmitting || !message}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Committing...' : 'Commit Changes to GitHub'}
              </button>
            </div>
          )}

          {/* Messages */}
          {submitMessage && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle size={20} className="text-green-600" />
              <span className="text-green-700">{submitMessage}</span>
            </div>
          )}

          {submitError && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle size={20} className="text-red-600" />
              <span className="text-red-700">{submitError}</span>
            </div>
          )}

          {changedFiles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No pending changes to commit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
