import { useState } from 'react';
import {
  Cloud, Plus, Trash2, Star, Loader2, CheckCircle2,
  XCircle, HardDrive, Lock, AlertCircle, RefreshCw,
} from 'lucide-react';
import {
  useCloudConfigs,
  useCloudUsage,
  useCreateCloudConfig,
  useDeleteCloudConfig,
  useSetPrimaryCloud,
  useTestCloudConfig,
} from '../../hooks/useCloudConfigs';
import type { CloudConfig } from '../../lib/admin-types';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes >= 1_073_741_824) return `${(bytes / 1_073_741_824).toFixed(1)} GB`;
  if (bytes >= 1_048_576)     return `${(bytes / 1_048_576).toFixed(1)} MB`;
  if (bytes >= 1_024)         return `${(bytes / 1_024).toFixed(0)} KB`;
  return `${bytes} B`;
}

// ── Storage bar — fetches its own usage via React Query ──────────────────────

function StorageBar({ cloudId }: { cloudId: string }) {
  const { data, isLoading } = useCloudUsage(cloudId);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Loader2 size={12} className="animate-spin" /> Loading storage…
      </div>
    );
  }
  if (!data?.ok || !data.storage) {
    return <p className="text-xs text-gray-400">{data?.error ?? 'Storage unavailable'}</p>;
  }

  const { usage, limit } = data.storage;
  const pct = limit > 0 ? Math.min((usage / limit) * 100, 100) : 0;
  const barColor = pct > 80 ? 'bg-red-500' : pct > 60 ? 'bg-yellow-400' : 'bg-emerald-500';

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-500">
        <span className="font-medium">{formatBytes(usage)} used</span>
        <span>{formatBytes(limit)} limit · {pct.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div className={`${barColor} h-2 rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      {data.objects && (
        <p className="text-xs text-gray-400">{data.objects.usage.toLocaleString()} objects · {data.plan ?? ''}</p>
      )}
    </div>
  );
}

// ── Cloud card ────────────────────────────────────────────────────────────────

interface CloudCardProps {
  cloud: CloudConfig;
  onDelete: (cloud: CloudConfig) => void;
}

function CloudCard({ cloud, onDelete }: CloudCardProps) {
  const setPrimary = useSetPrimaryCloud();
  const testMutation = useTestCloudConfig();
  const [testState, setTestState] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [testError, setTestError] = useState('');

  async function handleTest() {
    setTestState('loading');
    const result = await testMutation.mutateAsync(cloud.id).catch(() => ({ ok: false, error: 'Request failed' }));
    if (result.ok) {
      setTestState('ok');
      setTimeout(() => setTestState('idle'), 3000);
    } else {
      setTestState('error');
      setTestError(result.error ?? 'Unknown error');
      setTimeout(() => setTestState('idle'), 5000);
    }
  }

  return (
    <div className={`bg-white rounded-2xl border ${cloud.isPrimary ? 'border-cardinal-red/30 shadow-md' : 'border-gray-100 shadow-sm'} p-6 space-y-4 transition-all`}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`p-2 rounded-xl flex-shrink-0 ${cloud.isPrimary ? 'bg-cardinal-red/10 text-cardinal-red' : 'bg-gray-100 text-gray-500'}`}>
            <Cloud size={18} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900 text-sm truncate">{cloud.label}</h3>
              {cloud.isPrimary && (
                <span className="inline-flex items-center gap-1 bg-cardinal-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  <Star size={10} /> Primary
                </span>
              )}
              {!cloud.active && (
                <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Inactive</span>
              )}
            </div>
            <code className="text-xs text-gray-500 bg-gray-50 px-1.5 py-0.5 rounded font-mono">{cloud.cloudName}</code>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {!cloud.isPrimary && (
            <button
              onClick={() => setPrimary.mutateAsync(cloud.id)}
              disabled={setPrimary.isPending}
              title="Set as primary upload cloud"
              className="p-1.5 rounded-lg text-gray-400 hover:text-cardinal-red hover:bg-cardinal-red/5 transition-colors"
            >
              {setPrimary.isPending ? <Loader2 size={15} className="animate-spin" /> : <Star size={15} />}
            </button>
          )}
          <button
            onClick={() => onDelete(cloud)}
            title="Delete"
            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Credentials row */}
      <div className="flex items-center gap-2 text-xs">
        {cloud.hasCredentials ? (
          <>
            <Lock size={12} className="text-emerald-500 flex-shrink-0" />
            <span className="text-gray-500 font-mono">{cloud.apiKeyMasked}</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-400">secret encrypted</span>
          </>
        ) : (
          <>
            <AlertCircle size={12} className="text-amber-400 flex-shrink-0" />
            <span className="text-amber-600">Name-only — no upload credentials</span>
          </>
        )}
      </div>

      {/* Storage bar */}
      {cloud.hasCredentials && (
        <div className="pt-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2">
            <HardDrive size={12} />
            Storage
          </div>
          <StorageBar cloudId={cloud.id} />
        </div>
      )}

      {/* Test connection */}
      {cloud.hasCredentials && (
        <div className="pt-1 border-t border-gray-50">
          <button
            onClick={handleTest}
            disabled={testState === 'loading'}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              testState === 'ok'    ? 'text-emerald-700 bg-emerald-50' :
              testState === 'error' ? 'text-red-600 bg-red-50' :
                                     'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {testState === 'loading' && <Loader2 size={12} className="animate-spin" />}
            {testState === 'ok'      && <CheckCircle2 size={12} />}
            {testState === 'error'   && <XCircle size={12} />}
            {testState === 'idle'    && <RefreshCw size={12} />}
            {testState === 'idle'    && 'Test connection'}
            {testState === 'loading' && 'Testing…'}
            {testState === 'ok'      && 'Connected'}
            {testState === 'error'   && `Failed: ${testError}`}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Add / Edit modal ──────────────────────────────────────────────────────────

interface FormState {
  label: string;
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

const EMPTY_FORM: FormState = { label: '', cloudName: '', apiKey: '', apiSecret: '' };

interface CloudFormModalProps {
  onClose: () => void;
}

function CloudFormModal({ onClose }: CloudFormModalProps) {
  const createMutation = useCreateCloudConfig();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState('');

  function set(key: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.label.trim() || !form.cloudName.trim()) {
      setError('Label and Cloud Name are required.');
      return;
    }
    try {
      await createMutation.mutateAsync({
        label:     form.label,
        cloudName: form.cloudName,
        apiKey:    form.apiKey,
        apiSecret: form.apiSecret,
        active:    true,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  }

  const isLoading = createMutation.isPending;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Add Cloud</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            API Key and Secret are optional — only the Cloud Name is needed to display existing images.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg flex items-center gap-2 border border-red-200">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Label <span className="text-cardinal-red">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Primary Upload"
              value={form.label}
              onChange={(e) => set('label', e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Cloud Name <span className="text-cardinal-red">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. diumfxa7s"
              value={form.cloudName}
              onChange={(e) => set('cloudName', e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none text-sm font-mono"
            />
            <p className="text-xs text-gray-400 mt-1">
              The Cloudinary cloud name (subdomain). Only this is needed to display existing images.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">API Key</label>
            <input
              type="text"
              placeholder="e.g. 879636425963594"
              value={form.apiKey}
              onChange={(e) => set('apiKey', e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              API Secret
              <span className="ml-2 text-xs font-normal text-emerald-600 inline-flex items-center gap-1">
                <Lock size={10} /> AES-256-GCM encrypted
              </span>
            </label>
            <input
              type="password"
              placeholder="Paste API secret"
              value={form.apiSecret}
              onChange={(e) => set('apiSecret', e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-cardinal-red hover:bg-red-800 disabled:opacity-50 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 size={14} className="animate-spin" />}
              Add Cloud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function AdminCloudConfig() {
  const { data: clouds, isLoading, refetch } = useCloudConfigs();
  const deleteMutation = useDeleteCloudConfig();

  const [showForm, setShowForm] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  function handleCloseForm() {
    setShowForm(false);
  }

  function handleDelete(cloud: CloudConfig) {
    if (cloud.isPrimary) {
      setDeleteError(`"${cloud.label}" is the primary upload cloud. Set another cloud as primary before deleting it.`);
      setTimeout(() => setDeleteError(''), 5000);
      return;
    }
    if (!confirm(`Delete "${cloud.label}" (${cloud.cloudName})?\n\nThis removes the cloud from your config. Any images already hosted on this Cloudinary account will still be accessible via their URLs — but you will lose the ability to manage or upload to this account from here.\n\nContinue?`)) return;
    if (!confirm(`Second confirmation: permanently delete "${cloud.label}"? This cannot be undone.`)) return;
    deleteMutation.mutateAsync(cloud.id).then(() => refetch());
  }

  const primary = clouds.find((c) => c.isPrimary);
  const others = clouds.filter((c) => !c.isPrimary);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
            <div className="bg-cardinal-red/10 p-2 rounded-lg text-cardinal-red">
              <Cloud size={24} />
            </div>
            Cloud Storage
          </h1>
          <p className="text-gray-500 mt-1">
            Manage Cloudinary accounts that form your unified storage pool.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-cardinal-red hover:bg-red-800 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
        >
          <Plus size={16} /> Add Cloud
        </button>
      </div>

      {/* Encryption info banner */}
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
        <Lock size={16} className="flex-shrink-0 text-emerald-600" />
        <span>
          API secrets are encrypted with <strong>AES-256-GCM</strong> before storage.
          The encryption key is derived from your server's auth secret and never touches the database.
        </span>
      </div>

      {/* Delete error */}
      {deleteError && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          <AlertCircle size={16} className="flex-shrink-0" />
          {deleteError}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-cardinal-red" size={32} />
        </div>
      ) : clouds.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center text-gray-500">
          <Cloud size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="font-medium">No cloud accounts configured yet.</p>
          <p className="text-sm mt-1">Add your first Cloudinary cloud to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Primary cloud */}
          {primary && (
            <div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Primary Upload Cloud
              </h2>
              <CloudCard cloud={primary} onDelete={handleDelete} />
            </div>
          )}

          {/* Other clouds */}
          {others.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Additional Clouds
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {others.map((cloud) => (
                  <CloudCard key={cloud.id} cloud={cloud} onDelete={handleDelete} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit modal */}
      {showForm && (
        <CloudFormModal onClose={handleCloseForm} />
      )}
    </div>
  );
}
