import { useState } from 'react'
import './App.css'
import beachBackground from './assets/beach-background.jpg'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showIban, setShowIban] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <div className="container" style={{ backgroundImage: `url(${beachBackground})` }}>
      <div className="card-wrapper">
        {/* Biglietto di invito */}
        <div className={`invitation-card ${isOpen ? 'open' : ''}`}>
          <div className="card-front" onClick={handleOpen} style={{ backgroundImage: `url(${beachBackground})` }}>
            <h1 className="front-title">Sei Invitat{isOpen ? 'o' : 'o'}</h1>
            <p className="front-subtitle">Clicca per aprire</p>
          </div>
          
          <div className="card-inside" style={{ backgroundImage: `url(${beachBackground})` }}>
          <div className="card-content">
            <h2 className="welcome-message">Con grande gioia</h2>
            <p className="subtitle">vi invitiamo a celebrare con noi</p>
            
            <div className="couple-names">
              <h3>[Nome Sposo]</h3>
              <span className="heart">&</span>
              <h3>[Nome Sposa]</h3>
            </div>
            
            <div className="wedding-date">
              <p className="date-label">Il giorno</p>
              <p className="date">[Giorno] [Mese] [Anno]</p>
            </div>

            <div className="links-section">
              <a 
                href="https://maps.google.com/?q=VIA+ESEMPIO+LOCALITÀ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-button venue-link"
              >
                📍 Visualizza il Locale
              </a>

              <button 
                className="link-button iban-link"
                onClick={() => setShowIban(!showIban)}
              >
                💳 Lista Nozze
              </button>

              {showIban && (
                <div className="iban-section">
                  <p className="iban-label">IBAN per Lista Nozze:</p>
                  <p className="iban-code">IT00 X000 0000 0000 0000 0000 000</p>
                  <p className="iban-note">Intestato a: [Nome Cognome]</p>
                </div>
              )}

              <a 
                href="https://www.icloud.com/sharedalbum/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-button photo-link"
              >
                📸 Condividi le tue Foto
              </a>
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
