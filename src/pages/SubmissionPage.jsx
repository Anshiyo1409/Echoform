import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getSubmissionByTeamId, saveSubmission } from '../services/submissions';
import { FileText, Link as LinkIcon, Figma, Sparkles, CheckCircle2, AlertCircle, Clock, Palette } from 'lucide-react';
import NotificationToast from '../components/NotificationToast';

export default function SubmissionPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const team = currentUser?.team || { id: 'EF-001', teamName: 'Neon Wave Studio' };

  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    rationale: '',
    figmaUrl: '',
    canvaUrl: '',
    thumbnailUrl: ''
  });

  const [existingSubmission, setExistingSubmission] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const sub = getSubmissionByTeamId(team.id);
    if (sub) {
      setExistingSubmission(sub);
      setFormData({
        projectName: sub.projectName || '',
        description: sub.description || '',
        rationale: sub.rationale || '',
        figmaUrl: sub.figmaUrl || '',
        canvaUrl: sub.canvaUrl || '',
        thumbnailUrl: sub.thumbnailUrl || ''
      });
    }
  }, [team.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.projectName || (!formData.figmaUrl && !formData.canvaUrl)) {
      setToast({ type: 'error', message: 'Please provide a Project Name and at least one URL (Figma or Canva link).' });
      return;
    }

    const saved = saveSubmission({
      teamId: team.id,
      ...formData
    });

    setExistingSubmission(saved);
    setToast({ type: 'success', message: 'Project submission successfully recorded!' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <NotificationToast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />

      {/* Header */}
      <div className="border-b border-dark-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-cyber-pink uppercase tracking-widest font-bold">
            PROJECT SUBMISSION PORTAL • TEAM {team.id}
          </span>
          <h1 className="font-outfit font-black text-3xl sm:text-4xl text-white mt-1">
            Submit Your ECHOFORM Design
          </h1>
        </div>

        {existingSubmission && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 text-cyber-emerald font-mono text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>SUBMITTED AT {new Date(existingSubmission.submittedAt).toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-dark-900 border border-dark-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
          
          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
              Project Name *
            </label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="e.g. Raindrop Café Digital Experience"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-dark-800 focus:border-cyber-cyan text-slate-100 text-sm focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Figma Link */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
                <Figma className="w-3.5 h-3.5 text-cyber-pink" />
                Figma File URL
              </label>
              <input
                type="url"
                name="figmaUrl"
                value={formData.figmaUrl}
                onChange={handleChange}
                placeholder="https://figma.com/file/..."
                className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-dark-800 focus:border-cyber-cyan text-slate-100 text-sm focus:outline-none transition-colors"
              />
            </div>

            {/* Canva Link */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-cyber-cyan" />
                Canva Presentation / Design URL
              </label>
              <input
                type="url"
                name="canvaUrl"
                value={formData.canvaUrl}
                onChange={handleChange}
                placeholder="https://canva.com/design/..."
                className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-dark-800 focus:border-cyber-cyan text-slate-100 text-sm focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
              Project Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your design, feature highlights, and user flow..."
              className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-dark-800 focus:border-cyber-cyan text-slate-100 text-sm focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block">
              Sound Interpretation Rationale
            </label>
            <textarea
              name="rationale"
              rows={3}
              value={formData.rationale}
              onChange={handleChange}
              placeholder="How did your assigned audio directly inspire your UI/UX layout and visual choices?"
              className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-dark-800 focus:border-cyber-cyan text-slate-100 text-sm focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink text-dark-950 font-outfit font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-cyber-cyan/20 hover:scale-[1.02] transition-transform"
          >
            <Sparkles className="w-5 h-5 fill-current" />
            {existingSubmission ? 'Update Submission' : 'Submit Final Work'}
          </button>

        </form>

        {/* Sidebar Info & Live Status */}
        <div className="space-y-6">
          
          <div className="bg-dark-900 border border-dark-800 rounded-3xl p-6 space-y-4">
            <h4 className="font-outfit font-bold text-white text-base">
              Submission Guidelines
            </h4>
            <ul className="space-y-2 text-xs font-mono text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-cyber-cyan">•</span>
                <span>You can edit your submission anytime before the competition timer expires.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-pink">•</span>
                <span>Ensure Figma links are set to "Anyone with link can view".</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyber-purple">•</span>
                <span>Ensure Canva links are set to public view access.</span>
              </li>
            </ul>
          </div>

          {existingSubmission && (
            <div className="bg-dark-900 border border-cyber-emerald/40 rounded-3xl p-6 space-y-3">
              <span className="text-[10px] font-mono text-cyber-emerald tracking-widest uppercase font-bold block">
                RECORDED SUBMISSION
              </span>
              <h5 className="font-outfit font-bold text-lg text-white">
                {existingSubmission.projectName}
              </h5>
              <p className="text-xs text-slate-400 font-mono line-clamp-3">
                {existingSubmission.description}
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
