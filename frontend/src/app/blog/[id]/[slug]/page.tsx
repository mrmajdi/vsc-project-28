import { notFound } from 'next/navigation';
import { getPostByIdAndSlug, getRelatedPosts } from '@/lib/posts';
import { Post, RelatedPost } from '@/types';

export const generateMetadata = async ({ params }: { params: { id: string; slug: string } }) => {
  const post = await getPostByIdAndSlug(params.id, params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
};

export default async function BlogPostDetail({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const post = await getPostByIdAndSlug(params.id, params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.id, post.tags ?? [], 3);

  return (
    <article className="prose mx-auto py-8">
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
      <div className="mb-6 text-sm text-muted-foreground">
        <time dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
        {post.author && (
          <>
            <span className="mx-2">•</span>
            <span>By {post.author.name}</span>
          </>
        )}
      </div>

      {/* Rich content */}
      <section
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Related Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.id}/${related.slug}`}
                className="group"
              >
                <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                  {related.thumbnail && (
                    <Image
                      src={related.thumbnail.url}
                      alt={related.thumbnail.alt ?? related.title}
                      width={300}
                      height={200}
                      className="mb-3 rounded object-cover"
                    />
                  )}
                  <h3 className="mb-2 text-lg font-medium">{related.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {related.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

// Import Link and Image inside the component to avoid SSR issues with dynamic imports
// but we can also import at top; Next.js handles it.
import Link from 'next/link';
import Image from 'next/image';