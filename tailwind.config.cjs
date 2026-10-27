/** @type {import('tailwindcss').Config} */
// Tokens from CLONE_SPEC.md §0. Desktop-first screens mirror the original max-width CSS
// (order matters: larger max-widths first so smaller ones win in the cascade).
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      w18: { max: '1800px' },
      t: { max: '1600px' },
      w15: { max: '1500px' },
      lgm: { max: '990px' },
      m: { max: '768px' },
      dk: { raw: '(min-width: 991px)' },
    },
    extend: {
      colors: {
        ink: '#04191F',
        cream: '#FCF7EF',
        offwhite: '#FFFDFA',
        'pure-white': '#FFFFFF',
        maroon: '#580C1D',
        orange: '#FFC8AE',
        'light-orange': '#FFE7DB',
        'pale-yellow': '#FFF5D4',
        yellow: '#FFE388',
        pink: '#FFC3F0',
        blue: '#B6DBFF',
        lavender: '#C5C5FF',
        green: '#D1E375',
        // connected-products section backgrounds (§0.2)
        'tab-yellow': '#FFF5D4',
        'tab-lavender': '#E8E8FF',
        'tab-pink': '#FFE8FB',
        'tab-green': '#F0F5D5',
        'tab-blue': '#E0F0FF',
        vellum: '#CFC0B0',
        'footer-text': 'rgba(246,243,238,0.8)',
        'warm-white': '#F7F4F0',
        placeholder: 'rgba(0,0,0,0.1)',
        divider: 'rgba(22,19,19,0.376)',
        selection: '#D2FD78',
        glass: 'rgba(246,243,238,0.5)',
        'glass-border': '#FCFBF9',

        // ---- Page-group tokens (specs/pages-*.md global deltas) ----
        // Product hero backgrounds, keyed by colorScheme (pages-product §0.1). Hero text / accent colours
        // reuse the palette above: yellow, tab-lavender|lavender, pink, blue, tab-green|green, light-orange.
        'product-yellow': '#3E2E2C',
        'product-lavender': '#262258',
        'product-pink': '#820049',
        'product-blue': '#123D69',
        'product-green': '#455017',
        'product-maroon': '#87160D',
        // CaseStudyCarousel card (dark) colours, keyed by colourScheme (pages-company §2.8).
        // Accents: blue -> blue, red -> orange, yellow -> yellow, lavender -> lavender, green -> green.
        'case-blue': '#123D69',
        'case-red': '#580C1D',
        'case-yellow': '#3E2E2C',
        'case-lavender': '#262258',
        'case-green': '#455017',
        // ROI page (pages-content §2.5, N13)
        navy: '#123D69',
        'roi-pale': '#E0F0FF',
        'roi-badge-border': '#5A9CE0',
        'roi-quote-line': 'rgba(255,255,255,0.5)',
        'play-white': 'rgba(255,255,255,0.9)',
        // Forms (ContactForm, download/ROI forms)
        'form-border': '#D0D5DD',
        'form-placeholder': '#667085',
        'form-icon': '#6B7280',
        // Content listing / article details
        'tag-border': 'rgba(22,19,19,0.2)',
        'ul-link': 'rgba(22,19,19,0.8)',
        'share-bg': '#ECE6DF',
        backdrop: 'rgba(0,0,0,0.4)',
        'accordion-icon': 'rgba(22,19,19,0.8)',
        // Article Note blocks: bg / icon background / icon (pages-content §3 tokens)
        'note-blue': '#E8E8FF',
        'note-blue-icon-bg': '#C5C5FF',
        'note-blue-icon': '#262258',
        'note-pink': '#FFE8FB',
        'note-pink-icon-bg': '#FFC3F0',
        'note-pink-icon': '#C95699',
        'note-orange': '#FFF0E8',
        'note-orange-icon-bg': '#FFD7C3',
        'note-orange-icon': '#580C1D',
        'note-green': '#FAFFE8',
        'note-green-icon-bg': '#E7F7A3',
        'note-green-icon': '#455017',
      },
      fontFamily: {
        serif: ['"AT Realm Book"', 'Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
        // STIX Two Text italic (pricing testimonials, educators expert list, careers roles)
        stix: ['"STIX Two Text"', 'serif'],
      },
      borderRadius: {
        sheet: '32px',
        card: '12px',
        img: '8px',
        btn: '4px',
        // ROI glass card / photo / badge / icon box, checkbox
        glass: '16px',
        photo: '10px',
        badge: '5px',
        checkbox: '3px',
        icon: '2px',
      },
      boxShadow: {
        card: 'rgba(207,192,176,0.12) 1px 8px 12px 0px',
        bar: 'rgba(209,189,173,0.15) 1px 8px 12px 0px',
        tag: 'rgba(207,192,176,0.36) 0 0 1px, rgba(207,192,176,0.15) 0 1px 3px',
        // Forms: input resting + focus ring (pages-company §5, pages-content N6)
        input: '0 1px 2px rgba(16,24,40,0.05)',
        'input-focus': '0 1px 2px rgba(16,24,40,0.05), 0 0 0 4px rgba(4,25,31,0.08)',
        // ROI page (pages-content N13)
        'roi-image': 'rgba(0,0,0,0.2) 0 4px 20px',
        'glass-lg': 'rgba(207,192,176,0.12) 2px 16px 23px',
        badge: 'rgba(22,19,19,0.3) 0 0 0.28px, rgba(22,19,19,0.15) 0 0.56px 1.69px',
        play: 'rgba(0,0,0,0.15) 0 4px 16px',
      },
      zIndex: {
        2: '2',
        3: '3',
        4: '4',
        10: '10',
        11: '11',
        998: '998',
        999: '999',
      },
      keyframes: {
        scroll: {
          '100%': { transform: 'translate(calc(-25% - 5px))' },
        },
      },
      animation: {
        marquee: 'scroll 100s linear infinite',
      },
    },
  },
  plugins: [],
}
