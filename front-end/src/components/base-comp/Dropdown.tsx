import { DropdownProps, Row } from "@/types";
import { Select, Option } from "@material-tailwind/react";

const Dropdown = (props: DropdownProps) => {
  const handleOnSelect = (id: string|undefined) => {
    if (props.type === "VOTER") {
      props.handleOnSelectOption(Number(id), props.type);
    } else if (props.type === "CANDIDATE") {
      props.handleOnSelectOption(Number(id), props.type);
    }
  }
  return (
    <div className="w-72">
      <Select label={props.label} onChange={(v) => handleOnSelect(v)}>
        {props.optionsData.map((option) => (
          <Option key={option.id} value={String(option.id)}>{option.name}</Option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdown;
