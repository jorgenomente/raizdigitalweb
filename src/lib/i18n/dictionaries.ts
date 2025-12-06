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
    idealForGroups?: { label: string; items: string[] }[];
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
        benefits?: { title: string; description: string }[];
        painTitle?: string;
        painIntro?: string;
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
        "Trabajamos junto a emprendedores, tiendas físicas y distribuidores que quieren modernizar su manera de operar.",
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
        "Trabajamos junto a emprendedores, tiendas físicas y distribuidores que quieren modernizar su manera de operar.",
      cta: "Explorar servicios",
    },
    manifesto: {
      tagline: "Diseño que conecta + sistemas que ordenan",
      headline:
        "Digitalizamos tus procesos para que tu negocio crezca con orden, claridad y eficiencia.",
      description:
        "Transformamos tareas manuales en sistemas simples y visuales que mejoran tus procesos. No más desorden ni personal explotado.",
      idealForHeading: "Escenarios típicos",
      idealForList: [],
      idealForGroups: [
        {
          label: "Problemas operativos",
          items: [
            "Toman pedidos por WhatsApp o cuadernos",
            "Pierden tiempo con tareas manuales",
            "No controlan stock o vencimientos",
          ],
        },
        {
          label: "Gestión y decisiones",
          items: [
            "Demasiada carga laboral",
            "Necesitan información confiable para decidir",
          ],
        },
        {
          label: "Metas",
          items: [
            "Desean crecer con orden y dirección",
          ],
        },
      ],
    },
    services: {
      heading: "Servicios",
      description:
        "Unimos diseño, automatización y estrategia para que cada punto de contacto digital se sienta consistente, humano y listo para crecer.",
      scrollHint: "Bajá para explorar cada servicio en detalle",
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
          title: "Branding Profesional para Marcas que Quieren Crecer",
          headline: "Diseñamos identidades visuales claras, coherentes y memorables que elevan tu marca desde el primer vistazo.",
          description:
            "Branding e identidad visual profesional para marcas que quieren crecer. Diseñamos sistemas visuales coherentes y memorables que generan confianza.",
          benefit:
            "Emprendedores, negocios y marcas digitales que necesitan identidad visual clara, coherente y memorable.",
          estimatedTime: "10-20 días según el plan.",
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
          title: "Diseño Web Profesional & Rediseño Moderno",
          description:
            "Creamos webs claras, rápidas y confiables que impulsan tu presencia digital. Si lanzás tu primera web, conectamos tu idea con el mundo. Si tu sitio se siente viejo o lento, lo renovamos con diseño inteligente y experiencia clara desde el primer vistazo.",
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
          title: "Ecommerce Profesional & Tiendas Online a Medida",
          description:
            "Creamos tiendas online rápidas, claras y optimizadas para vender más. Diseños a medida, sin plantillas genéricas, con experiencia moderna y alineada a tu marca.",
          benefit:
            "Emprendedores, negocios físicos y marcas en crecimiento que necesitan una tienda online sólida, confiable y lista para escalar.",
          ctaLabel: "Ver servicio de Ecommerce",
          imageSrc: "/Serviciosweb.jpg",
          imageAlt: "Ecommerce profesional diseñado por Cosmic Studio",
          imageSide: "right",
        },
        "marketing-digital": {
          title: "Hacé crecer tu marca, estratégicamente.",
          description:
            "Tener presencia digital no alcanza: necesitás una estrategia clara, coherente y medible que conecte con la audiencia correcta. Planes que integran contenido profesional, campañas pagas, segmentación, copywriting persuasivo, analítica y optimización continua.",
          benefit:
            "Marcas con branding/web/ecommerce, emprendimientos y negocios que quieren crecer con estrategia real y decisiones basadas en datos.",
          ctaLabel: "Ver servicio de Marketing",
          imageSrc: "/pew.png",
          imageAlt: "Ejemplo de marketing digital estratégico creado por Cosmic Studio",
          imageSide: "right",
        },
        strategy: {
          title: "Software a Medida & Sistemas Personalizados",
          description:
            "Un solo sistema. Todo tu negocio funcionando. Software a medida que integra ventas, inventario, logística, proveedores, clientes, tareas, reportes y automatizaciones en un mismo lugar.",
          estimatedTime: "Entrega estimada: 30–60 días",
          startingPrice: "Inversión desde USD 2.000",
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
            "Diseñamos identidades visuales claras, coherentes y memorables que elevan tu marca desde el primer vistazo.",
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
          benefits: [
            {
              title: "Diferenciación inmediata",
              description: "Tu marca deja de verse igual que todas.",
            },
            {
              title: "Comunicación clara y efectiva",
              description: "Tus clientes entienden tu valor en segundos.",
            },
            {
              title: "Atracción del cliente ideal",
              description: "Narrativa + estilo alineados a tu propósito.",
            },
            {
              title: "Ahorro de tiempo y menos improvisación",
              description: "Un sistema visual evita improvisaciones.",
            },
            {
              title: "Presencia digital coherente",
              description: "Coherencia en redes, web y contenido.",
            },
          ],
          benefitsCta: "Quiero una marca clara y coherente",
          painTitle: "Sin Branding Profesional… pasan estas cosas",
          painIntro: "",
          painPoints: [
            "No te recuerdan",
            "Tu mensaje se vuelve confuso",
            "Tu marketing rinde menos",
            "Todo lleva más tiempo",
            "Parecés menos profesional",
            "No podés escalar ordenadamente",
          ],
          painConclusion: "Una identidad débil cuesta todos los días.",
          painCta: "Quiero evitar estos problemas",
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
            "Diseño web profesional y rediseño moderno para emprendedores y negocios. Webs claras, rápidas y confiables que generan confianza desde el primer vistazo.",
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
          painTitle: "Puntos de Dolor: Lo que pasa sin una estrategia de marketing",
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
      title: "Cosmic Studio — Bilingual digital experiences",
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
        "We digitize your processes so your business grows with order, clarity, and efficiency.",
      description:
        "We turn manual tasks into simple, visual systems that improve your operations. No more chaos or overworked people.",
      idealForHeading: "Common scenarios",
      idealForList: [],
      idealForGroups: [
        {
          label: "Operational issues",
          items: [
            "Taking orders via WhatsApp or notebooks",
            "Losing time on manual tasks",
            "No control over inventory or expirations",
          ],
        },
        {
          label: "Management & decisions",
          items: [
            "Too much workload on the team",
            "Need reliable information to decide",
          ],
        },
        {
          label: "Goals",
          items: [
            "Want to grow with order and direction",
          ],
        },
      ],
    },
    services: {
      heading: "Services",
      description:
        "We blend design, automation, and strategy so every digital touchpoint feels consistent, human, and ready to scale.",
      scrollHint: "Scroll to explore each service in detail",
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
        "branding-identidad-visual": {
          title: "Branding & Visual Identity",
          headline: "We craft visual identities that clarify, connect, and elevate your brand.",
          description:
            "Your brand needs more than a logo. We design complete, functional identities with strategy, narrative, palettes, typography, and a smart visual system so you look consistent and memorable from the first touch.",
          benefit:
            "Entrepreneurs, local businesses, digital brands, and growing teams that need a clear, coherent identity ready to scale.",
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
          title: "Professional Website & Redesign",
          description:
            "We build modern, clear, trustworthy sites that elevate your digital presence. Launching your first site? We connect your idea to the world. If your current site feels dated or slow, we refresh it with smart design and a clear experience that builds trust at first glance.",
          estimatedTime: "Estimated delivery: 5–7 days.",
          startingPrice: "Investment from USD 120.",
          benefit:
            "Entrepreneurs, professionals, local businesses, and digital brands that need their first site or a redesign to update the look, improve UX, and communicate with clarity.",
          ctaLabel: "View Web service",
          imageAlt: "Example of professional web design and modern redesign by Cosmic Studio",
          imageSrc: "/Serviciosweb.jpg",
          imageSide: "left",
        },
        "ecommerce-profesional": {
          title: "Professional Ecommerce & Custom Stores",
          description:
            "We create fast, clear, conversion-first online stores. Custom design aligned with your brand, no templates, optimized for sales with payments, shipping, and inventory integrated.",
          benefit:
            "Entrepreneurs, physical shops, and growing brands that need a reliable, scalable store to sell more with a modern experience.",
          ctaLabel: "View Ecommerce service",
          imageSrc: "/Serviciosweb.jpg",
          imageAlt: "Professional ecommerce store designed by Cosmic Studio",
          imageSide: "right",
        },
        "marketing-digital": {
          title: "Digital Marketing & Growth Strategy",
          description:
            "Presence alone isn’t enough—you need a clear, measurable strategy. We build marketing plans that blend professional content, persuasive copy, paid campaigns, segmentation, analytics, and continuous optimization.",
          benefit:
            "Entrepreneurs, personal brands, digital businesses, and projects seeking serious, measurable marketing designed to grow with intention.",
          ctaLabel: "View Marketing service",
          imageSrc: "/pew.png",
          imageAlt: "Professional digital marketing strategy",
          imageSide: "right",
        },
        strategy: {
          title: "Custom Systems & Business Software",
          description:
            "One system for your entire operation. We build custom software that connects sales, inventory, logistics, suppliers, customers, tasks, and reports in one place with clarity and automation.",
          estimatedTime: "Estimated delivery: 30–60 days.",
          startingPrice: "Investment from USD 2,000.",
          benefit:
            "Growing businesses, operations teams, shops, distributors, and brands that need a tailored management system to organize, automate, and scale.",
          ctaLabel: "View Systems service",
          imageSrc: "/gestock.png",
          imageAlt: "Custom business software system",
          imageSide: "left",
        },
      },
      details: {
        "branding-identidad-visual": {
          eyebrow: "Visual identity that clarifies and elevates",
          intro:
            "We build complete, functional visual identities that organize, communicate, and elevate your brand. Strategy, narrative, palette, typography, and a coherent visual system so you stand out from the first impression.",
          outcomes: [
            "Coherent identity that conveys your real value across every channel.",
            "Integral visual system: logo, palette, typography, and usage rules ready to go.",
            "Clear narrative and voice to attract the right audience.",
            "Applied examples: brandboard and mockups for social, web, and materials.",
            "Flexible foundation to grow with campaigns, products, or new lines.",
          ],
          steps: [
            {
              title: "Discovery and purpose",
              description: "We review your business, audience, and goals to define the brand essence.",
            },
            {
              title: "Narrative and messaging",
              description: "Voice, tone, communication pillars, and value proposition to truly connect.",
            },
            {
              title: "Complete visual system",
              description: "Logo, palette, typography, visual styles, and base components.",
            },
            {
              title: "Guide and applications",
              description: "Brandboard or mini style guide with rules, examples, and ready-to-use assets.",
            },
            {
              title: "Delivery and support",
              description: "Optimized files (web/print) plus a quick walkthrough to use them confidently.",
            },
          ],
          deliverables: [
            "Brand strategy and narrative (purpose, voice, and core message).",
            "Primary logo + variants ready for print and digital.",
            "Color palette with recommended usage.",
            "Typography system with hierarchies and styles.",
            "Base visual library: patterns, icons, or support assets as needed.",
            "Brandboard / mini style guide with rules and applied examples.",
            "Mockups for social or web + organized master files.",
          ],
          audience: [
            "Entrepreneurs launching or relaunching with a stronger identity.",
            "Local businesses wanting a more professional, trustworthy presence.",
            "Digital brands that need consistency across social, web, and content.",
            "Growing projects that require a scalable visual system.",
            "Teams or freelancers seeking an identity that signals trust.",
          ],
          ctaNote: "Includes strategy, narrative, full visual system, and applied mockups ready to use.",
          whatsappMessage: "Hi! I'm interested in the branding and visual identity service ✨",
          pitch:
            "We design professional visual identities that clarify, communicate, and elevate your brand. Strategy, narrative, a full visual system, and applied examples so you launch with coherence from day one.",
          seoTitle: "Branding & Visual Identity | Cosmic Studio",
          seoDescription:
            "We design professional visual identities that clarify, communicate, and elevate your brand. Complete branding for entrepreneurs, businesses, and digital brands.",
        },
        landing: {
          eyebrow: "Conversion-first landing",
          intro:
            "We build modern, clear, trustworthy websites that elevate your digital presence. First site? We help you launch. Existing site that feels old or slow? We redesign it with smart UX and a modern aesthetic so it inspires trust from the first click.",
          whatsappMessage: "Hi! I want a landing page ready for ads 🚀",
          ctaNote: "Delivered in 3–7 days. Design + copy + deploy included.",
          seoTitle: "Professional Web Design & Redesign | Cosmic Studio",
          seoDescription:
            "Professional web design and modern redesign for entrepreneurs, businesses, and digital brands. Clear, fast, trustworthy sites that inspire confidence from the first glance.",
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
        "ecommerce-profesional": {
          eyebrow: "Ecommerce built to sell",
          intro:
            "We craft fast, clear, conversion-focused online stores. Modern experience, no generic templates, aligned to your brand and ready to scale.",
          whatsappMessage: "Hi, I need a professional ecommerce optimized to sell",
          ctaNote: "Includes UX/UI, payments/shipping integrations, inventory and a clean backend.",
          seoTitle: "Professional Ecommerce & Custom Online Stores | Cosmic Studio",
          seoDescription:
            "Professional ecommerce and custom online stores for entrepreneurs and brands. Fast, clear, conversion-optimized design with payments, shipping, and inventory integrated.",
          outcomes: [
            "Clear, fast buying experience that lifts conversions.",
            "Custom design aligned to your brand (no generic templates).",
            "Payments, shipping, and inventory integrated to run smoothly.",
            "Organized backend to scale catalog and orders.",
            "Automations for notifications and order status updates.",
          ],
          steps: [
            { title: "Discovery and strategy", description: "Catalog, tickets, shipping model, and conversion goals." },
            { title: "UX/UI and architecture", description: "Clear purchase flows, intuitive nav, and consistent branding." },
            { title: "Integrations and QA", description: "Payments, shipping, inventory, and automations tested pre-launch." },
            { title: "Launch and support", description: "Performance checklist and quick training for your team." },
          ],
          deliverables: [
            "Full UX/UI design (home, categories, PDP, checkout)",
            "Payments and shipping integration",
            "Inventory management + basic order panel",
            "Key automations (confirmations, statuses, alerts)",
            "Mobile optimization and basic on-page SEO",
            "Short usage guide + asset handoff",
          ],
          audience: [
            "Entrepreneurs launching their first store",
            "Physical shops moving to online sales",
            "Growing brands that need to scale catalog and conversions",
            "Projects needing a store aligned with their identity",
          ],
          examples: [],
          instagramSlides: [],
          pitch:
            "We build fast, clear, conversion-optimized ecommerce. No templates: custom design, integrated payments/shipping, and an experience that reflects your brand.",
        },
        strategy: {
          eyebrow: "Custom system that connects everything",
          intro:
            "One system for your whole business. We design tailored software that connects sales, inventory, logistics, suppliers, customers, tasks, and reports in one place with clarity and automation.",
          whatsappMessage: "Hi, I need a custom system for my business",
          ctaNote: "Includes UX/UI, development, integrations, and key automations.",
          seoTitle: "Custom Systems and Business Software | Cosmic Studio",
          seoDescription:
            "Custom systems and business software that connect sales, inventory, logistics, and customers in one place. Operate with clarity, automation, and real scalability.",
          outcomes: [
            "Unified operation in a single system—no spreadsheets or patchwork.",
            "Automated processes to cut errors and idle time.",
            "Real-time visibility over sales, stock, orders, and logistics.",
            "Clear interfaces so your team adopts the system fast.",
            "Architecture ready to scale modules and users.",
          ],
          steps: [
            { title: "Discovery and blueprint", description: "We map real processes, roles, metrics, and bottlenecks." },
            { title: "UX/UI and architecture", description: "Flows, screens, and business rules focused on clarity first." },
            { title: "Build and integrations", description: "We develop the system and connect payments, inventory, ERPs/APIs as needed." },
            { title: "QA and deploy", description: "End-to-end tests, performance checklist, and production rollout." },
            { title: "Adoption and support", description: "Quick training, documentation, and initial support." },
          ],
          deliverables: [
            "Full UX/UI design for the system",
            "Production-ready backend and frontend with roles and permissions",
            "Integrations (payments, inventory, ERPs/APIs required)",
            "Key automations and notifications",
            "Basic monitoring and activity logs",
            "Short documentation and technical handoff",
          ],
          audience: [
            "Growing businesses leaving spreadsheets and consolidating operations",
            "Operations teams needing traceability and control",
            "Shops and distributors managing catalog, orders, and logistics",
            "Brands wanting to scale with a custom, proprietary system",
          ],
          examples: [],
          instagramSlides: [],
          pitch:
            "We design and build custom systems that connect sales, inventory, logistics, and customers in one place. Less friction, more control, and real scalability.",
        },
        "marketing-digital": {
          eyebrow: "Marketing that grows with data",
          intro:
            "Growing a brand takes more than presence—you need a clear, measurable strategy. We create marketing plans that blend professional content, persuasive copy, paid campaigns, segmentation, analytics, and continuous optimization.",
          whatsappMessage: "Hi, I need a digital marketing strategy that grows with data",
          ctaNote: "Includes strategy, content, paid media, analytics, and optimization.",
          seoTitle: "Digital Marketing and Growth Strategy | Cosmic Studio",
          seoDescription:
            "Digital marketing and growth strategy for entrepreneurs and brands. Paid campaigns, content, segmentation, and continuous optimization to scale with clarity and data.",
          outcomes: [
            "Marketing plan aligned with your brand and goals.",
            "Paid media optimized for performance and continuous learning.",
            "Content and copy that resonate with the right audience.",
            "Tracking, dashboards, and analytics for data-driven decisions.",
            "Ongoing iteration to scale what works and adjust fast.",
          ],
          steps: [
            { title: "Diagnosis and objectives", description: "Review assets, audiences, and set clear, measurable goals." },
            { title: "Strategy and plan", description: "Channel mix, content, paid media, segments, and priority messages." },
            { title: "Execution and tracking", description: "Creatives, copy, campaign setup, and measurement." },
            { title: "Continuous optimization", description: "AB testing, segmentation tweaks, budgets, and messaging." },
            { title: "Reporting and next steps", description: "Dashboard, learnings, and improvement roadmap." },
          ],
          deliverables: [
            "Digital marketing strategy and channel plan",
            "Messaging guide and content pillars",
            "Paid media setup and initial optimization",
            "Tracking and basic dashboards",
            "Optimization schedule and reports",
          ],
          audience: [
            "Entrepreneurs ready to scale with strategy and data",
            "Personal brands and digital businesses investing in marketing",
            "Projects with branding/web/ecommerce aiming for sustained growth",
            "Teams needing clarity and measurement in their campaigns",
          ],
          examples: [],
          instagramSlides: [],
          pitch:
            "We build serious, measurable, creative marketing strategies. Content, paid media, and ongoing optimization to grow with intention.",
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
