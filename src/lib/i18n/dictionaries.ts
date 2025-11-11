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
export type ServiceId = "strategy" | "webDesign" | "systems" | "advisory";
export type ProjectId = "gestock" | "pew";
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
      title: "The Cosmic Studio — Experiencias digitales bilingües",
      description:
        "The Cosmic Studio crea experiencias, identidades y productos digitales que combinan estrategia, diseño y tecnología para impulsar resultados reales.",
      ogTitle: "The Cosmic Studio — Experiencias digitales bilingües",
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
        "Crecen sin estructura",
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
      keyBenefitLabel: "Beneficio clave",
      items: {
        strategy: {
          title: "Estrategia y Estructura Digital",
          description:
            "Creamos la base de tu producto: cómo funciona, cómo se navega y cómo se entiende. Damos forma clara a tu idea antes de pasar a diseño o desarrollo.",
          benefit:
            "Incluye: Arquitectura de información · Investigación y flujos UX · Estrategia de producto · Naming y narrativa.",
        },
        webDesign: {
          title: "Diseño Web Atractivo",
          description:
            "Sitios que reflejan la esencia de tu marca con estética cuidada, estructura clara y buena experiencia en todos los dispositivos.",
          benefit: "Conectá con más personas y generá confianza desde el primer clic.",
        },
        systems: {
          title: "Sistemas Internos y Automatización",
          description:
            "Creamos herramientas personalizadas (gestión de pedidos, facturas, stock, agendas o flujos de trabajo) que te ahorran tiempo.",
          benefit: "Ganá orden, eficiencia y autonomía.",
        },
        advisory: {
          title: "Acompañamiento Estratégico",
          description:
            "No solo diseñamos: analizamos tus procesos y objetivos para que cada solución digital impulse tus resultados.",
          benefit: "Tomá decisiones con claridad y foco.",
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
          title: "Gestock",
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
      },
    },
    team: {
      heading: "Equipo The Cosmic Studio",
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
      contactLine: "→ contacto@thecosmicstudio.com",
      socials: [
        { label: "LinkedIn", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "Behance", href: "#" },
      ],
      footerNote: "© {year} The Cosmic Studio. Todos los derechos reservados.",
      systemStatus: "Sistema activo",
    },
  },
  en: {
    metadata: {
      title: "The Cosmic Studio — Bilingual digital experiences",
      description:
        "The Cosmic Studio builds experiences, identities, and digital products that blend strategy, design, and technology to drive real results.",
      ogTitle: "The Cosmic Studio — Bilingual digital experiences",
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
        "Scale without a clear structure",
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
      keyBenefitLabel: "Key benefit",
      items: {
        strategy: {
          title: "Digital Strategy & Structure",
          description:
            "We build the foundation of your product: how it works, how it is navigated, and how it is understood before moving into design or development.",
          benefit:
            "Includes: Information architecture · UX research & flows · Product strategy · Naming and storytelling.",
        },
        webDesign: {
          title: "Striking Web Design",
          description:
            "Sites that reflect your brand DNA with intentional aesthetics, clear structure, and great performance across devices.",
          benefit: "Connect with more people and earn trust from the very first click.",
        },
        systems: {
          title: "Internal Systems & Automation",
          description:
            "We create custom tools (orders, invoices, stock, bookings, or workflows) that save time and remove friction.",
          benefit: "Gain clarity, efficiency, and autonomy.",
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
          title: "Gestock",
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
      },
    },
    team: {
      heading: "The Cosmic Studio team",
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
      contactLine: "→ contact@thecosmicstudio.com",
      socials: [
        { label: "LinkedIn", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "Behance", href: "#" },
      ],
      footerNote: "© {year} The Cosmic Studio. All rights reserved.",
      systemStatus: "System online",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.es;
}
