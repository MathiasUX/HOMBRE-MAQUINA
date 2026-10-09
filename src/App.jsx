import { useEffect, useRef, useState } from 'react'
import './App.css'

const WHATSAPP_NUMBER = '51984992475'
const SLIDE_INTERVAL = 5500

const SOCIAL_LINKS = [
  { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' },
  { id: 'x', label: 'X', url: 'https://x.com/' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
]

const SOCIAL_ICONS = {
  facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
}

const rooms = [
  {
    id: 'simple',
    name: 'Habitación simple',
    image: 'https://www.chaquillchaka.com.pe/assets/images/habitacion-simple.jpg',
    description: 'Una opción práctica para quienes viajan solos y desean descansar después de recorrer Cusco.',
    capacity: '1 huésped',
    price: 'S/ 60.00',
  },
  {
    id: 'doble',
    name: 'Habitación doble',
    image: 'https://www.chaquillchaka.com.pe/assets/images/habitacion-doble.jpg',
    description: 'Una alternativa para compartir la estadía con un amigo o compañero de viaje.',
    capacity: 'Hasta 2 huéspedes',
    price: 'S/ 90.00',
  },
  {
    id: 'matrimonial',
    name: 'Habitación matrimonial',
    image: 'https://www.chaquillchaka.com.pe/assets/images/habitacion-matrimonial.jpg',
    description: 'Un espacio pensado para parejas que visitan la ciudad imperial.',
    capacity: 'Hasta 2 huéspedes',
    price: 'S/ 100.00',
  },
  {
    id: 'familiar',
    name: 'Habitación familiar',
    image: 'https://www.chaquillchaka.com.pe/assets/images/Hab-Doble.JPG',
    description: 'Consulta esta opción si viajas en familia o con un grupo.',
    capacity: 'Hasta 4 huéspedes',
    price: 'S/ 150.00',
  },
]

const heroSlides = [
  { src: 'https://www.chaquillchaka.com.pe/assets/images/slide_PatioD%C3%ADa1.jpg', label: 'Patio del hostal' },
  { src: 'https://www.chaquillchaka.com.pe/assets/images/Slide2-Vista-Piso1-comedor.jpg', label: 'Vista del comedor' },
  { src: 'https://www.chaquillchaka.com.pe/assets/images/slide_habitacion.jpg', label: 'Nuestras habitaciones' },
]

const faqItems = [
  {
    q: '¿Cómo puedo consultar una reserva?',
    a: 'Completa el formulario con tus datos y fechas. Al enviarlo, se generará un código de solicitud y podrás confirmar los detalles vía WhatsApp.',
  },
  {
    q: '¿Dónde puedo ver las tarifas?',
    a: 'Las tarifas base se encuentran en la sección de Habitaciones. Recuerda que pueden variar según la temporada.',
  },
  {
    q: '¿Qué servicios incluye la habitación?',
    a: 'Todas nuestras habitaciones incluyen baño privado y agua caliente. El WiFi de cortesía está disponible en áreas comunes.',
  },
  {
    q: '¿Cuál es la dirección?',
    a: 'Estamos en Calle Belén N.° 418, Cusco. Puedes abrir la ubicación en Google Maps desde la sección Cómo llegar.',
  },
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  room: '',
  guests: '',
  arrival: '',
  departure: '',
  message: '',
  privacy: false,
}

function todayISO() {
  const today = new Date()
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [reservationStatus, setReservationStatus] = useState('idle')
  const [menuOpen, setMenuOpen] = useState(false)
  const [requestCode, setRequestCode] = useState('')
  const [isConsultOpen, setIsConsultOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function selectRoom(roomName) {
    setForm((current) => ({ ...current, room: roomName }))
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target
    const val = type === 'checkbox' ? checked : value
    setForm((current) => ({ ...current, [name]: val }))
    setErrors((current) => ({ ...current, [name]: '' }))
    if (reservationStatus === 'error') setReservationStatus('idle')
  }

  function validateReservation() {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Escribe tu nombre y apellido.'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Revisa el formato del correo.'
    if (form.phone.trim().replace(/\D/g, '').length < 7) nextErrors.phone = 'Escribe un teléfono válido.'
    if (!form.room) nextErrors.room = 'Selecciona un tipo de habitación.'
    if (!form.guests) nextErrors.guests = 'Selecciona cuántas personas se hospedarán.'
    if (!form.arrival) nextErrors.arrival = 'Selecciona la fecha de llegada.'
    if (!form.departure) nextErrors.departure = 'Selecciona la fecha de salida.'
    if (!form.privacy) nextErrors.privacy = 'Debes aceptar la política de privacidad y protección de datos.'
    if (form.arrival && form.arrival < todayISO()) nextErrors.arrival = 'La llegada no puede ser una fecha pasada.'
    if (form.arrival && form.departure && form.departure <= form.arrival) {
      nextErrors.departure = 'La salida debe ser posterior a la llegada.'
    }
    return nextErrors
  }

  function submitReservation(event) {
    event.preventDefault()
    const nextErrors = validateReservation()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setReservationStatus('error')
      return
    }

    setIsSubmitting(true)
    // Simular tiempo de carga de 1.5s (Heurística: Estado del sistema)
    setTimeout(() => {
      const code = 'REQ-' + Math.random().toString(36).substr(2, 5).toUpperCase()
      setRequestCode(code)
      setReservationStatus('success')
      setIsSubmitting(false)
    }, 1500)
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} closeMenu={closeMenu} openConsult={() => setIsConsultOpen(true)} />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <Rooms onSelectRoom={selectRoom} />
        <Services />
        <TouristGuide />
        <Reviews />
        <Gallery />
        <Location />
        <Reservation
          errors={errors}
          form={form}
          onChange={handleInputChange}
          onSubmit={submitReservation}
          status={reservationStatus}
          isSubmitting={isSubmitting}
          minDate={todayISO()}
          requestCode={requestCode}
          onReset={() => { setReservationStatus('idle'); setForm(initialForm); }}
        />
      </main>
      <Footer />
      <FaqWidget />
      <a className="floating-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera información sobre las habitaciones de Chaquill Chak'a Hostal.")}`} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp">
        <span className="whatsapp-symbol" aria-hidden="true">◉</span><span>Consultar por WhatsApp</span>
      </a>
      
      {isConsultOpen && <ConsultModal onClose={() => setIsConsultOpen(false)} />}
    </>
  )
}

function Header({ menuOpen, setMenuOpen, closeMenu, openConsult }) {
  return (
    <header className="header-area">
      <nav className="main-nav" aria-label="Navegación principal">
        <a href="#top" className="logo" onClick={closeMenu} aria-label="Chaquill Chak'a Hostal, inicio">
          <img src="https://www.chaquillchaka.com.pe/assets/images/chaquillchaja-logo.png" alt="Chaquill Chak'a Hostal" />
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="nav-links" onClick={() => setMenuOpen((open) => !open)}>
          <span>{menuOpen ? 'Cerrar' : 'Menú'}</span><span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`} id="nav-links">
          <a href="#top" onClick={closeMenu}>Inicio</a>
          <a href="#rooms" onClick={closeMenu}>Habitaciones</a>
          <a href="#guide" onClick={closeMenu}>Guía Turística</a>
          <a className="nav-cta secondary" href="#consultar" onClick={(e) => { e.preventDefault(); closeMenu(); openConsult(); }}>Mis Reservas</a>
          <a className="nav-cta" href="#reservation" onClick={closeMenu}>Reservar</a>
        </div>
      </nav>
    </header>
  )
}

