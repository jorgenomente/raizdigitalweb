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
export type ServiceId =
  | "branding-identidad-visual"
  | "landing"
  | "ecommerce-profesional"
  | "strategy"
  | "marketing-digital";
export const serviceIds: ServiceId[] = [
  "branding-identidad-visual",
  "landing",
  "ecommerce-profesional",
  "strategy",
  "marketing-digital",
];
export const serviceSlugs: Record<ServiceId, Record<Locale, string>> = {
  "branding-identidad-visual": {
    es: "branding-identidad-visual",
    en: "visual-identity-branding",
  },
  landing: {
    es: "landing",
    en: "web-design-landing",
  },
  "ecommerce-profesional": {
    es: "ecommerce-profesional",
    en: "professional-ecommerce",
  },
  strategy: {
    es: "strategy",
    en: "strategy",
  },
  "marketing-digital": {
    es: "marketing-digital",
    en: "digital-marketing",
  },
};
export type ProjectId = "gestock" | "pew" | "miproveedor" | "tiendix";
export type TeamMemberId = "jorge" | "paola" | "samira";
export function getServiceSlug(locale: Locale, serviceId: ServiceId): string {
  return serviceSlugs[serviceId]?.[locale] ?? serviceId;
}

export function getServiceIdFromSlug(
  locale: Locale,
  slug?: string | null
): ServiceId | undefined {
  if (!slug) return undefined;

  const match = Object.entries(serviceSlugs).find(
    ([, localized]) =>
      localized[locale] === slug || Object.values(localized).includes(slug)
  );

  if (match?.[0]) {
    return match[0] as ServiceId;
  }

  return serviceIds.includes(slug as ServiceId) ? (slug as ServiceId) : undefined;
}

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
  process: {
    eyebrow: string;
    title: string;
    steps: { title: string; description: string }[];
    editorialAlt: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    abstractAlt: string;
    studioAlt: string;
    studioCaption: string;
  };
  manifesto: {
    tagline: string;
    headline: string;
    subheadline: string;
    cards: { title: string; items: string[] }[];
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
        eyebrow?: string;
        description: string;
        benefit: string;
        estimatedTime?: string;
        startingPrice?: string;
        headline?: string;
        features?: { title: string; description: string }[];
        audience?: string[];
        ctaLabel?: string;
        imageAlt?: string;
        imageSrc?: string;
        imageSide?: "left" | "right";
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
        seoTitle?: string;
        seoDescription?: string;
        heroCta?: string;
        benefitsTitle?: string;
        benefitsIntro?: string;
        benefitsNarrative?: string;
        benefits?: { title: string; description: string }[];
        painTitle?: string;
        painIntro?: string;
        painNarrative?: string;
        painPoints?: string[];
        painConclusion?: string;
        includesTitle?: string;
        differentiatorsTitle?: string;
        differentiators?: string[];
        plansTitle?: string;
        plans?: { name: string; description: string; note?: string; badge?: string }[];
        faqTitle?: string;
        faqs?: { question: string; answer: string }[];
        planSubtitle?: string;
        processTitle?: string;
        finalCtaTitle?: string;
        finalCtaSubtitle?: string;
        benefitsCta?: string;
        painCta?: string;
        processCta?: string;
        planCta?: string;
        finalCta?: string;
        internalLinks?: { label: string; href: string }[];
        schema?: Record<string, unknown>;
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
    titleRotateOptions: string[];
    titleAfterHighlight: string;
    description: string;
    nameLabel: string;
    namePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    interestLabel: string;
    interestHelper: string;
    interestPlaceholder: string;
    interestOptions: { id: ServiceId; label: string }[];
    interestIntro: string;
    interestFallback: string;
    defaultMessage: string;
    directMessageLabel: string;
    sendEmailLabel: string;
    sendWhatsappLabel: string;
    greetingPrefix: string;
    nameFallback: string;
    emailSubject: string;
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
      title: "Cosmic Studio | Estudio creativo y agencia digital: branding, diseño web y sistemas",
      description:
        "Branding profesional, diseño web profesional, ecommerce, diseño UX/UI, marketing digital y desarrollo web a medida. Estudio creativo bilingüe que diseña landing page profesional, sistemas y experiencias listas para escalar.",
      ogTitle: "Cosmic Studio — Branding, diseño web y sistemas digitales",
      ogDescription:
        "Estudio creativo y agencia digital. Branding profesional, diseño web, ecommerce, marketing digital y software a medida en ES/EN para marcas que quieren crecer.",
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
      title: "Estrategia, diseño y tecnología",
      highlight: "para impulsar tu negocio.",
      description: "Marketing, branding y soluciones web en un mismo universo.",
      cta: "Explorar servicios",
    },
    process: {
      eyebrow: "CÓMO TRABAJAMOS",
      title: "Un camino claro de inicio a fin",
      steps: [
        {
          title: "Diagnóstico claro",
          description: "Analizamos tu marca, tus necesidades y tu momento de crecimiento.",
        },
        {
          title: "Diseño estratégico",
          description: "Creamos soluciones visuales y digitales con propósito, no plantillas.",
        },
        {
          title: "Implementación limpia",
          description: "Diseño, desarrollo y automatización con procesos fluidos y comunicación clara.",
        },
        {
          title: "Entrega profesional",
          description: "Entregables completos, organizados y listos para usar.",
        },
        {
          title: "Evolución continua",
          description: "Te acompañamos para que tu marca crezca con orden.",
        },
      ],
      editorialAlt: "Ilustración abstracta de un flujo de trabajo con luces y formas geométricas limpias",
    },
    about: {
      eyebrow: "QUIÉNES SOMOS",
      title: "Somos Cosmic Studio",
      paragraphs: [
        "Un estudio de diseño y tecnología que combina estrategia, claridad y herramientas modernas para crear experiencias digitales que evolucionan.",
        "Diseñamos marcas, sitios web, tiendas online y soluciones a medida con un enfoque editorial, funcional y ordenado.",
        "Nuestro proceso integra pensamiento de producto, diseño limpio y tecnología preparada para escalar.",
      ],
      abstractAlt: "Foto del equipo de Cosmic Studio trabajando en su estudio",
      studioAlt: "Foto del estudio de Cosmic Studio: espacio de trabajo",
      studioCaption: "Un estudio ordenado para ideas claras.",
    },
    manifesto: {
      tagline: "Digitalizamos tus procesos para que tu negocio crezca con orden, claridad y eficiencia.",
      headline: "Digitalizamos tus procesos para que tu negocio funcione mejor.",
      subheadline:
        "Transformamos los pasos de tu negocio en un sistema digital simple, visual y eficiente que ordena tus operaciones y te devuelve tiempo.",
      cards: [
        {
          title: "Problemas operativos que frenan tu negocio",
          items: [
            "Pedidos dispersos en WhatsApp, Excel o cuadernos.",
            "Tareas repetitivas que consumen tiempo.",
            "Falta de control real de stock y vencimientos."
          ],
        },
        {
          title: "Gestión limitada y decisiones sin información",
          items: [
            "Carga laboral excesiva y sensación de apagar incendios todo el día.",
            "Información incompleta o desactualizada para decidir.",
            "Dependencia de una sola persona para que todo funcione."
          ],
        },
        {
          title: "Metas reales del negocio",
          items: [
            "Crecer sin que el equipo se queme.",
            "Tener información clara y centralizada en un sistema.",
            "Tomar decisiones con datos confiables, no solo con intuición."
          ],
        },
      ],
    },
    services: {
      heading: "Servicios",
      description:
        "Diseño claro, procesos automatizados y una estrategia que da coherencia a cada interacción con tu marca",
      scrollHint: "",
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
        "branding-identidad-visual": {
          eyebrow: "Branding & Identidad Visual",
          title: "Branding Profesional para Marcas que Quieren Crecer",
          headline: "Identidades visuales que ordenan, diferencian y elevan tu marca.",
          description:
            "Diseñamos sistemas visuales coherentes y memorables que generan confianza.",
          benefit:
            "Emprendedores, negocios y marcas digitales que necesitan identidad visual clara, coherente y memorable.",
          estimatedTime: "Entrega estimada: 15–25 días según el plan",
          startingPrice: "Inversión desde USD 280",
          imageSrc: "/Servicios/AURO.PNG",
          imageSide: "right",
          features: [
            {
              title: "🎨 Identidad visual + sistema integral",
              description: "Logo, paleta, tipografías, estilo visual y reglas listas para usar con coherencia en cualquier plataforma.",
            },
            {
              title: "🧬 Narrativa y propósito que conectan",
              description: "Definimos voz, mensaje central y cómo comunicar para atraer a la audiencia correcta.",
            },
            {
              title: "🚀 Diseñada para crecer",
              description: "Marca flexible y moderna para redes, web, campañas y expansión.",
            },
          ],
          audience: [
            "Emprendedores que necesitan una identidad sólida para lanzar o relanzar su marca.",
            "Negocios locales que quieren verse más profesionales y atraer mejor a sus clientes.",
            "Marcas digitales que necesitan consistencia en redes, web y contenido.",
            "Proyectos en crecimiento que requieren un sistema visual escalable.",
            "Equipos o freelancers que desean una identidad que transmita confianza.",
          ],
          ctaLabel: "Ver servicio de Branding",
          imageAlt: "Brandboard de branding completo con logo, paleta y tipografías por Cosmic Studio",
        },
        landing: {
          eyebrow: "Diseño Web Profesional",
          title: "Creamos webs claras, rápidas y confiables que impulsan tu presencia digital.",
          description:
            "Creamos sitios web claros, rápidos y confiables que representan tu marca con precisión. Si tu sitio se siente viejo o lento, lo renovamos con un diseño inteligente y estratégico.",
          estimatedTime: "Entrega estimada: 5–7 días",
          startingPrice: "Inversión desde USD 120",
          benefit:
            "Emprendedores, negocios locales y marcas digitales que necesitan una web profesional, clara y lista para crecer.",
          ctaLabel: "Ver servicio de Web",
          imageAlt: "Ejemplo de diseño web profesional y rediseño moderno por Cosmic Studio",
          imageSrc: "/Serviciosweb.jpg",
          imageSide: "left",
        },
        "ecommerce-profesional": {
          eyebrow: "Ecommerce Profesional",
          title: "Creamos tiendas online rápidas, claras y optimizadas para vender más",
          description:
            "Diseños a medida, sin plantillas genéricas, con experiencia moderna y alineada a tu marca.",
          estimatedTime: "Entrega estimada: 15–30 días según funcionalidades",
          startingPrice: "Inversión desde USD 300",
          benefit:
            "Emprendedores, negocios físicos y marcas en crecimiento que necesitan una tienda online sólida, confiable y lista para escalar.",
          ctaLabel: "Ver servicio de Ecommerce",
          imageSrc: "/Serviciosweb.jpg",
          imageAlt: "Ecommerce profesional diseñado por Cosmic Studio",
          imageSide: "right",
        },
        "marketing-digital": {
          eyebrow: "Marketing Digital",
          title: "Haz que tu marca crezca.",
          description:
            "Tener presencia digital no alcanza: necesitás una estrategia clara, coherente y medible que conecte con la audiencia correcta. Diseñamos planes que integran contenido, campañas pagas, segmentación y analítica para optimizar cada punto de contacto.",
          estimatedTime: "Entrega estimada: 7–10 días para la estrategia inicial",
          startingPrice: "Inversión desde USD 120",
          benefit:
            "Marcas con branding/web/ecommerce, emprendimientos y negocios que quieren crecer con estrategia real y decisiones basadas en datos.",
          ctaLabel: "Ver servicio de Marketing",
          imageSrc: "/pew.png",
          imageAlt: "Ejemplo de marketing digital estratégico creado por Cosmic Studio",
          imageSide: "left",
        },
        strategy: {
          eyebrow: "Software a Medida",
          title: "Un solo sistema. Todo tu negocio funcionando",
          description:
            "Software a medida que integra ventas, inventario, logística, proveedores, clientes, tareas, reportes y automatizaciones en un mismo lugar.",
          estimatedTime: "Entrega estimada: 30–60 días",
          startingPrice: "Inversión desde USD 350",
          benefit:
            "Negocios, tiendas, distribuidores y equipos operativos que necesitan orden, visibilidad y automatización real para escalar sin caos.",
          ctaLabel: "Ver servicio de Sistemas",
          imageSrc: "/gestock.png",
          imageAlt: "Ejemplo de software a medida desarrollado por Cosmic Studio",
          imageSide: "left",
        },
      },
      details: {
        "branding-identidad-visual": {
          eyebrow: "Branding e Identidad Visual Profesional",
          intro:
            "Creamos identidades visuales profesionales que ordenan, comunican y diferencian tu marca desde el primer segundo.",
          outcomes: [
            "Tu marca deja de verse igual que todas y se recuerda.",
            "Comunicación clara: tu valor se entiende en segundos.",
            "Narrativa y estilo alineados a tu propósito para atraer al cliente ideal.",
            "Menos improvisación: ahorrás tiempo con un sistema visual definido.",
            "Presencia profesional en todos los canales con coherencia.",
          ],
          steps: [
            {
              title: "Exploración → esencia y visión",
              description: "Relevamos propósito, objetivos y estilo deseado.",
            },
            {
              title: "Diseño → propuestas + ajustes",
              description: "Desarrollamos opciones visuales y refinamos con feedback.",
            },
            {
              title: "Entrega final → archivos listos para usar",
              description: "Te entregamos el sistema completo preparado para redes, web y presentaciones.",
            },
          ],
          deliverables: [
            "Logo principal + variantes",
            "Paleta profesional",
            "Tipografías seleccionadas",
            "Sistema visual completo",
            "Narrativa de marca",
            "Guía de uso",
            "Aplicaciones listas (redes, web, presentaciones)",
          ],
          ctaNote: "Branding profesional, coherente y listo para usar.",
          whatsappMessage: "Hola, quiero mi identidad profesional con Cosmic Studio ✨",
          pitch:
            "Branding profesional para marcas que quieren crecer. Identidad visual clara, coherente y lista para usar en todos los canales.",
          seoTitle: "Branding Profesional e Identidad Visual | Cosmic Studio",
          seoDescription:
            "Branding profesional para emprendedores y negocios. Diseñamos identidades visuales claras, coherentes y memorables que elevan tu presencia digital y generan confianza.",
          heroCta: "Quiero mi identidad profesional",
          benefitsTitle: "Beneficios del Branding Profesional",
          benefitsIntro: "¿Por qué elegir branding profesional?",
          benefitsNarrative: "Una identidad sólida ordena tu marca, comunica mejor y potencia tu crecimiento.",
          benefits: [
            {
              title: "Diferenciación inmediata",
              description: "Tu marca deja de perderse entre tantas y se vuelve reconocible al instante.",
            },
            {
              title: "Comunicación clara",
              description: "Tu mensaje se entiende sin explicaciones: transmitís valor con claridad.",
            },
            {
              title: "Atrae a tu cliente ideal",
              description: "Mostrás quién sos y conectás con personas que realmente valoran tu propuesta.",
            },
            {
              title: "Presencia digital coherente",
              description: "Tu marca se ve alineada en redes, web y contenido, generando confianza real.",
            },
          ],
          benefitsCta: "Quiero una identidad visual profesional",
          painTitle: "Sin Branding Profesional… tu marca pierde oportunidades.",
          painIntro: "Estos son los costos ocultos que pagás todos los días:",
          painPoints: [
            "No te recuerdan — Tu marca se pierde entre muchas y no lográs quedar en la mente de nadie.",
            "Tu mensaje confunde — Las personas no entienden qué ofrecés ni por qué deberían elegirte.",
            "Tus esfuerzos rinden menos — Invertís tiempo y dinero en contenido, marketing o publicidad sin retorno claro.",
            "Transmitís poca profesionalidad — Generás menos confianza desde el primer vistazo.",
          ],
          painNarrative: "Sin claridad visual, tu marca no comunica. Sin comunicación, no conecta. Y sin conexión, no vende.",
          painConclusion: "Una identidad débil te frena. Una identidad clara y estratégica acelera tu crecimiento.",
          painCta: "Quiero una identidad clara y profesional",
          includesTitle: "Qué Recibís",
          differentiatorsTitle: "Diferenciadores",
          differentiators: [
            "Estrategia + estética en equilibrio",
            "Diseño funcional (menos caos visual)",
            "Proceso claro y acompañado",
            "Identidad lista para escalar",
            "Coherencia que transmite confianza",
          ],
          processTitle: "Proceso simple",
          plansTitle: "Planes",
          plans: [
            {
              name: "Esencial — Identidad base",
              description: "Identidad base con lo esencial para lanzar.",
            },
            {
              name: "Profesional (Recomendado)",
              description: "Sistema completo listo para comunicar.",
              badge: "Recomendado",
            },
            {
              name: "Expansión — Completo",
              description: "Piezas extra + aplicaciones adicionales.",
            },
          ],
          planCta: "Elegir mi plan",
          faqTitle: "FAQ",
          faqs: [
            { question: "¿Cuánto tarda?", answer: "10–20 días según el plan." },
            { question: "¿Incluye ajustes?", answer: "Sí, en cada etapa revisamos y ajustamos." },
            { question: "¿Archivos editables?", answer: "Sí, listos para redes, impresión y web." },
            { question: "¿Necesito algo?", answer: "Solo completar el formulario inicial." },
          ],
          processCta: "Ver ejemplos y empezar",
          finalCtaTitle: "Tu marca merece una identidad clara y profesional.",
          finalCtaSubtitle: "Listo para crecer con coherencia en todos los canales.",
          finalCta: "Quiero mi identidad profesional",
          internalLinks: [
            { label: "Ver servicio Web", href: "/services/landing" },
            { label: "Ver portfolio", href: "#projects" },
            { label: "Ver servicio Marketing", href: "/services/marketing-digital" },
          ],
          schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Branding Profesional",
            provider: {
              "@type": "Organization",
              name: "Cosmic Studio",
              url: "https://cosmicst.dev",
            },
            description:
              "Servicio de branding profesional e identidad visual para emprendedores, negocios y marcas digitales. Diseños claros, coherentes y memorables.",
            areaServed: "Argentina, Latinoamérica, Estados Unidos",
            serviceType: "Branding Profesional",
          },
        },
        landing: {
          eyebrow: "Web Profesional & Rediseño Web",
          intro:
            "Creamos webs claras, rápidas y confiables que impulsan tu presencia digital. Si lanzás tu primera web, conectamos tu idea con el mundo. Si tu sitio se siente viejo o lento, lo renovamos con diseño inteligente y experiencia clara desde el primer vistazo.",
          whatsappMessage: "Hola, quiero mi web profesional 🚀",
          ctaNote: "Entrega 5–7 días + diseño + copy + optimización.",
          seoTitle: "Diseño Web Profesional & Rediseño Moderno | Cosmic Studio",
          seoDescription:
            "Webs claras, rápidas y confiables que generan confianza desde el primer vistazo.",
          heroCta: "Quiero mi web profesional",
          benefitsTitle: "Beneficios de un Diseño Web Profesional",
          benefitsIntro: "¿Por qué tener una web profesional?",
          benefits: [
            { title: "Sitio rápido y optimizado", description: "Mejor rendimiento, experiencia y posicionamiento." },
            { title: "Comunicación clara", description: "Tu mensaje llega en segundos, sin distractores." },
            { title: "Diseño moderno y confiable", description: "Profesionalismo desde la primera impresión." },
            { title: "100% adaptable a móviles", description: "Se ve perfecto en cualquier dispositivo." },
            { title: "Estructura lista para crecer", description: "Ideal para negocios que quieren escalar." },
          ],
          benefitsCta: "Quiero una web clara y profesional",
          outcomes: [
            "Tu propuesta queda clara y ordenada desde el primer scroll.",
            "Sitio rápido que inspira confianza y mejora conversiones.",
            "Versión mobile optimizada para captar clientes desde cualquier canal.",
            "Base lista para campañas, SEO y escalamiento sin rehacer el sitio.",
          ],
          painTitle: "Puntos de Dolor: Lo que pasa cuando NO tenés una web profesional",
          painIntro: "",
          painPoints: [
            "Tu web carga lento → perdés visitas",
            "El diseño se ve antiguo → baja confianza",
            "No se entiende lo que ofrecés → menos ventas",
            "No es responsive → mala experiencia en móvil",
            "Difícil de actualizar → dependés de terceros",
            "Marketing sin web sólida → resultados débiles",
          ],
          painConclusion: "Una web desactualizada te cuesta clientes todos los días.",
          painCta: "Quiero evitar estos problemas",
          includesTitle: "Qué Incluye Tu Diseño Web Profesional",
          deliverables: [
            "Diseño moderno y personalizado",
            "Estructura clara para comunicar tu propuesta",
            "Navegación intuitiva (UX)",
            "Textos optimizados",
            "Versión desktop + mobile",
            "Integración con redes / WhatsApp / formularios",
            "Optimización de velocidad + SEO base",
            "Capacitación para actualizar tu web",
          ],
          processTitle: "Nuestro Proceso Simple",
          steps: [
            { title: "Exploración", description: "Entendemos tu negocio, objetivo y estilo." },
            { title: "Diseño", description: "Armamos estructura + UI + contenido." },
            { title: "Desarrollo & Entrega", description: "Web lista, rápida, optimizada y fácil de usar." },
          ],
          processCta: "Ver ejemplos de webs",
          audience: [
            "Emprendedores que necesitan su primera web profesional",
            "Negocios locales que quieren verse confiables",
            "Marcas digitales que buscan mejorar su experiencia y claridad",
            "Proyectos que necesitan un rediseño para actualizar imagen y performance",
          ],
          internalLinks: [
            { label: "Ver servicio Branding", href: "/services/branding-identidad-visual" },
            { label: "Ver servicio Marketing", href: "/services/marketing-digital" },
            { label: "Ver Portfolio", href: "#projects" },
          ],
          differentiatorsTitle: "Diferenciadores",
          differentiators: [
            "Diseño limpio, moderno y enfocado en conversión",
            "Experiencia y claridad como prioridad",
            "Webs rápidas, SEO friendly y estables",
            "Proceso guiado y sin estrés",
            "Entrega en días, no semanas",
          ],
          plansTitle: "Planes",
          plans: [
            { name: "Web Starter", description: "Ideal para primera web." },
            { name: "Web Profesional (Recomendado)", description: "Diseño + estrategia + optimización.", badge: "Recomendado" },
            { name: "Web Rediseño Total", description: "Actualización completa + mejoras UX/UI." },
          ],
          planCta: "Elegir mi plan",
          faqTitle: "FAQ",
          faqs: [
            { question: "¿La web es autoadministrable?", answer: "Sí, podrás actualizarla fácilmente." },
            { question: "¿Incluye SEO?", answer: "Incluye SEO base + optimización técnica." },
            { question: "¿En qué se desarrolla?", answer: "En plataformas rápidas y flexibles." },
            { question: "¿Puedo escalar después?", answer: "Sí, tu web queda lista para crecer." },
          ],
          finalCtaTitle: "Tu web es tu carta de presentación. Hagamos una que inspire confianza y genere resultados.",
          finalCta: "Quiero mi web profesional",
          schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Diseño Web Profesional",
            provider: {
              "@type": "Organization",
              name: "Cosmic Studio",
              url: "https://cosmicst.dev",
            },
            description:
              "Diseño web profesional y rediseño moderno para emprendedores y negocios. Webs claras, rápidas y confiables listas para crecer.",
            areaServed: "Argentina, Latinoamérica, Estados Unidos",
            serviceType: "Diseño Web Profesional",
          },
        },
        "ecommerce-profesional": {
          eyebrow: "Ecommerce Profesional & Tiendas Online a Medida",
          intro:
            "Creamos tiendas online rápidas, claras y optimizadas para vender más. Diseñamos experiencias modernas, escalables y alineadas a tu marca, sin plantillas genéricas.",
          whatsappMessage: "Hola, quiero mi ecommerce profesional 🚀",
          ctaNote: "Incluye diseño a medida, UX, integraciones y optimización.",
          seoTitle: "Ecommerce Profesional y Tiendas Online a Medida | Cosmic Studio",
          seoDescription:
            "Ecommerce profesional y tiendas online a medida para emprendedores y negocios. Tiendas rápidas, claras y optimizadas para vender más, integradas con pagos, envíos e inventario.",
          heroCta: "Quiero mi ecommerce profesional",
          benefitsTitle: "Beneficios de un Ecommerce Profesional",
          benefitsIntro: "¿Por qué un ecommerce profesional vende más?",
          benefits: [
            { title: "Optimizado para convertir", description: "Diseño inteligente que guía al cliente a la compra." },
            { title: "Rápido y confiable", description: "Velocidad = menos abandono y más ventas." },
            { title: "100% a medida y alineado a tu marca", description: "Sin plantillas. Tu tienda se siente única y profesional." },
            { title: "Integrado con todo lo que necesitás", description: "Pagos, envíos, inventario, automatizaciones, emails, CRM." },
            { title: "Operación simple y escalable", description: "Backend ordenado para crecer sin fricción." },
          ],
          benefitsCta: "Quiero una tienda que venda más",
          outcomes: [
            "Experiencia de compra clara que aumenta la conversión.",
            "Checkout optimizado con pagos y envíos integrados.",
            "Operación ordenada: inventario, pedidos y automatizaciones en un solo flujo.",
            "Base tecnológica lista para campañas, remarketing y escalamiento.",
          ],
          painTitle: "Puntos de Dolor: Lo que pasa cuando NO tenés un ecommerce profesional",
          painIntro: "",
          painPoints: [
            "Tus clientes abandonan porque la tienda es lenta.",
            "El diseño no inspira confianza → menos ventas.",
            "Comprar se vuelve complicado → mala experiencia.",
            "No podés integrar pagos o envíos correctamente.",
            "El inventario y pedidos se vuelven un caos.",
            "El marketing pierde impacto sin una tienda sólida.",
          ],
          painConclusion: "Un ecommerce débil no vende y te hace perder oportunidades todos los días.",
          painCta: "Quiero evitar estos problemas",
          includesTitle: "Qué Incluye Tu Ecommerce Profesional",
          deliverables: [
            "Diseño 100% personalizado",
            "Arquitectura clara enfocada en conversión",
            "Páginas de producto optimizadas",
            "Carrito + checkout intuitivo",
            "Integración de pagos y envíos",
            "Gestión de inventario y pedidos",
            "Automatizaciones (emails, estados, avisos)",
            "Dashboard fácil de usar",
            "SEO base + velocidad optimizada",
            "Capacitación para que puedas operarlo",
          ],
          processTitle: "Nuestro Proceso",
          steps: [
            { title: "Exploración", description: "Negocio, productos, necesidades y estilo." },
            { title: "Arquitectura", description: "Estructura, rutas, categorías, UX." },
            { title: "Diseño", description: "UI clara, moderna y alineada a tu marca." },
            { title: "Desarrollo", description: "Funcionalidades, integraciones y checkout." },
            { title: "Entrega", description: "Tienda lista para vender + tutorial de uso." },
          ],
          processCta: "Ver ejemplos de tiendas online",
          audience: [
            "Emprendedores que quieren empezar a vender online",
            "Negocios físicos que buscan digitalizarse",
            "Marcas en crecimiento que necesitan una tienda sólida",
            "Proyectos que superaron plataformas básicas (ej.: Tiendanube)",
            "Equipos que necesitan más control, diseño y escalabilidad",
          ],
          internalLinks: [
            { label: "Ver servicio Web", href: "/services/landing" },
            { label: "Ver servicio Branding", href: "/services/branding-identidad-visual" },
            { label: "Ver Marketing", href: "/services/marketing-digital" },
          ],
          differentiatorsTitle: "Diferenciadores",
          differentiators: [
            "Tiendas rápidas, seguras y optimizadas",
            "Checkout intuitivo que aumenta conversiones",
            "Integraciones reales (no parches ni workarounds)",
            "Diseño profesional alineado a tu identidad",
            "Escalabilidad garantizada para crecer sin límites",
          ],
          plansTitle: "Planes",
          plans: [
            { name: "Ecommerce Starter", description: "Base optimizada para empezar a vender." },
            { name: "Ecommerce Profesional (Recomendado)", description: "Diseño + integraciones + automatizaciones.", badge: "Recomendado" },
            { name: "Ecommerce Escala", description: "Más funcionalidades, personalizaciones y soporte de crecimiento." },
          ],
          planCta: "Elegir este plan",
          faqTitle: "FAQ",
          faqs: [
            { question: "¿Incluye integraciones de pago y envío?", answer: "Sí, configuramos pagos y envíos listos para usar." },
            { question: "¿Puedo manejar inventario y pedidos?", answer: "Sí, con dashboard simple y organizado." },
            { question: "¿Es escalable?", answer: "Sí, lo preparamos para crecer en catálogo y tráfico." },
            { question: "¿Incluye SEO?", answer: "Incluye SEO base y optimización de velocidad." },
          ],
          finalCtaTitle: "Tu tienda online es tu negocio abierto 24/7. Hagamos que venda más, mejor y con menos fricción.",
          finalCta: "Quiero mi ecommerce profesional",
          schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Ecommerce Profesional",
            provider: {
              "@type": "Organization",
              name: "Cosmic Studio",
              url: "https://cosmicst.dev",
            },
            description:
              "Ecommerce profesional y tiendas online a medida para emprendedores y negocios. Tiendas rápidas, claras y optimizadas para vender más con pagos, envíos e inventario integrados.",
            areaServed: "Argentina, Latinoamérica, Estados Unidos",
            serviceType: "Ecommerce Profesional",
          },
        },
        strategy: {
          eyebrow: "Software a Medida & Sistemas Personalizados",
          intro:
            "Un solo sistema. Todo tu negocio funcionando. Integramos ventas, inventario, logística, proveedores, clientes, tareas, reportes y automatizaciones en un mismo lugar.",
          whatsappMessage: "Hola, quiero mi sistema a medida 🚀",
          ctaNote: "Incluye arquitectura, UX/UI, desarrollo, integraciones y automatizaciones.",
          seoTitle: "Software a Medida y Sistemas Personalizados | Cosmic Studio",
          seoDescription:
            "Software a medida y sistemas personalizados que integran ventas, inventario, logística, proveedores y clientes. Orden, automatización y control para escalar sin caos.",
          heroCta: "Quiero mi sistema a medida",
          benefitsTitle: "Beneficios de un Software a Medida",
          benefitsIntro: "¿Por qué un sistema propio ordena y escala tu negocio?",
          benefits: [
            { title: "Todo centralizado en un solo lugar", description: "Evitá usar 10 herramientas distintas para tareas simples." },
            { title: "Control total de tu operación", description: "Reportes claros, datos ordenados y decisiones más inteligentes." },
            { title: "Ahorro de tiempo en tareas repetitivas", description: "Automatizamos procesos para que tu equipo trabaje mejor." },
            { title: "Integración real con ventas, inventario y logística", description: "Nada queda por fuera. Todo se conecta." },
            { title: "Preparado para escalar", description: "Crece con tu negocio sin depender de soluciones genéricas." },
          ],
          benefitsCta: "Quiero un sistema que ordene mi operación",
          outcomes: [
            "Operación centralizada con datos confiables en un mismo sistema.",
            "Automatizaciones que eliminan tareas manuales y reducen errores.",
            "Integración completa entre ventas, stock, logística y finanzas.",
            "Visibilidad en tiempo real para decidir y escalar sin caos.",
          ],
          painTitle: "Puntos de Dolor: Lo que pasa cuando NO tenés un sistema propio",
          painIntro: "",
          painPoints: [
            "Usar Excel, WhatsApp y apps sueltas → caos asegurado",
            "Información desordenada → errores costosos",
            "Inventario mal gestionado → pérdidas o quiebres de stock",
            "Procesos manuales → tu equipo pierde horas al día",
            "Falta de visibilidad → no sabés qué funciona y qué no",
            "Sistemas genéricos que no se adaptan a tu negocio",
          ],
          painConclusion: "Un negocio sin sistema propio crece hasta que el caos lo frena.",
          painCta: "Quiero evitar estos problemas",
          includesTitle: "Qué Incluye Tu Sistema Personalizado",
          deliverables: [
            "Diseño de arquitectura según tu operación real",
            "Módulos de ventas, proveedores, clientes y logística",
            "Control de inventario y alertas por stock",
            "Tareas, tickets y automatizaciones",
            "Estado de pagos, facturas y comprobantes",
            "Reportes inteligentes",
            "Roles y permisos para tu equipo",
            "App web rápida, segura y escalable",
            "Capacitación para uso interno",
          ],
          processTitle: "Nuestro Proceso",
          steps: [
            { title: "Diagnóstico", description: "Analizamos operación, flujos y necesidades." },
            { title: "Arquitectura del sistema", description: "Módulos, lógica y automatizaciones." },
            { title: "Diseño UX/UI", description: "Interfaces claras, rápidas y fáciles de usar." },
            { title: "Desarrollo", description: "Funcionalidades, integraciones y pruebas." },
            { title: "Implementación y capacitación", description: "Sistema funcionando desde el día uno." },
          ],
          processCta: "Ver ejemplos de sistemas",
          audience: [
            "Negocios en crecimiento",
            "Tiendas físicas o ecommerce",
            "Distribuidores y mayoristas",
            "Equipos operativos con alto volumen de tareas",
            "Empresas que quieren orden, control y automatización real",
            "Negocios que superaron soluciones genéricas como Excel o apps básicas",
          ],
          internalLinks: [
            { label: "Ver servicio Web", href: "/services/landing" },
            { label: "Ver servicio Ecommerce", href: "/services/ecommerce-profesional" },
            { label: "Ver Portfolio", href: "#projects" },
          ],
          differentiatorsTitle: "Diferenciadores",
          differentiators: [
            "Sistema construido 100% a medida",
            "Pensado para tu operación real, no un modelo estándar",
            "Integración completa entre módulos y áreas",
            "Interfaz clara, moderna y fácil de usar",
            "Escalabilidad garantizada (crece con tu negocio)",
            "Proceso acompañado y soporte",
          ],
          planCta: "Quiero mi sistema a medida",
          finalCtaTitle: "Tu negocio merece un sistema que ordene, automatice y permita crecer sin caos.",
          finalCtaSubtitle: "Software profesional, robusto y totalmente alineado a tus necesidades.",
          finalCta: "Quiero mi sistema a medida",
          schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Software a Medida",
            provider: {
              "@type": "Organization",
              name: "Cosmic Studio",
              url: "https://cosmicst.dev",
            },
            description:
              "Servicio de software a medida y sistemas personalizados que integran ventas, inventario, logística, proveedores, clientes y automatizaciones para ordenar y escalar tu operación.",
            areaServed: "Argentina, Latinoamérica, Estados Unidos",
            serviceType: "Software a Medida",
          },
        },
        "marketing-digital": {
          eyebrow: "Marketing Digital Estratégico",
          intro:
            "Tener presencia digital no alcanza: necesitás una estrategia clara, coherente y medible que conecte con la audiencia correcta. Creamos planes de marketing que integran contenido profesional, campañas pagas, segmentación, copywriting persuasivo, analítica y optimización continua. No hacemos \"solo redes\": construimos crecimiento real basado en estrategia, creatividad y datos.",
          whatsappMessage: "Hola, quiero mi estrategia de marketing ✨",
          ctaNote: "Estrategia, creatividad y datos alineados para crecer con intención.",
          seoTitle: "Marketing Digital Estratégico | Cosmic Studio",
          seoDescription:
            "Marketing Digital Estratégico para marcas que buscan crecer con intención. Estrategia clara, contenido profesional, campañas pagas y optimización continua.",
          heroCta: "Ver servicio de Marketing",
          benefitsTitle: "Beneficios del Marketing Digital Estratégico",
          benefitsIntro: "¿Por qué una estrategia clara y medible?",
          benefits: [
            {
              title: "Estrategia clara y personalizada",
              description: "Objetivos, audiencia, mensaje y posicionamiento alineados para crecer con intención.",
            },
            {
              title: "Contenido y campañas profesionales",
              description: "Creatividad + ejecución: anuncios, redes, landings, copies y piezas visuales.",
            },
            {
              title: "Medición, análisis y optimización constante",
              description: "Tomás decisiones con datos reales, no con intuición.",
            },
          ],
          benefitsCta: "Quiero una estrategia que funcione",
          outcomes: [
            "Ruta de marketing alineada a objetivos y métricas claras.",
            "Contenido y campañas que conectan con la audiencia correcta.",
            "Optimización constante basada en datos y experimentos.",
            "Mensajes coherentes en landings, anuncios y redes.",
          ],
          painTitle: "Lo que pasa sin una estrategia de marketing",
          painIntro: "",
          painPoints: [
            "Publicar sin objetivo → no genera resultados",
            "Anuncios mal segmentados → desperdicio de dinero",
            "Redes sin estrategia → no atraen clientes reales",
            "Contenido sin coherencia → tu marca se debilita",
            "No medir → no sabés qué funciona",
            "Crecimiento estancado → la competencia avanza",
          ],
          painConclusion: "No es falta de talento. Es falta de estrategia.",
          painCta: "Quiero dejar de improvisar",
          includesTitle: "Qué Incluye tu Plan de Marketing Estratégico",
          deliverables: [
            "Estrategia completa: posicionamiento, audiencia, mensaje",
            "Matriz de contenido mensual",
            "Guión y copywriting profesional",
            "Creación de anuncios + segmentación",
            "Optimización semanal según datos",
            "Reportes simples y accionables",
            "Recomendaciones de mejora continua",
            "Integración con Branding / Web / Ecommerce",
          ],
          processTitle: "Nuestro Proceso Estratégico",
          steps: [
            { title: "Diagnóstico", description: "Entendemos tu marca, contexto y objetivos." },
            { title: "Estrategia", description: "Definimos posicionamiento, mensajes y lineamientos." },
            { title: "Implementación", description: "Contenido, anuncios, landings y creatividad." },
            { title: "Medición", description: "Datos claros, reportes y optimización constante." },
          ],
          processCta: "Ver ejemplos de estrategias",
          audience: [
            "Marcas con Branding / Web / Ecommerce que buscan escalar",
            "Emprendimientos que quieren crecer con estrategia real",
            "Proyectos que necesitan profesionalizar contenido y anuncios",
            "Negocios que quieren atraer clientes y no solo seguidores",
            "Empresas que requieren decisiones basadas en datos",
          ],
          internalLinks: [
            { label: "Ver servicio Web", href: "/services/landing" },
            { label: "Ver servicio Branding", href: "/services/branding-identidad-visual" },
            { label: "Ver servicio Ecommerce", href: "/services/ecommerce-profesional" },
          ],
          differentiatorsTitle: "Diferenciadores",
          differentiators: [
            "Estrategia + creatividad + datos (equilibrio real)",
            "Copys persuasivos diseñados para convertir",
            "Campañas segmentadas que atraen clientes reales",
            "Reportes claros → decisiones más inteligentes",
            "Proceso personalizado (no genérico, no plantillas)",
          ],
          planCta: "Quiero mi estrategia de marketing",
          finalCtaTitle: "Tu marca necesita algo más que presencia: necesita dirección.",
          finalCtaSubtitle: "Estrategia clara para crecer con intención y resultados.",
          finalCta: "Quiero mi estrategia de marketing",
          schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Marketing Digital Estratégico",
            provider: {
              "@type": "Organization",
              name: "Cosmic Studio",
              url: "https://cosmicst.dev",
            },
            description:
              "Servicio de marketing digital estratégico con contenido profesional, campañas pagas, segmentación, analítica y optimización continua para marcas que buscan crecer con intención.",
            areaServed: "Argentina, Latinoamérica, Estados Unidos",
            serviceType: "Marketing Digital Estratégico",
          },
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
      titleHighlight: "branding",
      titleRotateOptions: ["branding?", "marketing?", "sistema?", "sitio web?", "ecommerce?"],
      titleAfterHighlight: "",
      description: "Conectemos y diseñemos experiencias digitales que evolucionan.",
      nameLabel: "TU NOMBRE / NEGOCIO",
      namePlaceholder: "Nombre o negocio",
      messageLabel: "MENSAJE",
      messagePlaceholder: "Escribe tu mensaje...",
      interestLabel: "Me interesa",
      interestHelper: "Selecciona uno o varios servicios",
      interestPlaceholder: "Selecciona servicios",
      interestOptions: [
        { id: "branding-identidad-visual", label: "Branding e identidad visual" },
        { id: "landing", label: "Diseño web y landing page" },
        { id: "ecommerce-profesional", label: "Tiendas online premium" },
        { id: "strategy", label: "Software a medida" },
        { id: "marketing-digital", label: "Marketing digital" },
      ],
      interestIntro: "Hola. Quiero saber más sobre",
      interestFallback: "los servicios de Cosmic Studio",
      defaultMessage: "Hola. Quiero saber más sobre los servicios de Cosmic Studio.",
      directMessageLabel: "Mensaje directo",
      sendEmailLabel: "Enviar por correo",
      sendWhatsappLabel: "Enviar por WhatsApp",
      greetingPrefix: "Hola, soy",
      nameFallback: "un potencial cliente",
      emailSubject: "Nuevo mensaje desde Cosmic Studio",
      buttonLabel: "Contactar equipo",
      contactLine: "→ info.cosmicst@gmail.com",
      socials: [
        { label: "LinkedIn", href: "https://www.linkedin.com/company/cosmic-st/" },
        { label: "Instagram", href: "https://www.instagram.com/cosmicstudio.ig/" },
      ],
      footerNote: "© {year} Cosmic Studio. Todos los derechos reservados.",
      systemStatus: "Sistema activo",
    },
  },
  en: {
    metadata: {
      title: "Cosmic Studio | Creative studio & digital agency for branding, web design and systems",
      description:
        "Professional branding, web design, ecommerce, UX/UI design, digital marketing and custom web development. Bilingual studio crafting high-converting landing pages, digital products and growth systems.",
      ogTitle: "Cosmic Studio — Branding, web design and digital systems",
      ogDescription:
        "Creative studio and digital agency. Branding, professional websites, ecommerce, digital marketing and custom software in EN/ES for brands ready to scale.",
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
      title: "Strategy, design, and technology",
      highlight: "to power your business.",
      description: "Marketing, branding and web solutions in one universe.",
      cta: "Explore services",
    },
    process: {
      eyebrow: "HOW WE WORK",
      title: "A clear path from start to finish",
      steps: [
        {
          title: "Clear diagnosis",
          description: "We analyze your brand, needs, and growth stage.",
        },
        {
          title: "Strategic design",
          description: "We craft visual and digital solutions with purpose, not templates.",
        },
        {
          title: "Clean implementation",
          description: "Design, development, and automation with smooth processes and clear communication.",
        },
        {
          title: "Professional delivery",
          description: "Complete deliverables, organized and ready to use.",
        },
        {
          title: "Continuous evolution",
          description: "We support you so your brand grows with order.",
        },
      ],
      editorialAlt: "Abstract workflow illustration with light paths and clean geometric forms",
    },
    about: {
      eyebrow: "WHO WE ARE",
      title: "We are Cosmic Studio",
      paragraphs: [
        "A design and technology studio that blends strategy, clarity, and modern tools to build digital experiences that keep evolving.",
        "We craft brands, websites, online stores, and tailored solutions with an editorial, functional, and organized approach.",
        "Our process combines product thinking, clean design, and technology built to scale.",
      ],
      abstractAlt: "Photo of the Cosmic Studio team working in their studio",
      studioAlt: "Photo of the Cosmic Studio workspace",
      studioCaption: "An orderly studio for clear ideas.",
    },
    manifesto: {
      tagline: "We digitize your processes so your business grows with order, clarity, and efficiency.",
      headline: "We digitize your operations so your business works better.",
      subheadline:
        "We turn your business steps into a simple, visual, efficient digital system that organizes operations and gives you back time.",
      cards: [
        {
          title: "Operational problems slowing your business",
          items: [
            "Orders scattered across WhatsApp, Excel, or notebooks.",
            "Repetitive tasks that eat up time.",
            "No real control of stock and expirations."
          ],
        },
        {
          title: "Limited management and decisions without information",
          items: [
            "Excessive workload and feeling like you're putting out fires all day.",
            "Incomplete or outdated information when it's time to decide.",
            "Dependence on one person to keep everything running."
          ],
        },
        {
          title: "Real business goals",
          items: [
            "Grow without burning out the team.",
            "Have clear, centralized information in one system.",
            "Make decisions with reliable data, not just intuition."
          ],
        },
      ],
    },
    services: {
      heading: "Services",
      description:
        "Clear design, automated processes, and a strategy that keeps every interaction with your brand coherent.",
      scrollHint: "",
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
        examplesTitle: "Real examples",
        englishVersionTitle: "English version",
        instagramTitle: "IG short version",
        pitchTitle: "Quick pitch",
        ctaTitle: "Ready to start?",
        ctaSubtitle: "Send us a note and we'll share the fastest path for your case.",
        contactCta: "Chat on WhatsApp",
      },
      items: {
        "branding-identidad-visual": {
          eyebrow: "Branding & Visual Identity",
          title: "Professional Branding for Brands that Want to Grow",
          headline:
            "Visual identities that organize, differentiate, and elevate your brand.",
          description:
            "We design coherent, memorable visual systems that build trust from the first glance.",
          benefit:
            "Entrepreneurs, businesses, and digital brands that need a clear, coherent, memorable visual identity.",
          estimatedTime: "Estimated delivery: 15–25 days depending on the plan",
          startingPrice: "Investment from USD 280",
          imageSrc: "/Servicios/AURO.PNG",
          imageSide: "right",
          features: [
            {
              title: "🎨 Visual identity + integral system",
              description: "Logo, palette, typography, visual style, and rules ready to apply consistently across platforms.",
            },
            {
              title: "🧬 Narrative and purpose that connect",
              description: "Voice, core message, and how to communicate to attract the right audience.",
            },
            {
              title: "🚀 Built to grow",
              description: "A flexible, modern brand for social, web, campaigns, and expansion.",
            },
          ],
          audience: [
            "Entrepreneurs who need a solid identity to launch or relaunch.",
            "Local businesses that want to look more professional and attract better clients.",
            "Digital brands seeking consistency across social, web, and content.",
            "Growing projects that need a scalable visual system.",
            "Teams or freelancers that want an identity that signals trust.",
          ],
          ctaLabel: "View Branding service",
          imageAlt: "Clean brandboard with logo, palette, and typography by Cosmic Studio",
        },
        landing: {
          eyebrow: "Professional Web Design",
          title: "We create clear, fast, trustworthy websites that boost your digital presence.",
          description:
            "We build clear, fast, reliable websites that represent your brand with precision. If your site feels old or slow, we refresh it with smart, strategic design.",
          estimatedTime: "Estimated delivery: 5–7 days",
          startingPrice: "Investment from USD 120",
          benefit:
            "Entrepreneurs, local businesses, and digital brands that need a professional, clear site ready to grow.",
          ctaLabel: "View Web service",
          imageAlt: "Example of professional web design and modern redesign by Cosmic Studio",
          imageSrc: "/Serviciosweb.jpg",
          imageSide: "left",
        },
        "ecommerce-profesional": {
          eyebrow: "Professional Ecommerce",
          title: "We build fast, clear online stores optimized to sell more.",
          description:
            "Custom designs—no generic templates—with a modern experience aligned to your brand. Fast, clear, optimized to sell more, with payments, shipping, and inventory integrated.",
          estimatedTime: "Estimated delivery: 15–30 days depending on features",
          startingPrice: "Investment from USD 300",
          benefit:
            "Entrepreneurs, physical shops, and growing brands that need a reliable, scalable store to sell more with a modern experience.",
          ctaLabel: "View Ecommerce service",
          imageSrc: "/Serviciosweb.jpg",
          imageAlt: "Professional ecommerce store designed by Cosmic Studio",
          imageSide: "right",
        },
        "marketing-digital": {
          eyebrow: "Digital Marketing",
          title: "Make your brand grow.",
          description:
            "Presence alone isn’t enough—you need a clear, measurable strategy. We build marketing plans that blend professional content, persuasive copy, paid campaigns, segmentation, analytics, and continuous optimization.",
          estimatedTime: "Estimated delivery: 7–10 days for the initial strategy.",
          startingPrice: "Investment from USD 120.",
          benefit:
            "Brands with branding/web/ecommerce, ventures, and businesses that want to grow with real strategy and decisions based on data.",
          ctaLabel: "View Marketing service",
          imageSrc: "/pew.png",
          imageAlt: "Professional digital marketing strategy",
          imageSide: "left",
        },
        strategy: {
          eyebrow: "Custom Software",
          title: "One system. Your entire business running.",
          description:
            "Custom software that integrates sales, inventory, logistics, suppliers, customers, tasks, reports, and automations in one place.",
          estimatedTime: "Estimated delivery: 30–60 days",
          startingPrice: "Investment from USD 350",
          benefit:
            "Businesses, shops, distributors, and operations teams that need order, visibility, and real automation to scale without chaos.",
          ctaLabel: "View Systems service",
          imageSrc: "/gestock.png",
          imageAlt: "Custom business software system",
          imageSide: "left",
        },
      },
      details: {
        "branding-identidad-visual": {
          eyebrow: "Professional Branding & Visual Identity",
          intro:
            "We create professional visual identities that organize, communicate, and differentiate your brand from the first second.",
          outcomes: [
            "Your brand stops looking like everyone else and becomes memorable.",
            "Clear communication: your value is understood in seconds.",
            "Narrative and style aligned to your purpose to attract the ideal client.",
            "Less improvisation: you save time with a defined visual system.",
            "Professional, coherent presence across every channel.",
          ],
          steps: [
            {
              title: "Discovery → essence and vision",
              description: "We gather purpose, goals, and desired style.",
            },
            {
              title: "Design → proposals + refinements",
              description: "We develop visual options and refine with feedback.",
            },
            {
              title: "Final delivery → ready-to-use files",
              description: "We hand off the full system prepared for social, web, and presentations.",
            },
          ],
          deliverables: [
            "Primary logo + variations",
            "Professional palette",
            "Selected typography",
            "Complete visual system",
            "Brand narrative",
            "Usage guide",
            "Ready applications (social, web, presentations)",
          ],
          ctaNote: "Professional, coherent branding ready to use.",
          whatsappMessage: "Hi, I want my professional identity with Cosmic Studio ✨",
          pitch:
            "Professional branding for brands that want to grow. Clear, coherent visual identity ready to use across every channel.",
          seoTitle: "Professional Branding & Visual Identity | Cosmic Studio",
          seoDescription:
            "Professional branding for entrepreneurs and businesses. We design clear, coherent, memorable visual identities that elevate your digital presence and build trust.",
          heroCta: "I want my professional identity",
          benefitsTitle: "Benefits of Professional Branding",
          benefitsIntro: "Why choose professional branding?",
          benefitsNarrative: "A solid identity organizes your brand, communicates better, and fuels growth.",
          benefits: [
            {
              title: "Immediate differentiation",
              description: "Your brand stops blending in and becomes recognizable at a glance.",
            },
            {
              title: "Clear communication",
              description: "Your message is understood without extra explanations: you convey value with clarity.",
            },
            {
              title: "Attract your ideal client",
              description: "You show who you are and connect with the people who truly value your offer.",
            },
            {
              title: "Coherent digital presence",
              description: "Aligned across social, web, and content so you project trust everywhere.",
            },
          ],
          benefitsCta: "I want a professional visual identity",
          painTitle: "Without professional branding… your brand loses opportunities.",
          painIntro: "These are the hidden costs you pay every day:",
          painPoints: [
            "They don't remember you — your brand gets lost among many and doesn't stay top of mind.",
            "Your message confuses — people don't understand what you offer or why they should choose you.",
            "Your efforts perform worse — you invest time and money in content, marketing, or ads without clear return.",
            "You convey less professionalism — you generate less trust from the first glance.",
          ],
          painNarrative:
            "Without visual clarity, your brand doesn't communicate. Without communication, it doesn't connect. And without connection, it doesn't sell.",
          painConclusion: "A weak identity slows you down. A clear, strategic identity accelerates your growth.",
          painCta: "I want a clear, professional identity",
          includesTitle: "What You Receive",
          differentiatorsTitle: "Differentiators",
          differentiators: [
            "Strategy + aesthetics in balance",
            "Functional design (less visual chaos)",
            "Clear, guided process",
            "Identity ready to scale",
            "Coherence that signals trust",
          ],
          processTitle: "Simple process",
          plansTitle: "Plans",
          plans: [
            { name: "Essential — Core identity", description: "Base identity with the essentials to launch." },
            {
              name: "Professional (Recommended)",
              description: "Complete system ready to communicate.",
              badge: "Recommended",
            },
            {
              name: "Expansion — Complete",
              description: "Extra pieces + additional applications.",
            },
          ],
          planCta: "Choose my plan",
          faqTitle: "FAQ",
          faqs: [
            { question: "How long does it take?", answer: "10–20 days depending on the plan." },
            { question: "Does it include revisions?", answer: "Yes, we review and adjust at each stage." },
            { question: "Do I get editable files?", answer: "Yes, ready for social, print, and web." },
            { question: "Do I need to bring anything?", answer: "Just complete the initial form." },
          ],
          processCta: "See examples and start",
          finalCtaTitle: "Your brand deserves a clear, professional identity.",
          finalCtaSubtitle: "Ready to grow with coherence across every channel.",
          finalCta: "I want my professional identity",
          internalLinks: [
            { label: "See Web service", href: "/services/landing" },
            { label: "See portfolio", href: "#projects" },
            { label: "See Marketing service", href: "/services/marketing-digital" },
          ],
          schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Professional Branding",
            provider: {
              "@type": "Organization",
              name: "Cosmic Studio",
              url: "https://cosmicst.dev",
            },
            description:
              "Professional branding and visual identity service for entrepreneurs, businesses, and digital brands. Clear, coherent, memorable designs.",
            areaServed: "Argentina, Latin America, United States",
            serviceType: "Professional Branding",
          },
        },
        landing: {
          eyebrow: "Professional Web & Web Redesign",
          intro:
            "We create clear, fast, trustworthy websites that boost your digital presence. Launching your first site? We connect your idea with the world. If your site feels old or slow, we refresh it with smart design and a clear experience from the first glance.",
          whatsappMessage: "Hi, I want my professional website 🚀",
          ctaNote: "Delivery 5–7 days + design + copy + optimization.",
          seoTitle: "Professional Web Design & Modern Redesign | Cosmic Studio",
          seoDescription:
            "Professional web design and modern redesign for entrepreneurs and businesses. Clear, fast, trustworthy sites that inspire confidence from the first glance.",
          heroCta: "I want my professional website",
          benefitsTitle: "Benefits of a Professional Website",
          benefitsIntro: "Why have a professional website?",
          benefits: [
            { title: "Fast and optimized site", description: "Better performance, experience, and positioning." },
            { title: "Clear communication", description: "Your message lands in seconds, without distractions." },
            { title: "Modern, trustworthy design", description: "Professionalism from the first impression." },
            { title: "100% mobile-ready", description: "Looks perfect on any device." },
            { title: "Structure ready to grow", description: "Ideal for businesses that want to scale." },
          ],
          benefitsCta: "I want a clear, professional website",
          outcomes: [
            "Your offer stays clear and organized from the first scroll.",
            "Fast site that inspires trust and improves conversions.",
            "Optimized mobile version to capture clients from any channel.",
            "Base ready for campaigns, SEO, and scaling without rebuilding the site.",
          ],
          painTitle: "Pain points: What happens when you DON’T have a professional website",
          painIntro: "",
          painPoints: [
            "Your site loads slowly → you lose visits",
            "The design looks outdated → trust drops",
            "What you offer isn’t clear → fewer sales",
            "Not responsive → bad experience on mobile",
            "Hard to update → you depend on others",
            "Marketing without a solid site → weak results",
          ],
          painConclusion: "An outdated site costs you clients every day.",
          painCta: "I want to avoid these problems",
          includesTitle: "What Your Professional Web Design Includes",
          deliverables: [
            "Modern, custom design",
            "Clear structure to communicate your offer",
            "Intuitive navigation (UX)",
            "Optimized copy",
            "Desktop + mobile versions",
            "Integration with social / WhatsApp / forms",
            "Speed optimization + basic SEO",
            "Training so you can update your site",
          ],
          processTitle: "Our Simple Process",
          steps: [
            { title: "Discovery", description: "We understand your business, goal, and style." },
            { title: "Design", description: "We assemble structure + UI + content." },
            { title: "Development & Delivery", description: "Site ready, fast, optimized, and easy to use." },
          ],
          processCta: "See website examples",
          audience: [
            "Entrepreneurs who need their first professional website",
            "Local businesses that want to look trustworthy",
            "Digital brands seeking better experience and clarity",
            "Projects needing a redesign to refresh image and performance",
          ],
          internalLinks: [
            { label: "See Branding service", href: "/services/branding-identidad-visual" },
            { label: "See Marketing service", href: "/services/marketing-digital" },
            { label: "See Portfolio", href: "#projects" },
          ],
          differentiatorsTitle: "Differentiators",
          differentiators: [
            "Clean, modern, conversion-focused design",
            "Experience and clarity as a priority",
            "Fast, SEO-friendly, stable sites",
            "Guided, low-stress process",
            "Delivery in days, not weeks",
          ],
          plansTitle: "Plans",
          plans: [
            { name: "Web Starter", description: "Ideal for a first website." },
            {
              name: "Web Professional (Recommended)",
              description: "Design + strategy + optimization.",
              badge: "Recommended",
            },
            { name: "Web Total Redesign", description: "Full refresh + UX/UI improvements." },
          ],
          planCta: "Choose my plan",
          faqTitle: "FAQ",
          faqs: [
            { question: "Is the site self-manageable?", answer: "Yes, you'll be able to update it easily." },
            { question: "Does it include SEO?", answer: "Includes basic SEO + technical optimization." },
            { question: "What is it built on?", answer: "On fast, flexible platforms." },
            { question: "Can I scale later?", answer: "Yes, your site will be ready to grow." },
          ],
          finalCtaTitle: "Your website is your introduction. Let's make one that inspires trust and delivers results.",
          finalCta: "I want my professional website",
          schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Professional Web Design",
            provider: {
              "@type": "Organization",
              name: "Cosmic Studio",
              url: "https://cosmicst.dev",
            },
            description:
              "Professional web design and modern redesign for entrepreneurs and businesses. Clear, fast, trustworthy sites ready to grow.",
            areaServed: "Argentina, Latin America, United States",
            serviceType: "Professional Web Design",
          },
        },
        "ecommerce-profesional": {
          eyebrow: "Professional Ecommerce & Custom Online Stores",
          intro:
            "We create fast, clear, conversion-optimized online stores. Modern, scalable experiences aligned to your brand, without generic templates.",
          whatsappMessage: "Hi, I need a professional ecommerce optimized to sell",
          ctaNote: "Includes custom design, UX, integrations, and optimization.",
          seoTitle: "Professional Ecommerce & Custom Online Stores | Cosmic Studio",
          seoDescription:
            "Professional ecommerce and custom online stores for entrepreneurs and businesses. Fast, clear, conversion-optimized stores with payments, shipping, and inventory integrated.",
          heroCta: "I want my professional ecommerce",
          benefitsTitle: "Benefits of a Professional Ecommerce",
          benefitsIntro: "Why does a professional ecommerce sell more?",
          benefits: [
            { title: "Optimized to convert", description: "Smart design that guides the customer to purchase." },
            { title: "Fast and reliable", description: "Speed = less abandonment and more sales." },
            {
              title: "100% custom and aligned to your brand",
              description: "No templates. Your store feels unique and professional.",
            },
            {
              title: "Integrated with everything you need",
              description: "Payments, shipping, inventory, automations, emails, CRM.",
            },
            { title: "Simple, scalable operation", description: "Organized backend to grow without friction." },
          ],
          benefitsCta: "I want a store that sells more",
          outcomes: [
            "Clear buying experience that increases conversion.",
            "Optimized checkout with payments and shipping integrated.",
            "Organized operation: inventory, orders, and automations in one flow.",
            "Tech base ready for campaigns, remarketing, and scaling.",
          ],
          painTitle: "Pain points: What happens when you DON’T have a professional ecommerce",
          painIntro: "",
          painPoints: [
            "Customers abandon because the store is slow.",
            "The design doesn’t inspire trust → fewer sales.",
            "Buying feels complicated → bad experience.",
            "You can’t integrate payments or shipping correctly.",
            "Inventory and orders turn into chaos.",
            "Marketing loses impact without a solid store.",
          ],
          painConclusion: "A weak ecommerce doesn’t sell and makes you lose opportunities every day.",
          painCta: "I want to avoid these problems",
          includesTitle: "What Your Professional Ecommerce Includes",
          deliverables: [
            "100% custom design",
            "Clear architecture focused on conversion",
            "Optimized product pages",
            "Intuitive cart + checkout",
            "Payments and shipping integration",
            "Inventory and order management",
            "Automations (emails, statuses, alerts)",
            "Easy-to-use dashboard",
            "Basic SEO + optimized speed",
            "Training so you can operate it",
          ],
          processTitle: "Our Process",
          steps: [
            { title: "Discovery", description: "Business, products, needs, and style." },
            { title: "Architecture", description: "Structure, routes, categories, UX." },
            { title: "Design", description: "Clear, modern UI aligned to your brand." },
            { title: "Development", description: "Features, integrations, and checkout." },
            { title: "Delivery", description: "Store ready to sell + usage tutorial." },
          ],
          processCta: "See online store examples",
          audience: [
            "Entrepreneurs who want to start selling online",
            "Physical shops looking to go digital",
            "Growing brands that need a solid store",
            "Projects that outgrew basic platforms (e.g., Tiendanube)",
            "Teams needing more control, design, and scalability",
          ],
          internalLinks: [
            { label: "See Web service", href: "/services/landing" },
            { label: "See Branding service", href: "/services/branding-identidad-visual" },
            { label: "See Marketing", href: "/services/marketing-digital" },
          ],
          differentiatorsTitle: "Differentiators",
          differentiators: [
            "Fast, secure, optimized stores",
            "Intuitive checkout that lifts conversions",
            "Real integrations (no patches or workarounds)",
            "Professional design aligned to your identity",
            "Guaranteed scalability to grow without limits",
          ],
          plansTitle: "Plans",
          plans: [
            { name: "Ecommerce Starter", description: "Optimized base to start selling." },
            {
              name: "Professional Ecommerce (Recommended)",
              description: "Design + integrations + automations.",
              badge: "Recommended",
            },
            {
              name: "Ecommerce Scale",
              description: "More features, customizations, and growth support.",
            },
          ],
          planCta: "Choose this plan",
          faqTitle: "FAQ",
          faqs: [
            {
              question: "Does it include payment and shipping integrations?",
              answer: "Yes, we configure payments and shipping ready to use.",
            },
            { question: "Can I manage inventory and orders?", answer: "Yes, with a simple, organized dashboard." },
            { question: "Is it scalable?", answer: "Yes, we prepare it to grow in catalog and traffic." },
            { question: "Does it include SEO?", answer: "Includes basic SEO and speed optimization." },
          ],
          finalCtaTitle:
            "Your online store is your business open 24/7. Let's make it sell more, better, and with less friction.",
          finalCta: "I want my professional ecommerce",
          schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Professional Ecommerce",
            provider: {
              "@type": "Organization",
              name: "Cosmic Studio",
              url: "https://cosmicst.dev",
            },
            description:
              "Professional ecommerce and custom online stores for entrepreneurs and businesses. Fast, clear, conversion-ready stores with payments, shipping, and inventory integrated.",
            areaServed: "Argentina, Latin America, United States",
            serviceType: "Professional Ecommerce",
          },
        },
        strategy: {
          eyebrow: "Custom Software & Tailored Systems",
          intro:
            "One system. Your entire business running. We integrate sales, inventory, logistics, suppliers, customers, tasks, reports, and automations in one place.",
          whatsappMessage: "Hi, I need my custom system 🚀",
          ctaNote: "Includes architecture, UX/UI, development, integrations, and automations.",
          seoTitle: "Custom Software and Tailored Systems | Cosmic Studio",
          seoDescription:
            "Custom software and tailored systems that integrate sales, inventory, logistics, suppliers, and customers. Order, automation, and control to scale without chaos.",
          heroCta: "I want my custom system",
          benefitsTitle: "Benefits of Custom Software",
          benefitsIntro: "Why does a proprietary system organize and scale your business?",
          benefits: [
            { title: "Everything centralized in one place", description: "Avoid using 10 different tools for simple tasks." },
            {
              title: "Total control of your operation",
              description: "Clear reports, organized data, and smarter decisions.",
            },
            {
              title: "Time savings on repetitive tasks",
              description: "We automate processes so your team works better.",
            },
            {
              title: "Real integration with sales, inventory, and logistics",
              description: "Nothing is left out. Everything connects.",
            },
            { title: "Ready to scale", description: "Grows with your business without relying on generic solutions." },
          ],
          benefitsCta: "I want a system that organizes my operation",
          outcomes: [
            "Centralized operation with reliable data in a single system.",
            "Automations that remove manual tasks and reduce errors.",
            "Complete integration between sales, stock, logistics, and finance.",
            "Real-time visibility to decide and scale without chaos.",
          ],
          painTitle: "Pain points: What happens when you DON’T have your own system",
          painIntro: "",
          painPoints: [
            "Using Excel, WhatsApp, and scattered apps → guaranteed chaos",
            "Disorganized information → costly errors",
            "Poorly managed inventory → losses or stockouts",
            "Manual processes → your team loses hours every day",
            "No visibility → you don't know what works and what doesn't",
            "Generic systems that don’t fit your business",
          ],
          painConclusion: "A business without its own system grows until chaos stops it.",
          painCta: "I want to avoid these problems",
          includesTitle: "What Your Custom System Includes",
          deliverables: [
            "Architecture design based on your real operation",
            "Sales, suppliers, customers, and logistics modules",
            "Inventory control and stock alerts",
            "Tasks, tickets, and automations",
            "Payment status, invoices, and receipts",
            "Smart reports",
            "Roles and permissions for your team",
            "Fast, secure, scalable web app",
            "Training for internal use",
          ],
          processTitle: "Our Process",
          steps: [
            { title: "Diagnosis", description: "We analyze operation, flows, and needs." },
            { title: "System architecture", description: "Modules, logic, and automations." },
            { title: "UX/UI design", description: "Clear, fast, easy-to-use interfaces." },
            { title: "Development", description: "Features, integrations, and testing." },
            { title: "Implementation and training", description: "System running from day one." },
          ],
          processCta: "See system examples",
          audience: [
            "Growing businesses",
            "Physical stores or ecommerce",
            "Distributors and wholesalers",
            "Operations teams with high task volume",
            "Companies seeking order, control, and real automation",
            "Businesses that outgrew generic solutions like Excel or basic apps",
          ],
          internalLinks: [
            { label: "See Web service", href: "/services/landing" },
            { label: "See Ecommerce service", href: "/services/ecommerce-profesional" },
            { label: "See Portfolio", href: "#projects" },
          ],
          differentiatorsTitle: "Differentiators",
          differentiators: [
            "System built 100% tailored",
            "Designed for your real operation, not a standard template",
            "Complete integration between modules and areas",
            "Clear, modern, easy-to-use interface",
            "Guaranteed scalability (grows with your business)",
            "Guided process and support",
          ],
          planCta: "I want my custom system",
          finalCtaTitle: "Your business deserves a system that organizes, automates, and lets you grow without chaos.",
          finalCtaSubtitle: "Professional, robust software fully aligned to your needs.",
          finalCta: "I want my custom system",
          schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Custom Software",
            provider: {
              "@type": "Organization",
              name: "Cosmic Studio",
              url: "https://cosmicst.dev",
            },
            description:
              "Custom software and tailored systems that integrate sales, inventory, logistics, suppliers, customers, and automations to organize and scale your operation.",
            areaServed: "Argentina, Latin America, United States",
            serviceType: "Custom Software",
          },
        },
        "marketing-digital": {
          eyebrow: "Strategic Digital Marketing",
          intro:
            "Having digital presence isn’t enough: you need a clear, coherent, measurable strategy that connects with the right audience. We create marketing plans that integrate professional content, paid campaigns, segmentation, persuasive copywriting, analytics, and continuous optimization. We don’t just “do social”: we build real growth with strategy, creativity, and data.",
          whatsappMessage: "Hi, I want my marketing strategy ✨",
          ctaNote: "Strategy, creativity, and data aligned to grow with intention.",
          seoTitle: "Strategic Digital Marketing | Cosmic Studio",
          seoDescription:
            "Strategic Digital Marketing for brands that want to grow with intention. Clear strategy, professional content, paid campaigns, and continuous optimization.",
          heroCta: "See Marketing service",
          benefitsTitle: "Benefits of Strategic Digital Marketing",
          benefitsIntro: "Why a clear, measurable strategy?",
          benefits: [
            {
              title: "Clear, personalized strategy",
              description: "Objectives, audience, message, and positioning aligned to grow with intention.",
            },
            {
              title: "Professional content and campaigns",
              description: "Creativity + execution: ads, social, landings, copywriting, and visual assets.",
            },
            {
              title: "Measurement, analysis, and continuous optimization",
              description: "You make decisions with real data, not intuition.",
            },
          ],
          benefitsCta: "I want a strategy that works",
          outcomes: [
            "Marketing roadmap aligned to objectives and clear metrics.",
            "Content and campaigns that connect with the right audience.",
            "Constant optimization based on data and experiments.",
            "Coherent messages across landings, ads, and social.",
          ],
          painTitle: "Pain points: What happens without a marketing strategy",
          painIntro: "",
          painPoints: [
            "Publishing without a goal → no results",
            "Poorly targeted ads → wasted money",
            "Social without strategy → doesn’t attract real clients",
            "Content without coherence → your brand weakens",
            "Not measuring → you don’t know what works",
            "Stalled growth → competition moves ahead",
          ],
          painConclusion: "It’s not lack of talent. It’s lack of strategy.",
          painCta: "I want to stop improvising",
          includesTitle: "What Your Strategic Marketing Plan Includes",
          deliverables: [
            "Complete strategy: positioning, audience, message",
            "Monthly content matrix",
            "Script and professional copywriting",
            "Ad creation + segmentation",
            "Weekly optimization based on data",
            "Simple, actionable reports",
            "Continuous improvement recommendations",
            "Integration with Branding / Web / Ecommerce",
          ],
          processTitle: "Our Strategic Process",
          steps: [
            { title: "Diagnosis", description: "We understand your brand, context, and objectives." },
            { title: "Strategy", description: "We define positioning, messages, and guidelines." },
            { title: "Implementation", description: "Content, ads, landings, and creativity." },
            { title: "Measurement", description: "Clear data, reports, and continuous optimization." },
          ],
          processCta: "See strategy examples",
          audience: [
            "Brands with Branding / Web / Ecommerce looking to scale",
            "Ventures that want to grow with real strategy",
            "Projects that need professional content and ads",
            "Businesses that want to attract clients, not just followers",
            "Companies that require decisions based on data",
          ],
          internalLinks: [
            { label: "See Web service", href: "/services/landing" },
            { label: "See Branding service", href: "/services/branding-identidad-visual" },
            { label: "See Ecommerce service", href: "/services/ecommerce-profesional" },
          ],
          differentiatorsTitle: "Differentiators",
          differentiators: [
            "Strategy + creativity + data (real balance)",
            "Persuasive copy designed to convert",
            "Segmented campaigns that attract real clients",
            "Clear reports → smarter decisions",
            "Personalized process (not generic, no templates)",
          ],
          planCta: "I want my marketing strategy",
          finalCtaTitle: "Your brand needs more than presence: it needs direction.",
          finalCtaSubtitle: "Clear strategy to grow with intention and results.",
          finalCta: "I want my marketing strategy",
          schema: {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Strategic Digital Marketing",
            provider: {
              "@type": "Organization",
              name: "Cosmic Studio",
              url: "https://cosmicst.dev",
            },
            description:
              "Strategic digital marketing service with professional content, paid campaigns, segmentation, analytics, and continuous optimization for brands that want to grow with intention.",
            areaServed: "Argentina, Latin America, United States",
            serviceType: "Strategic Digital Marketing",
          },
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
      heading: "Cosmic Studio Team",
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
      titleHighlight: "branding",
      titleRotateOptions: ["branding?", "marketing?", "system?", "website?", "ecommerce?"],
      titleAfterHighlight: "",
      description: "Let's connect and design digital experiences that evolve.",
      nameLabel: "YOUR NAME / BUSINESS",
      namePlaceholder: "Name or company",
      messageLabel: "MESSAGE",
      messagePlaceholder: "Write your message...",
      interestLabel: "I'm interested in",
      interestHelper: "Choose one or several services",
      interestPlaceholder: "Select services",
      interestOptions: [
        { id: "branding-identidad-visual", label: "Branding & visual identity" },
        { id: "landing", label: "Web design & landing pages" },
        { id: "ecommerce-profesional", label: "Premium online stores" },
        { id: "strategy", label: "Custom software" },
        { id: "marketing-digital", label: "Digital marketing" },
      ],
      interestIntro: "Hello. I want to know more about",
      interestFallback: "your services at Cosmic Studio",
      defaultMessage: "Hello. I want to know more about your services at Cosmic Studio.",
      directMessageLabel: "Direct message",
      sendEmailLabel: "Send by email",
      sendWhatsappLabel: "Send via WhatsApp",
      greetingPrefix: "Hi, I'm",
      nameFallback: "a potential client",
      emailSubject: "New message from Cosmic Studio",
      buttonLabel: "Contact the team",
      contactLine: "→ info.cosmicst@gmail.com",
      socials: [
        { label: "LinkedIn", href: "https://www.linkedin.com/company/cosmic-st/" },
        { label: "Instagram", href: "https://www.instagram.com/cosmicstudio.ig/" },
      ],
      footerNote: "© {year} Cosmic Studio. All rights reserved.",
      systemStatus: "System online",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.es;
}
