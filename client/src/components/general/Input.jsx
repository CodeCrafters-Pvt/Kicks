import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Tooltip } from "react-tooltip";
import { MdErrorOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { CirclePicker } from "react-color";
import { BiSolidSelectMultiple, BiSelectMultiple } from "react-icons/bi";

export default function Input({
  field,
  label,
  hasLabel = true,
  bordered = true,
  isRequired,
  type,
  placeholder,
  contStyle,
  inputStyle,
  labelStyle,
  textArea = false,
  rows,
  options,
  setFieldValue,
  isBtnClicked,
  showError,
  errorId,
  errorMsg,
  paletteWidth,
  colorSize,
  selectAll,
  handleSelectAll,
  isChecked,
  onChange,
  disabled = false,
  className,
}) {
  const inputRef = useRef(null);
  const [isInputFocused, setInputFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [initialClick, setInitialClick] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleSelectAllClick = () => {
    if (isAllSelected) {
      setIsAllSelected(false);
      handleSelectAll();
    } else {
      setIsAllSelected(true);
      handleSelectAll();
    }
  };

  const animation = {
    x: errorMsg && isBtnClicked ? [null, -5, 5, -3, 3, 0] : 0,
  };

  var borderColor = "#1b1b1b";
  if (errorMsg && initialClick) {
    borderColor = "red";
  } else if (isInputFocused || isHovered) {
    borderColor = "#c7c6eb";
  } else {
    borderColor = "#1b1b1b";
  }

  const selectStyle = {
    control: (base) => ({
      ...base,
      width: showError ? "14vw" : "100%",
      boxShadow: "none",
      borderColor: borderColor,
      borderRight: showError && 0,
      borderRadius: showError ? "0.3rem 0 0 0.3rem" : "0.3rem",
      cursor: "pointer",
    }),
  };

  useEffect(() => {
    if (!initialClick) setInitialClick(isBtnClicked);
  }, [isBtnClicked]);

  const handleDivClick = () => {
    setInputFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`mx-2 my-2 flex flex-col gap-1 `}>
      <div className={`flex justify-between items-center ${contStyle}`}>
        {hasLabel && (
          <label htmlFor={field.name} className={`font-semibold ${labelStyle}`}>
            {label}
          </label>
        )}
        {textArea && initialClick && errorMsg && (
          <motion.div animate={animation}>
            <MdErrorOutline
              className={`error-msg-${errorId}  text-red-600 cursor-pointer outline-none mr-1 `}
            />
            <Tooltip
              anchorSelect={`.error-msg-${errorId}`}
              place="top"
              variant="error"
            >
              {errorMsg}
            </Tooltip>
          </motion.div>
        )}
        {isRequired && <span>*</span>}
      </div>

      {/* Default Input */}
      {!textArea &&
        type !== "select" &&
        type !== "color" &&
        type !== "checkbox" && (
          <div className="flex">
            <motion.input
              {...field}
              type={type}
              id={field.name}
              placeholder={`${placeholder ? ` ${placeholder}` : ""}`}
              ref={inputRef}
              min={type === "number" ? 0 : null}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              animate={animation}
              disabled={disabled}
              className={`
              w-[14vw]   px-2 leading-7
      
        ${
          !disabled &&
          bordered &&
          "border border-r-0 border-dark rounded-l-[0.3rem]"
        }
        ${disabled && bordered && "border border-r-0  rounded-l-[0.3rem]"}
        ${!disabled && !bordered && " border-b border-gray-400 bg-transparent"}
        ${!disabled && isHovered && "border-inputOnFocus"}
        ${!disabled && isInputFocused && " outline-none border-inputOnFocus "}
        ${
          !disabled &&
          initialClick &&
          errorMsg &&
          "border-red-500 focus:border-red-500 focus:ring-red-500"
        } 
        ${inputStyle}`}
            />

            <motion.div
              tabIndex="-1"
              onClick={handleDivClick}
              onBlur={() => setInputFocused(false)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              animate={animation}
              className={`h-8 cursor-text bg-light flex items-center w-5
              ${
                !disabled &&
                bordered &&
                "border border-l-0 border-dark rounded-r-[0.3rem]"
              } 
              ${
                disabled &&
                bordered &&
                "border border-l-0 !bg-slate-50 rounded-r-[0.3rem]"
              } 
              ${
                !disabled &&
                !bordered &&
                " border-b border-gray-400 bg-transparent outline-none"
              }
        ${!disabled && isHovered && "border-inputOnFocus"}
        ${!disabled && isInputFocused && "outline-none border-inputOnFocus"}
        ${
          !disabled &&
          initialClick &&
          errorMsg &&
          "border-red-500 focus:border-red-500 focus:ring-red-500"
        }
        `}
            >
              {initialClick && errorMsg && (
                <>
                  <MdErrorOutline
                    className={`error-msg-${errorId} mr-1 text-red-600 cursor-pointer outline-none`}
                  />
                  <Tooltip
                    anchorSelect={`.error-msg-${errorId}`}
                    place="top"
                    variant="error"
                  >
                    {errorMsg}
                  </Tooltip>
                </>
              )}
            </motion.div>
          </div>
        )}

      {/* Select */}
      {!textArea && type === "select" && (
        <motion.div
          className={`${showError && "flex"}`}
          animate={animation}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Select
            {...field}
            isSearchable
            name={field.name}
            id={field.name}
            options={options}
            value={options.find((option) => option.value === field.value)}
            onChange={(selectedOption) => {
              field.onChange(selectedOption.value);
              setFieldValue(field.name, selectedOption.value);
            }}
            styles={selectStyle}
          />
          {showError && (
            <div
              onClick={handleDivClick}
              onBlur={() => setInputFocused(false)}
              className={`h-9.5 cursor-text bg-light flex items-center  border border-l-0 border-dark rounded-r-[0.3rem] w-5
        ${isHovered && "border-inputOnFocus"}
        ${isInputFocused && "outline-none border-inputOnFocus"}
        ${
          initialClick &&
          errorMsg &&
          "border-red-500 focus:border-red-500 focus:ring-red-500"
        }
         `}
            >
              {initialClick && errorMsg && (
                <>
                  <MdErrorOutline
                    className={`error-msg-${errorId}  text-red-600 cursor-pointer outline-none `}
                  />
                  <Tooltip
                    anchorSelect={`.error-msg-${errorId}`}
                    place="top"
                    variant="error"
                  >
                    {errorMsg}
                  </Tooltip>
                </>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Text Area */}
      {textArea && (
        <motion.textarea
          {...field}
          id={field.name}
          placeholder={`${placeholder ? ` ${placeholder}` : ""}`}
          className={`outline w-full outline-1 rounded-[0.3rem] px-1 leading-7 resize-none
          ${
            !bordered &&
            "!outline-none !bg-transparent border-b border-gray-400"
          }
           ${inputStyle}
          ${
            initialClick &&
            errorMsg &&
            " outline-red-500 focus:outline-red-500 focus:ring-red-500"
          }`}
          animate={animation}
          rows={rows}
        />
      )}

      {/* color selector */}
      {!textArea && type === "color" && (
        <motion.div
          className={`${
            errorMsg && "border border-red-500"
          } px-2 py-1 rounded-[0.3rem]`}
          animate={animation}
          style={{ width: paletteWidth ? paletteWidth : "100%" }}
        >
          <CirclePicker
            colors={options}
            circleSize={colorSize}
            width={paletteWidth}
          />
        </motion.div>
      )}

      {/* check box */}
      {!textArea &&
        type === "checkbox" &&
        (selectAll ? (
          isAllSelected ? (
            <BiSolidSelectMultiple
              onClick={() => {
                handleSelectAllClick();
              }}
              className="cursor-pointer text-primary text-xl"
            />
          ) : (
            <BiSelectMultiple
              onClick={() => {
                handleSelectAllClick();
              }}
              className="cursor-pointer text-xl"
            />
          )
        ) : (
          <motion.input
            type="checkbox"
            id={field}
            checked={isChecked}
            onChange={onChange}
            className={`w-4 h-4 cursor-pointer accent-primary   focus:ring-primary focus:ring-1 focus:ring-offset-1 ${className}`}
          />
        ))}
    </div>
  );
}

Input.propTypes = {
  field: PropTypes.object,
  hasLabel: PropTypes.bool,
  label: PropTypes.string,
  bordered: PropTypes.bool,
  isRequired: PropTypes.bool,
  type: PropTypes.string,
  inputStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  contStyle: PropTypes.string,
  placeholder: PropTypes.string,
  textArea: PropTypes.bool,
  options: PropTypes.array,
  setFieldValue: PropTypes.func,
  isBtnClicked: PropTypes.bool,
  showError: PropTypes.bool,
  errorId: PropTypes.string,
  errorMsg: PropTypes.string,
  paletteWidth: PropTypes.string,
  colorSize: PropTypes.number,
  selectAll: PropTypes.bool,
  handleSelectAll: PropTypes.func,
  className: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
};
