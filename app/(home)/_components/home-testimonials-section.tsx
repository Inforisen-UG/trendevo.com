import { data as homePageData } from '@/app/(home)/page-data';
import FetchedTestimonialsSection from '@/components/sections/fetched-testimonials-section';
import {
  formatTestimonialsUsersTitle,
  getStats,
} from '@/lib/stats';

export default async function HomeTestimonialsSection() {
  const { usersAll } = await getStats();

  return (
    <FetchedTestimonialsSection
      data={{
        ...homePageData.testimonials,
        title: formatTestimonialsUsersTitle(usersAll),
      }}
    />
  );
}