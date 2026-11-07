import SectionHeading from '@/components/SectionHeading';
import { Link, useParams } from 'react-router-dom';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const blogPosts = [
    {
        slug: 'prototype-before-present',
        title: 'Why we prototype before we present',
        tag: 'PROCESS',
    },
    {
        slug: 'ai-video-utility',
        title: 'What AI video is actually good for right now',
        tag: 'AI / TOOLS',
    },
    {
        slug: 'interface-nobody-asked-for',
        title: 'The interface nobody asked for',
        tag: 'PRODUCT',
    },
];

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const currentPost = blogPosts.find(p => p.slug === slug);
    const title = currentPost ? currentPost.title : (slug || 'Article').replace(/-/g, ' ');
    useDocumentTitle(title);

    const currentIndex = blogPosts.findIndex(p => p.slug === slug);
    const nextPost = currentIndex >= 0 ? blogPosts[(currentIndex + 1) % blogPosts.length] : blogPosts[0];

    return (
        <article className="wrap py-24 min-h-screen text-[var(--ink)]">
            <Link
                to="/blog"
                className="text-[13px] text-[var(--muted)] hover:text-[var(--duck)] mb-12 inline-block transition-colors"
            >
                &larr; Back to Thinking
            </Link>

            <div className="max-w-[70ch]">
                <SectionHeading
                    eyebrow={currentPost?.tag || "Article"}
                    title={<span className="capitalize">{title}</span>}
                    className="max-w-full mb-0"
                />

                <div className="mt-16 space-y-8 text-[15.5px] leading-relaxed text-[var(--muted)]">
                    <p className="text-[clamp(18px,2vw,24px)] leading-relaxed font-serif text-[var(--duck-dark)]">
                        A thought isn&apos;t much until someone makes it real. This is where we document how we make things real.
                    </p>

                    <p>
                        Editorial content placeholder for the article. In the production CMS, this content will be pulled dynamically based on the slug.
                    </p>

                    <p>
                        We believe that writing clarifies thinking. The articles published here represent our ongoing internal dialogue about design, technology, and the intersection of the two.
                    </p>

                    <div className="my-12 aspect-[16/9] bg-[var(--paper-soft)] border border-[var(--line)] hidden md:flex items-center justify-center">
                        <span className="text-xs text-[var(--muted)]">
                            Diagram / Visual Placeholder
                        </span>
                    </div>

                    <p>
                        Tarka exists to close that gap. We don&apos;t just supply mockups or hand off vague directions. We engineer the experiences we design. This means understanding the medium deeply—knowing when to push the browser to its limits, and when restraint is the more sophisticated choice.
                    </p>
                </div>

                {nextPost && (
                    <div className="mt-24 pt-12 border-t border-[var(--line)]">
                        <span className="text-xs uppercase tracking-widest text-[var(--duck)] font-semibold block mb-2">Next Article</span>
                        <Link to={`/blog/${nextPost.slug}`} className="font-serif text-2xl hover:text-[var(--duck)] transition-colors inline-block">
                            {nextPost.title} &rarr;
                        </Link>
                    </div>
                )}
            </div>
        </article>
    );
}
