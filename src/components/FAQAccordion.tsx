import { useState, FC } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-accordion">
      {items.map((item, idx) => (
        <div key={idx} className="faq-item mb-4">
          <button
            className="faq-question flex justify-between items-center w-full text-left px-4 py-3 bg-card rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => toggle(idx)}
            aria-expanded={openIndex === idx}
            aria-controls={`faq-answer-${idx}`}
          >
            <span className="font-medium text-foreground">{item.question}</span>
            <span className="ml-2 text-primary">{openIndex === idx ? "-" : "+"}</span>
          </button>
          <div
            id={`faq-answer-${idx}`}
            className={`faq-answer px-4 pt-2 text-muted-foreground ${openIndex === idx ? "block" : "hidden"}`}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
