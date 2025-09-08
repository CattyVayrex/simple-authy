import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}


// Yeah, a reusable button component.
export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-200 focus-visible-ring
    disabled:cursor-not-allowed relative
  `;
  
  const variants = {
    primary: `
      bg-primary-600 dark:bg-primary-500 text-white border border-primary-600 dark:border-primary-500
      hover:bg-primary-700 dark:hover:bg-primary-600 hover:border-primary-700 dark:hover:border-primary-600
      active:bg-primary-800 dark:active:bg-primary-700 active:border-primary-800 dark:active:border-primary-700
      disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:border-gray-300 dark:disabled:border-gray-600 
      disabled:text-gray-500 dark:disabled:text-gray-400
    `,
    secondary: `
      bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600
      hover:bg-gray-200 dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500
      active:bg-gray-300 dark:active:bg-gray-500 active:border-gray-400 dark:active:border-gray-400
      disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:border-gray-100 dark:disabled:border-gray-700 
      disabled:text-gray-400 dark:disabled:text-gray-500
    `,
    outline: `
      bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400
      hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-700 dark:hover:border-primary-300
      active:bg-primary-100 dark:active:bg-primary-900/30 active:border-primary-800 dark:active:border-primary-200
      disabled:bg-white dark:disabled:bg-gray-800 disabled:border-gray-200 dark:disabled:border-gray-600 
      disabled:text-gray-400 dark:disabled:text-gray-500
    `,
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };
  
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <span className={loading ? "opacity-0" : "opacity-100"}>
        {children}
      </span>
    </button>
  );
}
