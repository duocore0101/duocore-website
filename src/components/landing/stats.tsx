"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function Counter({ value, duration = 2 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const target = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/\d/g, '');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function Stats() {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "10+", label: "Years Experience" },
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-100 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl shadow-sm border border-slate-100/50 hover:shadow-md transition-shadow group"
            >
              <h3 className="text-5xl md:text-6xl font-black text-slate-900 mb-3 tracking-tighter group-hover:text-primary transition-colors">
                <Counter value={stat.value} />
              </h3>
              <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
