"use client";
import React, { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  item: FAQItem;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const FAQ: React.FC<FAQProps> = ({
  item,
  isOpen = false,
  onToggle,
  className = ''
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  const isControlled = onToggle !== undefined;
  const isExpanded = isControlled ? isOpen : internalIsOpen;
  
  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div className={`border border-gray-200 rounded-lg ${className}`}>
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors duration-200"
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-controls={`faq-answer-${item.question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="font-medium text-gray-900 pr-4">{item.question}</span>
        <span 
          className={`flex-shrink-0 text-gray-500 transform transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <div
        id={`faq-answer-${item.question.replace(/\s+/g, '-').toLowerCase()}`}
        className={`overflow-hidden transition-all duration-200 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4 text-gray-700 leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

export interface FAQListProps {
  items: FAQItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const FAQList: React.FC<FAQListProps> = ({
  items,
  allowMultiple = false,
  className = ''
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      const newOpenItems = new Set(openItems);
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
      setOpenItems(newOpenItems);
    } else {
      setOpenItems(openItems.has(index) ? new Set() : new Set([index]));
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <FAQ
          key={index}
          item={item}
          isOpen={openItems.has(index)}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};