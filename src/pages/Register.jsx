import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center font-mono text-xs text-slate-400">
      Redirecting to Gameroom Login...
    </div>
  );
}
