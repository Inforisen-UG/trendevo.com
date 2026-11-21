import type { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';
import BlogGridSection from '@/app/blog/_components/blog-grid-section';
import PageHeroSection from '@/components/sections/page-hero-section';
import CtaSection from '@/components/sections/cta-section';
import PrimaryButton from '@/components/buttons/primary-button';
import SecondaryButton from '@/components/buttons/secondary-button';
import { signUpUrl } from '@/lib/auth-urls';
import {
  BLOG_LIST_CANONICAL_PATH,
  resolveBlogListPage,
} from '@/lib/blog-list-pagination';
import { formatBlogLastUpdated, getBlogs } from '@/lib/blogs';

const BLOG_LIST_DESCRIPTION =
  'Explore Trend Evo’s blog for the latest social media trends, digital marketing tips, and industry updates.';

type BlogPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const resolved = resolveBlogListPage(pageParam);
  const listPage = resolved === 'redirect' ? 1 : resolved;

  const title =
    listPage > 1 ? `Blog — Page ${listPage} | TrendEvo` : 'Blog | TrendEvo';

  return {
    title,
    description: BLOG_LIST_DESCRIPTION,
    alternates: {
      canonical: BLOG_LIST_CANONICAL_PATH,
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams;
  const resolved = resolveBlogListPage(pageParam);

  if (resolved === 'redirect') {
    permanentRedirect(BLOG_LIST_CANONICAL_PATH);
  }

  const currentPage = resolved;
  const { posts, currentPage: activePage, totalPages, latestPublishedAt } =
    await getBlogs(currentPage, 25);

  const lastUpdated = latestPublishedAt
    ? formatBlogLastUpdated(latestPublishedAt)
    : formatBlogLastUpdated(new Date().toISOString());

  return (
    <>
      <div className="relative isolate bg-[#FCF8FF] dark:bg-[#120619]">
        <div className="relative z-10">
          <PageHeroSection
            titlePrefix="Read Our"
            titleHighlight="Latest Blogs"
            description="Explore Trend Evo’s blog for the latest social media trends, digital marketing tips, and industry updates. Stay informed, improve your strategy, and grow your online presence effectively."
            lastUpdated={lastUpdated}
          />
          <BlogGridSection
            posts={posts}
            currentPage={activePage}
            totalPages={totalPages}
          />
        </div>
      </div>
      <CtaSection
        title={
          <>
            Ready to{' '}
            <span className="text-gradient">Grow your Social Media</span> in
            Bangladesh
          </>
        }
        description="Join thousands of users growing faster with TrendEvo Panel on Facebook, Instagram, YouTube, and TikTok. Get started free in under 60 seconds. We ensure 100% customer satisfaction with an all-in-one, fully automated SMM solution that helps your business stand out and grow effortlessly."
        buttonsOutlet={
          <>
            <PrimaryButton href={signUpUrl} className="border-[1.5px] border-[#cc7aff]">
              Register Now
            </PrimaryButton>
            <SecondaryButton href="/services">
              See all Services
            </SecondaryButton>
          </>
        }
      />
    </>
  );
}
