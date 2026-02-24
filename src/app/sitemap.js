import { fetchData } from "./fetchApi";

export default async function sitemap() {
    const baseUrl = `${process.env.NEXT_PUBLIC_HOST}`;

    // Fetch dynamic data from your API or DB
    const courses = await fetchData(`courses/sitemap`).then(res => res.json());
    const chapters = await fetchData(`chapters/sitemap`).then(res => res.json());
    const topics = await fetchData(`subchapters/sitemap`).then(res => res.json());

    const coursesUrls = courses.map(course => ({
        url: `courses/sitemap/${course.slug}`,
        lastModified: new Date(course.created_at),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    const chapterUrls = chapters.map(chapter => ({
        url: `chapters/sitemap/${chapter.course.slug}/${chapter.slug}`,
        lastModified: new Date(chapter.created_at),
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    const topicUrls = topics.map(topic => ({
        url: `subchapters/sitemap/${topic.chapter.course.slug}/${topic.chapter.slug}/${topic.slug}`,
        lastModified: new Date(topic.created_at),
        changeFrequency: "weekly",
        priority: 0.6,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        ...coursesUrls,
        ...chapterUrls,
        ...topicUrls,
    ];
}