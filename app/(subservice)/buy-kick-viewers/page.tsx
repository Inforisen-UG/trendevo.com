import type { Metadata } from 'next';
import FaqSection from '@/components/sections/faq-section';
import ServiceLeading from '@/components/sections/service-leading';
import FetchedTestimonialsSection from '@/components/sections/fetched-testimonials-section';
import { alignSubserviceTestimonials } from '@/lib/subservice-testimonials';
import { data as kickViewersPageData } from '@/app/(subservice)/buy-kick-viewers/page-data';
import KickViewersCtaSection from '@/app/(subservice)/buy-kick-viewers/_components/cta-section';
import KickViewersHeroSection from '@/app/(subservice)/buy-kick-viewers/_components/hero-section';
import KickViewersOrderFormSection from '@/app/(subservice)/buy-kick-viewers/_components/order-form-section';
import KickViewersWorkingProcessSection from '@/app/(subservice)/buy-kick-viewers/_components/working-process-section';

export const metadata: Metadata = {
  title: kickViewersPageData.seo.title,
  description: kickViewersPageData.seo.description,
};

export default function KickViewersPage() {
  return (
    <>
      <KickViewersHeroSection />
      <KickViewersOrderFormSection />
      <KickViewersWorkingProcessSection />
      <FetchedTestimonialsSection
        data={alignSubserviceTestimonials(kickViewersPageData.testimonials)}
      />
      {kickViewersPageData.serviceLeadingSlugs.map((slug) => (
        <ServiceLeading key={slug} slug={slug} />
      ))}
      <FaqSection data={kickViewersPageData.faq} />
      <KickViewersCtaSection />
    </>
  );
}
