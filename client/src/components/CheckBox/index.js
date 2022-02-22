import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CheckboxComponent = ({
  checked,
  Icon,
  IconChecked,
  onChange,
  id,
  color,
  label,
  disabled,
  fontSize,
}) => (
  <FormControlLabel
    control={
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        icon={Icon && <Icon fontSize={fontSize} />}
        checkedIcon={IconChecked && <IconChecked fontSize={fontSize} />}
        color={color}
        onChange={onChange}
      />
    }
    label={label}
  />
);

export default CheckboxComponent;
