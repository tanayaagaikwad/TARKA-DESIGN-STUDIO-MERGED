import { Link } from 'react-router-dom';
import './BlogPage.css';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function BlogPage() {
    useDocumentTitle('The World Board');
    const posts = [
        {
            slug: 'prototype-before-present',
            title: 'Why we prototype before we present',
            tag: 'PROCESS',
            number: '01',
            description: 'Ideas deserve to be experienced before they are explained.',
        },
        {
            slug: 'ai-video-utility',
            title: 'What AI video is actually good for right now',
            tag: 'AI / TOOLS',
            number: '02',
            description: 'Exploring the intersection of creative thinking and emerging technology.',
        },
        {
            slug: 'interface-nobody-asked-for',
            title: 'The interface nobody asked for',
            tag: 'PRODUCT',
            number: '03',
            description: 'Rethinking the digital experiences we interact with every day.',
        },
    ];

    return (
        <main className="world-board min-h-screen py-24 md:py-32">
            <div className="wrap">

                {/* Heading */}
                <div className="world-heading">
                    <span className="world-eyebrow">
                        <span className="eyebrow-line" />
                        TARKA / IDEAS / PERSPECTIVES
                    </span>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <h1 className="world-title">
                                The World <span>Board.</span>
                            </h1>
                            <p className="world-intro">
                                A world of ideas, design and things yet to be built.
                            </p>
                        </div>

                        <div className="world-orbit" aria-hidden="true">
                            <div className="orbit-ring orbit-ring-one" />
                            <div className="orbit-ring orbit-ring-two" />
                            <div className="orbit-core" />
                            <span className="orbit-dot" />
                        </div>
                    </div>
                </div>

                {/* Article Cards */}
                <section className="world-grid mt-20 md:mt-28">
                    {posts.map((post, index) => (
                        <Link
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                            className={`world-card world-card-${index + 1}`}
                        >
                            <div className="card-top">
                                <span className="card-number">
                                    {post.number} / 03
                                </span>

                                <span className="card-tag">
                                    {post.tag}
                                </span>
                            </div>

                            <div className="card-visual" aria-hidden="true">
                                <div className="visual-orbit visual-orbit-one" />
                                <div className="visual-orbit visual-orbit-two" />
                                <div className="visual-orbit visual-orbit-three" />
                                <div className="visual-center" />
                                <div className="visual-node" />
                            </div>

                            <div className="card-bottom">
                                <div>
                                    <h2>{post.title}</h2>
                                    <p>{post.description}</p>
                                </div>

                                <span className="card-arrow" aria-hidden="true">
                                    ↗
                                </span>
                            </div>
                        </Link>
                    ))}
                </section>

                {/* Closing statement */}
                <div className="world-footer">
                    <span>THINK BEYOND THE OBVIOUS.</span>
                    <span>DESIGN / TECHNOLOGY / CULTURE</span>
                </div>

            </div>
        </main>
    );
}
