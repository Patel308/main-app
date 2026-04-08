'use client';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass' | 'brand' | 'lime' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  variant = 'brand', 
  size = 'md', 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full active:scale-95";
  
  const variants = {
    primary: "bg-[#0054D2] hover:bg-[#0041a3] text-white shadow-lg hover:shadow-blue-500/30",
    secondary: "bg-gray-800 hover:bg-gray-900 text-white shadow-md",
    outline: "border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white hover:border-brand-dark", 
    glass: "bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md shadow-lg",
    brand: "bg-brand-dark hover:bg-black text-white shadow-xl hover:shadow-2xl hover:shadow-brand-dark/20",
    lime: "bg-brand-lime hover:bg-[#0041a3] text-white shadow-md hover:shadow-lg hover:shadow-brand-lime/30",
    white: "bg-white text-brand-dark hover:bg-gray-100 shadow-lg hover:shadow-white/20",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-4 text-base",
  };

  return ( 
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}