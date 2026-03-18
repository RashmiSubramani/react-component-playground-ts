import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import "./styles.css";

const faqs = [
  {
    question: "What is this app about?",
    answer: "This app helps users track and improve their daily habits.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login screen and follow instructions.",
  },
  {
    question: "Can I use this app offline?",
    answer: "Yes, some features are available offline after the initial setup.",
  },
];

function FrequentlyAskedQuestions() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div className="faq-item" key={index} data-testid={`faq-item-${index}`}>
          <button
            className="faq-question"
            data-testid={`faq-question-${index}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span>{faq.question}</span>
            <span className="faq-icon">
              {openIndex === index ? (
                <span data-testid={`icon-up-${index}`}>
                  <FiChevronUp />
                </span>
              ) : (
                <span data-testid={`icon-down-${index}`}>
                  <FiChevronDown />
                </span>
              )}
            </span>
          </button>
          {openIndex === index && (
            <p data-testid={`faq-answer-${index}`}>{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default FrequentlyAskedQuestions;
