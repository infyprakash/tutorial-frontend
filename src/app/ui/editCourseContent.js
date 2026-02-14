"use client";
import { useState, useEffect } from "react";
import Editor from "react-simple-wysiwyg";


async function postData(params) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}${params.url}`,
            {
                method: 'PUT',
                headers: { 'token': process.env.NEXT_PUBLIC_API_TOKEN, 'Content-type': 'application/json', },
                body: JSON.stringify(params.formData)
            }
        );
        if (!response.ok) {
            throw new Error("Error creating new content");
        }
        return response.json()
    } catch (error) {
        throw new Error(error);
    }
}


export default function EditCourseContentArea({ courseContent, subchapter_id }) {
    const [formData, setFormData] = useState(
        {
            'content': courseContent.content || "",
            'subchapter_id': subchapter_id || ""
        }
    );
    useEffect(() => {
        if (courseContent.content) {
            setFormData({
                content: courseContent.content,
                subchapter_id: subchapter_id
            });
        }
    }, [courseContent, subchapter_id]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await postData({ url: `course-content/subchapter/${subchapter_id}`, formData: formData });
        } catch (error) {
            console.log(error);
        }


    }
    return (
        <form onSubmit={handleSubmit}>
            <Editor onChange={handleChange} name="content" value={formData.content} />
            <button type="submit">submit</button>
        </form>)
}
