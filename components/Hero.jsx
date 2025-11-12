
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero-section flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatType: "mirror" }}
        className="text-5xl font-bold mb-4"
      >
        স্বাগতম আমাদের সাইটে!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="text-xl text-gray-700"
      >
        এখানে আপনার প্রকল্পের বর্ণনা থাকবে।
      </motion.p>
    </section>
  );
};

export default Hero;
