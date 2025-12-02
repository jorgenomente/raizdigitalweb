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
    idealForHeading: string;
    idealForList: string[];
  };
  services: {
    heading: string;
    description: string;
    scrollHint: string;
    keyBenefitLabel: string;
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
        "Trabajamos junto a emprendedores, tiendas físicas, distribuidores y equipos que quieren dejar atrás las planillas, las tareas manuales y el caos operativo que se acumula en WhatsApp.",
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
        "Trabajamos junto a emprendedores, tiendas físicas, distribuidores y equipos que quieren dejar atrás las planillas, las tareas manuales y el caos operativo que se acumula en WhatsApp.",
      cta: "Explorar servicios",
    },
    manifesto: {
      tagline: "Diseño que conecta + sistemas que ordenan",
      headline:
        "Acompañamos a empresas en crecimiento que quieren modernizar su forma de operar.",
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
  keyBenefitLabel: "Ideal para",
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
      estimatedTime: "Entrega estimada: 7–10 días.",
      startingPrice: "Inversión desde USD 380.",
      benefit:
        "Tiendas saludables y dietéticas, negocios de servicios y equipos que hoy dependen de cuadernos, planillas o chats para seguir pedidos, tareas y vencimientos.",
    },
    webDesign: {
      title: "Rediseño UX/UI + Prototipo",
      description:
        "Transformamos sistemas confusos en herramientas claras. Revisamos tu sistema actual, lo organizamos y entregamos un prototipo navegable con diseño profesional listo para validar con tu equipo.",
      estimatedTime: "Entrega estimada: 10–15 días.",
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
        "We work alongside entrepreneurs, brick-and-mortar shops, distributors, and teams that want to leave behind spreadsheets, manual tasks, and the operational chaos piling up in WhatsApp.",
      ogTitle: "Cosmic Studio — Digital experiences",
      ogDescription:
        "We work alongside entrepreneurs, brick-and-mortar shops, distributors, and teams that want to leave behind spreadsheets, manual tasks, and the operational chaos piling up in WhatsApp.",
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
        "We work alongside entrepreneurs, brick-and-mortar shops, distributors, and teams that want to leave behind spreadsheets, manual tasks, and the operational chaos piling up in WhatsApp.",
      cta: "Explore services",
    },
    manifesto: {
      tagline: "Design that connects + systems that bring order",
      headline:
        "We guide growing companies that are ready to modernize the way they operate.",
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
  keyBenefitLabel: "Ideal for",
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
      estimatedTime: "Estimated delivery: 7–10 days.",
      startingPrice: "Investment from USD 380.",
      benefit:
        "Health food shops, service businesses, and teams that rely on notebooks, spreadsheets, or chats to track orders, tasks, and expirations.",
    },
    webDesign: {
      title: "UX/UI Redesign + Prototype",
      description:
        "We turn confusing systems into clear tools. We review your current system, organize it, and deliver a navigable prototype with professional design ready to validate with your team.",
      estimatedTime: "Estimated delivery: 10–15 days.",
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
