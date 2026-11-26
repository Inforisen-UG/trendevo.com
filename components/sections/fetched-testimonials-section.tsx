import TestimonialsSection, {
  type TestimonialsSectionData,
  type TestimonialsSectionShell,
} from '@/components/sections/testimonials-section';
import { getTestimonialReviews } from '@/lib/testimonials';

type FetchedTestimonialsSectionProps = {
  data: TestimonialsSectionShell;
};

export default async function FetchedTestimonialsSection({
  data,
}: FetchedTestimonialsSectionProps) {
  const reviews = await getTestimonialReviews();

  const sectionData: TestimonialsSectionData = {
    ...data,
    ...reviews,
  };

  return <TestimonialsSection data={sectionData} />;
}