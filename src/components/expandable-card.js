"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lens } from "@/components/ui/lens";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Image from "next/image";

export default function ExpandableCard({ cards }) {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(value);
  };

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-10 fixed inset-0 bg-black/60 w-full h-full"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="z-[100] fixed inset-0 place-items-center grid">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="lg:hidden top-2 right-2 absolute flex justify-center items-center bg-brand-sec rounded-full w-6 h-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex flex-col bg-white sm:rounded-3xl w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Lens
                  zoomFactor={2}
                  lensSize={150}
                  isStatic={false}
                  ariaLabel="Zoom Area"
                >
                  <Image
                    src={active.image}
                    alt={active.title}
                    width={200}
                    height={200}
                    className="sm:rounded-tl-lg sm:rounded-tr-lg w-full h-72 object-center object-contain"
                  />
                </Lens>
              </motion.div>

              <div className="bg-neutral-100 overflow-y-scroll"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-900"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`price-${active.price}-${id}`}
                      className="text-neutral-800"
                    >
                      {formatCurrency(active.price)}
                    </motion.p>
                  </div>
                  <motion.button
                    layoutId={`button-${active.title}-${id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 mt-4 md:mt-0 px-4 py-2 rounded-full font-bold text-white text-sm transition-colors cursor-pointer"
                  >
                    Buy Now
                  </motion.button>
                </div>
                <div className="relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pb-4 text-neutral-100 text-slate-900 text-xs md:text-sm lg:text-base"
                  >
                    <p className="font-bold text-black">About this item</p>
                    <p className="text-slate-700">{active.description}</p>
                  </motion.div>
                </div>
                <div className="relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pb-4 text-slate-900 text-xs md:text-sm lg:text-base"
                  >
                    <p className="font-bold text-black">More details</p>
                    <KeyValueList data={active.miscellaneous} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="space-y-4 mx-auto w-full max-w-2xl">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="flex md:flex-row flex-col justify-between items-center hover:bg-slate-100 p-4 border-2 border-black rounded-2xl transitions cursor-pointer"
          >
            <div className="flex md:flex-row flex-col items-center gap-4">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  src={card.image}
                  alt={card.title}
                  width={200}
                  height={200}
                  className="rounded-lg size-40 md:size-20 object-cover object-top"
                />
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-black text-lg md:text-left text-center"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`price-${card.price}-${id}`}
                  className="text-slate-800 text-sm md:text-left text-center"
                >
                  {formatCurrency(card.price)}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="bg-brand mt-4 md:mt-0 px-4 py-2 rounded-full font-bold text-white text-sm transition-colors cursor-pointer"
            >
              Buy Now
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

function CloseIcon() {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
function KeyValueList({
  data,
  level = 0,
}) {
  const formatKey = (key) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  return (
    <>
      {Object.entries(data).map(([key, value]) => {
        const isNested = typeof value === "object" && value !== null;

        return (
          <div
            key={key}
            className={`flex flex-col ${level > 0 ? "px-4 border-l border-gray-200" : ""
              }`}
          >
            <div className="flex justify-between items-start">
              <span className="flex-shrink-0 w-1/3 font-medium text-slate-600 text-sm">
                {formatKey(key)}:
              </span>
              <span className="flex-1 ml-2 text-slate-800 text-sm text-right capitalize">
                {!isNested ? String(value) : null}
              </span>
            </div>
            {isNested && <KeyValueList data={value} level={level + 1} />}
          </div>
        );
      })}
    </>
  );
}
