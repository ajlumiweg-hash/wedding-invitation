import { motion } from "framer-motion";

export default function Page1() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Main Content */}
      <div
        className="
          relative z-10 flex min-h-screen items-center justify-center px-3 -translate-y-52
          sm:-translate-y-52
          md:-translate-y-52
          lg:-translate-y-60
          xl:-translate-y-84
          2xl:-translate-y-98
          3xl:-translate-y-180
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
              lg:text-[34px]
              xl:text-[40px]
              2xl:text-[52px]
              3xl:text-[100px]  
            "
            style={{fontFamily: "serif", textShadow: "0 0 25px rgba(158,111,61,0.18)", }}         
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </motion.div>

      </div>

      {/* Welcome Content */}
      <div
        className="absolute inset-x-0 z-10 px-6 text-center top-[calc(5%+180px)]
          sm:top-[calc(5%+180px)]
          md:top-[calc(5%+180px)]
          lg:top-[calc(5%+180px)]
          xl:top-[calc(8%+180px)]
          2xl:top-[calc(12%+180px)]
          3xl:top-[calc(22%+180px)]    
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
              sm:text-[70px]
              md:text-[80px]
              lg:text-[90px]
              xl:text-[100px]
              2xl:text-[130px]
              3xl:text-[250px]      
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
              lg:text-lg lg:tracking-[0.32em] lg:translate-x-2
              xl:text-xl xl:tracking-[0.32em] xl:translate-x-2
              2xl:text-2xl 2xl:tracking-[0.32em] 2xl:translate-x-3
              3xl:text-5xl 3xl:tracking-[0.32em] 3xl:translate-x-3   
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
                sm:w-20 md:w-24 lg:w-45 xl:w-50 2xl:w-61  3xl:w-122 
              "
              variants={{hidden: { scaleX: 0, opacity: 0 },visible: {scaleX: 1, opacity: 1,transition: {duration: 0.8, ease: [0.22, 1, 0.36, 1],},},}} 
            />

            {/* Heart */}
            <motion.span
              className="text-sm text-[#9E6F3D] sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl" 
              initial={{ opacity: 0, scale: 0 }}
              animate={{opacity: 1, scale: [1, 1.18, 1, 1.12, 1],}}       
              transition={{opacity: {duration: 0.4, }, scale: {delay: 0.4, duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 2,},}} 
            >
              ♥
            </motion.span>

            {/* Right Line */}
            <motion.span
              className="h-px w-29 bg-[#9E6F3D] origin-left
                sm:w-20 md:w-24 lg:w-45 xl:w-50 2xl:w-61  3xl:w-122 
              "
              variants={{hidden: { scaleX: 0, opacity: 0 },visible: {scaleX: 1,opacity: 1,transition: {duration: 0.8, ease: [0.22, 1, 0.36, 1],},},}}                                        
            />
          </motion.div>

        </motion.div>
      </div>

      {/* Wedding Story */}
      <div
        className="absolute inset-x-0 z-10 px-6 text-center top-[calc(23%+180px)]
          sm:top-[calc(23%+180px)]
          md:top-[calc(23%+180px)]
          lg:top-[calc(31%+180px)]
          xl:top-[calc(29%+180px)]
          2xl:top-[calc(34%+180px)]
          3xl:top-[calc(44%+180px)]    
        "
      >
        <motion.div
          initial={{opacity: 0,y: 20,}}  
          animate={{opacity: 1,y: 0,}}  
          transition={{delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1],}}  
          className="flex flex-col items-center gap-4 sm:gap-4 md:gap-5 lg:gap-7 xl:gap-8 2xl:gap-13 3xl:gap-22"

        >
          <p
            className="w-full text-center text-[9px] uppercase translate-x-1 text-[#9E6F3D] tracking-[0.32em] font-bold  whitespace-nowrap
              sm:text-xs sm:tracking-[0.35em] sm:translate-x-1   
              md:text-xs md:tracking-[0.32em] md:translate-x-2    
              lg:text-lg lg:tracking-[0.32em] lg:translate-x-2
              xl:text-xl xl:tracking-[0.32em] xl:translate-x-2
              2xl:text-2xl 2xl:tracking-[0.32em] 2xl:translate-x-3
              3xl:text-5xl 3xl:tracking-[0.32em] 3xl:translate-x-3    
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
              3xl:text-5xl 3xl:tracking-[0.32em] 3xl:translate-x-3       
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
              3xl:text-5xl 3xl:tracking-[0.32em] 3xl:translate-x-3      
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
              3xl:text-5xl 3xl:tracking-[0.32em] 3xl:translate-x-3    
            "
          >
            eternal story.
          </p>
        </motion.div>
      </div>

    </section>
  );
}