import type { Metadata } from 'next';
import FaqSection from '@/components/sections/faq-section';
import ServiceLeading from '@/components/sections/service-leading';
import FetchedTestimonialsSection from '@/components/sections/fetched-testimonials-section';
import { alignSubserviceTestimonials } from '@/lib/subservice-testimonials';
import { data as kickFollowersPageData } from '@/app/(subservice)/buy-kick-followers/page-data';
import KickFollowersCtaSection from '@/app/(subservice)/buy-kick-followers/_components/cta-section';
import KickFollowersHeroSection from '@/app/(subservice)/buy-kick-followers/_components/hero-section';
import KickFollowersOrderFormSection from '@/app/(subservice)/buy-kick-followers/_components/order-form-section';
import KickFollowersWorkingProcessSection from '@/app/(subservice)/buy-kick-followers/_components/working-process-section';

export const metadata: Metadata = {
  title: kickFollowersPageData.seo.title,
  description: kickFollowersPageData.seo.description,
};

export default function KickFollowersPage() {
  return (
    <>
      <KickFollowersHeroSection />
      <KickFollowersOrderFormSection />
      <KickFollowersWorkingProcessSection />
      <FetchedTestimonialsSection
        data={alignSubserviceTestimonials(kickFollowersPageData.testimonials)}
      />
      {kickFollowersPageData.serviceLeadingSlugs.map((slug) => (
        <ServiceLeading key={slug} slug={slug} />
      ))}
      <FaqSection data={kickFollowersPageData.faq} />
      <KickFollowersCtaSection />
    </>
  );
}
