import Image from 'next/image';

type HeroBackgroundProps = {
  imageSrc: string;
  className?: string;
};

export function HeroBackground({ imageSrc, className }: HeroBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className ?? ''}`}
    >
      <div
        className="absolute -right-[15%] -top-[10%] h-[120%] w-[120%] scale-[1.1] opacity-[0.12] [filter:blur(32px)_saturate(1.15)] motion-safe:animate-[heroFloat_14s_ease-in-out_infinite] motion-reduce:animate-none"
        aria-hidden
      >
        <Image src={imageSrc} alt="" fill priority className="object-cover" />
      </div>

      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background: 'radial-gradient(circle at 30% 10%, rgba(0,200,255,0.10), transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: 'radial-gradient(circle at 30% 10%, rgba(0,200,255,0.08), transparent 55%)',
        }}
      />

      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.92) 55%, rgba(255,255,255,1) 100%)',
        }}
      />
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.62) 55%, rgba(0,0,0,0.92) 100%)',
        }}
      />
    </div>
  );
}
