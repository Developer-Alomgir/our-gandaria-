
import Hero from "../components/Hero";
import ItemList from "../components/ItemList";

export default function Home() {
  const items = ["আইটেম ১", "আইটেম ২", "আইটেম ৩", "আইটেম ৪"];
  return (
    <div>
      <Hero />
      <ItemList items={items} />
    </div>
  );
}
