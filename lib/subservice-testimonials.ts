import { data as homePageData } from '@/app/(home)/page-data';
import type { TestimonialsSectionShell } from '@/components/sections/testimonials-section';

const subserviceTitleClassName =
  'max-w-none whitespace-normal text-center text-2xl tracking-[0.36px] text-[#071431] dark:text-[#efedf1] sm:text-[32px] md:text-[36px] lg:text-[36px]';

const subserviceSubtitleClassName =
  'max-w-[996px] text-center text-sm leading-normal text-[#404a60] dark:text-[#c1c4cc] sm:text-base md:text-lg';

/**
 * Same testimonials shell as the homepage (`section-testimonials-dark` + gradient).
 * Overrides title/subtitle per buy page while keeping home layout (customer tab, no switcher).
 */
export function alignSubserviceTestimonials(
  overrides: Pick<TestimonialsSectionShell, 'title'> &
    Partial<Pick<TestimonialsSectionShell, 'subtitle' | 'badge'>>,
): TestimonialsSectionShell {
  const { title, subtitle, badge = 'TESTIMONIALS' } = overrides;
  return {
    ...homePageData.testimonials,
    sectionDarkBg: 'section-testimonials-dark',
    badge,
    title,
    subtitle: subtitle ?? homePageData.testimonials.subtitle,
    titleClassName: subserviceTitleClassName,
    subtitleClassName: subserviceSubtitleClassName,
  };
}

export function createSubserviceTestimonials(title: string): TestimonialsSectionShell {
  return alignSubserviceTestimonials({
    title,
    subtitle:
      'Discover what our clients say about working with us. From increased engagement to faster social media growth, their real experiences highlight the trust, quality, and results our SMM platform consistently delivers.',
  });
}