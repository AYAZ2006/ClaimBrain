import { motion } from "framer-motion";

export default function KineticText({
  text,
  as: Tag = "h1",
  className = "",
}) {
  const MotionTag = motion(Tag);

  return (
    <MotionTag
      className={`flex flex-wrap justify-center ${className}`}
      initial="hidden"
      animate="visible"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          transition={{
            delay: index * 0.03,
            duration: 0.45,
            ease: "easeOut",
          }}
          whileHover={{
            scale: 1.18,
            fontWeight: 900,
            color: "#111827",
            transition: {
              duration: 0.2,
            },
          }}
          className="inline-block cursor-default"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </MotionTag>
  );
}