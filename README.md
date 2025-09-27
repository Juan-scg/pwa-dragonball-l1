# PWA L1 — Dragon Ball (API)

Aplicación Web Progresiva de nivel L1 que consume la **Dragon Ball API** para listar personajes con búsqueda simple.

## Requisitos cumplidos (según PDF de PWA)
- **Manifiesto** (`manifest.webmanifest`) enlazado desde `index.html` con `name`, `short_name`, `start_url`, `display`, `theme_color`, `background_color`, `icons`.
- **Service Worker** (`sw.js`) con caché de recursos estáticos y control básico de red.
- **Registro del SW** en `app.js`.
- **Instalable** y con recursos estáticos offline.
- **Consumo de API externa** con `fetch` a `https://dragonball-api.com/api/characters` (paginación simple y filtro por nombre).
- **Cambios de estilo**: tipografía, colores, fondo, tarjetas y diseño responsivo sencillo.

## Estructura
```
pwa-dragonball-l1/
  index.html
  styles.css
  app.js
  sw.js
  manifest.webmanifest
  icons/
    icon-192.png
    icon-512.png
  README.md
```

## Ejecutar localmente
1. Descomprime el ZIP.
2. Arranca un servidor simple (por ejemplo):
   ```bash
   python -m http.server 5173
   ```
3. Abre `http://localhost:5173` y prueba búsqueda y paginación.

## Publicar
- GitHub Pages: `Settings > Pages > Deploy from a branch > main > /(root)`.
- Alternativa rápida: Netlify Drop (arrastra la carpeta).

## Fuente de datos
- Dragon Ball API: https://web.dragonball-api.com/ — Documentación Swagger: https://dragonball-api.com/api-docs
