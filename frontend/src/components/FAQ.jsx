import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FAQContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #FFAFCC;
  border-radius: 10px;
`;

const FAQItem = styled.div`
  margin-bottom: 15px;
`;

const Question = styled.div`
  background-color: #CDB4DB;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: bold;
`;

const Answer = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  display: ${props => (props.visible ? 'block' : 'none')};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const FAQ = () => {
  const initialFAQData = [
    {
      question: "How do I purchase a planner?",
      answer: "You can purchase a planner by selecting the desired model, adding it to your cart, and proceeding to checkout. You can choose from various payment options, including credit/debit card and PayPal."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, PayPal, and bank transfers. All transactions are secure and encrypted."
    },
    {
      question: "Can I return or exchange a planner?",
      answer: "Yes, you can return or exchange a planner within 30 days of purchase, provided it is in its original condition. Please contact our support team for further instructions."
    },
    {
      question: "How long does it take to receive my planner?",
      answer: "Shipping times vary depending on your location. Generally, it takes 5-7 business days for domestic orders and 10-15 business days for international orders."
    },
    {
      question: "Is online payment secure?",
      answer: "Yes, our online payment system is secure and encrypted with SSL. We use trusted payment gateways to ensure your data is protected."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on the carrier's website."
    },
    {
      question: "What should I do if I receive a damaged planner?",
      answer: "If your planner arrives damaged, please contact our customer service immediately. We will arrange for a replacement or refund."
    },
    {
      question: "Can I customize my planner?",
      answer: "Yes, we offer customization options for planners. You can choose the cover design, add your name, and select additional features during the purchase process."
    },
    {
      question: "What if I forgot my password?",
      answer: "If you forgot your password, click on the 'Forgot Password' link on the login page. You will receive an email with instructions on how to reset your password."
    },
    {
      question: "Do you offer discounts for bulk orders?",
      answer: "Yes, we offer discounts for bulk orders. Please contact our sales team for more information on bulk pricing and discounts."
    }
  ];

  const [faqData, setFaqData] = useState(() => {
    const savedFaqData = localStorage.getItem('faqData');
    return savedFaqData ? JSON.parse(savedFaqData) : initialFAQData;
  });

  const [visibleAnswers, setVisibleAnswers] = useState(() => {
    const savedVisibility = localStorage.getItem('faqVisibility');
    return savedVisibility ? JSON.parse(savedVisibility) : Array(faqData.length).fill(false);
  });

  useEffect(() => {
    localStorage.setItem('faqData', JSON.stringify(faqData));
  }, [faqData]);

  useEffect(() => {
    localStorage.setItem('faqVisibility', JSON.stringify(visibleAnswers));
  }, [visibleAnswers]);

  const toggleAnswer = index => {
    setVisibleAnswers(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <FAQContainer>
      <h2>Frequently Asked Questions</h2>
      {faqData.map((faq, index) => (
        <FAQItem key={index}>
          <Question onClick={() => toggleAnswer(index)}>
            {faq.question}
          </Question>
          <Answer visible={visibleAnswers[index]}>
            {faq.answer}
          </Answer>
        </FAQItem>
      ))}
    </FAQContainer>
  );
};

export default FAQ;
