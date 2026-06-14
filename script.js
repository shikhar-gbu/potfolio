// Update Copyright Year
const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = new Date().getFullYear()

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle')
const root = document.documentElement

// Default to dark theme if not set
const savedTheme = localStorage.getItem('theme') || 'dark'
root.setAttribute('data-theme', savedTheme)

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
    root.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  })
}

// Reveal Elements on Scroll
const revealEls = document.querySelectorAll('.reveal')
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { 
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
})
revealEls.forEach(el => observer.observe(el))

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1)
    const target = document.getElementById(id)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      // Update active state in nav
      document.querySelectorAll('.nav a').forEach(navLink => {
        navLink.classList.remove('active')
      })
      if (link.classList.contains('nav-link')) {
        link.classList.add('active')
      }
    }
  })
})

// Certificate Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn')
const certCards = document.querySelectorAll('.cert-card')

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(b => b.classList.remove('active'))
    // Add active class to clicked button
    btn.classList.add('active')

    const filterValue = btn.getAttribute('data-filter')

    certCards.forEach(card => {
      const category = card.getAttribute('data-category')
      if (filterValue === 'all' || category === filterValue) {
        card.classList.remove('hidden')
        // Trigger small fade-in animation trigger
        card.style.opacity = '0'
        card.style.transform = 'scale(0.95)'
        setTimeout(() => {
          card.style.opacity = '1'
          card.style.transform = 'scale(1)'
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
        }, 30)
      } else {
        card.classList.add('hidden')
      }
    })
  })
})

// Lightbox Logic for Certificates
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightbox-img')
const lightboxTitle = document.getElementById('lightbox-title')
const lightboxDesc = document.getElementById('lightbox-desc')
const lightboxDownload = document.getElementById('lightbox-download')
const lightboxClose = document.querySelector('.lightbox-close')
const certImageWrappers = document.querySelectorAll('.cert-image-wrapper')

function openLightbox(card) {
  const img = card.querySelector('img')
  const title = card.querySelector('h4').textContent
  const issuer = card.querySelector('.cert-issuer').textContent
  const category = card.querySelector('.cert-badge').textContent
  
  if (lightboxImg && img) {
    lightboxImg.src = img.src
    lightboxImg.alt = img.alt
  }
  if (lightboxTitle) lightboxTitle.textContent = title
  if (lightboxDesc) lightboxDesc.textContent = `${category} • Issued by ${issuer}`
  if (lightboxDownload && img) {
    lightboxDownload.href = img.src
    // Keep file name clean for download
    lightboxDownload.setAttribute('download', img.src.split('/').pop())
  }
  
  if (lightbox) {
    lightbox.setAttribute('aria-hidden', 'false')
  }
}

function closeLightbox() {
  if (lightbox) {
    lightbox.setAttribute('aria-hidden', 'true')
  }
}

// Attach click listeners to certificate cards
certCards.forEach(card => {
  const wrapper = card.querySelector('.cert-image-wrapper')
  if (wrapper) {
    wrapper.addEventListener('click', () => openLightbox(card))
  }
})

// Close Lightbox on Close Button click
if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox)
}

// Close Lightbox when clicking outside the content (on the backdrop)
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })
}

// Close Lightbox on Escape Key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox()
  }
})