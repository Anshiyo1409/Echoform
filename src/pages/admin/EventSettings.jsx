import React, { useState } from 'react';
import { getEventDetails, updateEventDetails } from '../../services/event';
import { Settings, Save, Calendar, Clock, Bell, Radio } from 'lucide-react';
import NotificationToast from '../../components/NotificationToast';

export default function EventSettings() {
  const [eventData, setEventData] = useState(getEventDetails());
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = updateEventDetails(eventData);
    setEventData(updated);
    setToast({ type: 'success', message: 'Event configuration saved!' });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      <div>
        <h2 className="font-outfit font-black text-2xl text-white">
          Event Settings & Timing
        </h2>
        <p className="text-xs text-slate-400 font-mono">
          Configure event details, date, start time, end time, and live announcements.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-dark-900 border border-dark-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        
        <div className="space-y-1">
          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
            Event Name
          </label>
          <input
            type="text"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-slate-100 font-outfit font-bold text-base focus:border-cyber-purple focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-xs font-mono text-slate-100 focus:border-cyber-purple focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={eventData.startTime}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-xs font-mono text-slate-100 focus:border-cyber-purple focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={eventData.endTime}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-xs font-mono text-slate-100 focus:border-cyber-purple focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
            Organizer Announcement Banner
          </label>
          <textarea
            name="announcement"
            rows={3}
            value={eventData.announcement || ''}
            onChange={handleChange}
            placeholder="Broadcast announcement message to all teams..."
            className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-dark-800 text-xs font-mono text-slate-100 focus:border-cyber-purple focus:outline-none"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-cyber-purple text-white font-outfit font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-cyber-purple/30 hover:scale-105 transition-transform"
          >
            <Save className="w-4 h-4" />
            Save Event Settings
          </button>
        </div>

      </form>
    </div>
  );
}
