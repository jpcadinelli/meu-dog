export default function DogCard({ dog }) {
  return (
    <article className="dog-card">
      <div className="dog-card-image-wrap">
        <img src={dog.image} alt={`Foto ilustrativa de ${dog.nome}`} style={{ objectPosition: dog.imagePosition }} />
        <span className="status-pill">Disponível</span>
      </div>
      <div className="dog-card-content">
        <div>
          <h3>{dog.nome}</h3>
          <p>{dog.especie} · {dog.raca}</p>
        </div>
        <div className="dog-meta">
          <span>{dog.idade} anos</span>
          <span>{dog.porte}</span>
        </div>
      </div>
    </article>
  )
}
