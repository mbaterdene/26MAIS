import { useState } from 'react';
import { Github, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { contentEditorService } from '../../../services/contentEditorService';
import { githubAPIService } from '../../../services/githubAPIService';

export function GitHubSettingsPage() {
  const { isEnglish } = useLanguage();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [expandedFiles, setExpandedFiles] = useState<Record<string, boolean>>({});

  const pendingChanges = contentEditorService.getPendingChanges();
  const changedFiles = Object.keys(pendingChanges);

  const toggleFileExpand = (file: string) => {
    setExpandedFiles(prev => ({
      ...prev,
      [file]: !prev[file]
    }));
  };

  const handleCommit = async () => {
    const token = githubAPIService.getToken();
    const owner = githubAPIService.getOwner();
    const repo = githubAPIService.getRepo();

    if (!token || !owner || !repo || !message) {
      setSubmitError('GitHub credentials not configured or message is empty');
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

        const commitMsg = `${message}\n\nFile: ${file}\nChanges: ${changes.length}\nTimestamp: ${timestamp}`;

        const filePath = file === 'staff' ? 'src/data/staffData.json' : `src/content/${file}.json`;

        try {
          const { content, sha } = await githubAPIService.getFileContent(
            owner,
            repo,
            filePath,
            'main'
          );

          const fileData = JSON.parse(content);

          changes.forEach(change => {
            const parts = change.path.split('.');
            let current = fileData;
            for (let i = 0; i < parts.length - 1; i++) {
              current = current[parts[i]];
            }
            current[parts[parts.length - 1]] = change.newValue;
          });

          await githubAPIService.commitFile(
            owner,
            repo,
            filePath,
            JSON.stringify(fileData, null, 2),
            commitMsg,
            sha,
            'main'
          );

          totalCommitted += changes.length;
        } catch (error) {
          console.error(`Failed to commit ${file}:`, error);
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

  const totalChanges = Object.values(pendingChanges).reduce(
    (sum, changes) => sum + changes.length,
    0
  );

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <div className="flex items-center gap-3 mb-3">
          <Github size={32} className="text-blue-600" />
          <h1 className="text-4xl font-serif font-bold text-black">
            {isEnglish ? 'Push Changes to GitHub' : 'GitHub руу Илгээх'}
          </h1>
        </div>
        <p className="text-gray-600">
          {isEnglish
            ? 'Review your changes and push them directly to the repository.'
            : 'Өөрчлөлтүүдийг харан репозиторид илгээнэ.'}
        </p>
      </div>

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

      {totalChanges === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <p className="text-gray-500 text-lg">
            {isEnglish ? 'No pending changes to push' : 'Илгээх өөрчлөлт байхгүй'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Changes Preview */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {isEnglish ? 'Changes to Push' : 'Илгээх Өөрчлөлтүүд'} ({totalChanges})
            </h2>

            {changedFiles.map(file => (
              <div key={file} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* File Header */}
                <button
                  onClick={() => toggleFileExpand(file)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{file}</p>
                    <p className="text-sm text-gray-500">
                      {pendingChanges[file].length} change{pendingChanges[file].length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {expandedFiles[file] ? (
                    <ChevronUp size={20} className="text-gray-600" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-600" />
                  )}
                </button>

                {/* File Changes Details */}
                {expandedFiles[file] && (
                  <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-3">
                    {pendingChanges[file].map((change, idx) => (
                      <div key={idx} className="bg-white rounded p-3 border border-gray-200 text-sm">
                        <p className="font-mono text-xs text-gray-600 mb-2">{change.path}</p>
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-600 mb-1">New Value:</p>
                            <p className="font-mono text-xs bg-green-50 border border-green-200 rounded p-2 text-green-900 break-words">
                              {typeof change.newValue === 'string' 
                                ? change.newValue.substring(0, 100) 
                                : JSON.stringify(change.newValue).substring(0, 100)}
                              {typeof change.newValue === 'string' && change.newValue.length > 100 ? '...' : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column - Commit Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4 sticky top-32">
              <h3 className="text-lg font-bold text-gray-900">
                {isEnglish ? 'Commit Message' : 'Сүүлийн Үг'}
              </h3>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isEnglish ? 'Describe your changes...' : 'Өөрчлөлтөө тайлбарлана уу...'}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              />

              <button
                onClick={handleCommit}
                disabled={isSubmitting || !message.trim()}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border border-white border-t-transparent"></div>
                    {isEnglish ? 'Pushing...' : 'Илгээж байна...'}
                  </>
                ) : (
                  <>
                    <Github size={18} />
                    {isEnglish ? 'Push to GitHub' : 'GitHub руу Илгээх'}
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  {isEnglish
                    ? 'Changes will be committed to the main branch'
                    : 'Өөрчлөлтүүдийг main салааруу харилцуулна'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
