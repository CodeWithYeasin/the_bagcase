"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="font-serif text-5xl text-navy tracking-[0.2em]">THE BAGCASE</p>
            <p className="mt-2 text-xs tracking-[0.35em] text-gold">
              EST. 2023 | EXQUISITE TRAVEL & LIFESTYLE
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
