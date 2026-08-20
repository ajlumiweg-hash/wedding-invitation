import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import auditorium from "../assets/auditorium.png";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const divider = {
  hidden: { opacity: 0, scaleX: 0 },
  show: {
    opacity: 1,
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

function GoldDivider() {
  return (
    <motion.div
      variants={divider}
      className="mt-3 flex items-center justify-center gap-3"
    >
      <span className="h-px w-8 bg-[#6F5034] sm:w-10" />

      <motion.span
        className="text-[9px] text-[#D6A85F] sm:text-[10px]"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.15, 1],
        }}
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

export default function Page4() {
  const MAP_URL =
    "https://www.google.com/maps/dir//Ayisha+Convention+Centre,+Mevaram+road,+near+Akmhss,+P+O,+Mylapure,+Umayanalloor,+Thazhuthala,+Kerala+691020/@8.8932352,76.67712,13z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3b05e39b74aca57d:0x16be143d221421d4!2m2!1d76.6476053!2d8.8741751?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section className="mx-auto flex w-full max-w-[430px]  flex-col items-center justify-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-[430px] flex-col items-center justify-center"
      >
        {/* Title */}
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          <span className="mb-1 text-[13px] text-[#D6A85F]">
            ❧
          </span>

          <h1
            className="text-[25px] leading-none text-[#946F45] sm:text-[29px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Wedding Venue
          </h1>

          <GoldDivider />
        </motion.div>

        {/* Venue Image */}
        <motion.div
          variants={fadeUp}
          className="relative mt-5 w-full max-w-[370px] px-2 sm:mt-6"
        >
          <div className="relative rounded-[4px] border border-[#946F45] p-[4px] shadow-[0_8px_25px_rgba(0,0,0,0.35)]">
            <div className="relative overflow-hidden rounded-[2px] border border-[#6F5034]">
              <img
                src={auditorium}
                alt="Ayisha Convention Centre"
                className="block aspect-[16/8.8] w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040B1D]/30 via-transparent to-[#040B1D]/5" />
            </div>

            {/* Corner Details */}
            <span className="absolute left-1 top-1 h-3 w-3 border-l border-t border-[#B8894F]" />
            <span className="absolute right-1 top-1 h-3 w-3 border-r border-t border-[#B8894F]" />
            <span className="absolute bottom-1 left-1 h-3 w-3 border-b border-l border-[#B8894F]" />
            <span className="absolute bottom-1 right-1 h-3 w-3 border-b border-r border-[#B8894F]" />
          </div>
        </motion.div>

        {/* Address */}
        <motion.div
          variants={fadeUp}
          className="mt-4 flex w-full max-w-[320px] items-start justify-center gap-2 text-left sm:mt-5"
        >
          <MapPin
            size={17}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-[#B8894F]"
          />

          <p
            className="text-[10px] leading-[1.55] text-[#946F45] sm:text-[11px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Mevaram Road, near AKMHSS,
            <br />
            P O, Mylapure,
            <br />
            Umayanalloor, Thazhuthala,
            <br />
            Kerala 691020
          </p>
        </motion.div>

        {/* Date */}
        <motion.div
          variants={fadeUp}
          className="mt-4 flex flex-col items-center sm:mt-5"
        >
          <GoldDivider />

          <div className="mt-3 flex items-center gap-2 text-[#946F45]">
            <CalendarDays
              size={17}
              strokeWidth={1.5}
              className="text-[#B8894F]"
            />

            <p
              className="text-[16px] leading-none sm:text-[18px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              06 December 2026
            </p>
          </div>
        </motion.div>

        {/* Time */}
        <motion.div
          variants={fadeUp}
          className="mt-3 flex flex-col items-center"
        >
          <p
            className="text-[8px] font-medium tracking-[0.25em] text-[#6F5034] sm:text-[9px]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            SUNDAY AT
          </p>

          <div className="mt-1.5 flex items-center gap-2">
            <Clock3
              size={16}
              strokeWidth={1.5}
              className="text-[#B8894F]"
            />

            <p
              className="text-[16px] leading-none text-[#946F45] sm:text-[18px]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              12:00 PM
            </p>
          </div>
        </motion.div>

        {/* Map Button */}
        <motion.a
          variants={fadeUp}
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-5 flex items-center gap-2 rounded-full border border-[#946F45]/80 bg-[#946F45]/10 px-5 py-2 text-[9px] uppercase tracking-[0.16em] text-[#B8894F] transition-colors duration-300 hover:bg-[#946F45]/20 sm:mt-6 sm:px-6 sm:py-2.5 sm:text-[10px]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          <MapPin size={13} strokeWidth={1.7} />
          <span>View on Map</span>
        </motion.a>
      </motion.div>
    </section>
  );
}