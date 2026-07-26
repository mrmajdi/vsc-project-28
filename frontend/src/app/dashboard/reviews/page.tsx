import { notFound } from 'next/navigation';

type Review = {
  id: string;
  providerName: string;
  rating: number;
  comment?: string;
  createdAt: string; // ISO string
};

export default async function ReviewsPage() {
  let reviews: Review[] = [];
  let isLoading = true;
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/reviews`, {
      next: { revalidate: 60 }, // revalidate every 60 seconds
    });

    if (!res.ok) {
      throw new Error('Failed to fetch reviews');
    }

    reviews = await res.json();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unexpected error occurred';
    console.error(error);
  } finally {
    isLoading = false;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[20rem] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[20rem] items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex min-h-[20rem] items-center justify-center text-gray-500">
        No reviews yet.
      </div>
    );
  }

  return (
    <section className="py-8">
      <h2 className="mb-6 text-2xl font-bold">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{review.providerName}</h3>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className="text-yellow-400"
                      aria-hidden="true"
                    >
                      ⭐
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    ({review.rating}/5)
                  </span>
                </div>
              </div>
              <time className="text-xs text-gray-400" dateTime={review.createdAt}>
                {new Date(review.createdAt).toLocaleDateString()}
              </time>
            </div>
            {review.comment && (
              <p className="mt-2 text-gray-700">{review.comment}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}