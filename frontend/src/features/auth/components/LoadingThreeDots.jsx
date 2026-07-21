import { motion } from "motion/react"

const container = {
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const dot = {
  hidden: { y: 0 },
  show: {
    y: -10,
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
}

export default function LoadingThreeDotsJumping() {
  return (
    <motion.div
      className="flex items-center justify-center gap-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div className="w-4 h-4 rounded-full bg-white" variants={dot} />
      <motion.div className="w-4 h-4 rounded-full bg-white" variants={dot} />
      <motion.div className="w-4 h-4 rounded-full bg-white" variants={dot} />
    </motion.div>
  )
}