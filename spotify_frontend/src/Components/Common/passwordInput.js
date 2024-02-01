const passwordInput = ({label,placeholder}) => {
    return (
      <div className="passwordimputbox pt-1 flex flex-col space-y-2 w-full">
        <label htmlfor={label} className="font-bold"> {label}</label>
        <input
          id={label}
          type="password"
          placeholder={placeholder}
          className="p-3  border border-solid border-gray-300 rounded placeholder-gray-500"
        />
      </div>
    );
  };
  export default passwordInput;
  