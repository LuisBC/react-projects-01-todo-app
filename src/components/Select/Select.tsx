import RSelect, { SingleValue, ActionMeta } from "react-select";

type SelectProps = {
  options: { value: string; label: string }[];
  onChange: (
    newValue: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => void;
};

const Select = ({ options, onChange }: SelectProps) => {
  return (
    <RSelect
      isSearchable={false}
      menuPlacement="top"
      defaultValue={options[0]}
      options={options}
      onChange={onChange}
      styles={{
        control: (provided) => ({
          ...provided,
          width: "140px",
          fontSize: "15px",
          color: "#555555",
          height: "30px",
          borderRadius: "5px",
          backgroundColor: "#f3fde8",
          border: "none",
          boxShadow: "none",
          textAlign: "right",
          cursor: "pointer",
          paddingRight: "20px",
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          display: "none",
        }),
        indicatorsContainer: (provided) => ({
          ...provided,
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          padding: "0px",
          color: "#555555",
        }),
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? "#fff" : "#555555",
          backgroundColor: state.isSelected ? "#0075ff" : "#ffffff",
          cursor: "pointer",
        }),
      }}
    />
  );
};

export default Select;
