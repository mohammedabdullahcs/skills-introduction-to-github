"use client";
import React from 'react';

export interface TestimonialProps {
  name: string;
  role?: string;
  content: string;
  rating: number;
  image?: string;
  className?: string;
}

export const Testimonial: React.FC<TestimonialProps> = ({
  name,
  role,
  content,
  rating,
  image,
  className = ''
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        aria-hidden="true"
      >
        ★
      </span>
    ));
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="flex" role="img" aria-label={`${rating} out of 5 stars`}>
          {renderStars(rating)}
        </div>
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
      
      <blockquote className="text-gray-700 mb-6 leading-relaxed">
        <span className="text-green-500 text-2xl font-serif leading-none">"</span>
        {content}
        <span className="text-green-500 text-2xl font-serif leading-none">"</span>
      </blockquote>
      
      <div className="flex items-center">
        {image && (
          <img
            src={image}
            alt={`${name} profile picture`}
            className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-green-100"
            loading="lazy"
          />
        )}
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          {role && <p className="text-sm text-gray-600">{role}</p>}
        </div>
      </div>
    </div>
  );
};