import { useEffect, useRef, useState } from 'react'
import heroImage from './assets/dogs-hero.png'
import whiteUniversityLogo from './assets/univassouras/logo-horizontal-branca.png'
import colorUniversityLogo from './assets/univassouras/logo-horizontal-colorida.png'
import { createAnimal, deleteAnimal, getAnimal, getAnimals, updateAnimal } from './lib/api'

const presentationSlides = [
  { number: '01', title: 'Capa', kind: 'cover' },
  { number: '02', title: 'Quem somos', kind: 'team' },
  { number: '03', title: 'O problema', kind: 'problem' },
  { number: '04', title: 'A proposta', kind: 'proposal' },
  { number: '05', title: 'Visão da solução', kind: 'flow' },
  { number: '06', title: 'Java', kind: 'java' },
  { number: '07', title: 'Spring Boot', kind: 'spring' },
  { number: '08', title: 'Orientação a objetos', kind: 'poo' },
  { number: '09', title: 'API REST', kind: 'rest' },
  { number: '10', title: 'Persistência', kind: 'database' },
  { number: '11', title: 'Validação e testes', kind: 'tests' },
  { number: '12', title: 'Vamos à prática', kind: 'transition' },
]

const initialForm = { nome: '', especie: '', idade: '', raca: '', sexo: '', porte: '', descricao: '' }

function getRoute() {
  const path = window.location.pathname.replace(/\/$/, '') || '/'
  if (path === '/apresentacao') return { name: 'presentation' }
  if (path === '/plataforma' || path === '/plataforma/animais') return { name: 'platform', child: 'list' }
  if (path === '/plataforma/animais/novo') return { name: 'platform', child: 'create' }
  const editMatch = path.match(/^\/plataforma\/animais\/([^/]+)\/editar$/)
  if (editMatch) return { name: 'platform', child: 'edit', id: editMatch[1] }
  const detailMatch = path.match(/^\/plataforma\/animais\/([^/]+)$/)
  if (detailMatch) return { name: 'platform', child: 'view', id: detailMatch[1] }
  return { name: 'home' }
}

