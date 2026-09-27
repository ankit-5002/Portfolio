import { useEffect, useRef, useState } from 'react';
import { RotateCcw, Dices } from 'lucide-react';

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;

const XMIN = -3.4, XMAX = 3.4, YMIN = -3.4, YMAX = 3.4;
const f = (x, y) =>
  0.8 * Math.sin(1.6 * x) * Math.cos(1.6 * y) +
  0.1 * ((x - 0.9) ** 2 + (y + 0.7) ** 2) +
  0.03 * (x * x + y * y);

const grad = (x, y) => {
  const e = 1e-4;
  return [
    (f(x + e, y) - f(x - e, y)) / (2 * e),
    (f(x, y + e) - f(x, y - e)) / (2 * e),
  ];
};

export default function Lab() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  const [learningRate, setLearningRate] = useState(0.06);
  const [statusText, setStatusText] = useState('IDLE — CLICK THE PAGE TO DROP');
  const [readoutText, setReadoutText] = useState('CLICK TO DROP OPTIMIZERS');
  const [optLosses, setOptLosses] = useState({ ADAM: '—', MOMENTUM: '—', SGD: '—' });
  const [optDone, setOptDone] = useState({ ADAM: false, MOMENTUM: false, SGD: false });

  const stateRef = useRef({
    start: { x: -2.5, y: 2.3 },
    paths: [],
    step: 0,
    running: false,
    visible: false,
    offCanvas: null,
    W: 0,
    H: 0,
    opts: [
      { name: 'ADAM', color: '#D8401B' },
      { name: 'MOMENTUM', color: '#0E7A6E' },
      { name: 'SGD', color: '#33302B' },
    ],
  });

  const w2s = (x, y) => {
    const { W, H } = stateRef.current;
    return [((x - XMIN) / (XMAX - XMIN)) * W, H - ((y - YMIN) / (YMAX - YMIN)) * H];
  };

  const s2w = (sx, sy) => {
    const { W, H } = stateRef.current;
    return [XMIN + (sx / W) * (XMAX - XMIN), YMIN + ((H - sy) / H) * (YMAX - YMIN)];
  };

  const buildContour = (w, h) => {
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const c = off.getContext('2d');
    const img = c.createImageData(w, h);
    const d = img.data;
    const vals = new Float32Array(w * h);

    let fmin = Infinity, fmax = -Infinity;
    for (let py = 0; py < h; py++) {
      const wy = YMAX - (py / h) * (YMAX - YMIN);
      for (let px = 0; px < w; px++) {
        const v = f(XMIN + (px / w) * (XMAX - XMIN), wy);
        vals[py * w + px] = v;
        if (v < fmin) fmin = v;
        if (v > fmax) fmax = v;
      }
    }

    const LV = 16;
    const bands = new Uint8Array(w * h);
    for (let i = 0; i < w * h; i++) {
      const n = clamp((vals[i] - fmin) / (fmax - fmin), 0, 0.9999);
      const b = Math.floor(n * LV);
      bands[i] = b;
      const t = b / LV;
      const o = i * 4;
      d[o] = Math.round(lerp(243, 216, t));
      d[o + 1] = Math.round(lerp(236, 205, t));
      d[o + 2] = Math.round(lerp(221, 178, t));
      d[o + 3] = 255;
    }

    for (let py = 1; py < h; py++) {
      for (let px = 1; px < w; px++) {
        const i = py * w + px;
        if (bands[i] !== bands[i - 1] || bands[i] !== bands[i - w]) {
          const o = i * 4;
          d[o] = 122;
          d[o + 1] = 110;
          d[o + 2] = 92;
        }
      }
    }
    c.putImageData(img, 0, 0);
    stateRef.current.offCanvas = off;
  };

  const drawTerrain = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { offCanvas, W, H, start, opts, paths } = stateRef.current;

    if (!offCanvas) return;
    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(offCanvas, 0, 0, W, H);

    const [sx, sy] = w2s(start.x, start.y);
    ctx.strokeStyle = '#D8401B';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(sx - 7, sy);
    ctx.lineTo(sx + 7, sy);
    ctx.moveTo(sx, sy - 7);
    ctx.lineTo(sx, sy + 7);
    ctx.stroke();

    opts.forEach((o, i) => {
      const p = paths[i];
      if (!p || p.length < 2) return;
      ctx.strokeStyle = o.color;
      ctx.lineWidth = 1.6;
      ctx.globalAlpha = 0.94;
      ctx.beginPath();
      p.forEach((pt, k) => {
        const [px, py] = w2s(pt.x, pt.y);
        if (k) ctx.lineTo(px, py);
        else ctx.moveTo(px, py);
      });
      ctx.stroke();

      const [ex, ey] = w2s(p[p.length - 1].x, p[p.length - 1].y);
      ctx.globalAlpha = 1;
      ctx.fillStyle = o.color;
      ctx.beginPath();
      ctx.arc(ex, ey, 3.6, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  };

  const resetStates = () => {
    const { start, opts } = stateRef.current;
    opts.forEach(o => {
      o.s = { x: start.x, y: start.y, vx: 0, vy: 0, mx: 0, my: 0, vx2: 0, vy2: 0, t: 0, done: false, final: 0 };
    });
  };

  const runSimulation = () => {
    resetStates();
    const { start, opts } = stateRef.current;
    stateRef.current.paths = opts.map(() => [{ x: start.x, y: start.y }]);
    stateRef.current.step = 0;
    stateRef.current.running = true;
    setOptDone({ ADAM: false, MOMENTUM: false, SGD: false });
  };

  const stepAll = lr => {
    const { opts, paths } = stateRef.current;
    const MAX = 420;

    opts.forEach((o, i) => {
      const s = o.s;
      if (s.done) return;
      const [gx, gy] = grad(s.x, s.y);

      if (o.name === 'SGD') {
        s.x -= lr * gx;
        s.y -= lr * gy;
      } else if (o.name === 'MOMENTUM') {
        s.vx = 0.9 * s.vx + gx;
        s.vy = 0.9 * s.vy + gy;
        s.x -= lr * s.vx;
        s.y -= lr * s.vy;
      } else {
        s.t++;
        const b1 = 0.9, b2 = 0.999;
        s.mx = b1 * s.mx + (1 - b1) * gx;
        s.my = b1 * s.my + (1 - b1) * gy;
        s.vx2 = b2 * s.vx2 + (1 - b2) * gx * gx;
        s.vy2 = b2 * s.vy2 + (1 - b2) * gy * gy;
        const mh = s.mx / (1 - Math.pow(b1, s.t));
        const nh = s.vx2 / (1 - Math.pow(b2, s.t));
        const m2 = s.my / (1 - Math.pow(b1, s.t));
        const n2 = s.vy2 / (1 - Math.pow(b2, s.t));
        s.x -= (lr * mh) / (Math.sqrt(nh) + 1e-8);
        s.y -= (lr * m2) / (Math.sqrt(n2) + 1e-8);
      }

      s.x = clamp(s.x, XMIN, XMAX);
      s.y = clamp(s.y, YMIN, YMAX);
      paths[i].push({ x: s.x, y: s.y });

      if (Math.hypot(gx, gy) < 0.004 || paths[i].length >= MAX) {
        s.done = true;
        s.final = f(s.x, s.y);
      }
    });
  };

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const r = wrap.getBoundingClientRect();
      const W = r.width;
      const H = r.height;
      stateRef.current.W = W;
      stateRef.current.H = H;

      canvas.width = W * dpr;
      canvas.height = H * dpr;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildContour(Math.round(W * dpr), Math.round(H * dpr));
      if (stateRef.current.paths.length) drawTerrain();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);
    resize();

    const intersectObserver = new IntersectionObserver(
      entries => {
        stateRef.current.visible = entries[0].isIntersecting;
        if (entries[0].isIntersecting && !stateRef.current.paths.length) {
          runSimulation();
        }
      },
      { threshold: 0.25 }
    );
    intersectObserver.observe(wrap);

    let animFrame;
    const SPF = 2;
    const MAX = 420;

    const loop = () => {
      animFrame = requestAnimationFrame(loop);
      const { visible, W, running, opts, paths } = stateRef.current;
      if (!visible || !W) return;

      if (running) {
        for (let k = 0; k < SPF; k++) {
          if (opts.some(o => !o.s?.done)) {
            stateRef.current.step++;
            stepAll(learningRate);
          }
        }

        const losses = {};
        const doneState = {};
        opts.forEach(o => {
          losses[o.name] = o.s.done ? o.s.final.toFixed(4) : f(o.s.x, o.s.y).toFixed(4);
          doneState[o.name] = o.s.done;
        });
        setOptLosses(losses);
        setOptDone(doneState);

        if (opts.every(o => o.s.done)) {
          stateRef.current.running = false;
          const used = Math.max(...paths.map(p => p.length));
          setStatusText(`SETTLED IN ${used} STEPS — CLICK THE PAGE TO RE-DROP`);
        } else {
          setStatusText(`RUNNING — STEP ${String(stateRef.current.step).padStart(3, '0')} / ${MAX}`);
        }
        drawTerrain();
      }
    };

    animFrame = requestAnimationFrame(loop);

    return () => {
      resizeObserver.disconnect();
      intersectObserver.disconnect();
      cancelAnimationFrame(animFrame);
    };
  }, [learningRate]);

  const handlePointerDown = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    const [x, y] = s2w(e.clientX - r.left, e.clientY - r.top);
    stateRef.current.start = { x, y };
    runSimulation();
  };

  const handleMouseMove = e => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    const [x, y] = s2w(e.clientX - r.left, e.clientY - r.top);
    setReadoutText(`θ ( ${x.toFixed(2)} , ${y.toFixed(2)} ) · f ${f(x, y).toFixed(4)}`);
  };

  const handleMouseLeave = () => setReadoutText('CLICK TO DROP OPTIMIZERS');

  const handleRandomDrop = () => {
    stateRef.current.start = {
      x: Math.random() * 6 - 3,
      y: Math.random() * 6 - 3,
    };
    runSimulation();
  };

  return (
    <section id="lab">
      <div className="wrap">
        <div className="sec-head reveal in">
          <span className="sec-num">04</span>
          <h2 className="sec-title lm">
            <span style={{ '--d': 1 }}>
              The <i>lab</i>
            </span>
          </h2>
          <span className="sec-line"></span>
          <span className="sec-note">real math, i promise</span>
        </div>

        <div className="lab-grid">
          <div className="lab-side reveal in">
            <p className="lab-desc">
              Three optimizers. One loss surface. Same starting point, same learning rate. <em>Adam</em> adapts per-parameter, <em>momentum</em> accumulates velocity, <em>SGD</em> just follows the gradient and hopes. Click anywhere on the page to drop them somewhere new.
            </p>
            <div className="legend">
              <div className={`opt ${optDone.ADAM ? 'done' : ''}`} style={{ '--c': '#D8401B' }}>
                <span className="opt-dot"></span>
                <span className="opt-name">ADAM</span>
                <span className="opt-loss">{optLosses.ADAM}</span>
              </div>
              <div className={`opt ${optDone.MOMENTUM ? 'done' : ''}`} style={{ '--c': '#0E7A6E' }}>
                <span className="opt-dot"></span>
                <span className="opt-name">MOMENTUM</span>
                <span className="opt-loss">{optLosses.MOMENTUM}</span>
              </div>
              <div className={`opt ${optDone.SGD ? 'done' : ''}`} style={{ '--c': '#33302B' }}>
                <span className="opt-dot"></span>
                <span className="opt-name">SGD</span>
                <span className="opt-loss">{optLosses.SGD}</span>
              </div>
            </div>
            <div className="lab-controls">
              <div>
                <div className="ctl-label">
                  <span>Learning rate</span>
                  <b id="lr-val">{learningRate.toFixed(3)}</b>
                </div>
                <input
                  type="range"
                  id="lr"
                  min="0.01"
                  max="0.20"
                  step="0.005"
                  value={learningRate}
                  aria-label="Learning rate"
                  onChange={e => {
                    setLearningRate(parseFloat(e.target.value));
                    runSimulation();
                  }}
                />
              </div>
              <div className="lab-btns">
                <button className="btn-solid mag" id="btn-run" onClick={runSimulation}>
                  RUN <RotateCcw size={16} />
                </button>
                <button className="btn-ghost mag" id="btn-random" onClick={handleRandomDrop}>
                  RANDOM DROP <Dices size={16} />
                </button>
              </div>
            </div>
            <p className="lab-status" id="lab-status">
              {statusText}
            </p>
            <p className="lab-hand-note">
              <svg viewBox="0 0 120 70" className="doodle doodle--chalk" aria-hidden="true">
                <path pathLength="1" d="M8 6 v58 h104" />
                <path pathLength="1" d="M14 12 c 8 10 -4 18 6 26 c 8 6 4 14 14 18 c 8 4 10 8 20 10" />
                <path pathLength="1" d="M50 60 l8 2 m-8 -2 l2 -8" />
              </svg>
              <span>we covered this in class — now watch them race. crank the lr and enjoy the chaos.</span>
            </p>
          </div>

          <div className="pad-wrap reveal in" ref={wrapRef}>
            <div className="rings" aria-hidden="true"></div>
            <div className="pad">
              <div className="pad-frame" data-cursor="DROP">
                <canvas
                  id="terrain"
                  ref={canvasRef}
                  onPointerDown={handlePointerDown}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                ></canvas>
              </div>
              <div className="pad-cap">
                <span className="hand">fig.03 — loss terrain f(θ₁, θ₂), drawn live in my notebook</span>
                <span id="lab-readout">{readoutText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