function ConsultModal({ onClose }) {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, result, empty, error

  function handleConsult(e) {
    e.preventDefault()
    if(!email || !code) return setStatus('error')
    setStatus('loading')
    setTimeout(() => {
      if(code.trim().toUpperCase().startsWith('REQ-')) {
        setStatus('result')
      } else {
        setStatus('empty')
      }
    }, 1500)
  }

  return (
    <div className="room-modal-backdrop" onClick={onClose}>
      <div className="room-modal consult-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Consultar estado de reserva">
        <button type="button" className="room-modal-close" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="room-modal-body">
          <span className="room-modal-eyebrow">Atención al cliente</span>
          <h3>Consultar estado de solicitud</h3>
          <p className="room-modal-description">Ingresa tu correo electrónico y el código de solicitud (Ej. REQ-XXXXX) para revisar el estado de tu reserva.</p>
          
          {status === 'result' ? (
            <div className="consult-result">
              <div className="status-badge pending">Pendiente de Confirmación</div>
              <p>Tu solicitud <strong>{code}</strong> ha sido recibida y está siendo revisada por nuestro equipo.</p>
              <p>Nos comunicaremos contigo a <strong>{email}</strong> o a tu número de WhatsApp para confirmar la disponibilidad y los detalles de pago.</p>
              <button type="button" className="submit-button" onClick={onClose}>Cerrar</button>
            </div>
          ) : status === 'empty' ? (
            <div className="consult-result empty-state">
              <div className="status-badge error-badge">No encontrada</div>
              <p>No logramos encontrar una solicitud con el código <strong>{code}</strong>.</p>
              <p>Asegúrate de haber ingresado el código correctamente con el formato REQ-XXXXX. Si el problema persiste, contáctanos por WhatsApp.</p>
              <button type="button" className="text-button" onClick={() => setStatus('idle')}>Intentar nuevamente</button>
            </div>
          ) : (
            <form onSubmit={handleConsult} className="contact-form consult-form" noValidate>
              <FormField error={status === 'error' && !email ? 'Requerido' : ''} label="Correo electrónico *">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Ej. correo@ejemplo.com" disabled={status === 'loading'} />
              </FormField>
              <FormField error={status === 'error' && !code ? 'Requerido' : ''} label="Código de Solicitud *">
                <input type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="Ej. REQ-A1B2C" disabled={status === 'loading'} />
              </FormField>
              
              <button className="submit-button" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Buscando información...' : 'Consultar Solicitud'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined

    const timer = setInterval(() => {
      setCurrent((current) => (current + 1) % heroSlides.length)
    }, SLIDE_INTERVAL)

    return () => clearInterval(timer)
  }, [paused])

  return (
    <section id="top" className="main-banner-section">
      <div className="banner-left">
        <div className="inner-content">
          <span className="eyebrow">Hospitalidad en Cusco</span>
          <h1>Chaquill Chak'a</h1>
          <p>Hospédate en el corazón histórico de Cusco</p>
          <a href="#reservation" className="white-button">
            Consulta tu reserva <span aria-hidden="true">→</span>
          </a>
          <div className="hero-note">
            <span aria-hidden="true">⌖</span>
            Calle Belén N.° 418, Cusco
          </div>
        </div>
      </div>

      <div
        className={`banner-slider ${paused ? 'is-paused' : ''}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPaused(false)
          }
        }}
      >
        <div className="slides">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.src}
              className={`slide ${index === current ? 'is-active' : ''}`}
              src={slide.src}
              alt={`${slide.label} en Chaquill Chak'a Hostal`}
              aria-hidden={index !== current}
              fetchPriority={index === 0 ? 'high' : 'auto'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Información destacada">
      <div><span aria-hidden="true">⌂</span><p><strong>Ambiente familiar</strong><small>Atención cálida y cercana</small></p></div>
      <div><span aria-hidden="true">⌖</span><p><strong>Ubicación céntrica</strong><small>Calle Belén 418, Cusco</small></p></div>
      <div><span aria-hidden="true">☏</span><p><strong>Contacto directo</strong><small>Consulta por WhatsApp</small></p></div>
    </section>
  )
}

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="two-column">
        <div className="left-text-content">
          <div className="section-heading"><h6>Sobre nosotros</h6><h2>Un lugar acogedor para descubrir Cusco</h2></div>
          <p>Chaquill Chak'a Hostal te recibe en un ambiente familiar, en una ubicación céntrica desde la que puedes organizar tus recorridos por la ciudad imperial.</p>
          <p>Queremos que tu estadía sea cómoda desde el primer contacto. Cuéntanos tus fechas y el tipo de habitación que necesitas para consultar disponibilidad y detalles antes de reservar.</p>
          <a className="text-button" href="#rooms">Conoce las habitaciones <span aria-hidden="true">→</span></a>
        </div>
        <div className="right-content about-photo">
          <img src="https://www.chaquillchaka.com.pe/assets/images/Plaza_de_Cusco_Allison_Bellido.jpg" alt="Vista de la Plaza de Armas de Cusco" loading="lazy" />
          <div className="photo-caption"><strong>Vive Cusco a tu ritmo</strong><span>Historia, cultura y hospitalidad</span></div>
        </div>
      </div>
    </section>
  )
}

function Rooms({ onSelectRoom }) {
  const [activeRoom, setActiveRoom] = useState(null)
  const [filter, setFilter] = useState('all') // 'all', 'couples', 'groups'
  const closeRef = useRef(null)

  useEffect(() => {
    if (!activeRoom) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKey(event) {
      if (event.key === 'Escape') setActiveRoom(null)
    }
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [activeRoom])

  function reserve(roomName) {
    setActiveRoom(null)
    setTimeout(() => onSelectRoom(roomName), 80)
  }

  const filteredRooms = rooms.filter(room => {
    if (filter === 'all') return true
    if (filter === 'couples') return room.id === 'matrimonial' || room.id === 'doble'
    if (filter === 'groups') return room.id === 'familiar'
    return true
  })

  return (
    <section className="section rooms-section" id="rooms">
      <div className="section-heading center">
        <h6>Descanso a tu medida</h6>
        <h2>Encuentra la habitación para tu viaje</h2>
        <p>Elige una opción y consulta directamente su disponibilidad y tarifa.</p>
      </div>

      <div className="room-filters">
        <button type="button" className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Todas</button>
        <button type="button" className={`filter-btn ${filter === 'couples' ? 'active' : ''}`} onClick={() => setFilter('couples')}>Parejas</button>
        <button type="button" className={`filter-btn ${filter === 'groups' ? 'active' : ''}`} onClick={() => setFilter('groups')}>Familias / Grupos</button>
      </div>

      <div className="rooms-grid">
        {filteredRooms.map((room) => (
          <article className="room-item" key={room.id}>
            <button
              type="button"
              className="room-image-button"
              onClick={() => setActiveRoom(room)}
              aria-label={`Consultar información de ${room.name}`}
            >
              <span className="room-thumb">
                <img src={room.image} alt={`${room.name} en Chaquill Chak'a Hostal, Cusco`} loading="lazy" />
              </span>
            </button>

            <div className="down-content">
              <h3>{room.name}</h3>
              <p className="room-price">Desde <strong>{room.price}</strong> / noche</p>
              <button type="button" className="room-consult-button" onClick={() => setActiveRoom(room)}>
                <span>Ver detalles</span>
                <span aria-hidden="true">＋</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {activeRoom && (
        <div className="room-modal-backdrop" onClick={() => setActiveRoom(null)}>
          <div
            className="room-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Información de ${activeRoom.name}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="room-modal-close" ref={closeRef} onClick={() => setActiveRoom(null)} aria-label="Cerrar">×</button>

            <div className="room-modal-media">
              <img src={activeRoom.image} alt={`${activeRoom.name} en Chaquill Chak'a Hostal, Cusco`} />
              <span className="room-modal-badge">{activeRoom.capacity}</span>
            </div>

            <div className="room-modal-body">
              <span className="room-modal-eyebrow">Habitación</span>
              <h3>{activeRoom.name}</h3>
              <p className="room-modal-description">{activeRoom.description}</p>

              <ul className="room-features">
                <li><strong>Capacidad:</strong> {activeRoom.capacity}</li>
                <li><strong>Internet / Wi-Fi:</strong> Incluido en áreas comunes.</li>
                <li><strong>Baño:</strong> Privado con agua caliente.</li>
              </ul>

              <div className="room-price-detail">
                <span>Precio referencial por noche</span>
                <strong>{activeRoom.price}</strong>
              </div>

              <button type="button" className="room-reserve-button" onClick={() => reserve(activeRoom.name)}>
                <span>Consultar disponibilidad y reservar</span><span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function Services() {
  const services = [
    ['01', 'Atención cercana', 'Comunícate directamente con el hostal para resolver tus dudas antes de reservar.'],
    ['02', 'Opciones de habitación', 'Consulta las alternativas simple, doble, matrimonial y familiar.'],
    ['03', 'Ubicación en Cusco', 'Encuentra la dirección y abre el mapa para organizar tu llegada.'],
  ]
  return (
    <section className="section services-section" id="services">
      <div className="section-heading center"><h6>Para planificar tu estadía</h6><h2>Información clara antes de reservar</h2></div>
      <div className="services-grid">{services.map(([number, title, description]) => <article className="service-card" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>
  )
}

function TouristGuide() {
  return (
    <section className="section guide-section" id="guide">
      <div className="section-heading center">
        <h6>Guía para Turistas</h6>
        <h2>Antes de llegar a Cusco</h2>
        <p>Consejos útiles para que tu viaje a la ciudad imperial sea inolvidable y seguro.</p>
      </div>
      <div className="guide-grid">
        <article className="guide-card">
          <div className="guide-icon">🏔️</div>
          <h3>La Altura y el Soroche</h3>
          <p>Cusco se encuentra a 3,399 metros sobre el nivel del mar. Para evitar el mal de altura (soroche), te recomendamos tomar las cosas con calma el primer día, hidratarte bien, comer ligero y tomar un tradicional mate de coca.</p>
        </article>
        <article className="guide-card">
          <div className="guide-icon">⛅</div>
          <h3>El Clima Cusqueño</h3>
          <p>El clima en los Andes puede cambiar rápidamente. Los días suelen ser soleados y cálidos, pero las noches y madrugadas son bastante frías. Te recomendamos vestirte "en capas" (casaca, chompa y polo).</p>
        </article>
        <article className="guide-card">
          <div className="guide-icon">🕒</div>
          <h3>Datos del Hostal</h3>
          <p>Nuestro horario regular de <strong>Check-in es a las 11:00 AM</strong> y el <strong>Check-out a las 10:00 AM</strong>. Si llegas más temprano o tu vuelo sale más tarde, contamos con servicio de guardaequipaje gratuito.</p>
        </article>
      </div>
    </section>
  )
}

function Reviews() {
  const reviews = [
    {
      author: 'Carlos G.',
      date: 'Hace 2 semanas',
      stars: 5,
      text: 'Excelente ubicación muy cerca de la Plaza. La atención de la familia fue de primera, nos ayudaron con los tours.',
    },
    {
      author: 'Lucía M.',
      date: 'Hace 1 mes',
      stars: 5,
      text: 'Lugar tranquilo y seguro. Tienen agua caliente todo el día y el internet funcionó muy bien para trabajar.',
    },
    {
      author: 'Andrea V.',
      date: 'Hace 3 meses',
      stars: 4,
      text: 'Muy buen precio para lo que ofrecen. Me guardaron las maletas sin costo adicional mientras fuimos a Machu Picchu.',
    },
  ]
  return (
    <section className="section reviews-section" id="reviews">
      <div className="section-heading center">
        <h6>Testimonios</h6>
        <h2>Lo que dicen nuestros huéspedes</h2>
        <p>Opiniones de viajeros que eligieron quedarse con nosotros.</p>
      </div>
      <div className="reviews-grid">
        {reviews.map((rev, i) => (
          <article className="review-card" key={i}>
            <div className="review-header">
              <div className="review-avatar">{rev.author.charAt(0)}</div>
              <div className="review-author-info">
                <strong>{rev.author}</strong>
                <span>{rev.date}</span>
              </div>
              <div className="google-icon">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
            </div>
            <div className="review-stars">
              {'★'.repeat(rev.stars)}{'☆'.repeat(5-rev.stars)}
            </div>
            <p className="review-text">"{rev.text}"</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function Gallery() {
  const photos = [
    ['https://www.chaquillchaka.com.pe/assets/images/slide_PatioD%C3%ADa1.jpg', 'Patio del hostal'],
    ['https://www.chaquillchaka.com.pe/assets/images/Slide2-Vista-Piso1-comedor.jpg', 'Vista del comedor'],
    ['https://www.chaquillchaka.com.pe/assets/images/slide_habitacion.jpg', 'Interior de una habitación'],
  ]
  return (
    <section className="section gallery-section" id="gallery">
      <div className="section-heading"><h6>Conoce nuestros espacios</h6><h2>Una primera mirada al hostal</h2></div>
      <div className="gallery-grid">{photos.map(([image, alt]) => <figure key={image}><img src={image} alt={alt} loading="lazy" /><figcaption>{alt}</figcaption></figure>)}</div>
    </section>
  )
}

function Location() {
  return (
    <section className="section location-section" id="location">
      <div className="two-column">
        <div className="left-text-content">
          <div className="section-heading"><h6>Cómo llegar</h6><h2>Te esperamos en el centro de Cusco</h2></div>
          <p><strong>Dirección:</strong> Calle Belén N.° 418, Cusco, Perú.</p>
          <p>Usa el mapa para revisar la ubicación y planificar tu llegada. Si necesitas indicaciones adicionales, puedes consultarnos por WhatsApp.</p>
          <a className="text-button" href="https://www.google.com/maps/search/?api=1&query=Calle+Bel%C3%A9n+418+Cusco+Per%C3%BA" target="_blank" rel="noreferrer">Abrir en Google Maps <span aria-hidden="true">↗</span></a>
        </div>
        <iframe title="Mapa de ubicación de Chaquill Chak'a Hostal, Calle Belén 418, Cusco" src="https://maps.google.com/maps?q=Calle%20Bel%C3%A9n%20418%20Cusco%20Per%C3%BA&t=&z=16&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </section>
  )
}

function FaqWidget() {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const widgetRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    function onKey(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    function onPointerDown(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [open])

  function toggleQuestion(index) {
    setActiveIndex((current) => (current === index ? null : index))
  }

  return (
    <div className="faq-widget" ref={widgetRef}>
      <section className={`faq-panel ${open ? 'is-open' : ''}`} id="faq-panel" role="dialog" aria-label="Preguntas frecuentes" aria-hidden={!open}>
        <header className="faq-panel-header">
          <div>
            <span className="faq-eyebrow">Preguntas frecuentes</span>
            <strong>¿Tienes alguna duda?</strong>
          </div>
          <button type="button" className="faq-close" onClick={() => setOpen(false)} aria-label="Cerrar preguntas frecuentes" tabIndex={open ? 0 : -1}>×</button>
        </header>

        <div className="faq-items">
          {faqItems.map((item, index) => {
            const isActive = activeIndex === index
            return (
              <div className={`faq-item ${isActive ? 'is-active' : ''}`} key={item.q}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={isActive}
                  tabIndex={open ? 0 : -1}
                >
                  <span>{item.q}</span>
                  <span className="faq-plus" aria-hidden="true">＋</span>
                </button>
                <div className="faq-answer">
                  <div className="faq-answer-inner"><p>{item.a}</p></div>
                </div>
              </div>
            )
          })}
        </div>

        <a className="faq-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
          ¿Otra duda? Escríbenos por WhatsApp <span aria-hidden="true">→</span>
        </a>
      </section>

      <button type="button" className="faq-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="faq-panel">
        <span className="faq-toggle-icon" aria-hidden="true">{open ? '×' : '?'}</span>
        <span>Preguntas frecuentes</span>
      </button>
    </div>
  )
}

function Reservation({ errors, form, onChange, onSubmit, status, isSubmitting, minDate, requestCode, onReset }) {
  
  const whatsappText = [
    `Hola, he generado la solicitud ${requestCode} en la web y quisiera confirmar mi reserva en Chaquill Chak'a Hostal.`,
    '',
    `Nombre: ${form.name.trim()}`,
    `Teléfono: ${form.phone.trim()}`,
    form.email.trim() ? `Correo: ${form.email.trim()}` : null,
    `Habitación: ${form.room}`,
    `Huéspedes: ${form.guests}`,
    `Llegada: ${form.arrival}`,
    `Salida: ${form.departure}`,
  ].filter(Boolean).join('\n')

  return (
    <section className="section reservation-section" id="reservation">
      <div className="two-column reservation-grid">
        <div className="left-text-content contact-copy">
          <div className="section-heading"><h6>Hablemos de tu viaje</h6><h2>Prepara tu estadía en unos pasos</h2></div>
          <p className="contact-lead">Cuéntanos qué habitación buscas y cuáles son tus fechas. Revisaremos tu solicitud cuando recibamos tu mensaje por WhatsApp.</p>
          <div className="contact-cards">
            <div className="contact-card">
              <span className="contact-icon" aria-hidden="true">☏</span>
              <div>
                <strong>Teléfono y WhatsApp</strong>
                <a href="tel:+5184211511">(+51) 84 211 511</a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">(+51) 984 992 475</a>
              </div>
            </div>
            <div className="contact-card">
              <span className="contact-icon" aria-hidden="true">✉</span>
              <div>
                <strong>Correo electrónico</strong>
                <a href="mailto:reservas@chaquillchaka.com.pe">reservas@chaquillchaka.com.pe</a>
              </div>
            </div>
          </div>
        </div>

        {status === 'success' ? (
          <div className="contact-form success-panel">
             <div className="success-icon-wrapper">
               <svg className="success-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                 <polyline points="22 4 12 14.01 9 11.01"></polyline>
               </svg>
             </div>
             <h3>Solicitud Generada</h3>
             <p className="success-subtitle">Tu código de reserva es <span className="highlight-code">{requestCode}</span></p>
             
             <div className="success-receipt">
               <div className="receipt-row">
                 <span>A nombre de</span>
                 <strong>{form.name}</strong>
               </div>
               <div className="receipt-row">
                 <span>Habitación</span>
                 <strong>{form.room} ({form.guests} {form.guests == 1 ? 'huésped' : 'pax.'})</strong>
               </div>
               <div className="receipt-row">
                 <span>Estadía</span>
                 <strong>{form.arrival} al {form.departure}</strong>
               </div>
             </div>
             
             <div className="success-action-box">
               <p>Para finalizar el proceso y confirmar disponibilidad, envía esta solicitud a nuestro WhatsApp.</p>
               <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noopener noreferrer" className="submit-button whatsapp-button">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="wa-icon"><path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.124.55 4.195 1.597 6.012L.15 24l6.115-1.6c1.761.948 3.737 1.45 5.766 1.45 6.645 0 12.03-5.385 12.03-12.03C24 5.385 18.676 0 12.031 0zm0 21.905c-1.85 0-3.666-.497-5.263-1.442l-.377-.224-3.904 1.022 1.042-3.805-.246-.39C2.26 15.342 1.7 13.722 1.7 12.031c0-5.696 4.634-10.33 10.33-10.33 5.696 0 10.33 4.634 10.33 10.33 0 5.695-4.634 10.33-10.33 10.33zm5.666-7.72c-.31-.155-1.838-.908-2.122-1.012-.284-.103-.49-.155-.697.155-.206.31-.8 1.012-.98 1.218-.18.207-.36.233-.67.078-1.5-.75-2.585-1.41-3.565-2.7-.253-.333-.028-.514.126-.668.14-.14.31-.36.465-.54.155-.18.206-.31.31-.516.103-.207.052-.388-.026-.543-.078-.155-.697-1.68-.956-2.302-.253-.604-.51-.522-.697-.532-.18-.01-.388-.01-.595-.01-.206 0-.542.077-.826.387-.284.31-1.085 1.06-1.085 2.583 0 1.524 1.11 3.003 1.265 3.208.155.207 2.19 3.342 5.3 4.613.74.303 1.317.484 1.767.62.742.224 1.418.192 1.95.116.595-.084 1.837-.75 2.095-1.472.258-.723.258-1.342.18-1.472-.077-.13-.284-.207-.594-.362z"/></svg>
                  Confirmar reserva
               </a>
             </div>
             
             <button type="button" className="text-button mt-4" onClick={onReset}>Hacer otra consulta</button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="form-intro"><span>RESERVAS</span><h3>Consulta disponibilidad</h3><p>Los campos con * son obligatorios.</p></div>
            <FormField error={errors.name} label="Nombre completo *"><input name="name" autoComplete="name" value={form.name} onChange={onChange} placeholder="Ej. María Pérez" required aria-invalid={Boolean(errors.name)} disabled={isSubmitting}/></FormField>
            <FormField error={errors.phone} label="Teléfono o WhatsApp *"><input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={onChange} placeholder="Tu número de contacto" required aria-invalid={Boolean(errors.phone)} disabled={isSubmitting}/></FormField>
            <FormField error={errors.email} label="Correo electrónico *"><input name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} placeholder="nombre@correo.com" required aria-invalid={Boolean(errors.email)} disabled={isSubmitting}/></FormField>
            
            <div className="form-row">
              <FormField error={errors.guests} label="Número de huéspedes *"><select name="guests" value={form.guests} onChange={onChange} required aria-invalid={Boolean(errors.guests)} disabled={isSubmitting}><option value="">Selecciona cantidad</option>{[1, 2, 3, 4, 5, 6, 7, 8].map((guest) => <option key={guest} value={guest}>{guest} {guest === 1 ? 'persona' : 'personas'}</option>)}</select></FormField>
              <FormField error={errors.room} label="Tipo de habitación *"><select name="room" value={form.room} onChange={onChange} required aria-invalid={Boolean(errors.room)} disabled={isSubmitting}><option value="">Selecciona una habitación</option>{rooms.map((room) => <option key={room.id} value={room.name}>{room.name}</option>)}</select></FormField>
            </div>
            
            <div className="form-row">
              <FormField error={errors.arrival} label="Fecha de llegada *"><input name="arrival" type="date" min={minDate} value={form.arrival} onChange={onChange} required aria-invalid={Boolean(errors.arrival)} disabled={isSubmitting}/></FormField>
              <FormField error={errors.departure} label="Fecha de salida *"><input name="departure" type="date" min={form.arrival || minDate} value={form.departure} onChange={onChange} required aria-invalid={Boolean(errors.departure)} disabled={isSubmitting}/></FormField>
            </div>
            
            <label className="form-field full-field checkbox-field">
              <input type="checkbox" name="privacy" checked={form.privacy} onChange={onChange} required aria-invalid={Boolean(errors.privacy)} disabled={isSubmitting}/>
              <span>Acepto la <a href="#privacy">Política de Privacidad</a> y consiento el tratamiento de mis datos personales según la Ley N° 29733. *</span>
            </label>
            {errors.privacy && <small className="field-error checkbox-error">{errors.privacy}</small>}

            {status === 'error' && <p className="form-status error" role="alert">Hay campos por revisar. Lee los mensajes debajo de cada campo e inténtalo nuevamente.</p>}
            
            <button className="submit-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Procesando solicitud...' : <>Generar solicitud de reserva <span aria-hidden="true">→</span></>}
            </button>
            <small className="privacy-note">Esta acción generará un código seguro sin compromiso de pago inmediato.</small>
          </form>
        )}
      </div>
    </section>
  )
}

function FormField({ error, label, children }) {
  return <label className="form-field"><span>{label}</span>{children}{error && <small className="field-error">{error}</small>}</label>
}

function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-social">
          <span className="footer-label">Síguenos</span>
          <ul className="social-list">
            {SOCIAL_LINKS.map((social, index) => (
              <li key={social.id} style={{ '--i': index }}>
                <a
                  className={`social-link social-${social.id}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Chaquill Chak'a en ${social.label}`}
                  title={social.label}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d={SOCIAL_ICONS[social.id]} /></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <a href="#top" className="footer-logo" aria-label="Volver al inicio">
          <img src="https://www.chaquillchaka.com.pe/assets/images/chaquillchaja-logo-sinfondo.png" alt="Chaquill Chak'a Hostal" loading="lazy" />
        </a>

        <div className="footer-info">
          <p>Dirección: Calle Belén N.° 418, Cusco</p>
          <p>© {new Date().getFullYear()} Chaquill Chak'a Hostal</p>
          <a href="#reservation">Consulta tu reserva →</a>
        </div>
      </div>
    </footer>
  )
}

export default App