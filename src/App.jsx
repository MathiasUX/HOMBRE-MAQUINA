import { useEffect, useRef, useState } from 'react'
import './App.css'

const WHATSAPP_NUMBER = '51984992475'

/* ⚠️ CAMBIA estos enlaces por los perfiles reales del hostal */
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
  },
  {
    id: 'doble',
    name: 'Habitación doble',
    image: 'https://www.chaquillchaka.com.pe/assets/images/habitacion-doble.jpg',
    description: 'Una alternativa para compartir la estadía con un amigo o compañero de viaje.',
    capacity: 'Hasta 2 huéspedes',
  },
  {
    id: 'matrimonial',
    name: 'Habitación matrimonial',
    image: 'https://www.chaquillchaka.com.pe/assets/images/habitacion-matrimonial.jpg',
    description: 'Un espacio pensado para parejas que visitan la ciudad imperial.',
    capacity: 'Hasta 2 huéspedes',
  },
  {
    id: 'familiar',
    name: 'Habitación familiar',
    image: 'https://www.chaquillchaka.com.pe/assets/images/Hab-Doble.JPG',
    description: 'Consulta esta opción si viajas en familia o con un grupo.',
    capacity: 'Capacidad por confirmar',
  },
]

const heroSlides = [
  'https://www.chaquillchaka.com.pe/assets/images/slide_PatioD%C3%ADa1.jpg',
  'https://www.chaquillchaka.com.pe/assets/images/Slide2-Vista-Piso1-comedor.jpg',
  'https://www.chaquillchaka.com.pe/assets/images/slide_habitacion.jpg',
]

const faqItems = [
  {
    q: '¿Cómo puedo consultar una reserva?',
    a: 'Completa el formulario con tus datos y fechas. Al enviarlo, se abrirá WhatsApp con el mensaje preparado para que puedas mandarlo al hostal.',
  },
  {
    q: '¿Dónde puedo ver las tarifas?',
    a: 'Las tarifas dependen de la habitación y las fechas. Selecciona una habitación o completa el formulario para consultar el precio y la disponibilidad.',
  },
  {
    q: '¿Qué servicios incluye la habitación?',
    a: 'Los servicios incluidos deben confirmarse directamente con el hostal al consultar tu habitación.',
  },
  {
    q: '¿Cuál es la dirección?',
    a: 'Estamos en Calle Belén N.° 418, Cusco. Puedes abrir la ubicación en Google Maps desde la sección Cómo llegar.',
  },
  {
    q: '¿Cómo me comunico con el hostal?',
    a: 'Puedes llamar al (+51) 84 211 511, escribir por WhatsApp al (+51) 984 992 475 o enviar un correo a reservas@chaquillchaka.com.pe.',
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
}

function todayISO() {
  const today = new Date()
  const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [reservationStatus, setReservationStatus] = useState('idle')
  const [menuOpen, setMenuOpen] = useState(false)

  function goToSlide(direction) {
    setCurrentSlide((current) => (current + direction + heroSlides.length) % heroSlides.length)
  }

  function selectRoom(roomName) {
    setForm((current) => ({ ...current, room: roomName }))
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleInputChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setReservationStatus('idle')
  }

  function validateReservation() {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Escribe tu nombre y apellido.'
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Revisa el formato del correo.'
    if (form.phone.trim().replace(/\D/g, '').length < 7) nextErrors.phone = 'Escribe un teléfono válido.'
    if (!form.room) nextErrors.room = 'Selecciona un tipo de habitación.'
    if (!form.guests) nextErrors.guests = 'Selecciona cuántas personas se hospedarán.'
    if (!form.arrival) nextErrors.arrival = 'Selecciona la fecha de llegada.'
    if (!form.departure) nextErrors.departure = 'Selecciona la fecha de salida.'
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

    const whatsappText = [
      "Hola, quisiera consultar disponibilidad en Chaquill Chak'a Hostal.",
      '',
      `Nombre: ${form.name.trim()}`,
      `Teléfono: ${form.phone.trim()}`,
      form.email.trim() ? `Correo: ${form.email.trim()}` : null,
      `Tipo de habitación: ${form.room}`,
      `Número de huéspedes: ${form.guests}`,
      `Fecha de llegada: ${form.arrival}`,
      `Fecha de salida: ${form.departure}`,
      `Mensaje adicional: ${form.message.trim() || 'Ninguno'}`,
    ].filter(Boolean).join('\n')

    setReservationStatus('success')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappText)}`, '_blank', 'noopener,noreferrer')
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} closeMenu={closeMenu} />
      <main>
        <Hero currentSlide={currentSlide} onSlideChange={goToSlide} />
        <TrustStrip />
        <About />
        <Rooms onSelectRoom={selectRoom} />
        <Services />
        <Gallery />
        <Location />
        <Reservation
          errors={errors}
          form={form}
          onChange={handleInputChange}
          onSubmit={submitReservation}
          status={reservationStatus}
          minDate={todayISO()}
        />
      </main>
      <Footer />
      <FaqWidget />
      <a className="floating-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quisiera información sobre las habitaciones de Chaquill Chak'a Hostal.")}`} target="_blank" rel="noreferrer" aria-label="Consultar por WhatsApp">
        <span className="whatsapp-symbol" aria-hidden="true">◉</span><span>Consultar por WhatsApp</span>
      </a>
    </>
  )
}

