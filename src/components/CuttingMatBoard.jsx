import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import paperCutImg from '../assets/papercut.png';
import board1Img from '../assets/board1.jpg';
import board2Img from '../assets/board2.png';
import board4Img from '../assets/board4.png';
import board5Img from '../assets/board5.jpg';
import board6Img from '../assets/board6.jpg';
import board7Img from '../assets/board7.png';
const SwingingChar = ({ char, twoStrings }) => {
  const [rot, setRot] = React.useState(0);

  const handleMouseMove = (e) => {
    // movementX gives direction. Positive is right, negative is left.
    if (Math.abs(e.movementX) > 1) {
      const targetRot = e.movementX > 0 ? -30 : 30;
      setRot(targetRot);
    }
  };

  const handleMouseLeave = () => {
    setRot(0);
  };

  return (
    <div 
      className="sandbox-char-wrap" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transformOrigin: 'top center',
        cursor: 'pointer',
        padding: '0 2px',
        transform: `rotate(${rot}deg)`
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: twoStrings ? 'space-between' : 'center',
        width: twoStrings ? '60%' : '1.5px',
        marginBottom: 'calc(-0.18 * clamp(3.2rem, 6.5vw, 4.8rem))',
        zIndex: -1
      }}>
        <div style={{
          width: '1.5px',
          height: 'clamp(20px, 3vw, 30px)',
          backgroundColor: '#1E4A63',
        }} />
        {twoStrings && (
          <div style={{
            width: '1.5px',
            height: 'clamp(20px, 3vw, 30px)',
            backgroundColor: '#1E4A63',
          }} />
        )}
      </div>
      <span>{char}</span>
    </div>
  );
};

