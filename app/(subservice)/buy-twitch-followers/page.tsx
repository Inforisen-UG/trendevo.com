import type { Metadata } from 'next';
import FaqSection from '@/components/sections/faq-section';
import ServiceLeading from '@/components/sections/service-leading';
import FetchedTestimonialsSection from '@/components/sections/fetched-testimonials-section';
import { alignSubserviceTestimonials } from '@/lib/subservice-testimonials';
import { data as twitchFollowersPageData } from '@/app/(subservice)/buy-twitch-followers/page-data';
import TwitchFollowersCtaSection from '@/app/(subservice)/buy-twitch-followers/_components/cta-section';
import TwitchFollowersHeroSection from '@/app/(subservice)/buy-twitch-followers/_components/hero-section';
import TwitchFollowersOrderFormSection from '@/app/(subservice)/buy-twitch-followers/_components/order-form-section';
import TwitchFollowersWorkingProcessSection from '@/app/(subservice)/buy-twitch-followers/_components/working-process-section';

export const metadata: Metadata = {
  title: twitchFollowersPageData.seo.title,
  description: twitchFollowersPageData.seo.description,
};

export default function TwitchFollowersPage() {
  return (
    <>
      <TwitchFollowersHeroSection />
      <TwitchFollowersOrderFormSection />
      <TwitchFollowersWorkingProcessSection />
      <FetchedTestimonialsSection
        data={alignSubserviceTestimonials(twitchFollowersPageData.testimonials)}
      />
      {twitchFollowersPageData.serviceLeadingSlugs.map((slug) => (
        <ServiceLeading key={slug} slug={slug} />
      ))}
      <FaqSection data={twitchFollowersPageData.faq} />
      <TwitchFollowersCtaSection />
    </>
  );
}
