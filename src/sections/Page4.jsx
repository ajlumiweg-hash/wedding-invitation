import { motion } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  Clock,
} from "lucide-react";

import auditorium from "../assets/auditorium.png";
import "../styles/Page4.css";

function Page4() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-[#C89A58]">

      {/* Main Container */}
      <div className="w-full max-w-[540px] mx-auto text-center">

{/* Heading */}
<motion.div
  initial={{ opacity: 0, y: -25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="
    -mt-8
    sm:-mt-10
    lg:-mt-12
    pb-6
    sm:pb-8
  "
>
  {/* Top Ornament */}
  <div className="flex items-center justify-center gap-3">
    <span className="h-px w-10 sm:w-20 bg-[#C89A58]/40" />
    <span className="text-base sm:text-lg leading-none">❦</span>
    <span className="h-px w-10 sm:w-20 bg-[#C89A58]/40" />
  </div>

  {/* Heading */}
  <p
    className="
      mt-4
      uppercase
      tracking-[0.45em]
      text-[10px]
      sm:text-xs
      font-medium
    "
  >
    Wedding Venue
  </p>

  {/* Bottom Line */}
  <div className="mt-4 flex items-center justify-center gap-3">
    <span className="h-px w-20 sm:w-36 bg-[#C89A58]/30" />
    <span className="w-2 h-2 rounded-full bg-[#C89A58]" />
    <span className="h-px w-20 sm:w-36 bg-[#C89A58]/30" />
  </div>
</motion.div>

{/* Hero Image */}
<motion.div
  initial={{ opacity: 0, y: 35 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.8,
    delay: 0.2,
  }}
  className="mt-10 sm:mt-14 flex justify-center"
>
  <img
    src={auditorium}
    alt="Venue"
    className="
      block
      w-full

      max-w-[280px]
      sm:max-w-[460px]
      lg:max-w-[560px]

      aspect-[4/3]
      object-cover

      transition-transform
      duration-500
      hover:scale-[1.02]
    "
  />
</motion.div>

{/* Venue */}
<motion.div
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.7,
    delay: 0.35,
  }}
  className="mt-114 sm:mt-16"
>

  {/* Top Ornament */}
  <div className="flex items-center justify-center gap-3">
    <span className="h-px w-14 sm:w-24 bg-[#C89A58]/35" />

    <div
      className="
        w-8
        h-8
        rounded-full
        border
        border-[#C89A58]/30
        flex
        items-center
        justify-center
      "
    >
      <MapPin
        size={15}
        strokeWidth={1.8}
        className="text-[#C89A58]"
      />
    </div>

    <span className="h-px w-14 sm:w-24 bg-[#C89A58]/35" />
  </div>

  {/* Address */}
  <div className="mt-8 flex justify-center px-5">
    <address
      className="
        not-italic

        w-full
        max-w-[340px]
        sm:max-w-[470px]

        text-center

        text-[14px]
        sm:text-[15px]
        md:text-[16px]

        leading-7
        sm:leading-8

        font-medium

        tracking-[0.02em]

        text-[#C89A58]
      "
    >
      Mevaram Road, near AKMHSS,<br />
      P O, Mylapure,<br />
      Umayanalloor, Thazhuthala,<br />
      Kerala 691020
    </address>
  </div>


</motion.div>

{/* Date & Time */}
<motion.div
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.7,
    delay: 0.55,
  }}
  className="
    mt-16
    sm:mt-20
    md:mt-24
    lg:mt-28

    w-full
    flex
    justify-center
    px-5
  "
>
  <div
    className="
      w-full
      max-w-[260px]
      sm:max-w-[340px]
      md:max-w-[400px]
      lg:max-w-[460px]

      text-center
    "
  >

    {/* Ornament */}
    <div className="flex items-center justify-center gap-3">
      <span className="flex-1 h-px bg-[#C89A58]/35" />

      <CalendarDays
        size={20}
        strokeWidth={1.8}
        className="shrink-0 text-[#C89A58]"
      />

      <span className="flex-1 h-px bg-[#C89A58]/35" />
    </div>

    {/* Date */}
    <h3
      className="
        mt-7

        font-serif
        font-semibold

        text-[1.25rem]
        sm:text-[1.55rem]
        md:text-[1.75rem]
        lg:text-[2rem]

        leading-tight
        text-[#C89A58]
      "
    >
      06 December 2026
    </h3>

    {/* Day */}
    <p
      className="
        mt-4

        uppercase
        tracking-[0.18em]

        text-[12px]
        sm:text-[13px]
        md:text-[14px]

        font-medium
        text-[#C89A58]
      "
    >
      Sunday at
    </p>

    {/* Time */}
    <div className="mt-5 flex items-center justify-center gap-2">
      <Clock
        size={17}
        strokeWidth={1.8}
        className="shrink-0 text-[#C89A58]"
      />

      <span
        className="
          font-serif
          font-semibold

          text-[1.4rem]
          sm:text-[1.7rem]
          md:text-[1.9rem]
          lg:text-[2.15rem]

          leading-none
          text-[#C89A58]
        "
      >
        12:00 PM
      </span>
    </div>

  </div>
</motion.div>


{/* View on Map */}
<motion.div
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.7,
    delay: 0.75,
  }}
  className="
    mt-20
    sm:mt-24
    lg:mt-28
    mb-8
    flex
    justify-center
    px-4
  "
>
  <div className="flex flex-col items-center">

    {/* Top Ornament */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: .8 }}
        className="mt-5 flex items-center gap-3"
      >
         <span className="h-[1px] w-20 sm:w-28 bg-[#9E6F3D]" />
        <span className="text-xl">♥</span>
        <span className="h-[1px] w-20 sm:w-28 bg-[#9E6F3D]" />
      </motion.div>


    {/* Button */}
    <motion.a
      whileHover={{
        scale: 1.03,
        y: -2,
      }}
      whileTap={{
        scale: 0.97,
      }}
      href="https://maps.app.goo.gl/WPdsBtAT8aRdG1VA7"
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex
        items-center
        justify-center
        gap-3

        min-w-[150px]
        sm:min-w-[170px]

        px-8
        sm:px-10

        py-3
        sm:py-3.5

        rounded-full

        border
        border-[#C89A58]/40

        text-[#C89A58]

        text-[11px]
        sm:text-[12px]
        md:text-[13px]

        uppercase
        tracking-[0.20em]
        font-semibold

        transition-all
        duration-300

        hover:bg-[#C89A58]
        hover:text-[#08101F]
      "
    >
      <MapPin
        size={17}
        strokeWidth={1.8}
      />

      <span>View on Map</span>
    </motion.a>

  </div>
</motion.div>

      </div>
    </section>
  );
}

export default Page4;