import { useState } from 'react'
import './App.css'
import beachBackground from './assets/beach-background.jpg'
import beachBackgroundMobile from './assets/beach-background-mobile.png'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showIban, setShowIban] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)
  const [showCalendarMenu, setShowCalendarMenu] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const addToGoogleCalendar = () => {
    const event = {
      text: 'Matrimonio Ornella & Genny',
      dates: '20260610T190000/20260610T230000',
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
      startDate: '2026-06-10T19:00:00',
      endDate: '2026-06-10T23:00:00'
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
      startdt: '2026-06-10T19:00:00',
      enddt: '2026-06-10T23:00:00',
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
            <p className="subtitle">vi invitiamo al nostro matrimonio</p>
            
            <div className="couple-names">
              <h3>Ornella</h3>
              <span className="heart">&</span>
              <h3>Genny</h3>
            </div>
            
            <div className="calendar-button-wrapper">
              <button 
                className="wedding-date" 
                onClick={() => setShowCalendarMenu(!showCalendarMenu)}
                aria-haspopup="menu"
                aria-expanded={showCalendarMenu}
                aria-label={`Aggiungi al calendario - 10 Giugno 2026`}
              >
                <p className="date-label">
                  <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                  </svg>
                  Il giorno
                </p>
                <p className="date">10 Giugno 2026<br />ore 19:00</p>
                <p className="date-label" style={{fontSize: '1.1rem', marginTop: '0.5rem'}}>Clicca per aggiungere al calendario</p>
              </button>
                {showCalendarMenu && (
                <div className="calendar-menu" role="menu">
                  <button onClick={addToGoogleCalendar} className="calendar-option" role="menuitem" aria-label="Aggiungi a Google Calendar">
                    {/* Official Google "G" logo */}
                    <svg className="icon-svg google-g" viewBox="0 0 48 48" aria-hidden="true" role="img">
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      <path fill="none" d="M0 0h48v48H0z"/>
                    </svg>
                    Google Calendar
                  </button>
                  <button onClick={addToAppleCalendar} className="calendar-option" role="menuitem" aria-label="Scarica evento .ics per Apple Calendar">
                    {/* Apple logo — proper shape with leaf */}
                    <svg className="icon-svg apple-g" viewBox="0 0 814 1000" aria-hidden="true" role="img">
                      <path fill="#000000" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-98.8c-58.1-72.4-105.2-196.4-105.2-313.8 0-197.1 99-333.6 267-333.6 74 0 136.7 48.5 181.1 48.5 42.8 0 114.5-51.7 196-51.7 31.4 0 114.5 2.9 168.1 83.2zm-127.8-147.4c18.6-22 32-52.7 32-83.4 0-4.2-.3-8.5-1-12.7-30.6 1.2-67.1 20.4-89.5 44.9-18 19.9-34.4 51.3-34.4 82.4 0 4.6.7 9.2 1 10.7 1.9.3 5.1.7 8.3.7 27.8 0 62.1-18.3 83.6-42.6z"/>
                    </svg>
                    Apple Calendar
                  </button>
                  <button onClick={addToOutlookCalendar} className="calendar-option" role="menuitem" aria-label="Aggiungi a Outlook Calendar">
                    {/* Official Microsoft Outlook icon */}
                    <svg className="icon-svg outlook-g" viewBox="0 0 48 48" aria-hidden="true" role="img">
                      <path fill="#1976D2" d="M28 10h14a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H28V10z"/>
                      <path fill="#42A5F5" d="M28 10v28l-4-2V12l4-2z"/>
                      <path fill="#90CAF9" d="M44 22H28v4h16v-4z"/>
                      <path fill="#1976D2" d="M44 16H28v4h16v-4z"/>
                      <path fill="#90CAF9" d="M44 28H28v4h16v-4z"/>
                      <path fill="#42A5F5" d="M44 34H28v4h16v-4z"/>
                      <rect x="4" y="8" width="24" height="32" rx="3" fill="#1565C0"/>
                      <path fill="#fff" d="M16 16c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
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
                aria-label="Apri Google Maps per Ammot"
                style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
              >
                <div className="venue-row">
                  <svg className="icon-svg venue-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="venue-name">Ammot</span>
                </div>
                <p className="venue-note" style={{fontSize: '1.05rem', marginTop: '0.35rem', opacity: 0.85}}>Clicca per raggiungere il locale</p>
              </a>

               <button
                className="link-button photo-link"
                onClick={() => setShowPhoto(!showPhoto)}
                aria-expanded={showPhoto}
                aria-controls="photo-section"
                aria-label="Condividi le tue foto"
              >
                <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 15.2c-2.5 0-4.6-2.1-4.6-4.6S9.5 6 12 6s4.6 2.1 4.6 4.6-2.1 4.6-4.6 4.6zM9 2L7.2 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.2L15 2H9z"/>
                </svg>
                Condividi le tue Foto
              </button>

               {showPhoto && (
                 <div className="iban-section" id="photo-section" style={{background: 'transparent'}}>
                   <p className="iban-label">In aggiornamento...</p>
                 </div>
               )}

               <button 
                className="link-button iban-link"
                onClick={() => setShowIban(!showIban)}
                aria-expanded={showIban}
                aria-controls="iban-section"
                aria-label="Mostra IBAN per il regalo di nozze"
              >
                <svg className="icon-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
                </svg>
                Regalo di nozze
              </button>

               {showIban && (
                 <div className="iban-section" id="iban-section">
                   <p className="iban-label">Destinazione felicità:</p>
                   <p className="iban-label">Il regalo più bello sarà il nostro viaggio di nozze</p>
                   <p className="iban-prefix">IBAN:</p>
                   <p className="iban-code" style={{fontFamily: 'Arial, sans-serif'}}>IT13K0538739840000003548644</p>
                   <p className="iban-note">Intestato a: Paudice Genny & Ornella Annunziata</p>
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
