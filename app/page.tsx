import Heading from "@/utils/Heading";
import Header from "../components/Header";
import Hero from "../components/Hero/Hero";

export default function Home() {
  return (
    <div>
      <Heading
        title={"OrbitBlog"}
        description="OrbitBlog is a blog site with good looking UI design."
        keywords="Blog, Teck, Future "
      />
      <Header active={1} />
      <Hero />
    </div>
  );
}
