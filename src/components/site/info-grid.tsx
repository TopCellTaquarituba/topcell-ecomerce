import { LucideIcon } from "lucide-react";

type InfoCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type Props = {
  items: InfoCard[];
};

export function InfoGrid({ items }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="flex gap-3 rounded-3xl border bg-white p-4 shadow-sm">
          <item.icon className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold text-zinc-900">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
