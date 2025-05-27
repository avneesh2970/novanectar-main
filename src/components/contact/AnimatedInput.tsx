import type React from "react";

interface AnimatedInputProps {
  register: any;
  type: string;
  placeholder: string;
  error: any;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  register,
  type,
  placeholder,
  error,
}) => {
  const inputClasses = `w-full p-3 rounded-lg bg-white bg-opacity-50 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-700`;

  return (
    <div>
      <div>
        {type === "textarea" ? (
          <textarea
            {...register}
            placeholder={placeholder}
            rows={4}
            className={inputClasses}
          />
        ) : (
          <input
            {...register}
            type={type}
            placeholder={placeholder}
            className={inputClasses}
          />
        )}
      </div>
      {error && (
        <p
          className="text-red-500 text-xs mt-1"
        >
          {error.message}
        </p>
      )}
    </div>
  );
};
