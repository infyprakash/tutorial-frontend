"use client"
import { useState } from "react";
import { postData } from "../fetchops";

export default function CourseCreate() {
    const [formData, setFormData] = useState({ name: "", description: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await postData({ url: "tutorial/courses", formData: formData });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Course Name</label>
                <input type="text" name="name" onChange={handleChange} value={formData.name} /><br />
                <label>Description</label>
                <textarea type="text" name="description" onChange={handleChange} value={formData.description} /> <br />
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}