const DraggableCard = ({ children, className, defaultZ = 10, isFocused, onFocus }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.win-btn') || e.target.closest('.code-card-actions') || e.target.closest('input')) return;

    e.preventDefault();
    setIsDragging(true);

    let hasMoved = false;
    const startX = e.clientX - pos.x;
    const startY = e.clientY - pos.y;

    const handleMouseMove = (moveEvent) => {
      hasMoved = true;
      setPos({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      if (!hasMoved && onFocus) {
        onFocus();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const focusedStyle = isFocused ? {
    top: '50%',
    left: '50%',
    bottom: 'auto',
    right: 'auto',
    transform: `translate(calc(-50% - ${pos.x}px), calc(-50% - ${pos.y}px)) scale(1.6) rotate(0deg)`,
    zIndex: 1000
  } : {};

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        zIndex: isFocused ? 1000 : (isDragging ? 100 : defaultZ)
      }}
    >
      <div
        className={`${className} ${isFocused ? 'card-focused' : ''}`}
        onMouseDown={handleMouseDown}
        style={{
          pointerEvents: 'auto',
          cursor: isFocused ? 'default' : (isDragging ? 'grabbing' : 'grab'),
          ...focusedStyle
        }}
      >
        {children}
      </div>
    </div>
  );
};

/*
  Grid Architecture (matching reference):
  - 8 major columns → 9 major vertical lines
  - 6 major rows → 7 major horizontal lines  
  - 3 fine subdivisions per major cell → 24 fine cols, 18 fine rows
  - Row numbers 1–18 map to each fine horizontal line
  - Crosshairs appear ONLY at major intersections (sparse)
*/

const MAJOR_COLS = 8;
const MAJOR_ROWS = 6;
const SUBDIV = 3; // fine subdivisions between major lines

const FINE_COLS = MAJOR_COLS * SUBDIV; // 24
const FINE_ROWS = MAJOR_ROWS * SUBDIV; // 18

// ViewBox sizing
const CELL_FINE = 40;  // fine cell size in viewBox units
const VB_W = FINE_COLS * CELL_FINE; // 960
const VB_H = FINE_ROWS * CELL_FINE; // 720

const MAJOR_CELL_W = SUBDIV * CELL_FINE; // 120
const MAJOR_CELL_H = SUBDIV * CELL_FINE; // 120

const CROSS_ARM = 8; // crosshair arm length in viewBox units

export default function CuttingMatBoard() {
  const [focusedProject, setFocusedProject] = useState(null);
  const [boardScale, setBoardScale] = useState(0.85);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      
      // Entering from bottom (rect.top goes from windowH down to 0)
      const entryP = Math.max(0, Math.min(1, 1 - (rect.top / windowH)));
      
      // Exiting through top (rect.bottom goes from windowH down to 0)
      const exitP = Math.max(0, Math.min(1, 1 - (rect.bottom / windowH)));
      
      // Scale up on entry, scale down on exit
      const newScale = 0.85 + (0.15 * entryP) - (0.15 * exitP);
      
      setBoardScale(newScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="cutting-mat-sec" className="cutting-mat-section" ref={sectionRef}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 'clamp(45px, 6vw, 85px)',
          fill: '#EBE4D4',
          transform: 'translateY(-99%)'
        }}
      >
        <path d="M0,120 L 450,120 Q 470,120 480,100 L 530,30 Q 540,10 560,10 L 880,10 Q 900,10 910,30 L 960,100 Q 970,120 990,120 L 1440,120 Z" />
      </svg>
      <div className="sec-head reveal in" style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translate(-50%, calc(-0.916 * clamp(45px, 6vw, 85px)))',
        zIndex: 10,
        margin: 0,
        width: 'max-content'
      }}>
        <h2 className="sec-title lm" style={{
          display: 'flex',
          gap: '2px',
          color: '#240605',
          fontFamily: "'Penelope', var(--disp), serif",
          textTransform: 'uppercase',
          fontSize: 'clamp(3.2rem, 6.5vw, 4.8rem)',
          letterSpacing: '2px',
        }}>
          {"SANDBOX".split('').map((char, i) => (
            <SwingingChar key={i} char={char} twoStrings={char === 'N' || char === 'X'} />
          ))}
        </h2>
      </div>

      <div className="cutting-mat-wrap">

        {/* Outer Stacking Container */}
        <div 
          className="cutting-mat-stack"
          style={{
            transform: `scale(${boardScale})`,
            willChange: 'transform',
            transition: 'transform 0.1s ease-out'
          }}
        >
          {/* Layer 1: Offset accent sheet (terracotta, peeking at opposite diagonal edges) */}
          <div className="mat-orange-backing"></div>

          {/* Layer 2: The Main Cutting Board */}
          <div className={`mat-grid-board ${focusedProject ? 'board--has-focus' : ''}`} onClick={(e) => {
            if (e.target.closest('.mat-card')) return;
            setFocusedProject(null);
          }}>

            {/* Top Left Papercut Heading */}
            <div className="mat-heading-papercut">
              <img src={paperCutImg} alt="Papercut" className="papercut-img" />
              <h2 className="papercut-text">Moments</h2>
            </div>

            {/* Secondary interior stroke */}
            <div className="mat-inner-stroke">
              {/* Row Numbers 1–18 along inside-left margin */}
              <div className="mat-row-numbers">
                {Array.from({ length: FINE_ROWS }, (_, i) => (
                  <span key={i + 1} className="mat-row-num">{i + 1}</span>
                ))}
              </div>

              {/* Grid Area */}
              <div className="mat-grid-area">
                <svg
                  className="mat-full-grid-svg"
                  viewBox={`0 0 ${VB_W} ${VB_H}`}
                  preserveAspectRatio="none"
                  width="100%"
                  height="100%"
                >
                  {/* === Layer 1: Dense fine grid (very faint) === */}
                  {/* Fine horizontal lines */}
                  {Array.from({ length: FINE_ROWS + 1 }, (_, i) => (
                    <line
                      key={`fh-${i}`}
                      x1="0" y1={i * CELL_FINE}
                      x2={VB_W} y2={i * CELL_FINE}
                      stroke="rgba(190, 180, 160, 0.22)"
                      strokeWidth="0.7"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  {/* Fine vertical lines */}
                  {Array.from({ length: FINE_COLS + 1 }, (_, i) => (
                    <line
                      key={`fv-${i}`}
                      x1={i * CELL_FINE} y1="0"
                      x2={i * CELL_FINE} y2={VB_H}
                      stroke="rgba(190, 180, 160, 0.22)"
                      strokeWidth="0.7"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}

                  {/* === Layer 2: Major grid lines (more visible) === */}
                  {/* Major horizontal lines */}
                  {Array.from({ length: MAJOR_ROWS + 1 }, (_, i) => (
                    <line
                      key={`mh-${i}`}
                      x1="0" y1={i * MAJOR_CELL_H}
                      x2={VB_W} y2={i * MAJOR_CELL_H}
                      stroke="rgba(210, 200, 180, 0.55)"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                  {/* Major vertical lines */}
                  {Array.from({ length: MAJOR_COLS + 1 }, (_, i) => (
                    <line
                      key={`mv-${i}`}
                      x1={i * MAJOR_CELL_W} y1="0"
                      x2={i * MAJOR_CELL_W} y2={VB_H}
                      stroke="rgba(210, 200, 180, 0.55)"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}

                  {/* === Layer 3: Sparse crosshair (+) marks at MAJOR intersections only === */}
                  {Array.from({ length: MAJOR_ROWS + 1 }, (_, row) =>
                    Array.from({ length: MAJOR_COLS + 1 }, (_, col) => {
                      const cx = col * MAJOR_CELL_W;
                      const cy = row * MAJOR_CELL_H;
                      return (
                        <g key={`cross-${row}-${col}`}>
                          <line
                            x1={cx - CROSS_ARM} y1={cy}
                            x2={cx + CROSS_ARM} y2={cy}
                            stroke="rgba(235, 220, 200, 1.0)"
                            strokeWidth="2.0"
                            vectorEffect="non-scaling-stroke"
                            strokeLinecap="square"
                          />
                          <line
                            x1={cx} y1={cy - CROSS_ARM}
                            x2={cx} y2={cy + CROSS_ARM}
                            stroke="rgba(235, 220, 200, 1.0)"
                            strokeWidth="2.0"
                            vectorEffect="non-scaling-stroke"
                            strokeLinecap="square"
                          />
                        </g>
                      );
                    })
                  )}
                </svg>
              </div>
            </div>

            {/* Accolade 1 */}
            <DraggableCard
              className="mat-card mat-card-accolade mat-card--board1"
              defaultZ={10}
              isFocused={focusedProject === 'board1'}
              onFocus={() => setFocusedProject(focusedProject === 'board1' ? null : 'board1')}
            >
              <img 
                src={board1Img} 
                alt="Accolade 1" 
                className="board-img" 
                loading="lazy"
                draggable={false}
              />
            </DraggableCard>

            {/* Accolade 2 (New Frame) */}
            <DraggableCard
              className="mat-card mat-card-accolade mat-card--board2"
              defaultZ={11}
              isFocused={focusedProject === 'board2'}
              onFocus={() => setFocusedProject(focusedProject === 'board2' ? null : 'board2')}
            >
              <img 
                src={board2Img} 
                alt="Accolade 2" 
                className="board-img" 
                loading="lazy"
                draggable={false}
              />
            </DraggableCard>

            {/* Accolade 4 (now showing board7) */}
            <DraggableCard
              className="mat-card mat-card-accolade mat-card--board4"
              defaultZ={12}
              isFocused={focusedProject === 'board4'}
              onFocus={() => setFocusedProject(focusedProject === 'board4' ? null : 'board4')}
            >
              <img 
                src={board7Img} 
                alt="Accolade 4" 
                className="board-img" 
                loading="lazy"
                draggable={false}
              />
            </DraggableCard>

            {/* Accolade 7 (now showing board5) */}
            <DraggableCard
              className="mat-card mat-card-accolade mat-card--board7"
              defaultZ={10}
              isFocused={focusedProject === 'board7'}
              onFocus={() => setFocusedProject(focusedProject === 'board7' ? null : 'board7')}
            >
              <img 
                src={board5Img} 
                alt="Accolade 7" 
                className="board-img" 
                loading="lazy"
                draggable={false}
              />
            </DraggableCard>

            {/* Accolade 5 (now showing board4) */}
            <DraggableCard
              className="mat-card mat-card-accolade mat-card--board5"
              defaultZ={12}
              isFocused={focusedProject === 'board5'}
              onFocus={() => setFocusedProject(focusedProject === 'board5' ? null : 'board5')}
            >
              <img 
                src={board4Img} 
                alt="Accolade 5" 
                className="board-img" 
                loading="lazy"
                draggable={false}
              />
            </DraggableCard>

            {/* Accolade 6 */}
            <DraggableCard
              className="mat-card mat-card-accolade mat-card--board6"
              defaultZ={13}
              isFocused={focusedProject === 'board6'}
              onFocus={() => setFocusedProject(focusedProject === 'board6' ? null : 'board6')}
            >
              <img 
                src={board6Img} 
                alt="Accolade 5" 
                className="board-img" 
                loading="lazy"
                draggable={false}
              />
            </DraggableCard>

            {/* More Info Pill */}
            <a href="/work#quests" className="more-projects-pill">
              <span>more info</span>
              <div className="mp-icon-circle">
                <ArrowUpRight size={16} />
              </div>
            </a>

            {/* Bottom Right Handwritten Text */}
            <div className="mat-handwritten-note">
              Everything you do, do it with care.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
