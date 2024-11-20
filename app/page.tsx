import Header from "../components/Header";
import Hero from "../components/Hero/Hero";

export default function Home() {
  return (
    <div>
      <Header active={1} />
      <Hero />
    </div>
  );
}
