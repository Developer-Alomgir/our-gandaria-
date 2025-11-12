
import { motion } from "framer-motion";

const ItemList = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="item-card p-6 bg-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
};

export default ItemList;
