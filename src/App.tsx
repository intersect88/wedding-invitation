import { useState } from 'react'
import './App.css'
import beachBackground from './assets/beach-background.jpg'
import beachBackgroundMobile from './assets/beach-background-mobile.png'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showIban, setShowIban] = useState(false)
  const [showCalendarMenu, setShowCalendarMenu] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const addToGoogleCalendar = () => {
    const event = {
      text: 'Matrimonio Ornella & Genny',
      dates: '20260610T180000/20260611T020000',
      details: 'Celebrazione del matrimonio presso Ammot - Castel Volturno (CE)',
      location: 'Ammot Cafè, Castel Volturno (CE)'
    }
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`
    window.open(url, '_blank')
    setShowCalendarMenu(false)
  }

  const addToAppleCalendar = () => {
    const event = {
      title: 'Matrimonio Ornella & Genny',
      description: 'Celebrazione del matrimonio presso Ammot - Castel Volturno (CE)',
      location: 'Ammot Cafè, Castel Volturno (CE)',
      startDate: '2026-06-10T18:00:00',
      endDate: '2026-06-11T02:00:00'
    }
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${event.startDate.replace(/[-:]/g, '')}`,
      `DTEND:${event.endDate.replace(/[-:]/g, '')}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n')
    
    const blob = new Blob([icsContent], { type: 'text/calendar' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'matrimonio-ornella-genny.ics'
    link.click()
    URL.revokeObjectURL(url)
    setShowCalendarMenu(false)
  }

  const addToOutlookCalendar = () => {
    const event = {
      subject: 'Matrimonio Ornella & Genny',
      startdt: '2026-06-10T18:00:00',
      enddt: '2026-06-11T02:00:00',
      body: 'Celebrazione del matrimonio presso Ammot - Castel Volturno (CE)',
      location: 'Ammot Cafè, Castel Volturno (CE)'
    }
    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(event.subject)}&startdt=${event.startdt}&enddt=${event.enddt}&body=${encodeURIComponent(event.body)}&location=${encodeURIComponent(event.location)}`
    window.open(url, '_blank')
    setShowCalendarMenu(false)
  }

  return (
    <div 
      className="container" 
      style={{ 
        '--bg-desktop': `url(${beachBackground})`,
        '--bg-mobile': `url(${beachBackgroundMobile})`
      } as React.CSSProperties}
    >
      <div className="card-wrapper">
        {/* Biglietto di invito */}
        <div className={`invitation-card ${isOpen ? 'open' : ''}`}>
          <div className="card-front" onClick={handleOpen}>
            <h1 className="front-title">Sei Invitat{isOpen ? 'o' : 'o'}</h1>
            <p className="front-subtitle">Clicca per aprire</p>
          </div>
          
          <div className="card-inside">
          <div className="card-content">
            <h2 className="welcome-message">Con grande gioia</h2>
            <p className="subtitle">vi invitiamo a celebrare con noi</p>
            
            <div className="couple-names">
              <h3>Ornella</h3>
              <span className="heart">&</span>
              <h3>Genny</h3>
            </div>
            
            <div className="calendar-button-wrapper">
              <button 
                className="wedding-date" 
                onClick={() => setShowCalendarMenu(!showCalendarMenu)}
              >
                <p className="date-label">
                  <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                  </svg>
                  Il giorno
                </p>
                <p className="date">10 Giugno 2026</p>
                <p className="date-label" style={{fontSize: '1.1rem', marginTop: '0.5rem'}}>Clicca per aggiungere al calendario</p>
              </button>
              {showCalendarMenu && (
                <div className="calendar-menu">
                  <button onClick={addToGoogleCalendar} className="calendar-option">
                  <svg className="icon-svg google-g" viewBox="0 0 24 24" aria-hidden="true" role="img" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM5 10h14v6H5v-6z" />
                  </svg>
                  Google Calendar
                  </button>
                  <button onClick={addToAppleCalendar} className="calendar-option">
                    <svg className="icon-svg apple-g" viewBox="0 0 24 24" aria-hidden="true" role="img" fill="currentColor">
                      <path d="M16.365 1.43c0 1.02-.37 1.98-1.03 2.73-.71.8-1.95 1.53-3.17 1.33-.13-1.06.34-2.12 1.1-2.82.74-.68 1.86-1.08 3.1-.97zM12.6 6.6c.29.02.62.03.98.02 2.25-.04 4.03 1.4 4.86 2.13.97.9 1.59 2.2 1.58 3.59-.02 2.13-1.47 3.68-3.3 3.68-.91 0-1.92-.4-2.76-.4-.85 0-1.92.41-2.76.41-1.83 0-3.3-1.55-3.32-3.7-.02-1.36.62-2.6 1.64-3.49.72-.64 2.08-1.95 3.78-1.97.53-.01 1.04.02 1.78.03z"/>
                    </svg>
                    Apple Calendar
                  </button>
                  <button onClick={addToOutlookCalendar} className="calendar-option">
                    <svg className="icon-svg outlook-g" viewBox="0 0 24 24" aria-hidden="true" role="img" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM20 8l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    Outlook Calendar
                  </button>
                </div>
              )}
            </div>

            <div className="links-section">
              <a 
                href="https://www.google.it/maps/place/Ammot+Caf%C3%A8/@40.9024271,14.0292486,17z/data=!3m1!4b1!4m6!3m5!1s0x133b1a751ea80751:0xe8b6cadf96c5a6c7!8m2!3d40.9024231!4d14.0314373!16s%2Fg%2F12hkmwfwy?coh=164777&entry=tt&shorturl=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-button venue-link"
              >
                <div className="venue-content">
                  <div className="venue-inline">
                    <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="venue-name">Ammot</span>
                  </div>
                  <div className="venue-text">
                    <p className="venue-note" style={{fontSize: '1.05rem', marginTop: '0.35rem', opacity: 0.85}}>Clicca per raggiungere il locale</p>
                  </div>
                </div>
              </a>

              <a 
                href="https://www.icloud.com/sharedalbum/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-button photo-link"
              >
                <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 15.2c-2.5 0-4.6-2.1-4.6-4.6S9.5 6 12 6s4.6 2.1 4.6 4.6-2.1 4.6-4.6 4.6zM9 2L7.2 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.2L15 2H9z"/>
                </svg>
                Condividi le tue Foto
              </a>

              <button 
                className="link-button iban-link"
                onClick={() => setShowIban(!showIban)}
              >
                <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                </svg>
                Regalo di Nozze
              </button>

              {showIban && (
                <div className="iban-section">
                  <p className="iban-label">IBAN per il regalo:</p>
                  <p className="iban-code">IT00 X000 0000 0000 0000 0000 000</p>
                  <p className="iban-note">Intestato a: Paudice Genny, Ornella Annunziata</p>
                </div>
              )}
            </div>

            <p className="footer-message">Non vediamo l'ora di festeggiare con voi!</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default App
