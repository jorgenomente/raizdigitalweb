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
export type ServiceId = "landing" | "strategy" | "webDesign" | "systems" | "advisory";
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
    items: Record<ServiceId, {
      title: string;
      description: string;
      benefit: string;
    }>;
  };
    projects: {
      heading: string;
      description: string;
      viewCase: string;
      progressLabel: string;
      items: Record<ProjectId, {
        title: string;
        subtitle: string;
        tags: string[];
      }>;
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
        "Diseñamos sitios web, identidades y sistemas funcionales para generar experiencias y resultados reales.",
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
        "Diseñamos sitios web, identidades y sistemas funcionales para generar experiencias y resultados reales.",
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
          title: "Diseño de landing pages y sitios web",
          description:
            "Páginas claras, modernas y pensadas para convertir. Rediseñamos tu web para darle propósito, mejorar el mensaje y transmitir profesionalismo desde el primer vistazo.",
          benefit:
            "Emprendedores y empresas que necesitan una web más atractiva, actualizada y enfocada en resultados.",
        },
        strategy: {
          title: "Diseño de software a medida",
          description:
            "Sistemas web que ordenan tu operación y se adaptan a cómo trabaja tu negocio. Eliminá planillas, automatizá tareas y centralizá todo en un solo lugar.\n\nIncluye: dashboards, automatizaciones, integraciones, multitenant y desarrollo end-to-end.",
          benefit:
            "Tiendas, distribuidores y equipos con procesos desordenados.",
        },
        webDesign: {
          title: "Diseño UX/UI + Producto Digital",
          description:
            "Convertimos ideas en productos intuitivos y listos para usar. Diseños que reducen fricción, mejoran procesos y elevan la experiencia del usuario.\n\nIncluye: research, flujos, wireframes, UI systems, prototipos y validaciones.",
          benefit: "Startups, nuevos productos y plataformas que necesitan escalar.",
        },
        systems: {
          title: "Sistemas Operativos para Negocios",
          description:
            "Ordenamos tus procesos para que tu operación fluya sin caos. Combinamos estrategia, UX operativo y software para eliminar cuellos de botella. \n\nIncluye: mapeo de procesos, flujos optimizados, sistemas de control y SOPs digitales",
          benefit: "Equipos con caos, sobrecarga o procesos informales.",
        },
        advisory: {
          title: "Consultoría en Producto + Estrategia Digital",
          description:
            "Claridad para construir lo correcto. Te ayudamos a definir, validar y priorizar tu producto antes de invertir en desarrollo.",
          benefit: "Founders, negocios en crecimiento, equipos sin claridad técnica.",
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
        "Cosmic Studio builds experiences, identities, and digital products that blend strategy, design, and technology to drive real results.",
      ogTitle: "Cosmic Studio — Digital experiences",
      ogDescription:
        "We design websites, identities, and functional systems to deliver genuine experiences and measurable outcomes.",
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
        "We design websites, identities, and functional systems so your brand can deliver real experiences and measurable results.",
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
          title: "Landing Pages & Websites",
          description:
            "Clear, modern pages built to convert. We redesign your site to add purpose, sharpen the message, and convey professionalism from the first glance.",
          benefit:
            "Entrepreneurs and companies that need a more attractive, up-to-date, results-focused website.",
        },
        strategy: {
          title: "Custom Software Design",
          description:
            "Web systems that bring order to your operations and adapt to how your business works. Remove spreadsheets, automate tasks, and centralize everything in one place.\nIncludes dashboards, automations, integrations, multitenant setups, and end-to-end development.",
          benefit:
            "Retailers, distributors, and teams with disorganized processes.",
        },
        webDesign: {
          title: "UX/UI & Digital Product Design",
          description:
            "We turn ideas into intuitive, ready-to-use products. Designs that reduce friction, improve processes, and elevate the user experience.\nIncludes research, flows, wireframes, UI systems, prototypes, and validation.",
          benefit: "Startups, new products, and platforms that need to scale.",
        },
        systems: {
          title: "Business Operating Systems",
          description:
            "We streamline your processes so your operation flows without chaos. We combine strategy, operational UX, and software to remove bottlenecks.\nIncludes process mapping, optimized flows, control systems, and digital SOPs.",
          benefit: "Teams facing chaos, overload, or informal processes.",
        },
        advisory: {
          title: "Strategic Advisory",
          description:
            "Beyond design: we analyze your processes and goals so every digital initiative pushes the business forward.",
          benefit: "Make decisions with focus and confidence.",
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
