import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  SiPython, SiReact, SiJavascript, SiHtml5, SiCss,
  SiPandas, SiNumpy, SiScikitlearn, SiPytorch, SiTensorflow,
  SiSpacy, SiFastapi, SiFlask, SiPostgresql, SiMysql, SiMongodb,
  SiGooglecloud, SiDocker, SiGit, SiGithub, SiN8N
} from 'react-icons/si';
import { FaJava, FaDatabase, FaProjectDiagram, FaRobot, FaServer, FaSync, FaCode, FaBookOpen, FaRegCalendarAlt } from 'react-icons/fa';
import cardImg1 from '../assets/skill_card1.png';
import cardImg2 from '../assets/skill_card2.png';
import cardImg3 from '../assets/skill_card3.png';
import project1Img from '../assets/project1.png';
import project2Img from '../assets/project2.png';
import picture1Img from '../assets/picture1.png';

const experiences = [
  {
    id: 1,
    role: 'AI Intern',
    company: 'Infosys Springboard',
    date: 'DEC.25 - FEB.26',
    description: [
      'Designed and developed EcoPackAI, a full-stack machine learning platform for sustainable packaging recommendation and optimization.',
      'Implemented the backend using Python, Flask, PostgreSQL, and REST APIs, integrating predictive models for carbon footprint and cost efficiency.',
      'Achieved 97% model accuracy and demonstrated a 22% reduction in simulated material cost.'
    ],
    image: project1Img,
    theme: {
      bg: '#711A1A', text: '#EBE4D4', tagBg: '#EBE4D4', tagText: '#711A1A',
      tagIcon: '#240605', hr: 'rgba(235, 228, 212, 0.3)', btnBg: '#EBE4D4', btnText: '#711A1A', imgOutline: '#EBE4D4'
    }
  },
  {
    id: 2,
    role: 'Software Intern',
    company: 'Ramkrishna Forgings Limited',
    date: 'JUN.25 - JUL.25',
    description: [
      'Designed and implemented a deep learning-based system for surface defect detection in hot-rolled steel strips using CNNs with the NEU dataset.',
      'Performed data preprocessing, augmentation, and model training with TensorFlow, Keras, and OpenCV to improve accuracy.',
      'Successfully classified six defect types with high accuracy and deployed the model using Flask to enhance automated quality control.'
    ],
    image: project2Img,
    theme: {
      bg: '#EBE4D4', text: '#240605', tagBg: '#240605', tagText: '#EBE4D4',
      tagIcon: '#EBE4D4', hr: 'rgba(36, 6, 5, 0.3)', btnBg: '#711A1A', btnText: '#EBE4D4', imgOutline: '#711A1A'
    }
  },
  {
    id: 3,
    role: 'Machine Learning Intern',
    company: 'TimesPro (Campus Tech.)',
    date: 'MAY.25 - JUL.25',
    description: [
      'Built an AI Document Validation System and analyzed NLP-based pipelines to extract, clean, and structure text data from PDF and DOCX files.',
      'Applied custom Named Entity Recognition (NER) models and rule-based validations, slashing manual document verification workflows by 70%.',
      'Collaborated on designing API endpoints and integrating lightweight deployment models with microservice frameworks.'
    ],
    image: picture1Img,
    theme: {
      bg: '#2A0B02', text: '#EBE4D4', tagBg: '#EBE4D4', tagText: '#240605',
      tagIcon: '#711A1A', hr: 'rgba(235, 228, 212, 0.3)', btnBg: '#EBE4D4', btnText: '#711A1A', imgOutline: '#711A1A'
    }
  }
];

