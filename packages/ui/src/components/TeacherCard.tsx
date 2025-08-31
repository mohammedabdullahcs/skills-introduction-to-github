"use client";
import React from 'react';

export interface TeacherCardProps {
  name: string;
  title: string;
  experience: string;
  specialization: string[];
  image: string;
  gender: 'male' | 'female';
  className?: string;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({
  name,
  title,
  experience,
  specialization,
  image,
  gender,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <img
            src={image}
            alt={`${name} - ${title}`}
            className="w-full h-full rounded-full object-cover border-4 border-green-100"
            loading="lazy"
          />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-green-600 font-medium mb-2">{title}</p>
        <p className="text-gray-600 text-sm mb-3">{experience} of experience</p>
        
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">Specializations:</h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {specialization.map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Online Available
            </span>
            <span className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              {gender === 'female' ? 'Female Teacher' : 'Male Teacher'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};