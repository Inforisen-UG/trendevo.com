import type { Metadata } from 'next';
import FaqSection from '@/components/sections/faq-section';
import ServiceLeading from '@/components/sections/service-leading';
import FetchedTestimonialsSection from '@/components/sections/fetched-testimonials-section';
import { alignSubserviceTestimonials } from '@/lib/subservice-testimonials';
import { data as discordAccountPageData } from '@/app/(subservice)/buy-discord-account/page-data';
import DiscordAccountCtaSection from '@/app/(subservice)/buy-discord-account/_components/cta-section';
import DiscordAccountHeroSection from '@/app/(subservice)/buy-discord-account/_components/hero-section';
import DiscordAccountOrderFormSection from '@/app/(subservice)/buy-discord-account/_components/order-form-section';
import DiscordAccountWorkingProcessSection from '@/app/(subservice)/buy-discord-account/_components/working-process-section';

export const metadata: Metadata = {
  title: discordAccountPageData.seo.title,
  description: discordAccountPageData.seo.description,
};

export default function DiscordAccountPage() {
  return (
    <>
      <DiscordAccountHeroSection />
      <DiscordAccountOrderFormSection />
      <DiscordAccountWorkingProcessSection />
      <FetchedTestimonialsSection
        data={alignSubserviceTestimonials(discordAccountPageData.testimonials)}
      />
      {discordAccountPageData.serviceLeadingSlugs.map((slug) => (
        <ServiceLeading key={slug} slug={slug} />
      ))}
      <FaqSection data={discordAccountPageData.faq} />
      <DiscordAccountCtaSection />
    </>
  );
}
