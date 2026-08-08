import { motion } from "framer-motion";

export default function Page1() {
  return (
    <section className="relative min-h-screen overflow-hidden">


      {/* Main Content */}
<div
  className="
    relative z-10
    flex min-h-screen
    items-center justify-center
    px-3
    -translate-y-52
    sm:-translate-y-52
    md:-translate-y-52
    lg:-translate-y-70
    xl:-translate-y-98
    2xl:-translate-y-118
    3xl:-translate-y-[650px]
  "
>
        <motion.div
          initial={{
            opacity: 0,
            y: 18,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-center"
        >
          {/* Bismillah */}
          <p
            dir="rtl"
            className="
text-3xl
sm:text-4xl
md:text-5xl
lg:text-5xl
xl:text-6xl
2xl:text-7xl
3xl:text-8xl
              font-bold
              leading-[1.8]
              text-[#9E6F3D]
            "
            style={{
              fontFamily: "serif",
              textShadow: "0 0 25px rgba(158,111,61,0.18)",
            }}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </motion.div>
      </div>

{/* Welcome Content */}
<div
  className="
    absolute
    inset-x-0
    z-10
    top-[calc(5%+180px)]
    sm:top-[calc(5%+180px)]
    md:top-[calc(5%+180px)]
    lg:top-[calc(2%+180px)]
    xl:top-[calc(5%+180px)]
    2xl:top-[calc(5%+180px)]
    3xl:top-[calc(12%+180px)]

    px-6
    text-center
  "
>
  <motion.div
    initial={{
      opacity: 0,
      y: 20,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    transition={{
      delay: 0.6,
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    {/* Welcome */}
    <motion.h1
      className="
        whitespace-nowrap
        leading-none
        text-[#9E6F3D]
        text-[60px]
        sm:text-[70px]
        md:text-[80px]
        lg:text-[90px]
        xl:text-[100px]
        2xl:text-[130px]
        3xl:text-[200px]
      "
      style={{
        fontFamily: "'Great Vibes', cursive",
      }}
    >
      Welcome
    </motion.h1>

    {/* To Our Wedding Reception */}
<p
  className="
    mt-2
    w-full
    whitespace-nowrap
    text-center
    font-semibold
    text-[9px]
    uppercase
    tracking-[0.32em]
    text-[#9E6F3D]
    translate-x-1

    sm:text-xs
    sm:tracking-[0.35em]
    sm:translate-x-1

    md:text-xs
    md:tracking-[0.32em]
    md:translate-x-2

    lg:text-base
    lg:tracking-[0.45em]
    lg:translate-x-2



xl:text-base
xl:tracking-[0.55em]
xl:translate-x-2

2xl:text-base
2xl:tracking-[0.80em]
2xl:translate-x-3

3xl:text-base
3xl:tracking-[0.90em]
3xl:translate-x-3

  "
>
  To Our Wedding Reception
</p>
  </motion.div>
</div>

    </section>
  );
}