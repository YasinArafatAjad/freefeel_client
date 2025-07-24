const Checkbox = ({ label, name, register, defaultCheckedValues, options }) => {
  return (
    <div className="space-y-2">
      <p className="font-primary text-[15px] font-medium">{label}</p>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 2xl:grid-cols-12 gap-2.5">
        {options?.map((option, index) => (
          <div key={index} className="w-full h-4 flex justify-start items-center gap-1.5">
            <input
              type="checkbox"
              value={option}
              defaultChecked={defaultCheckedValues?.includes(option)}
              {...register(name, { required: false })}
              className="bg-gray-100 dark:bg-gray-800 text-light dark:text-dark border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:transition-colors focus:duration-300 px-1.5 font-primary text-[15px] font-medium"
            />

            <p className="ont-primary text-[15px] font-normal">{option}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkbox;
