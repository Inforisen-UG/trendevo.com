import type { Metadata } from 'next';
import FaqSection from '@/components/sections/faq-section';
import ServiceLeading from '@/components/sections/service-leading';
import FetchedTestimonialsSection from '@/components/sections/fetched-testimonials-section';
import { alignSubserviceTestimonials } from '@/lib/subservice-testimonials';
import { data as quoraUpvotesPageData } from '@/app/(subservice)/buy-quora-upvotes/page-data';
import QuoraUpvotesCtaSection from '@/app/(subservice)/buy-quora-upvotes/_components/cta-section';
import QuoraUpvotesHeroSection from '@/app/(subservice)/buy-quora-upvotes/_components/hero-section';
import QuoraUpvotesOrderFormSection from '@/app/(subservice)/buy-quora-upvotes/_components/order-form-section';
import QuoraUpvotesWorkingProcessSection from '@/app/(subservice)/buy-quora-upvotes/_components/working-process-section';

export const metadata: Metadata = {
  title: quoraUpvotesPageData.seo.title,
  description: quoraUpvotesPageData.seo.description,
};

export default function QuoraUpvotesPage() {
  return (
    <>
      <QuoraUpvotesHeroSection />
      <QuoraUpvotesOrderFormSection />
      <QuoraUpvotesWorkingProcessSection />
      <FetchedTestimonialsSection
        data={alignSubserviceTestimonials(quoraUpvotesPageData.testimonials)}
      />
      {quoraUpvotesPageData.serviceLeadingSlugs.map((slug) => (
        <ServiceLeading key={slug} slug={slug} />
      ))}
      <FaqSection data={quoraUpvotesPageData.faq} />
      <QuoraUpvotesCtaSection />
    </>
  );
}
