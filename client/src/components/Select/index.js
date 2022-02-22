import styled from "styled-components";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { TextField } from "components";

const filter = createFilterOptions();

const CustomAutoComplete = styled(Autocomplete)`
  & .MuiChip-sizeSmall {
    height: 20px;
  }
`;

const Select = ({
  value,
  onChange,
  multiple,
  id,
  options,
  label,
  variant,
  size,
}) => (
  <CustomAutoComplete
    id={id}
    value={value}
    options={options}
    multiple={multiple || Array.isArray(value)}
    handleHomeEndKeys
    selectOnFocus
    clearOnBlur
    freeSolo
    renderInput={(params) => (
      <TextField {...params} label={label} variant={variant} size={size} />
    )}
    ChipProps={{ size }}
    onChange={(event, newValue) => {
      let next;
      if (typeof newValue === "string" || !newValue?.inputValue) {
        next = newValue;
      } else if (newValue?.inputValue) {
        next = newValue.inputValue;
      }

      onChange({ ...event, target: { ...event.target, id, value: next } });
    }}
    filterOptions={(options, params) => {
      const filtered = filter(options, params);
      // Suggest the creation of a new value
      if (params.inputValue !== "") {
        filtered.push(params.inputValue);
      }
      return filtered;
    }}
  />
);

export default Select;
