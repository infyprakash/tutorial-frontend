import { useState, useEffect } from "react";
import { fetchData } from "../fetchops";

export default function ListCourse() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchCourses = async () => {
            const response = await fetchData('courses');
            const data = await response.json();
            console.log(data);
            setCourses(data);
        }
        fetchCourses();

    }, [])

    return <div>
        <table>
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Course Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {courses.map((course, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{course.name}</td>
                        <td><button>Edit</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}