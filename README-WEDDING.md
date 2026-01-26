# 💍 Partecipazione Matrimonio - Wedding Invitation

Sito web interattivo per la partecipazione al matrimonio con tema marino e sabbia.

## ✨ Caratteristiche

- 📬 Effetto di apertura del biglietto interattivo
- 🏖️ Sfondo con texture sabbia
- 🐚 Decorazioni marine stilizzate in blu
- 📍 Link al locale su Google Maps
- 💳 Sezione IBAN per lista nozze
- 📸 Link per condivisione foto

## 🚀 Come Utilizzare

### Prerequisiti

**IMPORTANTE**: Questo progetto richiede Node.js versione **20.19+** o **22.12+**

Verifica la tua versione di Node.js:
```bash
node --version
```

Se hai una versione più vecchia, aggiorna Node.js da [nodejs.org](https://nodejs.org)

### Installazione

```bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

Il sito sarà disponibile su `http://localhost:5173`

### Build per Produzione

```bash
npm run build
```

## ⚙️ Personalizzazione

Modifica il file `src/App.tsx` per personalizzare:

1. **Nomi degli sposi**: Sostituisci `[Nome Sposo]` e `[Nome Sposa]`
2. **Data del matrimonio**: Sostituisci `[Giorno] [Mese] [Anno]`
3. **Link Google Maps**: Modifica l'URL con l'indirizzo del locale
4. **IBAN**: Inserisci il tuo IBAN nella sezione dedicata
5. **Link foto**: Aggiorna il link per la condivisione foto (es. Google Photos, iCloud, ecc.)

Esempio:
```tsx
<h3>Marco</h3>
<span className="heart">&</span>
<h3>Laura</h3>

<p className="date">15 Giugno 2026</p>

<a href="https://maps.google.com/?q=Villa+Romantica+Via+Roma+1+Milano">
```

## 🎨 Personalizzazione Stile

Modifica `src/App.css` per cambiare:

- **Colori**: Cambia `#4A90E2` (blu) con il tuo colore preferito
- **Sfondo sabbia**: Modifica `#f5f0e8` in `background-color`
- **Decorazioni**: Aggiungi o rimuovi elementi SVG per le conchiglie

## 📱 Responsive

Il sito è completamente responsive e ottimizzato per:
- 📱 Mobile
- 📱 Tablet
- 💻 Desktop

## 🛠️ Tecnologie

- ⚛️ React 19
- 📘 TypeScript
- ⚡ Vite
- 🎨 CSS3

## 📝 Note

- Assicurati di testare tutti i link prima di condividere
- Aggiorna l'IBAN con attenzione
- Prova l'animazione di apertura su diversi dispositivi

---

Creato con ❤️ per il tuo giorno speciale
