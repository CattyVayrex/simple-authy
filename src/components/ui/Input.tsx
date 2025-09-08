import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  isOnlyNumber?: boolean;
}

// Yeah, a reusable input component.
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, isOnlyNumber, className = "", onKeyDown, ...props }, ref) => {
    const hasError = !!error;
    
    // I mean, sometimes we only need to allow numbers in the input.
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        isOnlyNumber &&
        !(e.ctrlKey || e.metaKey || e.altKey) &&
        !/[0-9]/.test(e.key) &&
        !["Backspace","Delete","Tab","Enter","ArrowLeft","ArrowRight"].includes(e.key)
      ) {
        e.preventDefault();
      }
      onKeyDown?.(e);
    };
    
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {label}
            {props.required && (
              <span className="text-red-500 mr-1" aria-label="required">*</span>
            )}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            {...props}
            onKeyDown={handleKeyDown}
            className={`
              w-full px-4 py-3 rounded-lg border transition-all duration-200
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
              dark:focus:ring-primary-400 dark:focus:border-primary-400
              disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed 
              disabled:text-gray-500 dark:disabled:text-gray-400
              ${hasError 
                ? "border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400" 
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              }
              ${className}
            `}
            aria-invalid={hasError}
            aria-describedby={
              hasError 
                ? `${props.id}-error` 
                : helperText 
                  ? `${props.id}-helper` 
                  : undefined
            }
          />
        </div>
        
        {error && (
          <p 
            id={`${props.id}-error`}
            className="mt-2 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
        
        {!error && helperText && (
          <p 
            id={`${props.id}-helper`}
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
