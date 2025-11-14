"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const cards = [
  { id: 1, image: "/images/card1.jpg", title: "Card One" },
  { id: 2, image: "/images/card2.jpg", title: "Card Two" },
  { id: 3, image: "/images/card3.jpg", title: "Card Three" },
  { id: 4, image: "/images/card4.jpg", title: "Card Four" },
];

// Animation settings
const loopAnimation = {
  animate: {
    x: ["0%", "-100%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 12,
        ease: "linear",
      },
    },
  },
};

export default function CardLoop() {
  return (
    <div className="overflow-hidden w-full bg-black/5 py-6">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        {...loopAnimation}
      >
        {[...cards, ...cards].map((card) => (
          <div
            key={card.id + "-" + Math.random()}
            className="min-w-[240px] bg-white shadow-lg rounded-xl overflow-hidden border"
          >
            <Image
              src={card.image}
              width={240}
              height={150}
              alt={card.title}
              className="object-cover"
            />
            <div className="p-4 text-center font-semibold">{card.title}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
