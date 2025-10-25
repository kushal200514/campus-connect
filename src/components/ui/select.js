// src/components/ui/select.js
import React, { useState } from "react";

export const Select = ({ children, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" {...props}>
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { 
            value, 
            onValueChange, 
            isOpen, 
            setIsOpen 
          });
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, { 
            value, 
            onValueChange, 
            isOpen, 
            setIsOpen 
          });
        }
        return child;
      })}
    </div>
  );
};

export const SelectTrigger = ({ 
  children, 
  className = "", 
  value, 
  isOpen, 
  setIsOpen, 
  ...props 
}) => {
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    >
      {children}
      <span className="ml-2">▼</span>
    </button>
  );
};

export const SelectValue = ({ placeholder, value }) => {
  return <span>{value || placeholder}</span>;
};

export const SelectContent = ({ 
  children, 
  value, 
  onValueChange, 
  isOpen, 
  setIsOpen, 
  ...props 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-lg max-h-60 overflow-auto" 
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (child.type === SelectItem) {
          return React.cloneElement(child, { 
            onValueChange, 
            setIsOpen,
            isSelected: child.props.value === value
          });
        }
        return child;
      })}
    </div>
  );
};

export const SelectItem = ({ 
  children, 
  value, 
  onValueChange, 
  setIsOpen, 
  isSelected, 
  ...props 
}) => {
  return (
    <div
      onClick={() => {
        onValueChange(value);
        setIsOpen(false);
      }}
      className={`cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 ${isSelected ? 'bg-blue-50' : ''}`}
      {...props}
    >
      {children}
    </div>
  );
};
