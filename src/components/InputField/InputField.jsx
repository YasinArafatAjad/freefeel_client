const InputField = ({ label, type, placeholder, register, errors, name, defaultValue, min, required }) => {
  return (
    <div className="space-y-2">
      <p className="font-primary text-[15px] font-medium">{label}</p>
      <input
        min={min ? min : "0"}
        type={type ? type : "text"}
        placeholder={placeholder}
        {...register(name, { required: required })}
        defaultValue={defaultValue}
        aria-invalid={errors[name] ? "true" : "false"}
        className="w-full h-9 bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-2.5 font-primary text-[15px] font-medium"
      />
      {errors[name]?.type === "required" && (
        <p role="alert" className="font-primary text-[15px] font-medium text-red-500 mt-1 lg:mt-1.5">
          This Field is Required
        </p>
      )}
    </div>
  );
};

export default InputField;
