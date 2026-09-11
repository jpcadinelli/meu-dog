import { dogs } from './data/dogs'
import heroImage from './assets/dogs-hero.png'
import DogCard from './components/DogCard'
import SectionLabel from './components/SectionLabel'
import TechList from './components/TechList'

function App() {
  return (
    <main className="presentation-shell">
      <nav className="topbar" aria-label="Navegação principal">
        <a className="brand" href="#inicio"><span className="brand-mark">●</span> MEU DOG</a>
        <div className="nav-links">
          <a href="#projeto">O projeto</a>
          <a href="#tecnologias">Tecnologias</a>
          <a href="#animais">Animais</a>
        </div>
        <a className="nav-cta" href="#animais">Ver encontros <span aria-hidden="true">↗</span></a>
      </nav>

      <section className="hero section" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">um sistema para novos começos</p>
          <h1>A adoção começa com um <em>encontro.</em></h1>
          <p className="hero-text">O Meu Dog aproxima animais que esperam por um lar das pessoas que estão prontas para transformar uma vida.</p>
          <a className="primary-action" href="#projeto">Conheça o projeto <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-visual">
          <img src={heroImage} alt="Três cães esperando por um novo lar" />
          <div className="hero-note"><span>01</span><strong>encontros<br />que importam</strong></div>
        </div>
        <div className="scroll-cue"><span className="scroll-line" /> role para explorar</div>
      </section>

      <section className="section project-section" id="projeto">
        <div className="section-intro">
          <SectionLabel number="01">sobre o projeto</SectionLabel>
          <h2>Um lugar para cada história encontrar seu próximo capítulo.</h2>
        </div>
        <div className="project-detail">
          <p className="large-copy">O Meu Dog é uma aplicação acadêmica para cadastro e gerenciamento de animais domésticos disponíveis para adoção.</p>
          <p className="muted-copy">Nesta primeira etapa, a experiência visual apresenta o propósito do sistema e os animais de demonstração. A interface real será construída a partir desta base.</p>
          <div className="detail-rule" />
          <span className="detail-caption">primeira etapa · apresentação do sistema</span>
        </div>
      </section>

      <section className="section tech-section" id="tecnologias">
        <div className="section-intro">
          <SectionLabel number="02">tecnologias</SectionLabel>
          <h2>Pequenas escolhas técnicas. Um sistema com espaço para crescer.</h2>
        </div>
        <TechList />
      </section>

      <section className="section architecture-section" id="arquitetura">
        <div className="section-intro">
          <SectionLabel number="03">arquitetura</SectionLabel>
          <h2>Do encontro na tela até o dado persistido.</h2>
        </div>
        <div className="architecture-flow" aria-label="Fluxo da arquitetura">
          <div className="flow-step"><span>01</span><strong>React</strong><small>apresentação</small></div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step"><span>02</span><strong>API REST</strong><small>comunicação</small></div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step"><span>03</span><strong>Spring Boot</strong><small>regras e casos de uso</small></div>
          <div className="flow-arrow">↓</div>
          <div className="flow-step"><span>04</span><strong>PostgreSQL</strong><small>persistência</small></div>
        </div>
      </section>

      <section className="section dogs-section" id="animais">
        <div className="section-heading-row">
          <div>
            <SectionLabel number="04">animais para adoção</SectionLabel>
            <h2>Conheça alguns dos nossos encontros.</h2>
          </div>
          <p className="mock-note">dados visuais de demonstração<br />primeira etapa</p>
        </div>
        <div className="dogs-grid">
          {dogs.map((dog) => <DogCard dog={dog} key={dog.nome} />)}
        </div>
        <p className="footer-note">meu dog <span>·</span> adoção começa com um encontro</p>
      </section>
    </main>
  )
}

export default App
