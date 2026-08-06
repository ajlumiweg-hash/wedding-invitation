import { motion } from "framer-motion";

function Page6() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-12 text-[#B8864A]">
      <div
        className="
          w-full
          max-w-[420px]
          mx-auto
          flex
          flex-col
          items-center
          text-center
        "
      >

        {/* Thank You */}
        <motion.h1
          initial={{
            opacity: 0,
            y: -40,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="
            font-serif
            text-[52px]
            sm:text-[68px]
            leading-none
            font-semibold
          "
        >
          Thank You
        </motion.h1>

        {/* Message */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="mt-10 max-w-[320px]"
        >
          <p
            className="
              text-[22px]
              sm:text-[25px]
              leading-snug
              font-serif
            "
          >
            Your presence will make our
          </p>

          <p
            className="
              mt-2
              text-[22px]
              sm:text-[25px]
              leading-snug
              font-serif
            "
          >
            celebration even more
          </p>

          <p
            className="
              mt-2
              text-[22px]
              sm:text-[25px]
              leading-snug
              font-serif
            "
          >
            memorable.
          </p>
        </motion.div>
        {/* Divider */}
        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.45,
          }}
          className="
            mt-12
            flex
            items-center
            justify-center
            gap-5
            w-full
          "
        >
          <div className="h-px w-20 sm:w-24 bg-[#B8864A]/55" />

          <span className="text-[22px]">
            ♥
          </span>

          <div className="h-px w-20 sm:w-24 bg-[#B8864A]/55" />
        </motion.div>

        {/* Closing Message */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.65,
          }}
          className="
            mt-10
            max-w-[310px]
            text-center
          "
        >
          <p
            className="
              text-[18px]
              sm:text-[20px]
              leading-relaxed
              font-light
              tracking-wide
            "
          >
            We look forward to celebrating
          </p>

          <p
            className="
              text-[18px]
              sm:text-[20px]
              leading-relaxed
              font-light
              tracking-wide
            "
          >
            with you.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default Page6;