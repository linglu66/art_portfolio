'use client'

import { useState, useEffect } from 'react'
import photosData from '../../content/birthday-photos.json'

const CATEGORIES = [
  { key: 'exercise_hours', label: 'Hours of Exercise' },
  { key: 'vegetables', label: 'Servings of Vegetables Eaten' },
  { key: 'books', label: 'Books Read' },
  { key: 'paintings', label: 'Paintings Made' },
  { key: 'home_cooked', label: 'Home-Cooked Meals' },
]

function getMemeUrl(slot: number) {
  const ext = slot + 1 === 6 ? 'png' : 'jpg'
  return `/birthday2026/memes/meme_${slot + 1}.${ext}`
}

export default function Birthday2026() {
  const [votes, setVotes] = useState<Record<string, number>>({
    exercise_hours: 0, vegetables: 0, books: 0, paintings: 0, home_cooked: 0,
  })
  const [bumped, setBumped] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/votes').then(r => r.json()).then(setVotes).catch(() => {})
  }, [])

  async function castVote(key: string) {
    setVotes(v => ({ ...v, [key]: (v[key] || 0) + 1 }))
    setBumped(key)
    setTimeout(() => setBumped(null), 300)
    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: key }),
      })
      const updated = await res.json()
      if (!updated.error) setVotes(updated)
    } catch {}
  }

  const photos = [...photosData].reverse()

  return (
    <div style={{
      background: '#008080',
      minHeight: '100vh',
      padding: 8,
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      color: '#000',
      overflow: 'auto',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=IBM+Plex+Mono:wght@400;600;700&display=swap');
        .win-border { border: 2px solid; border-color: #fff #808080 #808080 #fff; background: #c0c0c0; }
        .win-inset { border: 2px solid; border-color: #808080 #fff #fff #808080; }
        .title-bar { background: linear-gradient(90deg, #000080, #1084d0); color: #fff; padding: 2px 4px; font-size: 12px; font-weight: bold; display: flex; align-items: center; justify-content: space-between; }
        .title-btn { width: 16px; height: 14px; background: #c0c0c0; border: 1px solid; border-color: #fff #808080 #808080 #fff; font-size: 9px; display: flex; align-items: center; justify-content: center; }
        .vote-row { display: flex; align-items: center; padding: 8px; cursor: pointer; border: 1px solid transparent; user-select: none; }
        .vote-row:hover { background: #000080; color: #fff; }
        .vote-row:active { background: #0000a0; color: #fff; }
        .gallery-card { border: 2px solid; border-color: #808080 #fff #fff #808080; background: #c0c0c0; }
        @keyframes bump { 0% { transform: scale(1); } 50% { transform: scale(1.4); } 100% { transform: scale(1); } }
        .bumped { animation: bump 0.3s; }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 8, minHeight: 'calc(100vh - 16px)' }}>
        {/* VOTING WINDOW */}
        <div className="win-border" style={{ width: 380, minWidth: 380, display: 'flex', flexDirection: 'column' }}>
          <div className="title-bar">
            <span>GOALS.EXE - before_i_turn_29.txt</span>
            <div style={{ display: 'flex', gap: 2 }}>
              <div className="title-btn">_</div>
              <div className="title-btn">[]</div>
              <div className="title-btn">x</div>
            </div>
          </div>
          <div style={{ background: '#c0c0c0', padding: '2px 4px', fontSize: 12, borderBottom: '1px solid #808080', display: 'flex', gap: 16 }}>
            <span style={{ textDecoration: 'underline' }}>FILE</span>
            <span>OPTIONS</span>
            <span>WINDOW</span>
            <span>HELP</span>
          </div>
          <div className="win-inset" style={{ flex: 1, background: '#fff', margin: 4, padding: 16, overflowY: 'auto', fontSize: 13 }}>
            <pre style={{
              fontFamily: "'VT323', 'Courier New', monospace",
              fontSize: '0.85rem',
              lineHeight: 1.1,
              whiteSpace: 'pre',
              textAlign: 'center',
              marginBottom: 12,
            }}>{`
    *    *    *
   /|\\  /|\\  /|\\
    |    |    |
.-----------.
|  ~  ~  ~  |
| ~ HAPPY ~ |
|  BIRTHDAY |
|  ~  ~  ~  |
|___________|
|_____________|`}</pre>
            <div style={{ fontFamily: "'VT323', monospace", fontSize: '2rem', marginBottom: 4 }}>BEFORE I TURN 29:</div>
            <div style={{ color: '#555', fontSize: 11, marginBottom: 16, borderBottom: '1px dashed #c0c0c0', paddingBottom: 12 }}>&lt;-- click to increment --&gt;</div>
            {CATEGORIES.map((cat, idx) => (
              <div key={cat.key}>
                <div className="vote-row" onClick={() => castVote(cat.key)}>
                  <span style={{ flex: 1, fontSize: 13 }}>{cat.label}</span>
                  <span
                    className={bumped === cat.key ? 'bumped' : ''}
                    style={{ fontFamily: "'VT323', monospace", fontSize: '1.8rem', minWidth: 40, textAlign: 'right' }}
                  >
                    {votes[cat.key] || 0}
                  </span>
                </div>
                {idx < CATEGORIES.length - 1 && <hr style={{ border: 'none', borderTop: '1px dashed #c0c0c0', margin: '2px 0' }} />}
              </div>
            ))}
          </div>
          <div style={{ background: '#c0c0c0', borderTop: '2px solid #808080', padding: '2px 6px', fontSize: 11 }}>
            <span className="win-inset" style={{ padding: '1px 6px', display: 'inline-block' }}>LIVE</span>
          </div>
        </div>

        {/* GALLERY WINDOW */}
        <div className="win-border" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="title-bar">
            <span>GALLERY.EXE - meme_recreations/</span>
            <div style={{ display: 'flex', gap: 2 }}>
              <div className="title-btn">_</div>
              <div className="title-btn">[]</div>
              <div className="title-btn">x</div>
            </div>
          </div>
          <div style={{ background: '#c0c0c0', padding: '2px 4px', fontSize: 12, borderBottom: '1px solid #808080', display: 'flex', gap: 16 }}>
            <span style={{ textDecoration: 'underline' }}>FILE</span>
            <span>VIEW</span>
            <span>SORT</span>
            <span>HELP</span>
          </div>
          <div className="win-inset" style={{ flex: 1, background: '#fff', margin: 4, overflowY: 'auto', padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #c0c0c0', fontSize: 12 }}>
              <span>C:\photos\meme_booth\</span>
              <span style={{ color: '#808080' }}>{photos.length} file(s)</span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 12,
              alignContent: 'start',
            }}>
              {photos.map(photo => (
                <div key={photo.id} className="gallery-card">
                  <div style={{ display: 'flex', height: 180, borderBottom: '1px solid #808080' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getMemeUrl(photo.memeSlot)}
                      alt={`Meme ${photo.memeSlot + 1}`}
                      style={{ width: '50%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/birthday2026/photos/${photo.filename}`}
                      alt="Recreation"
                      style={{ width: '50%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', borderLeft: '1px solid #808080' }}
                    />
                  </div>
                  <div style={{ padding: '4px 8px', fontSize: 11, display: 'flex', justifyContent: 'space-between' }}>
                    <span>meme_{photo.memeSlot + 1}{photo.memeSlot + 1 === 6 ? '.png' : '.jpg'}</span>
                    <span style={{ color: '#808080' }}>{photo.filename}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#c0c0c0', borderTop: '2px solid #808080', padding: '2px 6px', fontSize: 11 }}>
            <span className="win-inset" style={{ padding: '1px 6px', display: 'inline-block' }}>{photos.length} PHOTOS</span>
          </div>
        </div>
      </div>
    </div>
  )
}
