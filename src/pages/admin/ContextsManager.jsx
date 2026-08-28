import React, { useState } from 'react';
import { getContexts, createContext, updateContext, deleteContext } from '../../services/contexts';
import { Target, Plus, Trash2, Edit3, Dna, Check, X } from 'lucide-react';
import NotificationToast from '../../components/NotificationToast';

export default function ContextsManager() {
  const [contexts, setContexts] = useState(getContexts());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    icon: '☕',
    designDna: 'SONIC TEXTURE',
    description: ''
  });

  const [editFormData, setEditFormData] = useState({
    name: '',
    icon: '☕',
    designDna: '',
    description: ''
  });

  const dnaPresets = [
    'SONIC TEXTURE',
    'TACTILE RHYTHM',
    'ORGANIC PULSE',
    'HARMONIC FLOW',
    'DIGITAL FREQUENCY',
    'ACOUSTIC VECTORS',
    'KINETIC RESONANCE',
    'SYNTHETIC ECHO',
    'SPATIAL AMBIENCE',
    'SENSORY VIBRATION',
    'NEURAL WAVE'
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name) {
      setToast({ type: 'error', message: 'Context Name is required.' });
      return;
    }

    const created = createContext({
      name: formData.name,
      icon: formData.icon || '🎯',
      designDna: formData.designDna || 'SONIC TEXTURE',
      description: formData.description
    });

    setContexts(getContexts());
    setShowForm(false);
    setFormData({ name: '', icon: '☕', designDna: 'SONIC TEXTURE', description: '' });
    setToast({ type: 'success', message: `Added custom context "${created.name}" with Design DNA "${created.designDna}"` });
  };

  const startEdit = (ctx) => {
    setEditingId(ctx.id);
    setEditFormData({
      name: ctx.name,
      icon: ctx.icon || '🎯',
      designDna: ctx.designDna || 'SONIC TEXTURE',
      description: ctx.description || ''
    });
  };

  const handleSaveEdit = (id) => {
    if (!editFormData.name) {
      setToast({ type: 'error', message: 'Context Name is required.' });
      return;
    }

    updateContext(id, {
      name: editFormData.name,
      icon: editFormData.icon || '🎯',
      designDna: editFormData.designDna || 'SONIC TEXTURE',
      description: editFormData.description
    });

    setContexts(getContexts());
    setEditingId(null);
    setToast({ type: 'success', message: 'Design Context updated successfully!' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this design context?')) {
      deleteContext(id);
      setContexts(getContexts());
      setToast({ type: 'success', message: 'Context deleted' });
    }
  };

  const sampleIcons = ['☕', '🛒', '🏥', '🎓', '🏦', '✈️', '🏋️', '🎮', '🏠', '🍔', '🎵', '🚆', '🤖', '💼', '🚀', '🎨'];

  return (
    <div className="space-y-6">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-outfit font-black text-2xl text-white">
            Design Context & DNA Library ({contexts.length})
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Manage custom target industry contexts and Design DNA attributes assigned to participating teams.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-xl bg-cyber-purple text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyber-purple/20 hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Cancel Add Context' : '+ Add Custom Context & DNA'}
        </button>
      </div>

      {/* CREATE FORM */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-dark-900 border border-cyber-pink/40 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-cyber-pink" />
            <h3 className="font-outfit font-bold text-lg text-white">Add New Custom Design Context & DNA</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Context Name (e.g. Hotel & Hospitality) *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white sm:col-span-2 focus:border-cyber-pink outline-none"
              required
            />
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Icon:</span>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-16 text-center py-2 rounded-xl bg-dark-950 border border-dark-800 text-base"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono text-slate-500 mr-2">Quick Icons:</span>
            {sampleIcons.map(ic => (
              <button
                key={ic}
                type="button"
                onClick={() => setFormData({ ...formData, icon: ic })}
                className="w-7 h-7 rounded-lg bg-dark-950 border border-dark-800 text-sm hover:border-cyber-pink transition-colors"
              >
                {ic}
              </button>
            ))}
          </div>

          {/* DESIGN DNA INPUT */}
          <div className="space-y-2 pt-2 border-t border-dark-800/80">
            <label className="flex items-center gap-1.5 text-xs font-mono text-cyber-purple font-bold">
              <Dna className="w-4 h-4" />
              <span>CUSTOM DESIGN DNA ATTRIBUTE:</span>
            </label>
            <input
              type="text"
              placeholder="e.g. SONIC TEXTURE, KINETIC RESONANCE, NEURAL WAVE..."
              value={formData.designDna}
              onChange={(e) => setFormData({ ...formData, designDna: e.target.value.toUpperCase() })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-cyber-purple/50 text-xs font-mono text-cyber-purple font-bold tracking-wider uppercase focus:border-cyber-purple outline-none"
            />
            
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] font-mono text-slate-500 mr-2">Preset DNA:</span>
              {dnaPresets.map(dna => (
                <button
                  key={dna}
                  type="button"
                  onClick={() => setFormData({ ...formData, designDna: dna })}
                  className="px-2.5 py-1 rounded-md bg-dark-950 border border-dark-800 text-[10px] font-mono text-slate-300 hover:border-cyber-purple hover:text-cyber-purple transition-all"
                >
                  {dna}
                </button>
              ))}
            </div>
          </div>

          <textarea
            placeholder="Context guidelines & design direction (e.g. Boutique hotel booking, room service UI, digital concierge)..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white focus:border-cyber-pink outline-none"
          />

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-pink to-cyber-purple text-white font-bold text-xs shadow-lg hover:scale-105 transition-transform"
            >
              Save Custom Context & DNA
            </button>
          </div>
        </form>
      )}

      {/* CONTEXTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contexts.map((ctx) => (
          <div
            key={ctx.id}
            className="bg-dark-900 border border-dark-800 rounded-2xl p-5 flex flex-col justify-between space-y-3 hover:border-cyber-pink/40 transition-colors shadow-lg relative group"
          >
            {editingId === ctx.id ? (
              /* INLINE EDIT FORM */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyber-pink font-bold">Editing Context</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleSaveEdit(ctx.id)}
                      className="p-1 rounded bg-cyber-emerald/20 text-cyber-emerald hover:bg-cyber-emerald/30"
                      title="Save Changes"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editFormData.icon}
                    onChange={(e) => setEditFormData({ ...editFormData, icon: e.target.value })}
                    className="w-12 text-center py-1 rounded bg-dark-950 border border-dark-800 text-sm text-white"
                  />
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="flex-1 px-2.5 py-1 rounded bg-dark-950 border border-dark-800 text-xs text-white font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-cyber-purple font-bold">Design DNA:</label>
                  <input
                    type="text"
                    value={editFormData.designDna}
                    onChange={(e) => setEditFormData({ ...editFormData, designDna: e.target.value.toUpperCase() })}
                    className="w-full px-2.5 py-1 rounded bg-dark-950 border border-cyber-purple/40 text-[11px] font-mono text-cyber-purple font-bold tracking-wider uppercase"
                  />
                </div>

                <textarea
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  rows={2}
                  className="w-full px-2.5 py-1 rounded bg-dark-950 border border-dark-800 text-[11px] text-slate-300"
                />
              </div>
            ) : (
              /* CARD VIEW */
              <>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyber-pink/10 border border-cyber-pink/30 flex items-center justify-center text-xl">
                        {ctx.icon || '🎯'}
                      </div>
                      <div>
                        <h4 className="font-outfit font-bold text-white text-base">{ctx.name}</h4>
                        <span className="text-[10px] font-mono text-slate-400">ID: {ctx.id}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startEdit(ctx)}
                        className="text-slate-500 hover:text-cyber-pink p-1 transition-colors"
                        title="Edit Context & Design DNA"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(ctx.id)}
                        className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        title="Delete Context"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* DESIGN DNA BADGE */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-950 border border-cyber-purple/40 text-cyber-purple font-mono text-[11px] tracking-wider font-bold">
                    <Dna className="w-3.5 h-3.5" />
                    <span>DNA: {ctx.designDna || 'SONIC TEXTURE'}</span>
                  </div>

                  <p className="text-xs text-slate-400 font-mono leading-relaxed line-clamp-2">
                    {ctx.description || 'No specific description set.'}
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
