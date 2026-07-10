import { useEffect, useRef } from "react";

// Required 12 labels from spec, plus extras for variety
const TECH_LABELS = [
  "Java",
  ".NET",
  "SAP",
  "AI",
  "Python",
  "React",
  "AWS",
  "Azure",
  "Oracle",
  "SQL",
  "DevOps",
  "Docker",
  "Cloud",
  "Node.js",
  "Kubernetes",
  "TypeScript",
  "Salesforce",
  "ML",
  "CI/CD",
  "Power BI",
  "Angular",
];

interface WaveConfig {
  yFraction: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phaseOffset: number;
  labelSpacing: number;
  labelStartIdx: number;
}

const WAVES: WaveConfig[] = [
  {
    yFraction: 0.08,
    amplitude: 38,
    frequency: 0.011,
    speed: 0.38,
    phaseOffset: 0,
    labelSpacing: 170,
    labelStartIdx: 0,
  },
  {
    yFraction: 0.22,
    amplitude: 50,
    frequency: 0.009,
    speed: 0.26,
    phaseOffset: 1.1,
    labelSpacing: 195,
    labelStartIdx: 3,
  },
  {
    yFraction: 0.36,
    amplitude: 32,
    frequency: 0.014,
    speed: 0.48,
    phaseOffset: 2.3,
    labelSpacing: 155,
    labelStartIdx: 6,
  },
  {
    yFraction: 0.52,
    amplitude: 45,
    frequency: 0.01,
    speed: 0.33,
    phaseOffset: 0.8,
    labelSpacing: 185,
    labelStartIdx: 9,
  },
  {
    yFraction: 0.66,
    amplitude: 40,
    frequency: 0.012,
    speed: 0.42,
    phaseOffset: 1.9,
    labelSpacing: 175,
    labelStartIdx: 12,
  },
  {
    yFraction: 0.8,
    amplitude: 30,
    frequency: 0.013,
    speed: 0.3,
    phaseOffset: 3.1,
    labelSpacing: 180,
    labelStartIdx: 15,
  },
  {
    yFraction: 0.92,
    amplitude: 22,
    frequency: 0.015,
    speed: 0.52,
    phaseOffset: 0.5,
    labelSpacing: 160,
    labelStartIdx: 18,
  },
];

export default function TechWatermark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const getY = (wave: WaveConfig, x: number, time: number) => {
      const baseY = canvas.height * wave.yFraction;
      return (
        baseY +
        wave.amplitude *
          Math.sin(wave.frequency * x + wave.phaseOffset + time * wave.speed)
      );
    };

    const getAngle = (wave: WaveConfig, x: number, time: number) => {
      const dy =
        wave.amplitude *
        wave.frequency *
        Math.cos(wave.frequency * x + wave.phaseOffset + time * wave.speed);
      return Math.atan2(dy, 1);
    };

    const draw = (timestamp: number) => {
      if (!canvas || !ctx) return;
      timeRef.current = timestamp * 0.001;
      const t = timeRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const wave of WAVES) {
        // Draw wave path — warm amber/golden at strong opacity
        ctx.beginPath();
        ctx.strokeStyle = "rgba(180, 120, 30, 0.55)";
        ctx.lineWidth = 2.5;
        ctx.moveTo(0, getY(wave, 0, t));
        for (let x = 1; x <= canvas.width; x += 3) {
          ctx.lineTo(x, getY(wave, x, t));
        }
        ctx.stroke();

        // Draw labels along the wave
        ctx.font = "bold 15px 'Courier New', monospace";
        ctx.fillStyle = "rgba(160, 100, 20, 0.80)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const totalWidth = canvas.width + wave.labelSpacing;
        const numLabels = Math.ceil(totalWidth / wave.labelSpacing) + 1;

        for (let i = 0; i < numLabels; i++) {
          const labelIdx = (wave.labelStartIdx + i) % TECH_LABELS.length;
          const label = TECH_LABELS[labelIdx];

          // Animate: shift x position over time so labels ride the wave left
          const rawX =
            i * wave.labelSpacing - ((t * 40 * wave.speed) % wave.labelSpacing);
          const x = rawX;
          if (x < -wave.labelSpacing || x > canvas.width + wave.labelSpacing)
            continue;

          const y = getY(wave, x, t);
          const angle = getAngle(wave, x, t);

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);
          ctx.fillText(label, 0, 0);
          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
