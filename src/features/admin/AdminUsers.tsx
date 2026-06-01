import { useState } from 'react';
import { UserPlus, Pencil, KeyRound, Trash2, ShieldAlert, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  useAdminUsers,
  useCreateAdmin,
  useUpdateAdmin,
  useResetAdminPassword,
  useDeleteAdmin,
} from '../../hooks/useAdminUsers';
import type { AdminProfile, AssignableRole } from '../../lib/admin-types';

// ── Role metadata ─────────────────────────────────────────────────────────────

const ROLE_META: Record<string, { label: string; color: string; description: string }> = {
  super_admin: {
    label: 'Super Admin',
    color: 'bg-cardinal-red/10 text-cardinal-red',
    description: 'Full access to all admin features.',
  },
  content_editor: {
    label: 'Content Editor',
    color: 'bg-digital-blue/10 text-digital-blue',
    description: 'Can edit page content sections.',
  },
  news_editor: {
    label: 'News Editor',
    color: 'bg-green-100 text-green-700',
    description: 'Can publish, draft, and approve news.',
  },
  news_drafter: {
    label: 'News Drafter',
    color: 'bg-sand/30 text-black',
    description: 'Can create and save drafts only.',
  },
};

const ASSIGNABLE_OPTIONS: { value: AssignableRole; label: string; description: string }[] = [
  { value: 'content_editor', label: 'Content Editor', description: 'Edit page content sections' },
  { value: 'news_editor',    label: 'News Editor',    description: 'Publish, draft, and approve news' },
  { value: 'news_drafter',   label: 'News Drafter',   description: 'Create and save drafts only' },
];

