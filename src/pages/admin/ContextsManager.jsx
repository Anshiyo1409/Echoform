import React, { useState } from 'react';
import { getContexts, createContext, deleteContext } from '../../services/contexts';
import { Target, Plus, Trash2 } from 'lucide-react';
import NotificationToast from '../../components/NotificationToast';

export default function ContextsManager() {
  const [contexts, setContexts] = useState(getContexts());
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    icon: '☕',
    description: ''
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.name) {
      setToast({ type: 'error', message: 'Context Name is required.' });
      return;
    }

    const created = createContext({
      name: formData.name,
      icon: formData.icon || '🎯',
      description: formData.description
    });

    setContexts(getContexts());
    setShowForm(false);
    setFormData({ name: '', icon: '☕', description: '' });
    setToast({ type: 'success', message: `Added context "${created.name}"` });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this design context?')) {
      deleteContext(id);
      setContexts(getContexts());
      setToast({ type: 'success', message: 'Context deleted' });
    }
  };

  const sampleIcons = ['☕', '🛒', '🏥', '🎓', '🏦', '✈️', '🏋️', '🎮', '🏠', '🍔', '🎵', '🚆', '🤖', '💼'];

  return (
    <div className="space-y-6">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-outfit font-black text-2xl text-white">
            Design Context Library ({contexts.length})
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Manage target industry contexts assigned to participating teams.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-xl bg-cyber-purple text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyber-purple/20 hover:scale-105 transition-transform"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Cancel Add Context' : '+ Add Design Context'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-dark-900 border border-cyber-pink/40 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="font-outfit font-bold text-lg text-white">Add New Context</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Context Name (e.g. Hotel & Hospitality) *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3.5 py-2 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white sm:col-span-2"
              required
            />
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Icon:</span>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-12 text-center py-2 rounded-xl bg-dark-950 border border-dark-800 text-base"
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
                className="w-7 h-7 rounded-lg bg-dark-950 border border-dark-800 text-sm hover:border-cyber-pink"
              >
                {ic}
              </button>
            ))}
          </div>

          <textarea
            placeholder="Context guidelines & design direction (e.g. Boutique hotel booking, room service UI, digital concierge)..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-dark-800 text-xs text-white"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyber-pink to-cyber-purple text-white font-bold text-xs"
            >
              Save Context
            </button>
          </div>
        </form>
      )}

      {/* Contexts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contexts.map((ctx) => (
          <div
            key={ctx.id}
            className="bg-dark-900 border border-dark-800 rounded-2xl p-5 flex flex-col justify-between space-y-3 hover:border-cyber-pink/40 transition-colors"
          >
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

              <button
                onClick={() => handleDelete(ctx.id)}
                className="text-slate-500 hover:text-rose-400 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 font-mono leading-relaxed line-clamp-2">
              {ctx.description}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
