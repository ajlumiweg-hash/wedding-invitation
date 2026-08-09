import { motion } from "framer-motion";

export default function Page1() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Main Content */}
      <div
        className="
          relative z-10 flex min-h-screen items-center justify-center px-3
          -translate-y-[30vh]
          sm:-translate-y-[30vh]
          md:-translate-y-[30vh]
          lg:-translate-y-[25vh]
          xl:-translate-y-[25vh]
          2xl:-translate-y-[24vh] 
        "
      >
        <motion.div
          initial={{opacity: 0, y: 18, scale: 0.96,}}
          animate={{opacity: 1, y: 0, scale: 1,}}
          transition={{duration: 1.4, ease: [0.22, 1, 0.36, 1],}}
          className="text-center"
        >
          {/* Bismillah */}
          <p
            dir="rtl"
            className=" text-[24px] font-bold leading-[1.8] text-[#9E6F3D]
              sm:text-[24px]
              md:text-[24px]
              lg:text-[30px]
              xl:text-[40px]
              2xl:text-[47px]
              
            "
            style={{fontFamily: "serif", textShadow: "0 0 25px rgba(158,111,61,0.18)", }}         
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </motion.div>

      </div>

      {/* Welcome Content */}
      <div
        className="absolute inset-x-0 z-10 px-6 text-center
          top-[28vh]
          sm:top-[28vh]
          md:top-[28vh]
          lg:top-[34vh]
          xl:top-[34vh]
          2xl:top-[36vh]
        "
      >
        <motion.div
          initial={{opacity: 0,y: 20,}}  
          animate={{opacity: 1,y: 0,}}  
          transition={{delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1],}}  
        >
          {/* Welcome */}
          <motion.h1
            className="whitespace-nowrap leading-none text-[#9E6F3D]  text-[60px]
              sm:text-[60px]
              md:text-[60px]
              lg:text-[76px]
              xl:text-[100px]
              2xl:text-[120px]
                   
            "
            style={{fontFamily: "'Great Vibes', cursive",}}
          >
            Welcome
          </motion.h1>

          {/* To Our Wedding Reception */}
          <p
            className="mt-2 w-full text-center text-[9px] uppercase translate-x-1 text-[#9E6F3D] tracking-[0.32em] font-semibold  whitespace-nowrap
              sm:text-xs sm:tracking-[0.35em] sm:translate-x-1   
              md:text-xs md:tracking-[0.32em] md:translate-x-2    
              lg:text-base lg:tracking-[0.32em] lg:translate-x-2
              xl:text-xl xl:tracking-[0.32em] xl:translate-x-2
              2xl:text-2xl 2xl:tracking-[0.32em] 2xl:translate-x-3
               
            "
          >
            To Our Wedding Reception
          </p>

          {/* Decorative Divider */}
          <motion.div
            className="mt-3 flex items-center justify-center gap-2"
            initial="hidden" animate="visible"            
            variants={{hidden: {},visible: {transition: {delayChildren: 1.0,},},}}    
          >
            {/* Left Line */}
            <motion.span
              className="h-px w-29 bg-[#9E6F3D] origin-right
                sm:w-29 md:w-29 lg:w-base xl:w-base 2xl:w-base"
              
              variants={{hidden: { scaleX: 0, opacity: 0 },visible: {scaleX: 1, opacity: 1,transition: {duration: 0.8, ease: [0.22, 1, 0.36, 1],},},}} 
            />

            {/* Heart */}
            <motion.span
              className="text-sm text-[#9E6F3D] sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl " 
              initial={{ opacity: 0, scale: 0 }}
              animate={{opacity: 1, scale: [1, 1.18, 1, 1.12, 1],}}       
              transition={{opacity: {duration: 0.4, }, scale: {delay: 0.4, duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 2,},}} 
            >
              ♥
            </motion.span>

            {/* Right Line */}
            <motion.span
              className="h-px w-29 bg-[#9E6F3D] origin-left
                sm:w-29 md:w-29 lg:w-base xl:w-base 2xl:w-base"
    
              variants={{hidden: { scaleX: 0, opacity: 0 },visible: {scaleX: 1,opacity: 1,transition: {duration: 0.8, ease: [0.22, 1, 0.36, 1],},},}}                                        
            />
          </motion.div>

        </motion.div>
      </div>

      {/* Wedding Story */}
      <div
        className="absolute inset-x-0 z-10 px-6 text-center
          top-[45vh]
          sm:top-[45vh]
          md:top-[45vh]
          lg:top-[55vh]
          xl:top-[55vh]
          2xl:top-[63vh]       
        "
      >
        <motion.div
          initial={{opacity: 0,y: 20,}}  
          animate={{opacity: 1,y: 0,}}  
          transition={{delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1],}}  
          className="flex flex-col items-center gap-4 sm:gap-4 md:gap-5 lg:gap-7 xl:gap-7 2xl:gap-8 "

        >
          <p
            className="w-full text-center text-[9px] uppercase translate-x-1 text-[#9E6F3D] tracking-[0.32em] font-bold  whitespace-nowrap
              sm:text-xs sm:tracking-[0.35em] sm:translate-x-1   
              md:text-xs md:tracking-[0.32em] md:translate-x-2    
              lg:text-lg lg:tracking-[0.32em] lg:translate-x-2
              xl:text-xl xl:tracking-[0.32em] xl:translate-x-2
              2xl:text-2xl 2xl:tracking-[0.32em] 2xl:translate-x-3
                 
            "
          >
            With Allah's blessings
          </p>
          <p
            className="w-full text-center text-[9px] uppercase translate-x-1 text-[#9E6F3D] tracking-[0.32em] font-bold  whitespace-nowrap
              sm:text-xs sm:tracking-[0.35em] sm:translate-x-1   
              md:text-xs md:tracking-[0.32em] md:translate-x-2    
              lg:text-lg lg:tracking-[0.32em] lg:translate-x-2
              xl:text-xl xl:tracking-[0.32em] xl:translate-x-2
              2xl:text-2xl 2xl:tracking-[0.32em] 2xl:translate-x-3
                    
            "
          >
           and endless grace, 
          </p>
          <p
            className="w-full text-center text-[9px] uppercase translate-x-1 text-[#9E6F3D] tracking-[0.32em] font-bold  whitespace-nowrap
              sm:text-xs sm:tracking-[0.35em] sm:translate-x-1   
              md:text-xs md:tracking-[0.32em] md:translate-x-2    
              lg:text-lg lg:tracking-[0.32em] lg:translate-x-2
              xl:text-xl xl:tracking-[0.32em] xl:translate-x-2
              2xl:text-2xl 2xl:tracking-[0.32em] 2xl:translate-x-3
                
            "
          >
            two hearts become one 
          </p>
          <p
            className="w-full text-center text-[9px] uppercase translate-x-1 text-[#9E6F3D] tracking-[0.32em] font-bold  whitespace-nowrap
              sm:text-xs sm:tracking-[0.35em] sm:translate-x-1   
              md:text-xs md:tracking-[0.32em] md:translate-x-2    
              lg:text-lg lg:tracking-[0.32em] lg:translate-x-2
              xl:text-xl xl:tracking-[0.32em] xl:translate-x-2
              2xl:text-2xl 2xl:tracking-[0.32em] 2xl:translate-x-3
               
            "
          >
            eternal story.
          </p>
        </motion.div>
      </div>

    </section>
  );
}