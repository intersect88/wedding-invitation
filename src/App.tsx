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
                <p className="date-label"><span className="icon-calendar">📆</span> Il giorno</p>
                <p className="date">10 Giugno 2026</p>
                <p className="date-label" style={{fontSize: '1.1rem', marginTop: '0.5rem'}}>Clicca per aggiungere al calendario</p>
              </button>
              {showCalendarMenu && (
                <div className="calendar-menu">
                  <button onClick={addToGoogleCalendar} className="calendar-option">
                    <span className="icon-globe">●</span> Google Calendar
                  </button>
                  <button onClick={addToAppleCalendar} className="calendar-option">
                    <span className="icon-apple">◆</span> Apple Calendar
                  </button>
                  <button onClick={addToOutlookCalendar} className="calendar-option">
                    <span className="icon-mail">✉</span> Outlook Calendar
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
                <div>
                  <span className="icon-location">📍</span> Ammot - Castel Volturno (CE)
                  <p style={{fontSize: '1.1rem', marginTop: '0.3rem', opacity: 0.8}}>Clicca per raggiungere il locale</p>
                </div>
              </a>

              <a 
                href="https://www.icloud.com/sharedalbum/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-button photo-link"
              >
                <span className="icon-camera">📷</span> Condividi le tue Foto
              </a>

              <button 
                className="link-button iban-link"
                onClick={() => setShowIban(!showIban)}
              >
                <span className="icon-gift">🎁</span> Regalo di Nozze
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
