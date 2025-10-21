const CommonFormInputs = ({
  label,
  type = "text",
  name,
  id,
  stateValue,
  required,
  stateFunction,
  inputCss,
  divCss,
  isTextArea,
  textAreaRows,
  textAreaMaxLength,
  textAreaCss
}) => {
  const handleVaultFormChange = (e) => {
    const { name, value } = e.target;

    stateFunction((stateValue) => ({
      ...stateValue,
      [name]: value,
    }));
  };
  return (
    <div className={`flex justify-between items-center ${divCss}`}>
      <label
        className="w-1/4 p-2 flex justify-between font-semibold font-mono"
        htmlFor={name}
      >
        {label} <span>:</span>{" "}
      </label>

      {isTextArea ? (
        <textarea
          className={`bg-gray-200 p-2 rounded-lg ml-2 flex-1 ${textAreaCss}`}
          type={type}
          name={name}
          id={id}
          rows={textAreaRows}
          maxLength={textAreaMaxLength}
          defaultValue={stateValue}
          placeholder={`Enter ${name}...`}
          required={required}
          onChange={handleVaultFormChange}
        />
      ) : (
        <input
          className={`bg-gray-200 flex-1 ml-2 p-2 rounded-lg ${inputCss}`}
          type={type}
          name={name}
          id={id}
          defaultValue={stateValue}
          placeholder={`Enter ${name}...`}
          required={required}
          onChange={handleVaultFormChange}
        />
      )}
    </div>
  );
};

export default CommonFormInputs;
