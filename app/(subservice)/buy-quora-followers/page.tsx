import type { Metadata } from 'next';
import FaqSection from '@/components/sections/faq-section';
import ServiceLeading from '@/components/sections/service-leading';
import FetchedTestimonialsSection from '@/components/sections/fetched-testimonials-section';
import { alignSubserviceTestimonials } from '@/lib/subservice-testimonials';
import { data as quoraFollowersPageData } from '@/app/(subservice)/buy-quora-followers/page-data';
import QuoraFollowersCtaSection from '@/app/(subservice)/buy-quora-followers/_components/cta-section';
import QuoraFollowersHeroSection from '@/app/(subservice)/buy-quora-followers/_components/hero-section';
import QuoraFollowersOrderFormSection from '@/app/(subservice)/buy-quora-followers/_components/order-form-section';
import QuoraFollowersWorkingProcessSection from '@/app/(subservice)/buy-quora-followers/_components/working-process-section';

export const metadata: Metadata = {
  title: quoraFollowersPageData.seo.title,
  description: quoraFollowersPageData.seo.description,
};

export default function QuoraFollowersPage() {
  return (
    <>
      <QuoraFollowersHeroSection />
      <QuoraFollowersOrderFormSection />
      <QuoraFollowersWorkingProcessSection />
      <FetchedTestimonialsSection
        data={alignSubserviceTestimonials(quoraFollowersPageData.testimonials)}
      />
      {quoraFollowersPageData.serviceLeadingSlugs.map((slug) => (
        <ServiceLeading key={slug} slug={slug} />
      ))}
      <FaqSection data={quoraFollowersPageData.faq} />
      <QuoraFollowersCtaSection />
    </>
  );
}
