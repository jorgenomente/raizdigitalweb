# Agent Handbook

## 1. Misión y estado actual
- Landing bilingüe para **Cosmic Studio / Raíz Digital** sobre Next.js 15 (App Router) + React 19. Todo el copy y los CTAs viven en `src/lib/i18n/dictionaries.ts`, por lo que diseño y contenido viajan juntos.
- Dos idiomas soportados (`es`, `en`) con redirección automática vía `src/middleware.ts`. Todos los paths comienzan con `/[locale]`.
- El layout público está montado en `src/components/page-client.tsx`; cada sección (hero, manifesto, services, projects, team, contact) es un componente client-side que usa `TranslationProvider`.
- Objetivo del repo: tener un template de marketing/servicios con alto polish visual (Tailwind, animaciones con Framer Motion) listo para iterar features o duplicar para clientes.

## 2. Cómo correr el proyecto
- Requisitos: Node 18+ (ideal 20 LTS), npm/pnpm/yarn. Instala dependencias con `npm i` o corre `scripts/setup.sh` para instalación + commit inicial.
- Comandos útiles (`package.json`):
  - `npm run dev`: servidor local en `http://localhost:3000`.
  - `npm run build` / `npm run start`: build + servidor de producción.
  - `npm run lint`: ESLint (config Next 15).
  - `npm run format`: Prettier sobre todo el repo.
  - `npm run analyze`: build con `ANALYZE=true` para inspeccionar bundles.
- No hay dependencias globales especiales; Tailwind 4 está habilitado mediante `@import "tailwindcss";` en `src/app/globals.css`.

## 3. Anatomía del repositorio
- `src/app/[locale]/page.tsx`: page server component que obtiene el diccionario correcto y delega en `PageClient`.
- `src/components/page-client.tsx`: arma la navegación sticky, inyecta `TranslationProvider`, renderiza secciones.
- `src/components/sections/*`: secciones autónomas (todas declaradas `use client`):
  - `hero.tsx`, `manifesto.tsx`, `projects.tsx`, `team.tsx`, `contact-section.tsx`, `services-grid.tsx`.
  - Cada sección toma copy llamando a `useDictionary()`.
- `src/components/ui/*`: wrappers estilo shadcn (Radix + Tailwind) reutilizables.
- `src/lib/i18n/*`: definición de locales, tipos, helper `ensureLocale`, diccionarios.
- `src/lib/motion-preferences.ts`: hook que combina `prefers-reduced-motion`, detección Safari y `pointer: coarse` para reducir animaciones cuando conviene.
- `public/`: assets (logos, design kit exportado de Figma).
- `scripts/setup.sh`: bootstrap rápido (elige pnpm/yarn/npm y deja un commit base).

## 4. i18n y routing
- **Locales**: definidos como literal tuple en `src/lib/i18n/dictionaries.ts` (`const locales = ["es", "en"] as const;`). Agregar idioma = añadir la sigla al array, extender `Dictionary`, completar objeto `dictionaries`.
- **Middleware** (`src/middleware.ts`): intercepta cualquier request sin prefijo e intenta detectar idioma via `Accept-Language`. Nunca toques `matcher` a menos que cambie la estructura de rutas.
- **Links**: usa `LanguageSwitcher` para alternar path sin perder el resto de segmentos. Si creas rutas nuevas dentro de `[locale]`, asegura que el primer segmento siga siendo el locale y que `generateStaticParams` contemple la ruta.
- **Contenido**: cualquier copy/CTA/placeholder/nombre de social debe salir del diccionario; evita strings hardcodeados para mantener paridad entre idiomas.

## 5. Sistema visual y animaciones
- **Tailwind v4 + CSS custom properties**: tokens declarados en `src/app/globals.css` (`@theme`, `:root`, `.dark`). Mantén las variables oklch y utiliza utilidades `@custom-variant dark` para estados dark mode cuando sea necesario.
- **Animaciones**:
  - Secciones usan `framer-motion` (`motion.div`, `whileInView`) y el hook `useMotionPreferences`.
  - `useMotionPreferences` obliga a degradar animaciones en Safari y dispositivos touch (para performance). Cuando agregues animaciones, pásales `allowMotion`/`shouldReduceMotion` para decidir qué renderizar.
  - `services-grid` tiene partículas SVG animadas; respeta el patrón existente (fallback estático si `allowMotion` es falso).
- **Componentes UI**: los archivos de `src/components/ui` encapsulan primitivas Radix (accordion, dialog, dropdown, navigation menu). Reutilízalos para mantener accesibilidad y estilos consistentes.

## 6. Integraciones y comportamientos clave
- **Contact CTA** (`contact-section.tsx`):
  - Utiliza `window.open` a WhatsApp (`https://wa.me/5491171139469`), agregando mensaje + nombre si se completan inputs.
  - Si cambias el número o mensaje base, hazlo en el diccionario (`contact.defaultMessage` y `contact.socials`).
- **Language Switcher**: depende de `useDictionary` para labels y genera hrefs reemplazando el primer segmento del path. No montar fuera de `TranslationProvider`.
- **Media assets**: el header usa `public/isologotipo blanco.png`. Si cambias naming, ajusta el import en `page-client.tsx`.

## 7. Flujo de desarrollo recomendado
- Trabaja por feature branches, corre `npm run lint` antes de abrir PR.
- Para experimentos visuales pesados, valida en dispositivos touch (ver `useMotionPreferences`) y revisa CLS/scroll suave (habilitado globalmente).
- Cuando sumes secciones:
  1. Crear componente bajo `src/components/sections`.
  2. Añadir copy correspondiente al diccionario (todos los idiomas).
  3. Registrar el `SectionId` en `src/lib/i18n/dictionaries.ts` y agregar enlace en el array `navItems` de `page-client.tsx`.
- Si necesitas datos dinámicos, encapsula la lógica en server components dentro de `[locale]` y pasa props serializables a los clientes; evita fetch directo en client components para no duplicar llamadas por idioma.

## 8. Checklist rápida para contribuciones nuevas
1. **Contenido listo en ambos idiomas** (o deja un TODO explícito).
2. **Respetar tokens de diseño**: usa colores definidos (`--soft-magenta`, `--neural-cyan`, etc.) desde Tailwind (`text-[var(--soft-magenta)]`) en vez de hex libres.
3. **Animaciones degradables**: consulta `useMotionPreferences` antes de introducir FX intensivos.
4. **Accesibilidad**: Radix + atributos `aria` como en `LanguageSwitcher`; mantén `focus-visible` estilos.
5. **QA manual**: prueba `npm run lint`, `npm run build`, y chequea ambos locales en desktop + mobile simulando preferencia “reduce motion”.

Este archivo debería bastar para que cualquier agente/desarrollador entienda el contexto del repo, el set de herramientas y cómo extenderlo sin romper la experiencia bilingüe ni la estética animada. Si algo cambia (nuevas secciones, libs, scripts), actualiza aquí primero.
