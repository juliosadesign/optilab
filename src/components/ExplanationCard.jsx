// src/components/ExplanationCard.jsx

function ExplanationCard({ title, tag, children }) {
    return (
      <article className="explanation-card">
        {tag && <span className="explanation-tag">{tag}</span>}
        <h3>{title}</h3>
        <div className="explanation-content">{children}</div>
      </article>
    )
  }
  
  export default ExplanationCard