import React, { useEffect, useRef } from 'react';

export default function AudioWaveformCanvas({ isPlaying = false, height = 120, color = '#00F0FF' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const h = canvas.height;
      const centerY = h / 2;

      // Draw background ambient glow
      const bgGrad = ctx.createLinearGradient(0, 0, width, 0);
      bgGrad.addColorStop(0, 'rgba(0, 240, 255, 0.02)');
      bgGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.05)');
      bgGrad.addColorStop(1, 'rgba(236, 72, 153, 0.02)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, h);

      // Draw grid center axis
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Render 30 frequency bars
      const numBars = 36;
      const barWidth = (width / numBars) * 0.5;
      const barGap = (width / numBars) * 0.5;

      for (let i = 0; i < numBars; i++) {
        const x = i * (barWidth + barGap) + barGap / 2;
        
        let amp = 0.15;
        if (isPlaying) {
          amp = 0.2 + 0.75 * Math.abs(Math.sin(phase * 0.05 + i * 0.35) * Math.cos(phase * 0.02 + i * 0.1));
        } else {
          amp = 0.1 + 0.08 * Math.sin(phase * 0.02 + i * 0.2);
        }

        const barHeight = Math.max(4, h * 0.7 * amp);
        const yTop = centerY - barHeight / 2;

        const barGrad = ctx.createLinearGradient(0, yTop, 0, yTop + barHeight);
        barGrad.addColorStop(0, '#00F0FF');
        barGrad.addColorStop(0.5, '#8B5CF6');
        barGrad.addColorStop(1, '#EC4899');

        ctx.fillStyle = barGrad;
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = isPlaying ? 8 : 2;
        
        // Rounded bar
        ctx.beginPath();
        ctx.roundRect(x, yTop, barWidth, barHeight, 3);
        ctx.fill();
      }

      // Render primary waveform line overlay
      ctx.shadowBlur = isPlaying ? 12 : 3;
      ctx.shadowColor = '#00F0FF';
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#00F0FF';

      for (let x = 0; x < width; x += 3) {
        const normX = x / width;
        let y = centerY;
        
        if (isPlaying) {
          const wave1 = Math.sin(normX * 12 + phase * 0.08) * 18;
          const wave2 = Math.cos(normX * 24 - phase * 0.05) * 10;
          const wave3 = Math.sin(normX * 4 + phase * 0.02) * 8;
          y = centerY + (wave1 + wave2 + wave3);
        } else {
          y = centerY + Math.sin(normX * 8 + phase * 0.02) * 4;
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      phase += 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <div className="w-full relative overflow-hidden rounded-xl border border-dark-800 bg-dark-950/80 p-2 shadow-inner">
      <canvas
        ref={canvasRef}
        width={600}
        height={height}
        className="w-full h-auto block rounded-lg"
      />
    </div>
  );
}
