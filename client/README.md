# WanderLust — Travel & Tour Agency Website

A fully componentized front-end clone of the WanderLust travel agency design,
built with **React + Vite + Tailwind CSS v4 + DaisyUI**.

## Tech Stack
- **React 19** — UI library
- **Vite** — dev server & build tool
- **Tailwind CSS v4** — utility-first styling
- **DaisyUI** — Tailwind component classes (buttons, cards, inputs, navbar...)
- **React Router v7** — client-side page navigation
- **React Icons** — icon set (Feather icons)

## Project Structure

```
wanderlust/
├── index.html                # HTML entry, fonts loaded here
├── src/
│   ├── main.jsx               # React root + Router setup
│   ├── App.jsx                # All page routes defined here
│   ├── index.css              # Tailwind + DaisyUI theme (colors, fonts)
│   ├── components/            # Small reusable UI pieces
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PageHeader.jsx     # banner used on every inner page
│   │   ├── Hero.jsx           # big banner on Home page only
│   │   ├── Newsletter.jsx
│   │   ├── ServiceCard.jsx / ServicesSection.jsx
│   │   ├── PackageCard.jsx / PackagesSection.jsx
│   │   ├── GuideCard.jsx / GuidesSection.jsx
│   │   ├── TestimonialCard.jsx / TestimonialsSection.jsx
│   │   ├── BlogCard.jsx / BlogSection.jsx
│   │   ├── BookingForm.jsx
│   │   ├── ContactForm.jsx
│   │   └── AboutPreview.jsx
│   ├── data/                  # Plain JS "fake database" arrays
│   │   ├── services.js
│   │   ├── packages.js
│   │   ├── guides.js
│   │   ├── testimonials.js
│   │   └── blogs.js
│   └── pages/                 # One file per route, composed from components
│       ├── Home.jsx           # /
│       ├── About.jsx          # /about
│       ├── Services.jsx       # /services
│       ├── Package.jsx        # /package
│       ├── Packages.jsx       # /packages
│       ├── PackageDetail.jsx  # /packages/:id
│       ├── Blog.jsx           # /blog
│       └── Contact.jsx        # /contact
```

**How it fits together:** `data/` holds the content → `components/` render
that content as small, reusable pieces (a card, a form, a section) →
`pages/` import and stack those components in the right order for each
route → `App.jsx` maps URLs to pages → `main.jsx` boots React and the router.

## Run it locally (for your demo)

You need **Node.js 18+** installed. Then, inside this folder:

```bash
# 1. Install dependencies (only needed once)
npm install

# 2. Start the development server
npm run dev
```

Vite will print a local URL, usually:

```
➜  Local:   http://localhost:5173/
```

Open that link in your browser. The site supports hot-reload — any code
change updates instantly.

## Build for production

```bash
npm run build     # outputs static files into dist/
npm run preview   # serve the production build locally to double check it
```

The `dist/` folder can be uploaded to any static host (Netlify, Vercel,
GitHub Pages, etc.) or shown directly to your teacher via `npm run preview`.

## Pages included

| Route            | Page                                            |
|-------------------|--------------------------------------------------|
| `/`               | Home — hero, about, services, packages, booking, guides, blog, testimonials, newsletter |
| `/about`          | About Us — team intro + guides                   |
| `/services`       | Our Services + testimonials                       |
| `/package`        | Package grid + booking form                        |
| `/packages`       | All packages grid                                   |
| `/packages/:id`   | Package detail (image, description, sidebar: search, details, recent packages, tags) |
| `/blog`           | Travel blog grid                                     |
| `/contact`        | Contact info, embedded map, message form               |

## Notes
- All images are pulled from Unsplash/RandomUser placeholder URLs — swap the
  URLs in `src/data/*.js` for your own images any time.
- Colors, fonts and border radius are defined once in `src/index.css` under
  the `wanderlust` DaisyUI theme — change them there to re-theme the whole site.
