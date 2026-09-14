import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ChevronsRight } from "lucide-react";

function SliderCheckout({ label = "Slide to complete", redirectTo = "/" }) {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);

  const [trackWidth, setTrackWidth] = useState(0);
  const knobWidth = 56;
  const maxDrag = Math.max(trackWidth - knobWidth - 8, 0);

  useEffect(() => {
    const measure = () => {
      if (constraintsRef.current) {
        setTrackWidth(constraintsRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const opacity = useTransform(x, [0, maxDrag], [1, 0]);
  const bgOpacity = useTransform(x, [0, maxDrag], [0, 1]);

  const handleDragEnd = () => {
    if (completed) return;
    const current = x.get();
    if (current > maxDrag * 0.85) {
      animate(x, maxDrag, { type: "spring", stiffness: 300, damping: 30 });
      setCompleted(true);
      setTimeout(() => {
        navigate(redirectTo);
      }, 500);
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    }
  };

  return (
    <div
      ref={constraintsRef}
      className="relative w-full h-16 rounded-full bg-gray-100 border border-gray-200 overflow-hidden select-none"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-300 to-black rounded-full"
        style={{ opacity: bgOpacity }}
      />
      <motion.span
        className="absolute inset-0 flex items-center justify-center font-semibold text-gray-500 z-0"
        style={{ opacity }}
      >
        {label}
      </motion.span>
      <motion.div
        drag={completed || trackWidth === 0 ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className="absolute top-1 left-1 h-14 w-14 rounded-full bg-black flex items-center justify-center cursor-grab active:cursor-grabbing z-10 shadow-md"
      >
        {completed ? (
          <CheckCircle2 className="text-white" size={26} />
        ) : (
          <ChevronsRight className="text-white" size={24} />
        )}
      </motion.div>
    </div>
  );
}

export default SliderCheckout;