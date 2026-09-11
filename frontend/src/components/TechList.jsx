const technologies = [
  ['01', 'Java', 'linguagem'],
  ['02', 'Spring Boot', 'backend'],
  ['03', 'PostgreSQL', 'persistência'],
  ['04', 'Docker', 'ambiente'],
  ['05', 'React', 'interface'],
]

export default function TechList() {
  return (
    <div className="tech-list">
      {technologies.map(([number, name, type]) => (
        <div className="tech-row" key={name}>
          <span className="tech-number">{number}</span>
          <strong>{name}</strong>
          <span>{type}</span>
        </div>
      ))}
    </div>
  )
}
