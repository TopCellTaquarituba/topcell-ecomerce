import { SiteAnnouncement } from "@/components/layout/site-announcement";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type Props = {
  children: React.ReactNode;
};

export default function StorefrontLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f4]">
      <SiteAnnouncement />
      <SiteHeader />
      <main className="flex-1 bg-[#f8f8f8] pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-12">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
