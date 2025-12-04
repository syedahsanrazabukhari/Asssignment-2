# Asssignment-2

Converted to a Next.js app (scaffolded).

Next steps:

- Run `npm install` in the project root to install dependencies.
- Run `npm run dev` to start the Next.js dev server.

Notes:

- I moved internal CSS into `app/globals.css` and created `app/page.tsx` (index) and `app/gallery/page.tsx`.
- I removed the original `index.html` and `gallery.html` from the root. The original markup and inline JS were preserved and ported into the Next.js pages.
- Your images/audio referenced in the HTML (for example `hurt.png`, `pic1.jpg`, `romantic2.mp3`, etc.) should be placed into the `public` folder so they are served correctly. If you want, I can add placeholder images/audio next.
