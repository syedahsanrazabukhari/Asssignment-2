"use client"
import React, { useEffect } from 'react'

export default function GalleryPage() {
  useEffect(() => {
    // mark body with gallery class so gallery-specific body styles apply
    document.body.classList.add('gallery')

    function createStars() {
      const starsContainer = document.querySelector('.stars')
      if (!starsContainer) return
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        const size = Math.random() * 3
        star.style.width = size + 'px'
        star.style.height = size + 'px'
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        star.style.animationDelay = Math.random() * 2 + 's'
        starsContainer.appendChild(star)
      }
    }

    function createFloatingHearts() {
      const heartsContainer = document.querySelector('.floating-hearts')
      if (!heartsContainer) return
      const heartSymbols = ['♥', '❤', '💕', '💖', '💗']
      for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div')
        heart.className = 'heart'
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)]
        heart.style.left = Math.random() * 100 + '%'
        heart.style.animationDuration = 15 + Math.random() * 15 + 's'
        heart.style.animationDelay = Math.random() * 5 + 's'
        heart.style.fontSize = 10 + Math.random() * 20 + 'px'
        heart.style.opacity = String(0.5 + Math.random() * 0.5)
        heart.style.color = `rgba(255, ${Math.floor(100 + Math.random() * 100)}, ${Math.floor(100 + Math.random() * 100)}, ${0.5 + Math.random() * 0.5})`
        heartsContainer.appendChild(heart)
      }
    }

    // create gallery elements
    function createGallery() {
      const gallery = document.querySelector('.gallery')
      if (!gallery) return
      const totalCards = 10
      // scale radius based on container width so the carousel centers inside the max-width
      const containerWidth = Math.min(window.innerWidth, 1100)
      const radius = window.innerWidth < 768 ? 260 : Math.max(260, containerWidth * 0.35)
      let currentAngle = 0
      let isDragging = false
      let startX = 0
      let currentX = 0
      let autoRotateInterval: any

      const prevButton = document.querySelector('.nav-button.prev')
      const nextButton = document.querySelector('.nav-button.next')

      const imageUrls = [
        '/pic1.jpg','/pic2.jpg','/pic3.jpg','/pic4.jpg','/pic5.jpg','/pic6.jpg','/pic7.jpg','/pic8.jpg','/pic9.jpg','/pic5.jpg'
      ]

      for (let i = 0; i < totalCards; i++) {
        const card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `\n                    <img src="${imageUrls[i]}" alt="Memories ${i + 1}">\n                    <div class="number">${i + 1}</div>\n                `
        // position each card's origin at the center of the gallery so translate3d offsets are centered
        card.style.left = '50%'
        card.style.top = '50%'
        gallery.appendChild(card)
      }

      function updateCards(extraRotation = 0) {
        const cards = document.querySelectorAll('.card')
        cards.forEach((card, index) => {
          const angle = (currentAngle + extraRotation + (index * (360 / totalCards))) * (Math.PI / 180)
          const x = Math.sin(angle) * radius
          const z = Math.cos(angle) * radius
          const rotateY = angle * (180 / Math.PI)
          const rawAngle = (currentAngle + extraRotation + (index * (360 / totalCards)))
          const normalizedAngle = ((rawAngle % 360) + 360) % 360
          const distToFront = Math.min(Math.abs(normalizedAngle - 0), Math.abs(normalizedAngle - 360))
          const isSmall = window.innerWidth < 768
          const isFront = (normalizedAngle > 350 || normalizedAngle < 10) && !isSmall
          let scaleVal
          let zOffset = 0
          if (isSmall) { scaleVal = 1; zOffset = 0 } else { scaleVal = isFront ? 1.09 : 1 - (distToFront / 900); zOffset = isFront ? 100 : 0 }
          // translate3d moves the card relative to its center (we set left/top=50%),
          // then we translate -50%,-50% so the card's center aligns correctly.
          ;(card as HTMLElement).style.transform = `translate3d(${x}px, 0, ${z + zOffset}px) rotateY(${rotateY}deg) scale(${scaleVal}) translate(-50%,-50%)`
          if (isFront) card.classList.add('active'); else card.classList.remove('active')
          // Avoid calling Math.max directly in case runtime has it shadowed; use a safe clamp.
          let opacity = isSmall ? 1 : 1 - (distToFront / 240)
          if (!isSmall && opacity < 0.30) { opacity = 0.30 }
          const elCard = card as HTMLElement
          elCard.style.opacity = opacity.toFixed(3)
        })
      }

      function startAutoRotate() {
        clearInterval(autoRotateInterval)
        autoRotateInterval = setInterval(() => { currentAngle -= 0.3; updateCards() }, 100)
      }

      function rotateGallery(direction: number) {
        clearInterval(autoRotateInterval)
        currentAngle += direction * 36
        updateCards()
        setTimeout(() => { if (!isDragging) startAutoRotate() }, 5000)
      }

      prevButton?.addEventListener('click', () => rotateGallery(-1))
      nextButton?.addEventListener('click', () => rotateGallery(1))

      gallery.addEventListener('mousedown', (e) => {
        isDragging = true; startX = (e as MouseEvent).clientX; currentX = currentAngle; clearInterval(autoRotateInterval); (gallery as HTMLElement).style.cursor = 'grabbing'
      })

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return
        const diff = ((e as MouseEvent).clientX - startX) * 0.5
        currentAngle = currentX - diff
        updateCards()
      })

      window.addEventListener('mouseup', () => { isDragging = false; (gallery as HTMLElement).style.cursor = 'grab'; setTimeout(() => { if (!isDragging) startAutoRotate() }, 3000) })

      // touch events
      gallery.addEventListener('touchstart', (e) => {
        isDragging = true; startX = (e as TouchEvent).touches[0].clientX; currentX = currentAngle; clearInterval(autoRotateInterval)
      })
      window.addEventListener('touchmove', (e) => {
        if (!isDragging) return
        const diff = ((e as TouchEvent).touches[0].clientX - startX) * 0.5
        currentAngle = currentX - diff; updateCards()
      }, { passive: false })
      window.addEventListener('touchend', () => { isDragging = false; setTimeout(() => { if (!isDragging) startAutoRotate() }, 3000) })

      updateCards()
      startAutoRotate()
    }

    createStars(); createFloatingHearts(); createGallery()

    // Move spotlight with mouse
    function handleMouse(e: MouseEvent) {
      const spotlight = document.querySelector('.spotlight') as HTMLElement
      if (!spotlight) return
      spotlight.style.left = e.clientX + 'px'
      spotlight.style.top = e.clientY + 'px'
    }
    document.addEventListener('mousemove', handleMouse)

    // Music controls (same logic as original)
    let musicStarted = false
    function startMusic() {
      const bgMusic = document.getElementById('bgMusic') as HTMLAudioElement | null
      if (!bgMusic) return
      if (!bgMusic.paused) { musicStarted = true; return }
      bgMusic.volume = 0.5
      const p: any = bgMusic.play()
      if (p && typeof p.then === 'function') {
        p.then(() => { musicStarted = true; updateMusicButton(true) }).catch(() => updateMusicButton(false))
      } else { musicStarted = true; updateMusicButton(true) }
    }
    function pauseMusic() { const bgMusic = document.getElementById('bgMusic') as HTMLAudioElement | null; if (!bgMusic) return; bgMusic.pause(); musicStarted = false; updateMusicButton(false) }
    function toggleMusic() { const bgMusic = document.getElementById('bgMusic') as HTMLAudioElement | null; if (!bgMusic) return; if (bgMusic.paused) startMusic(); else pauseMusic() }
    function updateMusicButton(isPlaying: boolean) { const btn = document.getElementById('musicToggle'); if (!btn) return; btn.textContent = isPlaying ? 'Pause' : 'Play' }

    // Try to auto-play if requested
    document.addEventListener('DOMContentLoaded', () => {
      const params = new URLSearchParams(window.location.search)
      const wantPlay = params.get('play') === '1' || localStorage.getItem('playMusicRequested') === '1'
      if (wantPlay) { startMusic(); try { localStorage.removeItem('playMusicRequested') } catch (e) {} }
      const musicBtn = document.getElementById('musicToggle')
      if (musicBtn) musicBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleMusic() })
    })

    // fallback one-time listeners
    document.body.addEventListener('click', startMusic, { once: true } as any)
    document.body.addEventListener('touchstart', startMusic, { once: true } as any)

    return () => {
      document.body.classList.remove('gallery')
      document.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <main>
      <div className="title-container">
        <h1 className="title">A Small gift for U</h1>
        <p className="subtitle" />
        <button id="musicToggle" aria-label="Play or pause music" style={{ zIndex: 1100, padding: '8px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.6)', color: 'white', cursor: 'pointer' }}>Play</button>
      </div>

      <div className="ambient-light" />
      <div className="spotlight" />
      <div className="stars" />
      <div className="floating-hearts" />
      {/* nav buttons will be rendered inside the gallery container so they center with it */}

      <div className="gallery-container">
        <div className="gallery-wrap">
          <div className="gallery">
            <div className="center-heart">
              <img src="/hurt.png" alt="Heart for Mom" />
            </div>
          </div>
        </div>
        <button className="nav-button prev" aria-label="Previous" />
        <button className="nav-button next" aria-label="Next" />
      </div>

      <audio id="bgMusic" loop>
        <source src="/romantic2.mp3" type="audio/mpeg" />
      </audio>
    </main>
  )
}
