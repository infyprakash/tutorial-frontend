import CourseList from "./components/courseList";
import { fetchData } from "./fetchApi";

export default async function Home() {
  const courses = await fetchData("courses/");
  const chapters = await fetchData("chapters/");

  return <><CourseList courses={courses} chapters={chapters} /> </>;
}
