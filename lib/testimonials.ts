import { apiFetch } from '@/lib/api-fetch';
import type {
  TestimonialFeaturedReview,
  TestimonialTextReview,
} from '@/components/sections/testimonials-section';

type TestimonialApiAttributes = {
  reviewerName: string;
  reviewerPosition: string | null;
  reviewerCompany: string | null;
  reviewerAvatar: string | null;
  order: number;
  content: string;
  rating: number;
};

type TestimonialApiItem = {
  type: string;
  id: number;
  attributes: TestimonialApiAttributes;
};

type TestimonialsApiResponse = {
  data?: TestimonialApiItem[];
};

export type TestimonialReviewsBundle = {
  leftTextReviews: TestimonialTextReview[];
  rightTextReviews: TestimonialTextReview[];
  featuredReview: TestimonialFeaturedReview;
};

/** Center featured photo card. */
const FEATURED_TESTIMONIAL_ID = 7;
/** First card in the left scroll column. */
const LEFT_LEAD_TESTIMONIAL_ID = 8;

const FALLBACK_AVATAR =
  '/images/testimonials/testimonials-seam-rahman-avatar.png';

const FALLBACK_FEATURED_IMAGE =
  '/images/testimonials/over-11-604-users-across-bangladesh-trust-trendevo-featured-photo.webp';

const EMPTY_REVIEWS: TestimonialReviewsBundle = {
  leftTextReviews: [],
  rightTextReviews: [],
  featuredReview: {
    name: 'TrendEvo Customer',
    role: 'Verified User',
    avatar: FALLBACK_AVATAR,
    image: FALLBACK_FEATURED_IMAGE,
    quote: 'Customer reviews load from TrendEvo.',
  },
};

function reviewerRole(attributes: TestimonialApiAttributes): string {
  const position = attributes.reviewerPosition?.trim();
  const company = attributes.reviewerCompany?.trim();

  if (position && company) {
    return `${position} · ${company}`;
  }

  return position || company || 'Customer';
}

function mapToTextReview(item: TestimonialApiItem): TestimonialTextReview {
  const { id, attributes } = item;

  return {
    id: String(id),
    name: attributes.reviewerName,
    role: reviewerRole(attributes),
    avatar: attributes.reviewerAvatar?.trim() || FALLBACK_AVATAR,
    quote: attributes.content,
  };
}

function splitReviewColumns(reviews: TestimonialTextReview[]) {
  const midpoint = Math.ceil(reviews.length / 2);
  return {
    leftTextReviews: reviews.slice(0, midpoint),
    rightTextReviews: reviews.slice(midpoint),
  };
}

export async function getTestimonialReviews(): Promise<TestimonialReviewsBundle> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;

  if (!apiBase) {
    return EMPTY_REVIEWS;
  }

  try {
    const response = await apiFetch(`${apiBase}/testimonials`, {
      next: { revalidate: 300, tags: ['testimonials'] },
    });

    if (!response.ok) {
      return EMPTY_REVIEWS;
    }

    const json = (await response.json()) as TestimonialsApiResponse;
    const items = json.data;

    if (!items?.length) {
      return EMPTY_REVIEWS;
    }

    const sorted = [...items].sort((a, b) => {
      const orderDiff = a.attributes.order - b.attributes.order;
      if (orderDiff !== 0) {
        return orderDiff;
      }
      return b.id - a.id;
    });

    const featuredItem =
      sorted.find((item) => item.id === FEATURED_TESTIMONIAL_ID) ?? sorted[0];

    const featuredBase = mapToTextReview(featuredItem);
    const featuredReview: TestimonialFeaturedReview = {
      ...featuredBase,
      image: featuredBase.avatar || FALLBACK_FEATURED_IMAGE,
    };

    const remaining = sorted.filter((item) => item.id !== featuredItem.id);
    const leftLeadIndex = remaining.findIndex(
      (item) => item.id === LEFT_LEAD_TESTIMONIAL_ID,
    );
    const columnItems =
      leftLeadIndex > 0
        ? [
            remaining[leftLeadIndex],
            ...remaining.slice(0, leftLeadIndex),
            ...remaining.slice(leftLeadIndex + 1),
          ]
        : remaining;

    const columnReviews = columnItems.map(mapToTextReview);
    const { leftTextReviews, rightTextReviews } =
      splitReviewColumns(columnReviews);

    return { leftTextReviews, rightTextReviews, featuredReview };
  } catch {
    return EMPTY_REVIEWS;
  }
}