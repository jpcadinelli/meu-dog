export default function SectionLabel({ number, children }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  )
}
