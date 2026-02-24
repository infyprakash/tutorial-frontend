import { ImageResponse } from 'next/og'
import { fetchData } from '../fetchApi'

// Image metadata
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }) {
    const { course_slug } = await params;
    const response = await fetchData(`courses/detail/${course_slug}`);
    const course = await response.json();

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 128,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {course.name}
            </div>
        )
    )
}