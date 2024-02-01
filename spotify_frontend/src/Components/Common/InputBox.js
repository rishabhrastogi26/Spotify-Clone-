const InputBox = ({ label, lableClassName, placeholder, value, setValue }) => {
  return (
    <div className="inputbox flex flex-col mt-2 space-y-2 w-full">
      <label
        htmlfor={label}
        className={`font-semibold
       ${lableClassName}`}
      >
        {" "}
        {label}
      </label>
      <input
        id={label}
        type="text"
        placeholder={placeholder}
        className="p-3 border  border-solid border-gray-300 rounded placeholder-gray-500"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};
export default InputBox;
