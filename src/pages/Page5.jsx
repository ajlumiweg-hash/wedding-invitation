import { motion, AnimatePresence } from "framer-motion";

import { CheckCircle2, CircleX, Phone, MessageCircle } from "lucide-react";

import { useState } from "react";

import { supabase } from "../lib/supabase";

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
      <span className="h-px w-8 bg-[#C8D8FF] sm:w-10" />

      <motion.span
        className="text-[9px] text-[#C8D8FF] sm:text-[10px]"
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

      <span className="h-px w-8 bg-[#C8D8FF] sm:w-10" />
    </motion.div>
  );
}

function RsvpButton({ icon, children, type, selected, onClick }) {
  const isYes = type === "yes";
  const isSelected = selected === type;

  return (
    <motion.button
      variants={fadeUp}
      onClick={onClick}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.97 }}
      animate={
        isSelected
          ? {
              scale: [1, 1.035, 1],
            }
          : {
              scale: 1,
            }
      }
      transition={
        isSelected
          ? {
              duration: 0.5,
              ease: "easeOut",
            }
          : {
              duration: 0.25,
            }
      }
      className={`relative flex w-full max-w-[300px] items-center justify-center gap-3 overflow-hidden rounded-full border px-5 py-2.5 text-[12px] transition-all duration-500 sm:max-w-[320px] sm:py-3 sm:text-[13px] ${
        isSelected && isYes
          ? "border-[#39FF88] bg-[#39FF88]/15 text-[#39FF88] shadow-[0_0_12px_rgba(57,255,136,0.65),0_0_30px_rgba(57,255,136,0.35)]"
          : isSelected && !isYes
            ? "border-[#FF4545] bg-[#FF4545]/15 text-[#FF4545] shadow-[0_0_12px_rgba(255,69,69,0.65),0_0_30px_rgba(255,69,69,0.35)]"
            : isYes
              ? "border-[#C8D8FF]/80 bg-[#C8D8FF]/20 text-[#C8D8FF] shadow-[0_0_18px_rgba(200,216,255,0.18)]"
              : "border-[#C8D8FF]/70 bg-[#0B1D3D]/10 text-[#C8D8FF]"
      }`}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      {isSelected && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`absolute inset-0 rounded-full ${
            isYes ? "bg-[#39FF88]/10" : "bg-[#FF4545]/10"
          }`}
        />
      )}

      <span className="relative z-10 flex items-center gap-3">
        {icon}
        <span>{children}</span>
      </span>
    </motion.button>
  );
}

export default function Page5() {
  const [selected, setSelected] = useState(null);

  const saveRsvp = async (status) => {
    const guestId = localStorage.getItem(
      "wedding_invitation_guest_id"
    );

    if (!guestId) {
      console.error("Guest ID not found");
      return;
    }

    const willAttend = status === "will_attend";

    const { error } = await supabase
      .from("invitation_guests")
      .update({
        will_attend: willAttend,
        rsvp_status: status,
        responded_at: new Date().toISOString(),
      })
      .eq("id", guestId);

    if (error) {
      console.error("RSVP save error:", error);
      return;
    }

    console.log("RSVP saved:", status);
  };

  return (
    <section className="relative z-10 flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-5 py-10 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex w-full max-w-[430px] flex-col items-center justify-center"
      >
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center"
        >
          <h1
            className="text-[25px] leading-none text-[#FFFFFF] sm:text-[29px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Will You Honor Us
          </h1>

          <p
            className="mt-1 text-[13px] text-[#C8D8FF] sm:text-[15px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            With Your Presence?
          </p>

          <GoldDivider />
        </motion.div>

        {/* RSVP Buttons */}
        <div className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-7">
          <RsvpButton
            type="yes"
            selected={selected}
            onClick={() => {
              setSelected("yes");
              saveRsvp("will_attend");
            }}
            icon={
              <CheckCircle2
                size={17}
                strokeWidth={1.5}
              />
            }
          >
            In Sha Allah
          </RsvpButton>

          <RsvpButton
            type="no"
            selected={selected}
            onClick={() => {
              setSelected("no");
              saveRsvp("cant_attend");
            }}
            icon={
              <CircleX
                size={17}
                strokeWidth={1.5}
              />
            }
          >
            Unable to Attend
          </RsvpButton>
        </div>

        {/* RSVP Response Animation */}
        <div className="pointer-events-none relative h-12 w-full">
          <AnimatePresence mode="wait">
            {selected === "yes" && (
              <motion.div
                key="happy"
                initial={{ opacity: 0, y: -8, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.8 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-x-0 top-3 flex items-center justify-center gap-2"
              >
                <motion.span
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-[14px] text-[#39FF88]"
                >
                  ✦
                </motion.span>

                <span
                  className="text-[11px] text-[#39FF88]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  Alhamdulillah, we look forward to seeing you
                </span>

                <motion.span
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                  className="text-[14px] text-[#39FF88]"
                >
                  ✦
                </motion.span>
              </motion.div>
            )}

            {selected === "no" && (
              <motion.div
                key="sad"
                initial={{ opacity: 0, y: -8, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.8 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-x-0 top-3 flex items-center justify-center gap-2"
              >
                <motion.span
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-[14px] text-[#FF4545]"
                >
                  ♡
                </motion.span>

                <span
                  className="text-[11px] text-[#FF4545]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  We'll miss having you with us
                </span>

                <motion.span
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  className="text-[14px] text-[#FF4545]"
                >
                  ♡
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Get In Touch */}
        <motion.div
          variants={fadeUp}
          className="mt-1 flex w-full flex-col items-center sm:mt-2"
        >
          <p
            className="text-[9px] font-medium tracking-[0.3em] text-[#C8D8FF] sm:text-[10px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            GET IN TOUCH
          </p>

          <GoldDivider />
        </motion.div>

        {/* Contact Buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-5 flex w-full items-start justify-center gap-8 sm:gap-10"
        >
          {/* Call */}
          <div className="flex flex-col items-center">
            <motion.a
              href="tel:+919847961503"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C8D8FF]/80 bg-[#C8D8FF]/10 text-[#C8D8FF] shadow-[0_0_16px_rgba(200,216,255,0.15)] sm:h-14 sm:w-14"
            >
              <Phone
                size={20}
                strokeWidth={1.5}
              />
            </motion.a>

            <span
              className="mt-2 text-[10px] text-[#FFFFFF] sm:text-[11px]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Call
            </span>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col items-center">
            <motion.a
              href={`https://wa.me/919847961503?text=${encodeURIComponent("Assalamu Alaikum 🌙🤍\n\nI’m happy to confirm my attendance for your wedding. 💍✨\n\nMay Allah bless you both with a beautiful life together. 🤲🏻❤️")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C8D8FF]/80 bg-[#C8D8FF]/10 text-[#C8D8FF] shadow-[0_0_16px_rgba(200,216,255,0.15)] sm:h-14 sm:w-14"
            >
              <MessageCircle
                size={21}
                strokeWidth={1.5}
              />
            </motion.a>

            <span
              className="mt-2 text-[10px] text-[#FFFFFF] sm:text-[11px]"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              WhatsApp
            </span>
          </div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          variants={fadeUp}
          className="mt-7 flex flex-col items-center sm:mt-8"
        >
          <p
            className="text-[10px] leading-[1.7] text-[#FFFFFF] sm:text-[11px]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            We would love to hear from you
          </p>

          <motion.span
            className="mt-1 text-[12px] text-[#C8D8FF]"
            animate={{
              opacity: [0.45, 1, 0.45],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ❧
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