function useNavigation() {
  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const onPopState = () => setRoute(getRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setRoute(getRoute())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { route, navigate }
}

function App() {
  const { route, navigate } = useNavigation()
  if (route.name === 'presentation') return <PresentationPage navigate={navigate} />
  if (route.name === 'platform') return <PlatformPage route={route} navigate={navigate} />
  return <HomePage navigate={navigate} />
}

function Brand() {
  return <span className="brand-lockup"><span className="brand-dot" /> <span>MEU DOG</span><small>projeto acadêmico</small></span>
}

function SiteNav({ navigate, active = 'home', light = false, compact = false }) {
  return <nav className={`site-nav ${light ? 'is-light' : ''} ${compact ? 'is-compact' : ''}`} aria-label="Navegação principal">
    <button className="brand-button" onClick={() => navigate('/')} aria-label="Ir para o início"><Brand /></button>
    <div className="nav-links">
      <button className={active === 'home' ? 'active' : ''} onClick={() => navigate('/')}>Início</button>
      <button className={active === 'presentation' ? 'active' : ''} onClick={() => navigate('/apresentacao')}>Apresentação</button>
      <button className={active === 'platform' ? 'active' : ''} onClick={() => navigate('/plataforma')}>Plataforma</button>
    </div>
    <button className="nav-action" onClick={() => navigate(active === 'platform' ? '/plataforma/animais/novo' : '/plataforma')}>
      {active === 'platform' ? 'Adicionar animal' : 'Conhecer o projeto'} <span>↗</span>
    </button>
  </nav>
}

function HomePage({ navigate }) {
  return <main className="home-page">
    <SiteNav navigate={navigate} />
    <section className="home-hero">
      <div className="hero-copy">
        <p className="kicker">Engenharia de Software · 2026</p>
        <h1>Dados organizados para <em>novos começos.</em></h1>
        <p className="hero-lead">O Meu Dog centraliza informações de animais para adoção em uma API REST simples, acessível e pronta para crescer.</p>
        <div className="hero-actions"><button className="button button-dark" onClick={() => navigate('/apresentacao')}>Ver apresentação <span>↓</span></button><button className="text-button" onClick={() => navigate('/plataforma')}>Abrir plataforma <span>↗</span></button></div>
        <div className="hero-meta"><span>01</span><span>Java · Spring Boot · React</span></div>
      </div>
      <div className="home-hero-image"><img src={heroImage} alt="Cães esperando por um novo lar" /><div className="image-stamp"><strong>MEU<br />DOG</strong><span>cada animal<br />tem uma história</span></div></div>
    </section>
    <section className="home-intro"><div className="eyebrow-row"><span>uma aplicação acadêmica</span><span>01 — 03</span></div><div className="intro-grid"><h2>Mais do que um CRUD. Um cenário real de software.</h2><div><p>Informações sobre animais podem ficar espalhadas em planilhas, mensagens e publicações. O Meu Dog transforma esse cenário em dados centralizados, consultáveis e fáceis de gerenciar.</p><button className="arrow-link" onClick={() => navigate('/apresentacao')}>Entender a solução <span>→</span></button></div></div><div className="home-university-mark"><span>realização acadêmica</span><img src={colorUniversityLogo} alt="Universidade de Vassouras" /></div></section>
    <section className="home-cards"><div className="home-card"><span>01</span><strong>Apresentação</strong><p>Java, Spring Boot, POO e API REST em uma narrativa visual.</p><button onClick={() => navigate('/apresentacao')}>Explorar <span>↗</span></button></div><div className="home-card card-dark"><span>02</span><strong>Plataforma</strong><p>Cadastre, consulte, edite e exclua animais usando a API real.</p><button onClick={() => navigate('/plataforma')}>Acessar <span>↗</span></button></div><div className="home-card card-red"><span>03</span><strong>Próximo lar</strong><p>Uma base simples para evoluir com filtros, fotos e adoções.</p><button onClick={() => navigate('/plataforma')}>Ver animais <span>↗</span></button></div></section>
  </main>
}

function PresentationPage({ navigate }) {
  const deckRef = useRef(null)
  const slideRefs = useRef([])
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = (index) => {
    const next = Math.max(0, Math.min(presentationSlides.length - 1, index))
    slideRefs.current[next]?.scrollIntoView({ behavior: 'smooth' })
    setCurrentSlide(next)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting)
      if (visible) setCurrentSlide(Number(visible.target.dataset.slide))
    }, { root: deckRef.current, threshold: 0.65 })
    slideRefs.current.forEach((slide) => slide && observer.observe(slide))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (['ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); goToSlide(currentSlide + 1) }
      if (['ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); goToSlide(currentSlide - 1) }
      if (event.key === 'Home') goToSlide(0)
      if (event.key === 'End') goToSlide(presentationSlides.length - 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [currentSlide])

  return <main className="presentation-deck" ref={deckRef}>
    <div className="deck-progress"><span style={{ height: `${((currentSlide + 1) / presentationSlides.length) * 100}%` }} /></div><div className="deck-counter">{String(currentSlide + 1).padStart(2, '0')} <span>/ {String(presentationSlides.length).padStart(2, '0')}</span></div>
    {presentationSlides.map((slide, index) => <section className={`presentation-slide slide-${slide.kind}`} key={slide.kind} data-slide={index} ref={(element) => { slideRefs.current[index] = element }}><SlideContent slide={slide} navigate={navigate} />{index < presentationSlides.length - 1 && <button className="slide-next" onClick={() => goToSlide(index + 1)} aria-label="Próximo slide">↓ <span>próximo</span></button>}{(index === 0 || index === presentationSlides.length - 1) && <div className="slide-nav"><SiteNav navigate={navigate} active="presentation" light={slide.kind !== 'cover'} compact /></div>}</section>)}
    <div className="deck-dots" aria-label="Navegação dos slides">{presentationSlides.map((slide, index) => <button key={slide.kind} className={index === currentSlide ? 'active' : ''} onClick={() => goToSlide(index)} aria-label={`Ir para ${slide.title}`} />)}</div>
  </main>
}

function SlideContent({ slide, navigate }) {
  const label = <p className="slide-label"><span>{slide.number}</span> {slide.title}</p>
  if (slide.kind === 'cover') return <div className="slide-inner cover-inner"><div className="university-mark"><img src={whiteUniversityLogo} alt="Universidade de Vassouras" /></div><div className="cover-main"><p className="cover-kicker">Laboratório de Desenvolvimento de Aplicativos Nativos</p><h1>Meu <em>Dog</em></h1><p>Uma API REST para organizar histórias que esperam por um novo lar.</p></div><div className="cover-footer"><span>João Pedro C. C. dos Santos · Pedro L. P. Teixeira Coelho</span><span>Engenharia de Software</span></div></div>
  if (slide.kind === 'team') return <div className="slide-inner narrow-inner">{label}<h2>Dois estudantes.<br /><em>Uma ideia simples.</em></h2><p className="slide-footnote">Professor · Antonio Tadeu Berardinelli Filho</p><div className="team-list"><div><strong>João Pedro C. C. dos Santos</strong><span>RA 202313598 · Engenharia de Software</span></div><div><strong>Pedro L. P. Teixeira Coelho</strong><span>RA 202310631 · Engenharia de Software</span></div></div></div>
  if (slide.kind === 'problem') return <div className="slide-inner split-inner"><div>{label}<h2>Quando a informação se espalha, o cuidado se perde.</h2></div><div className="quote-panel"><span className="quote-mark">“</span><p>Planilhas, mensagens e publicações em redes sociais dificultam saber quais animais estão disponíveis e quais dados precisam ser atualizados.</p><span className="panel-caption">o cenário que motivou o projeto</span></div></div>
  if (slide.kind === 'proposal') return <div className="slide-inner split-inner"><div>{label}<h2>Uma base única para cada <em>história.</em></h2></div><div className="proposal-list"><p><span>01</span> Centralizar os dados dos animais.</p><p><span>02</span> Facilitar consulta e gerenciamento.</p><p><span>03</span> Criar uma base preparada para evoluir.</p></div></div>
  if (slide.kind === 'flow') return <div className="slide-inner flow-inner">{label}<h2>Da intenção ao dado persistido.</h2><div className="big-flow"><FlowNode number="01" title="React" detail="experiência" /><FlowArrow /><FlowNode number="02" title="API REST" detail="contrato HTTP" /><FlowArrow /><FlowNode number="03" title="Spring Boot" detail="regras" /><FlowArrow /><FlowNode number="04" title="PostgreSQL" detail="persistência" /></div><p className="slide-caption">A interface conduz a ação. A API transforma a ação em recurso. O banco mantém a história.</p></div>
  if (slide.kind === 'java') return <div className="slide-inner split-inner code-slide"><div>{label}<h2>Java dá forma ao domínio.</h2><p className="slide-description">A linguagem sustenta as entidades, os tipos e as regras que representam o problema.</p></div><CodeBlock code={'public record AnimalRequest(\n    @NotBlank String nome,\n    @NotBlank String especie,\n    @PositiveOrZero Integer idade\n) {}'} caption="tipagem e validação na entrada" /></div>
  if (slide.kind === 'spring') return <div className="slide-inner split-inner"><div>{label}<h2>Spring Boot organiza o caminho.</h2><p className="slide-description">Cada camada tem uma responsabilidade clara: receber, orquestrar e persistir.</p></div><div className="layer-stack"><div><b>web</b><span>HTTP e contratos</span></div><div><b>application</b><span>casos de uso</span></div><div><b>domain</b><span>regra e estado</span></div><div><b>infrastructure</b><span>acesso ao banco</span></div></div></div>
  if (slide.kind === 'poo') return <div className="slide-inner split-inner"><div>{label}<h2>O objeto conhece seu próprio estado.</h2><p className="slide-description">O método de atualização concentra a mudança na entidade, protegendo o modelo do domínio.</p></div><CodeBlock code={'animal.update(\n    nome, especie, idade,\n    raca, sexo, porte, descricao\n);'} caption="encapsulamento da alteração" /></div>
  if (slide.kind === 'rest') return <div className="slide-inner rest-inner">{label}<h2>Quatro verbos. Um recurso.</h2><div className="rest-grid"><RestVerb method="POST" title="criar" detail="/api/animais" color="red" /><RestVerb method="GET" title="consultar" detail="/api/animais/{id}" /><RestVerb method="PUT" title="atualizar" detail="/api/animais/{id}" /><RestVerb method="DELETE" title="excluir" detail="/api/animais/{id}" /></div><p className="slide-caption">O mesmo recurso é manipulado por contratos HTTP claros e previsíveis.</p></div>
  if (slide.kind === 'database') return <div className="slide-inner split-inner dark-slide"><div>{label}<h2>Persistir é dar continuidade.</h2><p className="slide-description">O Spring Data JPA conecta o domínio ao PostgreSQL por meio de um repository, sem espalhar SQL pela aplicação.</p></div><div className="database-card"><div className="db-top"><span>schema</span><strong>meu-dog</strong></div><div className="db-row"><span>id</span><span>UUID</span></div><div className="db-row"><span>nome</span><span>varchar</span></div><div className="db-row"><span>status</span><span>enum</span></div><div className="db-row"><span>data_cadastro</span><span>timestamp</span></div></div></div>
  if (slide.kind === 'tests') return <div className="slide-inner split-inner"><div>{label}<h2>Confiar também é testar.</h2><p className="slide-description">Validações e testes tornam visíveis os comportamentos esperados e os casos de erro.</p></div><div className="test-board"><div><span className="test-icon">✓</span><strong>201</strong><small>cadastro válido</small></div><div><span className="test-icon">✓</span><strong>400</strong><small>request inválido</small></div><div><span className="test-icon">✓</span><strong>404</strong><small>animal inexistente</small></div></div></div>
  return <div className="slide-inner transition-inner"><div>{label}<h2>Agora, vamos ver<br /><em>acontecer.</em></h2><p>Troque a teoria pela prática e acompanhe cada requisição na plataforma.</p><button className="button button-red" onClick={() => navigate('/plataforma')}>Abrir plataforma <span>↗</span></button></div><div className="transition-mark"><span>API</span><strong>→</strong><span>UI</span></div></div>
}

function FlowNode({ number, title, detail }) { return <div className="flow-node"><span>{number}</span><strong>{title}</strong><small>{detail}</small></div> }
function FlowArrow() { return <span className="flow-arrow">→</span> }
function RestVerb({ method, title, detail, color = '' }) { return <div className={`rest-card ${color}`}><strong>{method}</strong><span>{title}</span><small>{detail}</small></div> }
function CodeBlock({ code, caption }) { return <div className="code-wrap"><div className="code-toolbar"><span /><span /><span /><small>{caption}</small></div><pre><code>{code}</code></pre></div> }

function PlatformPage({ route, navigate }) {
  const content = route.child === 'list' ? <AnimalList navigate={navigate} /> : <AnimalForm mode={route.child} id={route.id} navigate={navigate} />
  return <main className="platform-page"><SiteNav navigate={navigate} active="platform" /><div className="platform-content">{content}</div></main>
}

function Breadcrumb({ navigate, current }) { return <nav className="breadcrumb" aria-label="Navegação estrutural"><button onClick={() => navigate('/')}>Início</button><span>/</span><button onClick={() => navigate('/plataforma')}>Animais</button>{current && <><span>/</span><strong>{current}</strong></>}</nav> }

function AnimalList({ navigate }) {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [sort, setSort] = useState('dataCadastro')
  const [direction, setDirection] = useState('desc')
  const [result, setResult] = useState({ content: [], number: 0, size: 10, totalPages: 0, totalElements: 0, first: true, last: true })
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState(() => window.sessionStorage.getItem('meu-dog-feedback') || '')
  const [deletingAnimal, setDeletingAnimal] = useState(null)
  const [deleteStatus, setDeleteStatus] = useState('idle')
  const [refresh, setRefresh] = useState(0)

  useEffect(() => { if (feedback) window.sessionStorage.removeItem('meu-dog-feedback') }, [feedback])
  useEffect(() => {
    let cancelled = false
    setStatus('loading'); setError('')
    getAnimals({ page, size, sort, direction }).then((data) => { if (!cancelled) { setResult(data); setStatus('ready') } }).catch((reason) => { if (!cancelled) { setError(reason.message || 'Não foi possível carregar os animais.'); setStatus('error') } })
    return () => { cancelled = true }
  }, [page, size, sort, direction, refresh])

  const changeSort = (field) => { if (field === sort) setDirection((current) => current === 'asc' ? 'desc' : 'asc'); else { setSort(field); setDirection('asc') }; setPage(0) }
  const retry = () => { setStatus('loading'); setRefresh((current) => current + 1) }
  const confirmDelete = async () => {
    setDeleteStatus('loading')
    try {
      await deleteAnimal(deletingAnimal.id)
      setDeletingAnimal(null)
      setDeleteStatus('idle')
      setFeedback('Animal excluído com sucesso.')
      setRefresh((current) => current + 1)
    } catch (reason) {
      setDeleteStatus('error')
      setError(reason.message || 'Não foi possível excluir o animal.')
    }
  }

  return <section className="platform-section"><Breadcrumb navigate={navigate} /><div className="platform-heading"><div><p className="eyebrow">gestão de animais</p><h1>Animais para <em>adoção.</em></h1><p className="platform-lead">Uma visão clara dos animais cadastrados na API do Meu Dog.</p></div><button className="button button-red" onClick={() => navigate('/plataforma/animais/novo')}>+ Adicionar animal</button></div>
    {feedback && <div className="feedback success" role="status"><span>✓</span>{feedback}<button onClick={() => setFeedback('')} aria-label="Fechar mensagem">×</button></div>}
    <div className="table-toolbar"><span><strong>{status === 'ready' ? result.totalElements : '—'}</strong> animais cadastrados</span><label>exibir <select value={size} onChange={(event) => { setSize(Number(event.target.value)); setPage(0) }}><option value="10">10</option><option value="50">50</option><option value="100">100</option></select> por página</label></div>
    {status === 'loading' && <LoadingState />}{status === 'error' && <ErrorState message={error} onRetry={retry} />}{status === 'ready' && result.content.length === 0 && <EmptyState onAdd={() => navigate('/plataforma/animais/novo')} />}{status === 'ready' && result.content.length > 0 && <><div className="animal-table" role="table" aria-label="Animais cadastrados"><div className="table-row table-head" role="row"><span>Status</span><SortButton label="Animal" field="nome" sort={sort} direction={direction} onSort={changeSort} /><SortButton label="Espécie" field="especie" sort={sort} direction={direction} onSort={changeSort} /><SortButton label="Raça" field="raca" sort={sort} direction={direction} onSort={changeSort} /><SortButton label="Idade" field="idade" sort={sort} direction={direction} onSort={changeSort} /><span className="actions-heading">Ações</span></div>{result.content.map((animal) => <AnimalRow key={animal.id} animal={animal} navigate={navigate} onDelete={() => setDeletingAnimal(animal)} />)}</div><Pagination result={result} onChange={setPage} /></>}
    {deletingAnimal && <div className="confirm-backdrop" role="dialog" aria-modal="true"><div className="confirm-dialog"><span className="state-symbol">!</span><h2>Excluir {deletingAnimal.nome}?</h2><p>Essa ação remove o animal da listagem e não pode ser desfeita.</p>{deleteStatus === 'error' && <p className="dialog-error">{error}</p>}<div><button className="button button-outline" disabled={deleteStatus === 'loading'} onClick={() => { setDeletingAnimal(null); setDeleteStatus('idle') }}>Cancelar</button><button className="button button-delete" disabled={deleteStatus === 'loading'} onClick={confirmDelete}>{deleteStatus === 'loading' ? 'Excluindo...' : 'Sim, excluir'}</button></div></div></div>}
  </section>
}

function SortButton({ label, field, sort, direction, onSort }) { return <button className="sort-button" onClick={() => onSort(field)}>{label}<span className={sort === field ? 'sort-active' : ''}>{sort === field ? (direction === 'asc' ? '↑' : '↓') : '↕'}</span></button> }
function AnimalRow({ animal, navigate, onDelete }) { return <div className="table-row" role="row"><span className="status-cell"><i className={`status-dot ${animal.status === 'DISPONIVEL' ? 'available' : 'adopted'}`} />{animal.status === 'DISPONIVEL' ? 'Disponível' : 'Adotado'}</span><button className="animal-name" onClick={() => navigate(`/plataforma/animais/${animal.id}`)}><SpeciesIcon species={animal.especie} /><span><strong>{animal.nome}</strong><small>{animal.especie}</small></span></button><span className="species-cell">{animal.especie}</span><span>{animal.raca}</span><span>{animal.idade} {animal.idade === 1 ? 'ano' : 'anos'}</span><div className="row-actions"><button onClick={() => navigate(`/plataforma/animais/${animal.id}`)} aria-label={`Visualizar ${animal.nome}`}>↗</button><button onClick={() => navigate(`/plataforma/animais/${animal.id}/editar`)} aria-label={`Editar ${animal.nome}`}>✎</button><button className="danger-action" onClick={onDelete} aria-label={`Excluir ${animal.nome}`}>×</button></div></div> }
function Pagination({ result, onChange }) { if (result.totalPages <= 1) return null; return <div className="pagination"><span>Página <strong>{result.number + 1}</strong> de <strong>{result.totalPages}</strong></span><div><button disabled={result.first} onClick={() => onChange(result.number - 1)}>← Anterior</button><button disabled={result.last} onClick={() => onChange(result.number + 1)}>Próxima →</button></div></div> }
function LoadingState() { return <div className="state-box"><div className="spinner" /><strong>Carregando animais...</strong><span>Consultando a API REST.</span></div> }
function ErrorState({ message, onRetry }) { return <div className="state-box error-state"><span className="state-symbol">!</span><strong>Não foi possível carregar a listagem.</strong><span>{message}</span><button className="button button-dark small-button" onClick={onRetry}>Tentar novamente</button></div> }
function EmptyState({ onAdd }) { return <div className="state-box"><span className="state-symbol">○</span><strong>Nenhum animal cadastrado.</strong><span>Adicione o primeiro registro para começar.</span><button className="button button-red small-button" onClick={onAdd}>Adicionar animal</button></div> }

function AnimalForm({ mode, id, navigate }) {
  const readOnly = mode === 'view'
  const isCreate = mode === 'create'
  const [animal, setAnimal] = useState(initialForm)
  const [loadStatus, setLoadStatus] = useState(isCreate ? 'ready' : 'loading')
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    if (isCreate) return undefined
    let cancelled = false
    getAnimal(id).then((data) => { if (!cancelled) { setAnimal({ ...data, idade: String(data.idade) }); setLoadStatus('ready') } }).catch((reason) => { if (!cancelled) { setError(reason.message); setLoadStatus('error') } })
    return () => { cancelled = true }
  }, [id, isCreate])

  const updateField = (field, value) => setAnimal((current) => ({ ...current, [field]: value }))
  const handleSubmit = async (event) => {
    event.preventDefault(); setSubmitStatus('loading'); setError(''); setSuccess('')
    const payload = { ...animal, idade: Number(animal.idade) }
    delete payload.id; delete payload.status; delete payload.dataCadastro
    try {
      const saved = isCreate ? await createAnimal(payload) : await updateAnimal(id, payload)
      setAnimal({ ...saved, idade: String(saved.idade) }); setSuccess(isCreate ? 'Animal cadastrado com sucesso.' : 'Animal atualizado com sucesso.'); setSubmitStatus('success')
    } catch (reason) { setError(reason.message || 'Não foi possível salvar o animal.'); setSubmitStatus('error') }
  }
  const handleDelete = async () => {
    setShowDelete(false); setSubmitStatus('loading'); setError('')
    try { await deleteAnimal(id); window.sessionStorage.setItem('meu-dog-feedback', 'Animal excluído com sucesso.'); navigate('/plataforma') } catch (reason) { setError(reason.message || 'Não foi possível excluir o animal.'); setSubmitStatus('error') }
  }

  if (loadStatus === 'loading') return <section className="form-section"><Breadcrumb navigate={navigate} current="carregando" /><LoadingState /></section>
  if (loadStatus === 'error') return <section className="form-section"><Breadcrumb navigate={navigate} current="animal" /><ErrorState message={error} onRetry={() => window.location.reload()} /></section>
  const title = isCreate ? <>Cadastrar <em>animal.</em></> : readOnly ? <>{animal.nome || 'Animal'} <em>em foco.</em></> : <>Editar <em>animal.</em></>
  return <section className="form-section"><Breadcrumb navigate={navigate} current={isCreate ? 'criar' : animal.nome || 'animal'} /><div className="form-heading"><div><p className="eyebrow">{isCreate ? 'novo cadastro' : readOnly ? 'detalhes do cadastro' : 'alteração de cadastro'}</p><h1>{title}</h1><p className="platform-lead">{isCreate ? 'Preencha os dados para adicionar um animal à plataforma.' : readOnly ? 'Confira os dados retornados pela API do Meu Dog.' : 'Atualize os dados e salve a alteração na API.'}</p></div>{!isCreate && <div className={`detail-status ${animal.status === 'ADOTADO' ? 'adopted-status' : ''}`}><i className={`status-dot ${animal.status === 'ADOTADO' ? 'adopted' : 'available'}`} />{animal.status === 'ADOTADO' ? 'Adotado' : 'Disponível'}</div>}</div>
    {success && <div className="feedback success" role="status"><span>✓</span>{success}</div>}{error && <div className="feedback error" role="alert"><span>!</span>{error}</div>}
    <form className="animal-form" onSubmit={handleSubmit}><div className="form-grid"><Field label="Nome" name="nome" value={animal.nome} onChange={updateField} disabled={readOnly} required /><Field label="Espécie" name="especie" value={animal.especie} onChange={updateField} disabled={readOnly} required placeholder="Ex.: Cachorro" /><Field label="Idade" name="idade" type="number" min="0" value={animal.idade} onChange={updateField} disabled={readOnly} required /><Field label="Raça" name="raca" value={animal.raca} onChange={updateField} disabled={readOnly} required /><SelectField label="Sexo" name="sexo" value={animal.sexo} onChange={updateField} disabled={readOnly} required options={[['MACHO', 'Macho'], ['FEMEA', 'Fêmea']]} /><SelectField label="Porte" name="porte" value={animal.porte} onChange={updateField} disabled={readOnly} required options={[['PEQUENO', 'Pequeno'], ['MEDIO', 'Médio'], ['GRANDE', 'Grande']]} /></div><label className="field description-field"><span>Descrição <small>opcional</small></span><textarea name="descricao" rows="5" value={animal.descricao || ''} onChange={(event) => updateField('descricao', event.target.value)} disabled={readOnly} placeholder="Conte um pouco sobre este animal..." /></label><div className="form-actions"><button type="button" className="text-button" onClick={() => navigate('/plataforma')}>← Voltar para animais</button><div>{!isCreate && readOnly && <><button type="button" className="button button-outline" onClick={() => navigate(`/plataforma/animais/${id}/editar`)}>Editar</button><button type="button" className="button button-delete" onClick={() => setShowDelete(true)}>Excluir</button></>}{!readOnly && <button className="button button-red" type="submit" disabled={submitStatus === 'loading'}>{submitStatus === 'loading' ? 'Salvando...' : isCreate ? 'Cadastrar animal ↗' : 'Salvar alterações ↗'}</button>}</div></div></form>
    {animal.id && <div className="record-meta"><span>ID <code>{animal.id}</code></span><span>Cadastro <strong>{formatDate(animal.dataCadastro)}</strong></span></div>}{showDelete && <div className="confirm-backdrop" role="dialog" aria-modal="true"><div className="confirm-dialog"><span className="state-symbol">!</span><h2>Excluir {animal.nome}?</h2><p>Essa ação remove o animal da listagem e não pode ser desfeita.</p><div><button className="button button-outline" onClick={() => setShowDelete(false)}>Cancelar</button><button className="button button-delete" onClick={handleDelete}>Sim, excluir</button></div></div></div>}
  </section>
}

function Field({ label, name, value, onChange, ...props }) { return <label className="field"><span>{label}</span><input name={name} value={value ?? ''} onChange={(event) => onChange(name, event.target.value)} {...props} /></label> }
function SelectField({ label, name, value, onChange, options, ...props }) { return <label className="field"><span>{label}</span><select name={name} value={value ?? ''} onChange={(event) => onChange(name, event.target.value)} {...props}><option value="">Selecione</option>{options.map(([option, text]) => <option key={option} value={option}>{text}</option>)}</select></label> }
function SpeciesIcon({ species }) { const normalized = (species || '').toLowerCase(); const glyph = normalized.includes('gato') ? '🐈' : normalized.includes('coelho') ? '🐇' : normalized.includes('ave') || normalized.includes('pássaro') ? '🐦' : normalized.includes('cachorro') || normalized.includes('cão') ? '🐕' : '🐾'; return <span className="species-icon" aria-hidden="true">{glyph}</span> }
function formatDate(date) { if (!date) return '—'; return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(date)) }

export default App
