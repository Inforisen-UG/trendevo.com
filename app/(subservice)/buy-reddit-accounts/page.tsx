import type { Metadata } from 'next';
import FaqSection from '@/components/sections/faq-section';
import ServiceLeading from '@/components/sections/service-leading';
import FetchedTestimonialsSection from '@/components/sections/fetched-testimonials-section';
import { alignSubserviceTestimonials } from '@/lib/subservice-testimonials';
import { data as redditAccountPageData } from '@/app/(subservice)/buy-reddit-accounts/page-data';
import RedditAccountCtaSection from '@/app/(subservice)/buy-reddit-accounts/_components/cta-section';
import RedditAccountHeroSection from '@/app/(subservice)/buy-reddit-accounts/_components/hero-section';
import RedditAccountOrderFormSection from '@/app/(subservice)/buy-reddit-accounts/_components/order-form-section';
import RedditAccountWorkingProcessSection from '@/app/(subservice)/buy-reddit-accounts/_components/working-process-section';

export const metadata: Metadata = {
  title: redditAccountPageData.seo.title,
  description: redditAccountPageData.seo.description,
};

export default function RedditAccountPage() {
  return (
    <>
      <RedditAccountHeroSection />
      <RedditAccountOrderFormSection />
      <RedditAccountWorkingProcessSection />
      <FetchedTestimonialsSection
        data={alignSubserviceTestimonials(redditAccountPageData.testimonials)}
      />
      {redditAccountPageData.serviceLeadingSlugs.map((slug) => (
        <ServiceLeading key={slug} slug={slug} />
      ))}
      <FaqSection data={redditAccountPageData.faq} />
      <RedditAccountCtaSection />
    </>
  );
}