function RoleBadge({ role }: { role: string }) {
  const m = ROLE_META[role] ?? { label: role, color: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${m.color}`}>
      {m.label}
    </span>
  );
}

// ── Shared modal wrapper ──────────────────────────────────────────────────────

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ── Create modal ──────────────────────────────────────────────────────────────

function CreateAdminModal({ onClose }: { onClose: () => void }) {
  const createMutation = useCreateAdmin();
  const [form, setForm] = useState({
    displayName: '',
    username: '',
    password: '',
    role: 'news_drafter' as AssignableRole,
  });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await createMutation.mutateAsync(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create admin');
    }
  }

  return (
    <Modal title="Add Admin Account" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Display Name</label>
          <input
            type="text"
            required
            value={form.displayName}
            onChange={e => setForm({ ...form, displayName: e.target.value })}
            placeholder="e.g. Bat-Erdene"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
          <input
            type="text"
            required
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            placeholder="login username"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            placeholder="min 6 characters"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value as AssignableRole })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none"
          >
            {ASSIGNABLE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label} — {opt.description}</option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">{ROLE_META[form.role]?.description}</p>
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-cardinal-red rounded-xl hover:bg-digital-red transition-colors disabled:opacity-60"
          >
            {createMutation.isPending ? 'Creating…' : 'Create Account'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ── Edit role/name modal ──────────────────────────────────────────────────────

function EditAdminModal({ admin, onClose }: { admin: AdminProfile; onClose: () => void }) {
  const updateMutation = useUpdateAdmin();
  const [form, setForm] = useState({
    displayName: admin.displayName,
    role: admin.role as AssignableRole,
  });
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await updateMutation.mutateAsync({ id: admin.id, data: form });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
    }
  }

  return (
    <Modal title={`Edit — ${admin.displayName}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Display Name</label>
          <input
            type="text"
            required
            value={form.displayName}
            onChange={e => setForm({ ...form, displayName: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value as AssignableRole })}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none"
          >
            {ASSIGNABLE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={updateMutation.isPending}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-cardinal-red rounded-xl hover:bg-digital-red transition-colors disabled:opacity-60">
            {updateMutation.isPending ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ── Reset password modal ──────────────────────────────────────────────────────

function ResetPasswordModal({ admin, onClose }: { admin: AdminProfile; onClose: () => void }) {
  const resetMutation = useResetAdminPassword();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    try {
      await resetMutation.mutateAsync({ id: admin.id, data: { newPassword: password } });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    }
  }

  return (
    <Modal title={`Reset Password — ${admin.displayName}`} onClose={onClose}>
      {success ? (
        <div className="text-center py-4 space-y-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto text-green-600 text-2xl">✓</div>
          <p className="text-gray-700 font-medium">Password reset successfully.</p>
          <button onClick={onClose} className="mt-2 px-6 py-2.5 text-sm font-semibold text-white bg-cardinal-red rounded-xl hover:bg-digital-red transition-colors">
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
            <input type="password" required value={password} minLength={6}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none"
              placeholder="min 6 characters" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
            <input type="password" required value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none" />
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={resetMutation.isPending}
              className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-cardinal-red rounded-xl hover:bg-digital-red transition-colors disabled:opacity-60">
              {resetMutation.isPending ? 'Resetting…' : 'Reset Password'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

// ── Admin row ─────────────────────────────────────────────────────────────────

function AdminRow({
  admin,
  isSelf,
  onEdit,
  onResetPassword,
  onDelete,
}: {
  admin: AdminProfile;
  isSelf: boolean;
  onEdit: () => void;
  onResetPassword: () => void;
  onDelete: () => void;
}) {
  const isSuperAdmin = admin.role === 'super_admin';
  const restricted = isSelf || isSuperAdmin;
  const restrictedReason = isSelf ? 'Cannot modify your own account' : 'Cannot modify super admin accounts';

  const formattedDate = admin.createdAt
    ? new Date(admin.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : '—';

  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-cardinal-red/10 flex items-center justify-center text-cardinal-red text-sm font-bold flex-shrink-0">
            {admin.displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{admin.displayName}</p>
            {isSelf && <p className="text-xs text-gray-400">You</p>}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <RoleBadge role={admin.role} />
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{formattedDate}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 justify-end">
          {restricted ? (
            <span title={restrictedReason} className="inline-flex items-center gap-1 text-xs text-gray-400 px-3 py-1.5">
              <ShieldAlert size={13} />
              {isSelf ? 'You' : 'Protected'}
            </span>
          ) : (
            <>
              <button
                onClick={onEdit}
                title="Edit name / role"
                className="p-2 text-gray-400 hover:text-digital-blue hover:bg-digital-blue/10 rounded-lg transition-colors"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={onResetPassword}
                title="Reset password"
                className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              >
                <KeyRound size={14} />
              </button>
              <button
                onClick={onDelete}
                title="Delete account"
                className="p-2 text-gray-400 hover:text-cardinal-red hover:bg-cardinal-red/10 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

type ModalState =
  | { type: 'create' }
  | { type: 'edit'; admin: AdminProfile }
  | { type: 'reset'; admin: AdminProfile }
  | null;

export function AdminUsers() {
  const { admin: currentAdmin } = useAuth();
  const { data: admins, isLoading, error } = useAdminUsers();
  const deleteMutation = useDeleteAdmin();
  const [modal, setModal] = useState<ModalState>(null);

  function handleDelete(target: AdminProfile) {
    if (!confirm(`Delete account "${target.displayName}" (${ROLE_META[target.role]?.label ?? target.role})?\n\nThis will permanently remove their access to the admin panel.`)) return;
    if (!confirm(`Second confirmation: permanently delete "${target.displayName}"? This cannot be undone.`)) return;
    deleteMutation.mutate(target.id);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Accounts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage who has access to the admin panel and what they can do.</p>
        </div>
        <button
          onClick={() => setModal({ type: 'create' })}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-cardinal-red rounded-xl hover:bg-digital-red transition-colors shadow-sm"
        >
          <UserPlus size={16} />
          Add Account
        </button>
      </div>

      {/* Role legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ASSIGNABLE_OPTIONS.map(opt => (
          <div key={opt.value} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <RoleBadge role={opt.value} />
            <p className="text-xs text-gray-500 mt-2">{opt.description}</p>
          </div>
        ))}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <RoleBadge role="super_admin" />
          <p className="text-xs text-gray-500 mt-2">Full access to all features. Cannot be assigned via panel.</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading && (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cardinal-red mx-auto" />
            <p className="text-sm text-gray-400 mt-3">Loading accounts…</p>
          </div>
        )}

        {error && (
          <div className="p-8 text-center text-red-600">
            <p className="font-semibold">Failed to load admin accounts</p>
            <p className="text-sm mt-1">{error instanceof Error ? error.message : 'Unknown error'}</p>
          </div>
        )}

        {admins && (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Account</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Role</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Created</th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">No admin accounts found.</td>
                </tr>
              )}
              {admins.map(a => (
                <AdminRow
                  key={a.id}
                  admin={a}
                  isSelf={a.id === currentAdmin?.id}
                  onEdit={() => setModal({ type: 'edit', admin: a })}
                  onResetPassword={() => setModal({ type: 'reset', admin: a })}
                  onDelete={() => handleDelete(a)}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      {modal?.type === 'create' && <CreateAdminModal onClose={() => setModal(null)} />}
      {modal?.type === 'edit'   && <EditAdminModal   admin={modal.admin} onClose={() => setModal(null)} />}
      {modal?.type === 'reset'  && <ResetPasswordModal admin={modal.admin} onClose={() => setModal(null)} />}
    </div>
  );
}
