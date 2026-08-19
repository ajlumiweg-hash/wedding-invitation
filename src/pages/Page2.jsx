import { motion } from "framer-motion"; 
 
const container = { 
  hidden: {}, 
  show: { 
    transition: { staggerChildren: 0.18, delayChildren: 0.1 }, 
  }, 
}; 
 
const fadeUp = { 
  hidden: { opacity: 0, y: 18 }, 
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }, 
  }, 
}; 
 
const divider = { 
  hidden: { opacity: 0, scaleX: 0 }, 
  show: { 
    opacity: 1, 
    scaleX: 1, 
    transition: { duration: 0.8, ease: "easeOut" }, 
  }, 
}; 
 
function AnimatedDivider() { 
  return ( 
    <motion.div 
      variants={divider} 
      className="mt-5 flex items-center gap-3 text-[#B8894F]" 
    > 
      <span className="h-px w-8 bg-[#6F5034] sm:w-10" /> 
 
      <motion.span 
        className="text-[10px] text-[#D6A85F]" 
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.15, 1] }} 
        transition={{ 
          duration: 2.6, 
          repeat: Infinity, 
          ease: "easeInOut", 
          delay: 2.4, 
        }} 
      > 
        ♡ 
      </motion.span> 
 
      <span className="h-px w-8 bg-[#6F5034] sm:w-10" /> 
    </motion.div> 
  ); 
} 
 
export default function Page2() { 
  return ( 
    <section className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-5 py-10 text-center">
      <motion.div 
        variants={container} 
        initial="hidden" 
        animate="show" 
        className="mx-auto flex w-full max-w-[560px] flex-col items-center justify-center" 
      > 
        {/* Together Forever */} 
        <motion.div 
          variants={fadeUp} 
          className="flex flex-col items-center" 
        > 
          <p className="font-serif text-[17px] tracking-wide text-[#946F45] sm:text-lg md:text-xl"> 
            Together Forever 
          </p> 
 
        </motion.div> 
 
        {/* Decorative Line */} 
        <motion.div 
          variants={{ 
            hidden: { width: 0, opacity: 0 }, 
            show: { 
              width: 75, 
              opacity: 1, 
              transition: { duration: 0.9, ease: "easeOut" }, 
            }, 
          }} 
          className="mb-5 h-px bg-gradient-to-r from-transparent via-[#946F45] to-transparent" 
        /> 
 
        {/* Bride */} 
        <motion.div 
          variants={fadeUp} 
          className="mt-8 flex flex-col items-center sm:mt-10" 
        > 
          <h1 className="font-['Great_Vibes'] text-[68px] leading-none text-[#946F45] sm:text-[80px] md:text-[94px]"> 
            Jasmi 
          </h1> 
 
        </motion.div> 
 
        {/* With */} 
        <motion.div 
          variants={fadeUp} 
          className="mt-5 flex flex-col items-center sm:mt-4" 
        > 
          <p className="text-[9px] font-medium tracking-[0.28em] text-[#6F5034] sm:text-[10px] md:text-[11px]"> 
            WITH 
          </p> 
        </motion.div> 
 
        {/* Groom */} 
        <motion.div 
          variants={fadeUp} 
          className="mt-6 flex flex-col items-center sm:mt-7" 
        > 
          <h1 className="font-['Great_Vibes'] text-[68px] leading-none text-[#946F45] sm:text-[80px] md:text-[94px]"> 
            Al Ameen 
          </h1> 
 
          <AnimatedDivider /> 
        </motion.div> 
 
        {/* Bottom Writing */} 
        <motion.div 
          variants={fadeUp} 
          className="mt-5 flex flex-col items-center font-serif text-[11px] leading-[1.9] text-[#946F45] sm:mt-7 sm:text-xs md:text-sm" 
        > 
          <p>Two hearts, one</p> 
          <p>beautiful journey</p> 
 
        </motion.div> 
      </motion.div> 
    </section> 
  ); 
}
