import { LucideIcon } from 'lucide-react';

interface IconExampleProps {
  icon: LucideIcon;
  label: string;
}

export const IconExample = ({ icon: Icon, label }: IconExampleProps) => {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-[var(--deep-blue)] rounded-xl hover:border-[var(--neural-cyan)] border border-transparent transition-all">
      <Icon className="text-[var(--neural-cyan)]" size={24} strokeWidth={2} />
      <span className="text-[var(--silver-gray)]">{label}</span>
    </div>
  );
};
