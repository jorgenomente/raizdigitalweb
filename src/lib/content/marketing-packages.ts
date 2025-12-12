export type MarketingPackage = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
};

export const marketingPackages: Record<'es' | 'en', MarketingPackage[]> = {
  es: [
    {
      id: 'starter-social',
      title: 'Starter Social',
      subtitle: 'Activación de redes + feed inicial',
      description:
        'Activa o relanza tus redes con un feed atractivo y los primeros anuncios a WhatsApp.',
      bullets: [
        'Apertura u optimización de Instagram y/o Facebook',
        'Bio, foto de perfil y highlights configurados',
        '9 publicaciones diseñadas y publicadas en tu feed',
        '2 anuncios básicos para generar mensajes por WhatsApp',
      ],
    },
    {
      id: 'performance-ads',
      title: 'Performance Ads',
      subtitle: 'Anuncios que convierten',
      description:
        'Para cuentas que ya se ven bien, pero todavía no aprovechan campañas pagas.',
      bullets: [
        'Auditoría rápida de la cuenta y ajustes clave',
        '2 videos UGC creados por creadores de contenido',
        'Configuración de 2–3 campañas en Meta Ads',
        'Optimización durante 14 días + reporte con resultados',
      ],
    },
    {
      id: 'plan-completo',
      title: 'Plan Completo de Marketing',
      subtitle: 'Contenido + Ads + Estrategia',
      description:
        'Gestión mensual integral de contenido, anuncios y estrategia de crecimiento.',
      bullets: [
        'Estrategia de posicionamiento, audiencia y mensaje',
        '9 publicaciones mensuales + 1–2 Reels',
        'Configuración y gestión de anuncios con optimización semanal',
        'Reportes simples y accionables con recomendaciones de mejora',
      ],
    },
    {
      id: 'seo-booster',
      title: 'SEO Booster (Extra)',
      subtitle: 'Opcional para tu web',
      description:
        'Extra opcional para marcas que quieren ganar visibilidad en Google.',
      bullets: [
        'Auditoría técnica inicial y alta en Search Console',
        'Optimización SEO On-Page de hasta 5 páginas clave',
        'Aplicación de reglas SEO globales para toda la web',
        'Recomendaciones mensuales basadas en datos (versión continua)',
      ],
    },
  ],
  en: [
    {
      id: 'starter-social',
      title: 'Starter Social',
      subtitle: 'Social activation + starter feed',
      description:
        'Launch or relaunch your socials with an attractive feed and the first WhatsApp ads.',
      bullets: [
        'Account creation or optimization for Instagram and/or Facebook',
        'Bio, profile photo, and highlights configured',
        '9 designed posts published to your feed',
        '2 basic ads to generate WhatsApp messages',
      ],
    },
    {
      id: 'performance-ads',
      title: 'Performance Ads',
      subtitle: 'Ads that convert',
      description:
        'For accounts that already look good but are not yet leveraging paid campaigns.',
      bullets: [
        'Quick account audit and key adjustments',
        '2 UGC videos produced by creators',
        'Setup of 2–3 campaigns in Meta Ads',
        'Optimization for 14 days plus a results report',
      ],
    },
    {
      id: 'plan-completo',
      title: 'Full Marketing Plan',
      subtitle: 'Content + Ads + Strategy',
      description:
        'Monthly management that integrates content, ads, and growth strategy.',
      bullets: [
        'Positioning, audience, and messaging strategy',
        '9 monthly posts + 1–2 Reels',
        'Ad setup and management with weekly optimization',
        'Clear, actionable reports with improvement tips',
      ],
    },
    {
      id: 'seo-booster',
      title: 'SEO Booster (Extra)',
      subtitle: 'Optional for your site',
      description:
        'Optional add-on for brands that want to gain visibility on Google.',
      bullets: [
        'Initial technical audit and Search Console setup',
        'On-page SEO optimization for up to 5 key pages',
        'Application of global SEO rules across the site',
        'Monthly, data-based recommendations (ongoing version)',
      ],
    },
  ],
};
