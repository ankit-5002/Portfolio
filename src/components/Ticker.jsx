export default function Ticker() {
  const items = [
    { text: 'PYTHON', hand: false },
    { text: 'FASTAPI', hand: false },
    { text: '9.37 & climbing', hand: true },
    { text: 'LANGCHAIN', hand: false },
    { text: 'RAG', hand: false },
    { text: 'cites its sources', hand: true },
    { text: 'CHROMADB', hand: false },
    { text: 'SCIKIT-LEARN', hand: false },
    { text: 'chai-powered', hand: true },
    { text: 'SPACY & NLTK', hand: false },
    { text: 'PANDAS', hand: false },
    { text: 'hackathon regular', hand: true },
    { text: 'POSTGRESQL', hand: false },
    { text: 'DOCKER', hand: false },
    { text: 'AWS', hand: false },
    { text: 'evals > vibes', hand: true },
  ];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="t-track" id="t-track">
        <div className="t-group">
          {items.map((item, idx) => (
            <span key={`a-${idx}`} className={`t-item ${item.hand ? 't-hand' : ''}`}>
              {item.text}
            </span>
          ))}
        </div>
        <div className="t-group">
          {items.map((item, idx) => (
            <span key={`b-${idx}`} className={`t-item ${item.hand ? 't-hand' : ''}`}>
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
