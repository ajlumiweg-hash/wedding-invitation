import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function Page5() {
  const [selected, setSelected] = useState("");

  const handleAccept = () => {
    setSelected("accept");

    setTimeout(() => {
      setSelected("");
    }, 1200);
  };

  const handleDecline = () => {
    setSelected("decline");

    setTimeout(() => {
      setSelected("");
    }, 1200);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-5 sm:px-6 py-12 text-[#B8864A]">
      <div
        className="
          w-full
          max-w-[360px]
          mx-auto
          flex
          flex-col
          items-center
          text-center
        "
      >

        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="w-full"
        >
          <h2
            className="
              font-serif
              text-[34px]
              sm:text-[42px]
              font-semibold
              leading-tight
            "
          >
            Will You Honor Us
          </h2>

          <p
            className="
              mt-3
              text-[18px]
              sm:text-[20px]
              font-light
              tracking-wide
            "
          >
            With Your Presence?
          </p>
        </motion.div>

        {/* RSVP Buttons */}
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="
            mt-10
            w-full
            flex
            flex-col
            items-center
            gap-5
          "
        >

          {/* In Sha Allah */}
          <motion.button
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            animate={
              selected === "accept"
                ? {
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            onClick={handleAccept}
            className={`
              w-full
              max-w-[320px]
              h-[58px]
              rounded-full
              flex
              items-center
              justify-center
              gap-3
              border
              transition-all
              duration-300

              ${
                selected === "accept"
                  ? "bg-green-500 border-green-500 text-white shadow-[0_0_35px_rgba(34,197,94,.55)]"
                  : "border-[#B8864A]/35 bg-[#B8864A]/5"
              }
            `}
          >
            {selected === "accept" ? (
              <CheckCircle2 size={20} />
            ) : (
              <div className="w-4 h-4 rounded-full bg-green-500" />
            )}

            <span className="text-[18px] font-semibold tracking-wide">
              {selected === "accept"
                ? "Thank You ❤️"
                : "In Sha Allah"}
            </span>
          </motion.button>

          {/* Unable */}
          <motion.button
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            animate={
              selected === "decline"
                ? {
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            onClick={handleDecline}
            className={`
              w-full
              max-w-[320px]
              h-[58px]
              rounded-full
              flex
              items-center
              justify-center
              gap-3
              border
              transition-all
              duration-300

              ${
                selected === "decline"
                  ? "bg-red-500 border-red-500 text-white shadow-[0_0_35px_rgba(239,68,68,.45)]"
                  : "border-[#B8864A]/35 bg-[#B8864A]/5"
              }
            `}
          >
            {selected === "decline" ? (
              <XCircle size={20} />
            ) : (
              <div className="w-4 h-4 rounded-full bg-red-500" />
            )}

            <span className="text-[18px] font-semibold tracking-wide">
              {selected === "decline"
                ? "We'll Miss You"
                : "Unable to Attend"}
            </span>
          </motion.button>

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
            duration: 0.7,
            delay: 0.35,
          }}
          className="
            mt-10
            mb-8
            flex
            items-center
            justify-center
            gap-4
            w-full
          "
        >
          <div className="flex-1 max-w-[95px] h-px bg-[#B8864A]/55" />

          <span className="text-[18px] leading-none">
            ♥
          </span>

          <div className="flex-1 max-w-[95px] h-px bg-[#B8864A]/55" />
        </motion.div>

        {/* Contact Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.45,
          }}
          className="
            flex
            flex-col
            items-center
          "
        >
          <p
            className="
              uppercase
              tracking-[0.45em]
              text-[12px]
              font-semibold
            "
          >
            Get In Touch
          </p>
        </motion.div>

        {/* Contact Buttons */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.6,
          }}
          className="
            mt-8
            w-full
            flex
            justify-center
            items-start
            gap-12
            sm:gap-16
          "
        >

          {/* Call */}
          <a
            href="tel:9847961503"
            className="group flex flex-col items-center"
          >
            <motion.div
              whileHover={{
                scale: 1.08,
                y: -4,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                w-24
                h-24
                rounded-full
                border
                border-[#B8864A]/45
                flex
                items-center
                justify-center
                bg-[#B8864A]/5
                transition-all
                duration-300
                group-hover:bg-[#B8864A]
                group-hover:text-white
              "
            >
              <Phone size={34} />
            </motion.div>

            <span
              className="
                mt-4
                text-[20px]
                font-semibold
              "
            >
              Call
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919847961503?text=Assalamu%20Alaikum,%20I%20am%20responding%20to%20your%20wedding%20invitation."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center"
          >
            <motion.div
              whileHover={{
                scale: 1.08,
                y: -4,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                w-24
                h-24
                rounded-full
                border
                border-[#B8864A]/45
                flex
                items-center
                justify-center
                bg-[#B8864A]/5
                transition-all
                duration-300
                group-hover:bg-[#25D366]
                group-hover:text-white
              "
            >
              <FaWhatsapp size={36} />
            </motion.div>

            <span
              className="
                mt-4
                text-[20px]
                font-semibold
              "
            >
              WhatsApp
            </span>
          </a>

        </motion.div>
        {/* Bottom Divider */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.8,
          }}
          className="
            mt-12
            w-full
            flex
            flex-col
            items-center
          "
        >
          <div className="w-56 h-px bg-[#B8864A]/35" />

          <p
            className="
              mt-5
              text-[15px]
              sm:text-base
              leading-relaxed
              tracking-wide
              text-center
              max-w-[280px]
              opacity-90
            "
          >
            We would love to hear from you
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default Page5;