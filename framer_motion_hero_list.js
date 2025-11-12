/* Ready-to-use ProductCarousel component with loop motion for your project */

// 1️⃣ /components/ProductCarousel.jsx
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const ProductCarousel = ({ products }) => {
  const scrollX = useAnimation();

  useEffect(() => {
    const loopAnimation = async () => {
      while (true) {
        await scrollX.start({ x: "-100%", transition: { duration: products.length * 2, ease: "linear" } });
        await scrollX.set({ x: "0%" });
      }
    };
    loopAnimation();
  }, [products.length, scrollX]);

  return (
    <div className="overflow-hidden w-full">
      <motion.div className="flex gap-6" animate={scrollX}>
        {products.concat(products).map((product, index) => (
          <div
            key={index}
            className="product-card min-w-[200px] bg-white p-4 rounded-lg shadow-lg"
          >
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="mt-2 font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.price}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductCarousel;

// 2️⃣ Example usage in a page or component
/*
import ProductCarousel from "./components/ProductCarousel";

const products = [
  { name: "Product 1", price: "$10", image: "/images/product1.jpg" },
  { name: "Product 2", price: "$15", image: "/images/product2.jpg" },
  { name: "Product 3", price: "$20", image: "/images/product3.jpg" },
];

<ProductCarousel products={products} />
*/
