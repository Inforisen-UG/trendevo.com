import type { Metadata } from 'next';
import FaqSection from '@/components/sections/faq-section';
import ServiceLeading from '@/components/sections/service-leading';
import FetchedTestimonialsSection from '@/components/sections/fetched-testimonials-section';
import { alignSubserviceTestimonials } from '@/lib/subservice-testimonials';
import { data as twitchViewersPageData } from '@/app/(subservice)/buy-twitch-viewers/page-data';
import TwitchViewersCtaSection from '@/app/(subservice)/buy-twitch-viewers/_components/cta-section';
import TwitchViewersHeroSection from '@/app/(subservice)/buy-twitch-viewers/_components/hero-section';
import TwitchViewersOrderFormSection from '@/app/(subservice)/buy-twitch-viewers/_components/order-form-section';
import TwitchViewersWorkingProcessSection from '@/app/(subservice)/buy-twitch-viewers/_components/working-process-section';

export const metadata: Metadata = {
  title: twitchViewersPageData.seo.title,
  description: twitchViewersPageData.seo.description,
};

export default function TwitchViewersPage() {
  return (
    <>
      <TwitchViewersHeroSection />
      <TwitchViewersOrderFormSection />
      <TwitchViewersWorkingProcessSection />
      <FetchedTestimonialsSection
        data={alignSubserviceTestimonials(twitchViewersPageData.testimonials)}
      />
      {twitchViewersPageData.serviceLeadingSlugs.map((slug) => (
        <ServiceLeading key={slug} slug={slug} />
      ))}
      <FaqSection data={twitchViewersPageData.faq} />
      <TwitchViewersCtaSection />
    </>
  );
}