const iconMap = {
  'Python': <SiPython size={14} />,
  'Java': <FaJava size={14} />,
  'SQL': <FaDatabase size={14} />,
  'Data Structures & Algorithms (DSA)': <FaCode size={14} />,
  'Pandas': <SiPandas size={14} />,
  'NumPy': <SiNumpy size={14} />,
  'Scikit-learn': <SiScikitlearn size={14} />,
  'XGBoost': <FaProjectDiagram size={14} />,
  'PyTorch': <SiPytorch size={14} />,
  'TensorFlow': <SiTensorflow size={14} />,
  'spaCy': <SiSpacy size={14} />,
  'NLTK': <FaBookOpen size={14} />,
  'RAG': <FaProjectDiagram size={14} />,
  'ChromaDB': <FaDatabase size={14} />,
  'LLMs': <FaRobot size={14} />,
  'React': <SiReact size={14} />,
  'JavaScript': <SiJavascript size={14} />,
  'HTML': <SiHtml5 size={14} />,
  'CSS': <SiCss size={14} />,
  'FastAPI': <SiFastapi size={14} />,
  'Flask': <SiFlask size={14} />,
  'REST APIs': <FaServer size={14} />,
  'PostgreSQL': <SiPostgresql size={14} />,
  'MySQL': <SiMysql size={14} />,
  'MongoDB': <SiMongodb size={14} />,
  'GCP': <SiGooglecloud size={14} />,
  'Docker': <SiDocker size={14} />,
  'Git': <SiGit size={14} />,
  'GitHub': <SiGithub size={14} />,
  'CI/CD': <FaSync size={14} />,
  'n8n': <SiN8N size={14} />
};

