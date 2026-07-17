import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Who can participate for Kranthi'26?",
    answer: "Kranthi'26 is open to all college students with a valid ID card."
  },
  {
    question: "How is the Registration process and fees?",
    answer: "Registration can be done online through our official portal. Fees vary per event."
  },
  {
    question: "Will I get a certificate for participation?",
    answer: "Yes, all verified participants will receive an official e-certificate."
  },
  {
    question: "Is registration free?",
    answer: "Registration is free for ISTE GEC members. Non-members may need to pay a fee depending on the event. Please check the respective event details."
  }
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute left-[230px] top-[3174px] w-[991px] z-40 flex flex-col gap-6"
    >
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div 
            key={index} 
            className="flex flex-col w-full"
            initial={false}
          >
            {/* Header */}
            <motion.div 
              className="w-full min-h-[72px] rounded-[26px] bg-[rgba(42,35,110,0.3)] border border-[rgba(255,255,255,0.1)] flex items-center justify-between px-8 cursor-pointer overflow-hidden relative group"
              style={{
                 backdropFilter: 'blur(12px) saturate(180%)',
                 boxShadow: isOpen ? 'inset 0 0 20px rgba(0,255,255,0.2), 0 10px 30px rgba(0,0,0,0.5)' : 'inset 0 0 10px rgba(0,255,255,0.05), 0 4px 10px rgba(0,0,0,0.5)'
              }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(50, 45, 130, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(index)}
            >
              {/* Premium reflection sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out pointer-events-none" />
              
              <h3 className="font-['Orbitron',sans-serif] text-[25px] text-white m-0 tracking-wide z-10">
                {faq.question}
              </h3>
              
              {/* Animated Icon */}
              <motion.div 
                className="text-white text-3xl font-light z-10 flex items-center justify-center size-8 rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(0,0,0,0.2)]"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                +
              </motion.div>
            </motion.div>

            {/* Expanded Body */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="overflow-hidden"
                >
                  <div className="w-full mt-3 p-8 rounded-[20px] bg-[rgba(20,15,60,0.5)] border border-[rgba(255,255,255,0.05)] shadow-inner" style={{ backdropFilter: 'blur(20px)' }}>
                    <p className="font-['Orbitron',sans-serif] text-[20px] text-[#e0e5ed] m-0 leading-relaxed tracking-wide">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FAQAccordion;
