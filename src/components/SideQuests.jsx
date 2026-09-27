export default function SideQuests() {
  const achievements = [
    {
      seal: '1st',
      sealCls: 'f',
      title: 'Agentic AI Hackathon, CUTM — 1st Place',
      desc: 'WINNER · AGENTIC SYSTEMS',
      rot: '-.6deg',
      delay: 1,
    },
    {
      seal: '?!→',
      sealCls: 'oa',
      title: 'State-Level Cyber Safety Hackathon 2025 — Surprise Winners',
      desc: 'THE BEST KIND OF SURPRISE',
      rot: '.8deg',
      delay: 2,
    },
    {
      seal: '>_',
      sealCls: 'oc',
      title: 'Campus Hackfest 2026, O-Hub',
      desc: 'PARTICIPANT · SHIPPING UNDER TIME PRESSURE',
      rot: '-.4deg',
      delay: 3,
    },
  ];

  const certs = [
    { name: 'IBM DS0101EN', org: 'IBM SkillsBuild', rot: '-.8deg', delay: 1 },
    { name: 'Python', org: 'Cisco Networking Academy', rot: '.6deg', delay: 2 },
    { name: 'Generative AI', org: 'upGrad', rot: '.5deg', delay: 3 },
    { name: 'DSA using Java', org: 'GeeksforGeeks', rot: '-.5deg', delay: 4 },
    { name: 'Job Simulation — Technology', org: 'Deloitte (Forage)', rot: '.7deg', delay: 5 },
    { name: 'Job Simulation — Analytics', org: 'Deloitte (Forage)', rot: '-.7deg', delay: 6 },
  ];

  return (
    <section id="quests">
      <div className="wrap">
        <div className="sec-head reveal in">
          <span className="sec-num">05</span>
          <h2 className="sec-title lm">
            <span style={{ '--d': 1 }}>
              Side <i>quests</i>
            </span>
          </h2>
          <span className="sec-line"></span>
          <span className="sec-note">hackathons &amp; certifications</span>
        </div>

        <div className="quests-grid">
          <div className="reveal in">
            <p className="quests-kicker">completed, mostly with the bonus objective:</p>
            <div className="ach-list">
              {achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="ach fade in"
                  style={{ '--r': ach.rot, '--d': ach.delay }}
                >
                  <span className={`stamp-sq ${ach.sealCls} ach-seal`}>{ach.seal}</span>
                  <div>
                    <h3>{ach.title}</h3>
                    <p>{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal in">
            <p className="quests-kicker">certification wall:</p>
            <div className="cert-wall">
              {certs.map((cert, idx) => (
                <div
                  key={idx}
                  className="cert fade in"
                  style={{ '--r': cert.rot, '--d': cert.delay }}
                >
                  <b>{cert.name}</b>
                  <span>{cert.org}</span>
                  <i>✓</i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
