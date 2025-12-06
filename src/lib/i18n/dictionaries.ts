export const locales = ["es", "en"] as const;
export const defaultLocale = "es" as const;
export type Locale = (typeof locales)[number];

export type SectionId =
  | "hero"
  | "manifesto"
  | "services"
  | "projects"
  | "team"
  | "contact";
export type ServiceId = "landing" | "strategy" | "webDesign" | "systems";
export const serviceIds: ServiceId[] = ["landing", "strategy", "webDesign", "systems"];
export type ProjectId = "gestock" | "pew" | "miproveedor" | "tiendix";
export type TeamMemberId = "jorge" | "paola" | "samira";

export type Dictionary = {
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  languageSwitcher: {
    label: string;
    languages: Record<Locale, { label: string; short: string }>;
  };
  navigation: Record<SectionId, string>;
  hero: {
    title: string;
    highlight: string;
    description: string;
    cta: string;
  };
  manifesto: {
    tagline: string;
    headline: string;
    description: string;
    idealForHeading: string;
    idealForList: string[];
  };
  services: {
    heading: string;
    description: string;
    scrollHint: string;
    viewMore: string;
    keyBenefitLabel: string;
    detailPage: {
      backToServices: string;
      highlights: {
        duration: string;
        investment: string;
      };
      sectionIntroLabel?: string;
      outcomesTitle: string;
      processTitle: string;
      deliverablesTitle: string;
      audienceTitle: string;
      examplesTitle: string;
      englishVersionTitle: string;
      instagramTitle: string;
      pitchTitle: string;
      ctaTitle: string;
      ctaSubtitle: string;
      contactCta: string;
    };
    items: Record<
      ServiceId,
      {
        title: string;
        description: string;
        benefit: string;
        estimatedTime?: string;
        startingPrice?: string;
      }
    >;
    details: Record<
      ServiceId,
      {
        eyebrow: string;
        intro: string;
        outcomes: string[];
        steps: { title: string; description: string }[];
        deliverables: string[];
        ctaNote: string;
        whatsappMessage: string;
        audience?: string[];
        examples?: { title: string; description: string }[];
        englishVersion?: { title: string; intro?: string; bullets: string[] };
        instagramSlides?: { title: string; bullets: string[] }[];
        pitch?: string;
      }
    >;
  };
  projects: {
    heading: string;
    description: string;
    viewCase: string;
    progressLabel: string;
    items: Record<
      ProjectId,
      {
        title: string;
        subtitle: string;
        tags: string[];
      }
    >;
  };
  team: {
    heading: string;
    description: string;
    members: Record<TeamMemberId, {
      role: string;
      description: string;
    }>;
  };
  contact: {
    titleBeforeHighlight: string;
    titleHighlight: string;
    titleAfterHighlight: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    messageLabel: string;
    defaultMessage: string;
    buttonLabel: string;
    contactLine: string;
    socials: { label: string; href: string }[];
    footerNote: string;
    systemStatus: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  es: {
    metadata: {
      title: "Cosmic Studio — Experiencias digitales",
      description:
        "Cosmic Studio crea experiencias, identidades y productos digitales que combinan estrategia, diseño y tecnología para impulsar resultados reales.",
      ogTitle: "Cosmic Studio — Experiencias digitales bilingües",
      ogDescription:
        "Trabajamos junto a emprendedores, tiendas físicas y distribuidores que quieren dejar atrás las planillas y el caos en WhatsApp.",
    },
    languageSwitcher: {
      label: "Idioma",
      languages: {
        es: { label: "Español", short: "ES" },
        en: { label: "Inglés", short: "EN" },
      },
    },
    navigation: {
      hero: "Inicio",
      manifesto: "Manifiesto",
      services: "Servicios",
      projects: "Proyectos",
      team: "Equipo",
      contact: "Contacto",
    },
    hero: {
      title: "Sistemas digitales que conectan",
      highlight: "estrategia, diseño y tecnología.",
      description:
        "Trabajamos junto a emprendedores, tiendas físicas y distribuidores que quieren dejar atrás las planillas y el caos en WhatsApp.",
      cta: "Explorar servicios",
    },
    manifesto: {
      tagline: "Diseño que conecta + sistemas que ordenan",
      headline:
        "Acompañamos a emprendedores y empresas en crecimiento que quieren modernizar su forma de operar.",
      description:
        "Transformamos procesos manuales en sistemas digitales claros y confiables que impulsan decisiones, eficiencia y crecimiento real.",
      idealForHeading: "Ideal para negocios que:",
      idealForList: [
        "Toman pedidos por WhatsApp o cuadernos",
        "Demasiada carga laboral",
        "No controlan stock o vencimientos",
        "Pierden tiempo con tareas manuales",
        "Necesitan información confiable para tomar decisiones",
        "Desean crecer con orden y dirección",
      ],
    },
    services: {
      heading: "Servicios",
      description:
        "Unimos diseño, automatización y estrategia para que cada punto de contacto digital se sienta consistente, humano y listo para crecer.",
      scrollHint: "Deslizá para descubrir cómo trabajamos",
      viewMore: "Ver más",
      keyBenefitLabel: "Ideal para",
      detailPage: {
        backToServices: "Volver a servicios",
        highlights: {
          duration: "Entrega estimada",
          investment: "Inversión desde",
        },
        sectionIntroLabel: "Descripción principal",
        outcomesTitle: "Qué vas a lograr",
        processTitle: "Cómo lo trabajamos",
        deliverablesTitle: "Entregables",
        audienceTitle: "Para quién es",
        examplesTitle: "Ejemplos reales",
        englishVersionTitle: "Versión en inglés",
        instagramTitle: "Versión corta para IG",
        pitchTitle: "Pitch rápido",
        ctaTitle: "Listo para empezar",
        ctaSubtitle: "Escribinos y te compartimos una propuesta rápida con el camino recomendado.",
        contactCta: "Hablemos por WhatsApp",
      },
      items: {
        landing: {
          title: "Web de Presentación Premium",
          description:
            "Páginas claras, modernas y pensadas para convertir. Creamos una landing profesional que comunique mejor tu propuesta, genere confianza y esté lista para lanzar en pocos días.",
          estimatedTime: "Entrega estimada: 5–7 días.",
          startingPrice: "Inversión desde USD 120.",
          benefit:
            "Emprendedores y empresas que necesitan una web más atractiva, actualizada y enfocada en resultados, sin entrar en un proyecto complejo.",
        },
        systems: {
          title: "Mini Sistema Operativo",
          description:
            "Dashboard operativo que ordena tu día a día. Centralizamos tareas, inventario, vencimientos y pagos para que dejes atrás las planillas y el caos a la hora de hacer pedidos a tus proveedores.",
          estimatedTime: "Entrega estimada: 15-20 días.",
          startingPrice: "Inversión desde USD 380.",
          benefit:
            "Tiendas saludables y dietéticas, negocios de servicios y equipos que hoy dependen de cuadernos, planillas o chats para seguir pedidos, tareas y vencimientos.",
        },
        webDesign: {
          title: "Rediseño UX/UI + Prototipo",
          description:
            "Transformamos sistemas confusos en herramientas claras. Revisamos tu sistema actual, lo organizamos y entregamos un prototipo navegable con diseño profesional listo para validar con tu equipo.",
          estimatedTime: "Entrega estimada: 20–25 días.",
          startingPrice: "Inversión desde USD 700.",
          benefit:
            "Equipos que ya tienen un sistema o app interna pero la interfaz es poco intuitiva, lenta o genera errores en el uso diario.",
        },
        strategy: {
          title: "Sistema a medida",
          description:
            "Diseñamos y desarrollamos un sistema web real para tu operación: cada uno de los pasos de tu empresa conectados y automatizados. Módulos a elección (inventario, compras, pagos, pedidos, vencimientos, etc.).",
          estimatedTime: "Entrega estimada: 30–60 días.",
          startingPrice: "Inversión desde USD 2.000.",
          benefit:
            "Negocios en crecimiento, cadenas de tiendas y distribuidores que necesitan dejar atrás las planillas y tener un sistema propio que acompañe su expansión.",
        },
      },
      details: {
        landing: {
          eyebrow: "Landing que vende",
          intro:
            "Creamos landing pages profesionales que convierten visitantes en clientes. Ideales para emprendedores, pymes y marcas que necesitan que sus anuncios y redes generen ventas reales.",
          whatsappMessage: "Hola, quiero una landing page lista para anuncios 🚀",
          ctaNote: "Entrega en 3-7 días, diseño + copy + deploy incluido.",
          outcomes: [
            "Convierte más: copy persuasivo + estructura probada",
            "Se ve profesional: misma calidad que marcas top",
            "100 % mobile: el 80 % del tráfico viene del celular",
            "Optimizada para Meta Ads y Google Ads",
            "Diferenciá tu negocio: dejá de depender solo de IG o WhatsApp",
          ],
          steps: [
            { title: "Brief 15 min", description: "Completás un formulario o lo hacemos por WhatsApp." },
            { title: "Copy + Diseño", description: "Día 2-4: te mostramos la propuesta inicial." },
            { title: "Revisión + Deploy", description: "Día 5-7: ajustes y publicación en tu dominio." },
          ],
          deliverables: [
            "Diseño premium moderno y limpio",
            "Copywriting persuasivo (problema → solución → prueba)",
            "Integración WhatsApp / Email / Calendly / Pixel / GA4",
            "Carga rápida y SEO básico",
            "Hosting en Vercel + dominio configurado",
            "Licencia de activos sin royalties",
          ],
          audience: [
            "Emprendedores que quieren captar clientes rápido",
            "Tiendas pequeñas que necesitan un lugar profesional para mandar tráfico",
            "Marcas personales o servicios locales (gyms, estudios, coaches)",
            "Freelancers que quieren profesionalizar su imagen",
          ],
          examples: [
            { title: "Aura – Tienda saludable", description: "Catálogo + WhatsApp + beneficios. ↑42 % ventas" },
            { title: "Cucu – Comida delivery", description: "Landing para pedidos + botón a tiendas. ↑3× leads" },
            { title: "Estética BV – Servicio local", description: "Calendly integrado. –32 % costo por lead" },
            { title: "Coach Dana – Marca personal", description: "Servicios + testimonios. ↑58 % agendados" },
          ],
          englishVersion: {
            title: "Landing Page Optimized for Conversion",
            intro: "We create high-converting landing pages designed to turn visitors into customers. Perfect for entrepreneurs, small businesses and brands running ads or sending traffic from social media.",
            bullets: [
              "Premium design, clean & professional",
              "Persuasive copy that sells",
              "Mobile-first, ads-ready (Meta + Google)",
              "3–7 day turnaround",
            ],
          },
          instagramSlides: [
            { title: "Slide 1", bullets: ["✨ Landing Page Profesional", "(hecha para convertir)"] },
            { title: "Slide 2", bullets: ["✔ Diseño premium", "✔ Copy que vende", "✔ Lista en 3–7 días"] },
            { title: "Slide 3", bullets: ["🔌 Integraciones", "WhatsApp · Calendly · Pixel · GA4"] },
            { title: "Slide 4", bullets: ["🔥 Ideal para", "Emprendedores · Tiendas · Marcas · Servicios"] },
            { title: "Slide 5", bullets: ["📩 Escribime para empezar tu landing"] },
          ],
          pitch: "Hago landing pages profesionales diseñadas para convertir clientes. Si estás enviando tráfico desde Instagram o anuncios, necesitás una página que explique quién sos, qué hacés y por qué deberían comprarte. Te la dejo lista en menos de una semana. Escribime.",
        },
        systems: {
          eyebrow: "Orden operativo en un solo dashboard",
          intro:
            "Centralizamos pedidos, inventario, vencimientos y pagos para que tu equipo trabaje con claridad día a día.",
          outcomes: [
            "Visibilidad de tareas, pedidos y stock en un panel único.",
            "Alertas sobre vencimientos y pagos para evitar pérdidas.",
            "Flujos más rápidos para reponer mercadería y coordinar proveedores.",
          ],
          steps: [
            {
              title: "Relevamiento de procesos",
              description: "Mapeamos cómo trabajan hoy, qué se controla en planillas y qué info se necesita a diario.",
            },
            {
              title: "Prototipo navegable",
              description: "Diseñamos el flujo ideal y priorizamos módulos (tareas, stock, compras, vencimientos).",
            },
            {
              title: "Implementación y ajustes",
              description: "Desarrollamos el dashboard web, conectamos automatizaciones y validamos con tu equipo.",
            },
          ],
          deliverables: [
            "Dashboard web con acceso privado",
            "Módulos priorizados (tareas, inventario, pedidos, pagos, vencimientos)",
            "Automatizaciones básicas para avisos y actualizaciones de estado",
            "Capacitación rápida + checklist de adopción",
          ],
          ctaNote: "Pensado para equipos que quieren dejar planillas y chats atrás y trabajar con información confiable.",
          whatsappMessage: "Hola, quiero crear un Mini Sistema Operativo para mi negocio.",
        },
        webDesign: {
          eyebrow: "Claridad para tu producto digital",
          intro:
            "Auditamos tu sistema actual y entregamos un prototipo UX/UI claro para que tu equipo lo valide antes de desarrollar.",
          outcomes: [
            "Interfaz más intuitiva que reduce errores y soporte.",
            "Flujos reordenados según los objetivos del negocio.",
            "Prototipo navegable listo para pruebas con el equipo o usuarios.",
          ],
          steps: [
            {
              title: "Auditoría y mapa de fricción",
              description: "Revisamos pantallas, flujos y puntos que generan demoras o errores.",
            },
            {
              title: "Arquitectura y reglas de uso",
              description: "Definimos navegación, jerarquía de información y componentes clave.",
            },
            {
              title: "Prototipo interactivo",
              description: "Diseñamos vistas clave en Figma con interacciones para que el equipo recorra el flujo final.",
            },
          ],
          deliverables: [
            "Mapa de navegación y flujos priorizados",
            "Prototipo navegable en Figma",
            "Sistema visual base con componentes reutilizables",
            "Backlog de mejoras y próximas iteraciones",
          ],
          ctaNote: "Ideal para productos que ya existen pero necesitan claridad antes de seguir invirtiendo en desarrollo.",
          whatsappMessage: "Hola, quiero trabajar un Rediseño UX/UI + Prototipo.",
        },
        strategy: {
          eyebrow: "Sistema a medida para crecer con orden",
          intro:
            "Diseñamos y desarrollamos un sistema web completo, conectado a tus procesos y listo para escalar con tu operación.",
          outcomes: [
            "Operación conectada de punta a punta con menos tareas manuales.",
            "Reportes y paneles en tiempo real para decisiones más rápidas.",
            "Arquitectura preparada para sumar módulos y automatizaciones nuevas.",
          ],
          steps: [
            {
              title: "Diagnóstico y blueprint",
              description: "Definimos objetivos, módulos críticos y plan de releases para llegar rápido al MVP.",
            },
            {
              title: "Diseño UX/UI y validación",
              description: "Diseñamos flujos, vistas clave y validamos con usuarios internos antes de construir.",
            },
            {
              title: "Desarrollo iterativo",
              description: "Construimos el sistema por módulos, conectamos automatizaciones y acompañamos el lanzamiento.",
            },
          ],
          deliverables: [
            "Roadmap y backlog priorizado",
            "MVP funcional desplegado en la nube",
            "Automatizaciones y roles de acceso configurados",
            "Plan de soporte y próximas iteraciones",
          ],
          ctaNote: "Para negocios que necesitan su propio sistema y no pueden seguir dependiendo de planillas o apps genéricas.",
          whatsappMessage: "Hola, quiero un Sistema a medida para mi negocio.",
        },
      },
    },

    projects: {
      heading: "Proyectos",
      description:
        "Exploramos el diseño, la estrategia y la tecnología a través de proyectos que evolucionan.",
      viewCase: "Ver caso",
      progressLabel: "Desplazamiento",
      items: {
        gestock: {
          title: "Nodux",
          subtitle:
            "Suite multitienda que orquesta inventarios, ventas y compras para tiendas físicas con datos en tiempo real.",
          tags: ["Product Design", "Desarrollo Web", "Automatización"],
        },
        pew: {
          title: "Pew",
          subtitle:
            "Asistente financiero personal que traduce tus metas en planes accionables con seguimiento inteligente y cercano.",
          tags: ["Product Strategy", "Finanzas", "UX/UI"],
        },
        miproveedor: {
          title: "MiProveedor.app",
          subtitle:
            "Red digital que conecta negocios con proveedores para optimizar pedidos y entregas en línea.",
          tags: ["Product Design", "E-commerce", "Web App"],
        },
        tiendix: {
          title: "Tiendix",
          subtitle:
            "Plataforma de comercio electrónico que permite a pequeños negocios vender online con herramientas profesionales.",
          tags: ["E-commerce", "Desarrollo Web", "Product Design"],
        },
      },
    },
    team: {
      heading: "Equipo Cosmic Studio",
      description: "Personas reales, mentes creativas y energía viva detrás del sistema.",
      members: {
        jorge: {
          role: "Estrategia y Desarrollo",
          description: "Integra lógica, estructura y visión digital.",
        },
        paola: {
          role: "Diseño UX/UI y Branding",
          description: "Crea experiencias visuales que conectan con propósito.",
        },
        samira: {
          role: "Chief Happiness Officer 🐾",
          description: "Guarda la energía del equipo y da alegría al sistema.",
        },
      },
    },
    contact: {
      titleBeforeHighlight: "¿Listo para crear tu",
      titleHighlight: "sistema?",
      titleAfterHighlight: "",
      description: "Conectemos y diseñemos experiencias digitales que evolucionan.",
      nameLabel: "TU NOMBRE / NEGOCIO",
      namePlaceholder: "Nombre o negocio",
      messageLabel: "MENSAJE",
      defaultMessage: "Me interesa crear un sistema para mi negocio",
      buttonLabel: "Contactar equipo",
      contactLine: "→ info.cosmicst@gmail.com",
      socials: [
        { label: "LinkedIn", href: "https://www.linkedin.com/company/cosmic-st/" },
        { label: "Instagram", href: "#" },
        { label: "Behance", href: "#" },
      ],
      footerNote: "© {year} Cosmic Studio. Todos los derechos reservados.",
      systemStatus: "Sistema activo",
    },
  },
  en: {
    metadata: {
      title: " Studio — Bilingual digital experiences",
      description:
        "We work with entrepreneurs, stores, and distributors who want to leave spreadsheets and the chaos in WhatsApp behind.",
      ogTitle: "Cosmic Studio — Digital experiences",
      ogDescription:
        "We work with entrepreneurs, stores, and distributors who want to leave spreadsheets and the chaos in WhatsApp behind.",
    },
    languageSwitcher: {
      label: "Language",
      languages: {
        es: { label: "Spanish", short: "ES" },
        en: { label: "English", short: "EN" },
      },
    },
    navigation: {
      hero: "Home",
      manifesto: "Manifesto",
      services: "Services",
      projects: "Projects",
      team: "Team",
      contact: "Contact",
    },
    hero: {
      title: "Digital systems that connect",
      highlight: "strategy, design, and technology.",
      description:
        "We work with entrepreneurs, stores, and distributors who want to leave spreadsheets and the chaos in WhatsApp behind.",
      cta: "Explore services",
    },
    manifesto: {
      tagline: "Design that connects + systems that bring order",
      headline:
        "We guide entrepreneurs and growing companies ready to modernize the way they operate.",
      description:
        "We turn manual processes into clear, reliable digital systems that power decisions, efficiency, and real growth.",
      idealForHeading: "Perfect for teams that:",
      idealForList: [
        "Take orders through WhatsApp or notebooks",
        "Too much workload",
        "Lack inventory or expiration control",
        "Lose hours with manual tasks",
        "Need reliable information to make decisions",
        "Want to grow with clarity and direction",
      ],
    },
    services: {
      heading: "Services",
      description:
        "We blend design, automation, and strategy so every digital touchpoint feels consistent, human, and ready to scale.",
      scrollHint: "Slide to see how we work",
      viewMore: "Learn more",
      keyBenefitLabel: "Ideal for",
      detailPage: {
        backToServices: "Back to services",
        highlights: {
          duration: "Estimated delivery",
          investment: "Investment from",
        },
        sectionIntroLabel: "Main description",
        outcomesTitle: "What you get",
        processTitle: "How we run it",
        deliverablesTitle: "Deliverables",
        audienceTitle: "Who it's for",
        examplesTitle: "Example use cases",
        englishVersionTitle: "English version",
        instagramTitle: "IG short version",
        pitchTitle: "Quick pitch",
        ctaTitle: "Ready to start?",
        ctaSubtitle: "Send us a note and we'll share the fastest path for your case.",
        contactCta: "Chat on WhatsApp",
      },
      items: {
        landing: {
          title: "Premium Presentation Website",
          description:
            "Clear, modern pages built to convert. We build a professional landing that communicates your offer, builds trust, and is ready to launch in days.",
          estimatedTime: "Estimated delivery: 5–7 days.",
          startingPrice: "Investment from USD 120.",
          benefit:
            "Entrepreneurs and companies that need a more attractive, up-to-date, results-focused site without entering a complex project.",
        },
        systems: {
          title: "Mini Operating System",
          description:
            "Operational dashboard that organizes your day to day. We centralize tasks, inventory, expirations, and payments so you can leave spreadsheets and chaos behind when ordering from suppliers.",
          estimatedTime: "Estimated delivery: 15-20 days.",
          startingPrice: "Investment from USD 380.",
          benefit:
            "Health food shops, service businesses, and teams that rely on notebooks, spreadsheets, or chats to track orders, tasks, and expirations.",
        },
        webDesign: {
          title: "UX/UI Redesign + Prototype",
          description:
            "We turn confusing systems into clear tools. We review your current system, organize it, and deliver a navigable prototype with professional design ready to validate with your team.",
          estimatedTime: "Estimated delivery: 20–25 days.",
          startingPrice: "Investment from USD 700.",
          benefit:
            "Teams that already have a system or internal app but the interface is unintuitive, slow, or causes errors in daily use.",
        },
        strategy: {
          title: "Custom System",
          description:
            "We design and build a real web system for your operation: every step of your business connected and automated. Pick the modules you need (inventory, purchasing, payments, orders, expirations, etc.).",
          estimatedTime: "Estimated delivery: 30–60 days.",
          startingPrice: "Investment from USD 2,000.",
          benefit:
            "Growing businesses, store chains, and distributors that need to leave spreadsheets behind and have their own system to support their expansion.",
        },
      },
      details: {
        landing: {
          eyebrow: "Conversion-first landing",
          intro:
            "We create professional landing pages that turn visitors into customers. Perfect for entrepreneurs, SMBs, and brands that need their ads and social traffic to generate real sales.",
          whatsappMessage: "Hi! I want a landing page ready for ads 🚀",
          ctaNote: "Delivered in 3–7 days. Design + copy + deploy included.",
          outcomes: [
            "Convert more: persuasive copy + proven structure.",
            "Premium look: same quality as top-tier brands.",
            "100% mobile-first (most traffic is on phones).",
            "Optimized for Meta Ads and Google Ads.",
            "Stand out: stop relying only on IG or WhatsApp.",
          ],
          steps: [
            { title: "15-min brief", description: "Fill a quick form or do it over WhatsApp." },
            { title: "Copy + Design", description: "Day 2–4: we show you the first version." },
            { title: "Review + Deploy", description: "Day 5–7: tweaks and publish on your domain." },
          ],
          deliverables: [
            "Premium, clean, modern design",
            "Persuasive copy (problem → solution → proof)",
            "WhatsApp / Email / Calendly / Pixel / GA4 integration",
            "Fast load + basic SEO",
            "Hosting on Vercel + domain setup",
            "Royalty-free licensed assets",
          ],
          audience: [
            "Entrepreneurs who need to capture clients fast",
            "Small shops needing a professional place to send traffic",
            "Personal brands or local services (gyms, studios, coaches)",
            "Freelancers wanting a professional online image",
          ],
          examples: [
            { title: "Aura – Health shop", description: "Catalog + WhatsApp + benefits. ↑42% sales" },
            { title: "Cucu – Food delivery", description: "Orders landing + store buttons. ↑3× leads" },
            { title: "BV Aesthetics – Local service", description: "Calendly integrated. –32% cost per lead" },
            { title: "Coach Dana – Personal brand", description: "Services + testimonials. ↑58% bookings" },
          ],
          englishVersion: {
            title: "Landing Page Optimized for Conversion",
            intro: "High-converting pages designed to turn visitors into customers. Perfect for entrepreneurs, small businesses, and brands running ads or sending traffic from social media.",
            bullets: [
              "Premium design, clean & professional",
              "Persuasive copy that sells",
              "Mobile-first, ads-ready (Meta + Google)",
              "3–7 day turnaround",
            ],
          },
          instagramSlides: [
            { title: "Slide 1", bullets: ["✨ Professional Landing Page", "(built to convert)"] },
            { title: "Slide 2", bullets: ["✔ Premium design", "✔ Copy that sells", "✔ Ready in 3–7 days"] },
            { title: "Slide 3", bullets: ["🔌 Integrations", "WhatsApp · Calendly · Pixel · GA4"] },
            { title: "Slide 4", bullets: ["🔥 Ideal for", "Entrepreneurs · Shops · Brands · Local services"] },
            { title: "Slide 5", bullets: ["📩 DM me to start your landing"] },
          ],
          pitch: "We build professional landing pages designed to convert customers. If you're sending traffic from Instagram or ads, you need a page that explains who you are, what you do, and why they should buy. Delivered in under a week. DM me.",
        },
        systems: {
          eyebrow: "Operational clarity in one dashboard",
          intro:
            "We centralize orders, inventory, expirations, and payments so your team works with confidence every day.",
          outcomes: [
            "Visibility of tasks, orders, and stock in a single panel.",
            "Alerts on expirations and payments to avoid losses.",
            "Faster flows to restock and coordinate suppliers.",
          ],
          steps: [
            {
              title: "Process review",
              description: "We map how you work today, what lives in spreadsheets, and what info you need daily.",
            },
            {
              title: "Navigable prototype",
              description: "We design the ideal flow and prioritize modules (tasks, stock, purchasing, expirations).",
            },
            {
              title: "Build and refine",
              description: "We develop the web dashboard, connect automations, and validate with your team.",
            },
          ],
          deliverables: [
            "Web dashboard with private access",
            "Prioritized modules (tasks, inventory, orders, payments, expirations)",
            "Basic automations for alerts and status updates",
            "Quick training + adoption checklist",
          ],
          ctaNote: "Built for teams ready to leave spreadsheets and chats behind and rely on trusted information.",
          whatsappMessage: "Hi! I want a Mini Operating System for my business.",
        },
        webDesign: {
          eyebrow: "Clarity for your digital product",
          intro:
            "We audit your current system and deliver a clear UX/UI prototype your team can validate before building.",
          outcomes: [
            "More intuitive interface that reduces errors and support.",
            "Flows reorganized around the business goals.",
            "Navigable prototype ready to test with your team or users.",
          ],
          steps: [
            {
              title: "Audit and friction map",
              description: "We review screens, flows, and points causing delays or errors.",
            },
            {
              title: "Architecture and usage rules",
              description: "We define navigation, information hierarchy, and key components.",
            },
            {
              title: "Interactive prototype",
              description: "We design key views in Figma with interactions so the team can walk the final flow.",
            },
          ],
          deliverables: [
            "Navigation map and prioritized flows",
            "Navigable prototype in Figma",
            "Base visual system with reusable components",
            "Backlog of improvements and next iterations",
          ],
          ctaNote: "Ideal for existing products that need clarity before investing more in development.",
          whatsappMessage: "Hi! I'm interested in the UX/UI Redesign + Prototype.",
        },
        strategy: {
          eyebrow: "Custom system to scale with order",
          intro:
            "We design and build a full web system connected to your processes and ready to grow with your operation.",
          outcomes: [
            "End-to-end operation connected with fewer manual tasks.",
            "Real-time dashboards and reports for faster decisions.",
            "Architecture ready to add new modules and automations.",
          ],
          steps: [
            {
              title: "Diagnosis and blueprint",
              description: "We define objectives, critical modules, and a release plan to reach the MVP quickly.",
            },
            {
              title: "UX/UI design and validation",
              description: "We design flows and key screens and validate with internal users before building.",
            },
            {
              title: "Iterative development",
              description: "We ship the system module by module, connect automations, and support the launch.",
            },
          ],
          deliverables: [
            "Roadmap and prioritized backlog",
            "Functional MVP deployed to the cloud",
            "Automations and access roles configured",
            "Support plan and next iterations",
          ],
          ctaNote: "For teams that need their own system and can't keep relying on spreadsheets or generic apps.",
          whatsappMessage: "Hi! I want a Custom System for my business.",
        },
      },
    },

    projects: {
      heading: "Projects",
      description:
        "We explore design, strategy, and technology through initiatives that constantly evolve.",
      viewCase: "View case",
      progressLabel: "Scroll",
      items: {
        gestock: {
          title: "Nodux",
          subtitle:
            "Multi-store suite that syncs inventory, sales, and purchasing with real-time data for physical retailers.",
          tags: ["Product Design", "Web Development", "Automation"],
        },
        pew: {
          title: "Pew",
          subtitle:
            "Personal finance partner that translates your goals into actionable plans with intelligent, human follow-up.",
          tags: ["Product Strategy", "Finance", "UX/UI"],
        },
        miproveedor: {
          title: "MiProveedor.app",
          subtitle:
            "Digital network that connects businesses with suppliers to streamline online orders and deliveries.",
          tags: ["Product Design", "E-commerce", "Web App"],
        },
        tiendix: {
          title: "Tiendix",
          subtitle:
            "E-commerce platform that helps small businesses sell online with professional tools.",
          tags: ["E-commerce", "Web Development", "Product Design"],
        },
      },
    },
    team: {
      heading: "Cosmic Studio team",
      description: "Real people, creative minds, and live energy behind the system.",
      members: {
        jorge: {
          role: "Strategy & Development",
          description: "Connects logic, structure, and digital vision.",
        },
        paola: {
          role: "UX/UI & Brand Design",
          description: "Shapes visual experiences with intention and purpose.",
        },
        samira: {
          role: "Chief Happiness Officer 🐾",
          description: "Guards the team's energy and keeps spirits high.",
        },
      },
    },
    contact: {
      titleBeforeHighlight: "Ready to build your",
      titleHighlight: "system?",
      titleAfterHighlight: "",
      description: "Let's connect and design digital experiences that evolve.",
      nameLabel: "YOUR NAME / BUSINESS",
      namePlaceholder: "Name or company",
      messageLabel: "MESSAGE",
      defaultMessage: "I'm interested in creating a system for my business",
      buttonLabel: "Contact the team",
      contactLine: "→ info.cosmicst@gmail.com",
      socials: [
        { label: "LinkedIn", href: "https://www.linkedin.com/company/cosmic-st/" },
        { label: "Instagram", href: "#" },
        { label: "Behance", href: "#" },
      ],
      footerNote: "© {year} Cosmic Studio. All rights reserved.",
      systemStatus: "System online",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.es;
}