function Header({ menuOpen, setMenuOpen, closeMenu }) {
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
          <a href="#about" onClick={closeMenu}>Nosotros</a>
          <a href="#rooms" onClick={closeMenu}>Habitaciones</a>
          <a href="#services" onClick={closeMenu}>Servicios</a>
          <a href="#location" onClick={closeMenu}>Ubicación</a>
          <a className="nav-cta" href="#reservation" onClick={closeMenu}>Reservar</a>
        </div>
      </nav>
    </header>
  )
}

function Hero({ currentSlide, onSlideChange }) {
  return (
    <section id="top" className="main-banner-section">
      <div className="banner-left">
        <div className="inner-content">
          <span className="eyebrow">Hospitalidad en Cusco</span>
          <h1>Chaquill Chak'a</h1>
          <p>Hospédate en el corazón histórico de Cusco</p>
          <a href="#reservation" className="white-button">Consulta tu reserva <span aria-hidden="true">→</span></a>
          <div className="hero-note"><span aria-hidden="true">⌖</span> Calle Belén N.° 418, Cusco</div>
        </div>
      </div>
      <div className="banner-slider">
        <img src={heroSlides[currentSlide]} alt={`Ambiente de Chaquill Chak'a Hostal, fotografía ${currentSlide + 1}`} fetchPriority="high" />
        <button type="button" className="slider-arrow prev" onClick={() => onSlideChange(-1)} aria-label="Imagen anterior">‹</button>
        <button type="button" className="slider-arrow next" onClick={() => onSlideChange(1)} aria-label="Imagen siguiente">›</button>
        <div className="slider-dots" aria-label="Seleccionar fotografía">
          {heroSlides.map((slide, index) => (
            <button className={index === currentSlide ? 'active' : ''} key={slide} type="button" onClick={() => onSlideChange(index - currentSlide)} aria-label={`Ver imagen ${index + 1}`} aria-pressed={index === currentSlide} />
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

  return (
    <section className="section rooms-section" id="rooms">
      <div className="section-heading center">
        <h6>Descanso a tu medida</h6>
        <h2>Encuentra la habitación para tu viaje</h2>
        <p>Elige una opción y consulta directamente su disponibilidad y tarifa.</p>
      </div>

      <div className="rooms-grid">
        {rooms.map((room) => (
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
              <button type="button" className="room-consult-button" onClick={() => setActiveRoom(room)}>
                <span>Consultar habitación</span>
                <span aria-hidden="true">＋</span>
              </button>
            </div>
          </article>
        ))}
      </div>
      <p className="section-footnote">Las tarifas, la capacidad final y los servicios incluidos se confirman directamente con el hostal.</p>

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
                <li><strong>Tipo de cama:</strong> consultar configuración.</li>
                <li><strong>Internet / Wi-Fi:</strong> confirmar disponibilidad.</li>
                <li><strong>Baño privado y agua caliente:</strong> consultar con el hostal.</li>
              </ul>

              <div className="room-price-detail">
                <span>Precio por 24 horas</span>
                <strong>Consultar tarifa</strong>
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

function Reservation({ errors, form, onChange, onSubmit, status, minDate }) {
  return (
    <section className="section reservation-section" id="reservation">
      <div className="two-column reservation-grid">
        <div className="left-text-content contact-copy">
          <div className="section-heading"><h6>Hablemos de tu viaje</h6><h2>Prepara tu estadía en unos pasos</h2></div>
          <p>Cuéntanos qué habitación buscas y cuáles son tus fechas. Revisaremos tu solicitud cuando recibamos tu mensaje por WhatsApp.</p>
          <div className="contact-cards">
            <div className="contact-card"><span aria-hidden="true">☏</span><strong>Teléfono y WhatsApp</strong><a href="tel:+5184211511">(+51) 84 211 511</a><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">(+51) 984 992 475</a></div>
            <div className="contact-card"><span aria-hidden="true">✉</span><strong>Correo electrónico</strong><a href="mailto:reservas@chaquillchaka.com.pe">reservas@chaquillchaka.com.pe</a></div>
          </div>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="form-intro"><span>RESERVAS</span><h3>Consulta disponibilidad</h3><p>Los campos con * son obligatorios.</p></div>
          <FormField error={errors.name} label="Nombre completo *"><input name="name" autoComplete="name" value={form.name} onChange={onChange} placeholder="Ej. María Pérez" required aria-invalid={Boolean(errors.name)} /></FormField>
          <FormField error={errors.phone} label="Teléfono o WhatsApp *"><input name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={onChange} placeholder="Tu número de contacto" required aria-invalid={Boolean(errors.phone)} /></FormField>
          <FormField error={errors.email} label="Correo electrónico (opcional)"><input name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} placeholder="nombre@correo.com" aria-invalid={Boolean(errors.email)} /></FormField>
          <FormField error={errors.guests} label="Número de huéspedes *"><select name="guests" value={form.guests} onChange={onChange} required aria-invalid={Boolean(errors.guests)}><option value="">Selecciona cantidad</option>{[1, 2, 3, 4, 5, 6, 7, 8].map((guest) => <option key={guest} value={guest}>{guest} {guest === 1 ? 'persona' : 'personas'}</option>)}</select></FormField>
          <FormField error={errors.room} label="Tipo de habitación *"><select name="room" value={form.room} onChange={onChange} required aria-invalid={Boolean(errors.room)}><option value="">Selecciona una habitación</option>{rooms.map((room) => <option key={room.id} value={room.name}>{room.name}</option>)}</select></FormField>
          <FormField error={errors.arrival} label="Fecha de llegada *"><input name="arrival" type="date" min={minDate} value={form.arrival} onChange={onChange} required aria-invalid={Boolean(errors.arrival)} /></FormField>
          <FormField error={errors.departure} label="Fecha de salida *"><input name="departure" type="date" min={form.arrival || minDate} value={form.departure} onChange={onChange} required aria-invalid={Boolean(errors.departure)} /></FormField>
          <label className="form-field full-field">Mensaje adicional (opcional)<textarea name="message" value={form.message} onChange={onChange} placeholder="¿Tienes alguna consulta o solicitud?" rows="3" /></label>
          {status === 'error' && <p className="form-status error" role="alert">Hay campos por revisar. Lee los mensajes debajo de cada campo e inténtalo nuevamente.</p>}
          {status === 'success' && <p className="form-status success" role="status">Tus datos están listos. Se abrió WhatsApp en otra pestaña; envía el mensaje para completar la consulta.</p>}
          <button className="submit-button" type="submit">Enviar consulta por WhatsApp <span aria-hidden="true">→</span></button>
          <small className="privacy-note">Este formulario prepara un mensaje; la reserva queda pendiente de confirmación del hostal.</small>
        </form>
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