export default function Skills() {
  const [progress, setProgress] = useState(0);
  const [exitProgress, setExitProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Calculate progress from 0 to 1 over the 600vh sticky duration
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - windowH)));
      setProgress(p);

      // exitProgress goes from 0 to 1 as the bottom of the section leaves the viewport
      const exitP = Math.max(0, Math.min(1, 1 - (rect.bottom / windowH)));
      setExitProgress(exitP);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Animation Phasing ---
  // Phase 1: Box expansion (0% to 50%)
  const anim = Math.min(1, progress / 0.50);

  // Phase 2: Work Experience block slides up (30% to 100%)
  const p1Progress = Math.min(1, Math.max(0, (progress - 0.30) / 0.70));

  // Phase 3: Title fades out as work experience slides in (30% to 60%)
  const titleMove = Math.min(1, Math.max(0, (progress - 0.30) / 0.30));

  // SKILLS heading: moves up and fades out (happens during Phase 1)
  const headingOpacity = Math.max(0, 1 - anim * 4);
  const headingScale = 1 + anim * 0.3;
  const headingMoveY = -anim * 60; // moves up in vh

  const peripheralCards = [
    {
      id: 1,
      category: 'Programming & CS',
      type: 'card1', // 2400 x 1064 (Wide)
      bg: cardImg1,
      items: [
        { name: 'Python', desc: 'Core Backend' },
        { name: 'Java', desc: 'Enterprise' },
        { name: 'SQL', desc: 'Databases' },
        { name: 'Data Structures & Algorithms (DSA)', desc: 'Problem Solving' }
      ],
      w: 360, h: 160, x: 3, y: -30, dx: 0, dy: -60, rot: 0
    },
    {
      id: 2,
      category: 'Machine Learning & Deep Learning',
      type: 'card2', // 2246 x 1731 (Standard)
      bg: cardImg2,
      items: [
        { name: 'Pandas', desc: 'Data Analysis' },
        { name: 'NumPy', desc: 'Numerical Ops' },
        { name: 'Scikit-learn', desc: 'ML Models' },
        { name: 'XGBoost', desc: 'Gradient Boosting' },
        { name: 'PyTorch', desc: 'Deep Learning' },
        { name: 'TensorFlow', desc: 'Neural Nets' }
      ],
      w: 320, h: 246, x: -28, y: -36, dx: -40, dy: -40, rot: 0
    },
    {
      id: 3,
      category: 'Generative AI & NLP',
      type: 'card3', // 1741 x 2242 (Tall)
      bg: cardImg3,
      items: [
        { name: 'spaCy', desc: 'NLP Pipelines' },
        { name: 'NLTK', desc: 'Text Processing' },
        { name: 'RAG', desc: 'GenAI Search' },
        { name: 'ChromaDB', desc: 'Vector DB' },
        { name: 'LLMs', desc: 'Foundational' }
      ],
      w: 260, h: 335, x: 32, y: -27, dx: 60, dy: -20, rot: 0
    },
    {
      id: 4,
      category: 'Frontend & Web',
      type: 'card1', // Wide
      bg: cardImg1,
      items: [
        { name: 'React', desc: 'UI Library' },
        { name: 'JavaScript', desc: 'Web Logic' },
        { name: 'HTML', desc: 'Structure' },
        { name: 'CSS', desc: 'Styling' }
      ],
      w: 360, h: 160, x: -29, y: -3, dx: -60, dy: 10, rot: 0
    },
    {
      id: 5,
      category: 'Backend & Databases',
      type: 'card2', // Standard
      bg: cardImg2,
      items: [
        { name: 'FastAPI', desc: 'Web Framework' },
        { name: 'Flask', desc: 'Microframework' },
        { name: 'REST APIs', desc: 'Web Services' },
        { name: 'PostgreSQL', desc: 'Relational DB' },
        { name: 'MySQL', desc: 'Relational DB' },
        { name: 'MongoDB', desc: 'NoSQL DB' }
      ],
      w: 320, h: 246, x: -8, y: 20, dx: -10, dy: 60, rot: 0
    },
    {
      id: 6,
      category: 'Tools & Infrastructure',
      type: 'card3', // Tall
      bg: cardImg3,
      items: [
        { name: 'GCP', desc: 'Cloud Platform' },
        { name: 'Docker', desc: 'Containerization' },
        { name: 'Git', desc: 'Version Control' },
        { name: 'GitHub', desc: 'Code Hosting' },
        { name: 'CI/CD', desc: 'Automation' },
        { name: 'n8n', desc: 'Workflow Auto' }
      ],
      w: 260, h: 335, x: 28, y: 14, dx: 50, dy: 50, rot: 0
    }
  ];



  return (
    <section
      id="skills"
      ref={containerRef}
      style={{
        position: 'relative',
        height: '400vh',
        backgroundColor: '#240605',
      }}
    >
      <div
        className="skills-sticky-viewport"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >

        {/* SKILLS Heading */}
        <h2 style={{
          position: 'absolute',
          top: 'calc(50% - 60px)',
          left: '50%',
          fontFamily: "'Penelope', var(--disp), serif",
          color: '#EBE4D4',
          fontSize: 'clamp(3rem, 6vw, 5.5rem)',
          margin: 0,
          letterSpacing: '2px',
          lineHeight: 1,
          fontWeight: 'normal',
          transform: `translate(-50%, -50%) translateY(calc(-${anim * 60}vh)) scale(${headingScale})`,
          opacity: headingOpacity,
          willChange: 'transform, opacity',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          SKILLS
        </h2>

        {/* 'my abilities' Subtext Container */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          width: '100vw',
          alignItems: 'center',
          zIndex: 10,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          opacity: Math.max(0, 1 - anim * 1.5),
          willChange: 'opacity'
        }}>
          {/* Left Half (contains 'my') */}
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: `calc(${anim} * 50vw + 12px)`,
            willChange: 'padding'
          }}>
            <span style={{
              fontFamily: "'Penelope', var(--disp), serif",
              color: '#EFEBE4',
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              letterSpacing: '4px',
              textTransform: 'lowercase',
              fontWeight: 'normal'
            }}>
              my
            </span>
          </div>

          {/* Right Half (contains 'abilities') */}
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            paddingLeft: `calc(${anim} * 50vw + 12px)`,
            willChange: 'padding'
          }}>
            <span style={{
              fontFamily: "'Penelope', var(--disp), serif",
              color: '#EFEBE4',
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              letterSpacing: '4px',
              textTransform: 'lowercase',
              fontWeight: 'normal'
            }}>
              abilities
            </span>
          </div>
        </div>

        {/* Peripheral Skill Cards */}
        {peripheralCards.map((card) => {
          const currX = card.x + (card.dx * anim);
          const currY = card.y + (card.dy * anim);
          const scale = 1 - (anim * 0.4);
          const opacity = Math.max(0, 1 - anim * 1.5);

          return (
            <div
              key={card.id}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translate(${currX}vw, ${currY}vh) rotate(${card.rot}deg) scale(${scale})`,
                opacity: opacity,
                width: `${card.w}px`,
                height: `${card.h}px`,
                backgroundColor: 'transparent',
                backgroundImage: `url(${card.bg})`,
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                boxShadow: 'none',
                display: 'flex',
                flexDirection: 'column',
                padding: card.type === 'card1' ? '18px 18px 2px 18px' : card.id === 5 ? '34px 20px 2px 20px' : card.type === 'card2' ? '28px 20px 8px 20px' : '26px 24px',
                zIndex: 5,
                willChange: 'transform, opacity'
              }}
            >

              <h3 style={{
                fontFamily: "'Penelope', var(--disp), serif",
                fontSize: card.type === 'card1' ? '20px' : '24px',
                fontWeight: 'normal',
                color: '#711A1A',
                margin: card.type === 'card3' ? '0 0 10px 0' : '0 0 6px 0',
                textTransform: 'lowercase',
                letterSpacing: '1px',
                borderBottom: '2px solid #711A1A',
                display: 'inline-block',
                alignSelf: 'flex-start'
              }}>
                {card.category.split('&').map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <span style={{ fontFamily: 'var(--body)' }}>&</span>}
                  </React.Fragment>
                ))}
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: card.type === 'card3' ? 'column' : 'row',
                flexWrap: card.type === 'card3' ? 'nowrap' : 'wrap',
                gap: card.type === 'card3' ? '14px' : card.id === 5 ? '10px 14px' : '8px 10px',
                justifyContent: 'flex-start'
              }}>
                {card.items.map(item => (
                  <span key={item.name} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--body)',
                    fontSize: '12px',
                    color: '#711A1A',
                    backgroundColor: card.type === 'card3' ? 'transparent' : 'rgba(113, 26, 26, 0.08)',
                    padding: card.type === 'card3' ? '0' : '4px 8px',
                    borderRadius: card.type === 'card3' ? '0' : '4px',
                    fontWeight: 500,
                    letterSpacing: '0.5px'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', opacity: 0.8 }}>
                      {iconMap[item.name]}
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700, lineHeight: 1.1 }}>{item.name}</span>
                      <span style={{ fontSize: '9px', opacity: 0.65, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0px', marginTop: '1px' }}>
                        {item.desc}
                      </span>
                    </div>
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {/* Central Hero Expanding Mask */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `calc(${anim} * 110vw)`,
            height: `calc(${anim} * 110vh)`,
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#EBE4D4',
            border: `4px solid rgba(235, 228, 212, ${Math.max(0, 1 - anim * 1.5)})`,
            borderRadius: `calc(12px * (1 - ${anim}))`,
            zIndex: 8,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            willChange: 'width, height, border-radius'
          }}
        >
          {/* Inner Title of Hero Card (Moves to top left as experiences slide in) */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              opacity: Math.max(0, Math.min(1, anim * 1.5)) * (1 - titleMove),
              transform: `translate(-50%, -50%) scale(${0.5 + anim * 0.5})`,
              color: '#EFEBE4',
              willChange: 'opacity, transform',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center' }}>
              <h1 style={{
                fontFamily: "'Penelope', var(--disp), serif",
                fontSize: 'clamp(4rem, 9vw, 7rem)',
                lineHeight: 0.85,
                margin: 0,
                fontWeight: 'normal',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#240605'
              }}>
                WORK<br />EXPERIENCE.
              </h1>
              <p style={{
                position: 'absolute',
                right: '0',
                top: '100%',
                transform: 'translateY(10px)',
                fontFamily: 'var(--body)',
                fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
                margin: 0,
                color: '#240605',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 500,
                textAlign: 'left',
              }}>
                ABOUT.
              </p>
            </div>
          </div>

          {/* Work Experience Custom Cards List (Stacking Animation) */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '800px',
            height: '340px',
            willChange: 'transform, opacity'
          }}>
            {experiences.map((exp, index) => {
              const totalCards = experiences.length;
              // Each card gets an equal chunk of the 0-1 progress
              const start = index * (1 / totalCards);
              const end = start + (1 / totalCards);

              // Arrival progress (0 to 1)
              const arriveP = Math.max(0, Math.min(1, (p1Progress - start) / (end - start)));

              // How many cards have stacked on top of this one
              const activeIndex = p1Progress * totalCards;
              const distance = Math.max(0, activeIndex - (index + 1));

              // Calculate transform values
              const yOffset = (1 - arriveP) * 100; // Starts 100vh below center
              const stackY = 0; // Don't move up, just get fully covered
              const scale = 1; // Don't shrink
              const opacity = arriveP > 0 ? Math.max(0, 1 - distance) : 0; // Fades out slowly as the new card stacks over

              return (
                <div key={exp.id} style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  transform: `translateY(calc(${yOffset}vh + ${stackY}px)) scale(${scale})`,
                  transformOrigin: 'top center',
                  opacity: Math.max(0, opacity),
                  zIndex: 10 + index,
                  backgroundColor: exp.theme.bg,
                  padding: '24px 30px 24px 200px',
                  borderRadius: '16px',
                  color: exp.theme.text,
                  boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  willChange: 'transform, opacity'
                }}>
                  {/* Left Image Section */}
                  <div style={{
                    position: 'absolute',
                    left: '-60px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '230px',
                    height: '210px',
                    flexShrink: 0,
                  }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${exp.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '16px',
                      border: `8px solid ${exp.theme.bg}`,
                      boxShadow: `0 0 0 1px ${exp.theme.imgOutline}, -10px 10px 20px rgba(0,0,0,0.4)`,
                      backgroundColor: '#333'
                    }} />
                  </div>

                  {/* Overlapping Calendar Element */}
                  <div style={{
                    position: 'absolute',
                    top: '-18px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: exp.theme.tagBg,
                    color: exp.theme.tagText,
                    padding: '10px 14px 6px 14px',
                    borderRadius: '6px',
                    boxShadow: 'inset 0 5px 0 #D0D0D0, 0 4px 12px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--disp)',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    border: `1px solid ${exp.theme.imgOutline}`,
                    zIndex: 10
                  }}>
                    <FaRegCalendarAlt size={14} color={exp.theme.tagIcon} />
                    <span style={{ letterSpacing: '1px' }}>{exp.date}</span>
                  </div>

                  {/* Right Content Section */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
                    <h2 style={{
                      fontFamily: "'Penelope', var(--disp), serif",
                      margin: '0',
                      fontSize: '3.2rem',
                      fontWeight: 'normal',
                      textTransform: 'none',
                      letterSpacing: '1px',
                      color: exp.theme.text,
                      lineHeight: 1.1
                    }}>
                      {exp.role}
                    </h2>
                    <div style={{
                      fontFamily: 'var(--disp)',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      color: exp.theme.text,
                      opacity: 0.7,
                      marginTop: '6px'
                    }}>
                      {exp.company}
                    </div>

                    <hr style={{
                      border: 'none',
                      borderTop: `2px dashed ${exp.theme.hr}`,
                      margin: '12px 0'
                    }} />

                    <div style={{
                      fontFamily: 'var(--body)',
                      lineHeight: 1.5,
                      fontSize: '13px',
                      opacity: 0.85,
                      margin: '0 0 20px 0'
                    }}>
                      {Array.isArray(exp.description) ? (
                        <ul style={{ margin: 0, paddingLeft: '16px' }}>
                          {exp.description.map((point, i) => <li key={i} style={{ marginBottom: '4px' }}>{point}</li>)}
                        </ul>
                      ) : (
                        <p style={{ margin: 0 }}>{exp.description}</p>
                      )}
                    </div>

                    {/* Read More Button */}
                    <button style={{
                      alignSelf: 'flex-end',
                      marginTop: exp.id === 1 ? '-10px' : '0',
                      backgroundColor: exp.theme.btnBg,
                      color: exp.theme.btnText,
                      border: 'none',
                      padding: '8px 20px',
                      borderRadius: '25px',
                      fontFamily: 'var(--disp)',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '2px 4px 10px rgba(0,0,0,0.2)'
                    }}>
                      <span style={{ color: exp.theme.btnText, fontWeight: 'bold' }}>&gt;</span> Read more
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 
        Safari/Mobile 100vh bug fix:
        When the sticky viewport reaches the bottom of the section on mobile, 
        100vh might be smaller than the visual viewport, exposing the dark red 
        section background. This cream block covers the bottom edge to ensure 
        a seamless transition to the next section.
      */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '20vh',
        backgroundColor: '#EBE4D4',
        zIndex: 0,
        pointerEvents: 'none'
      }} />
    </section>
  );
}
