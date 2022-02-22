import { CheckBox, Select, TextField } from "components";
const FieldForm = ({
  form,
  id,
  type,
  label,
  onCustomChange,
  value,
  Icon,
  IconChecked,
  onChange,
  loading,
  multiple,
  options,
}) => {
  switch (type) {
    case "bool":
      return (
        <CheckBox
          id={id}
          label={label}
          checked={Boolean(form[id])}
          Icon={Icon}
          IconChecked={IconChecked}
          onChange={onCustomChange || onChange}
          color={Boolean(form[id]) ? "primary" : "default"}
          size="small"
        />
      );
    case "select":
      return (
        <Select
          id={id}
          size="small"
          variant="outlined"
          label={label}
          onChange={onCustomChange || onChange}
          value={value || form[id]}
          multiple={Boolean(multiple)}
          options={options || []}
        />
      );
    case "number":
    case "textarea":
    case "text":
      return (
        <TextField
          size="small"
          variant="outlined"
          id={id}
          label={label}
          value={value || form[id] || ""}
          disabled={loading}
          multiline={type === "textarea"}
          type={type === "number" ? "number" : undefined}
          rows={4}
          fullWidth
          onChange={onCustomChange || onChange}
        />
      );

    default:
      return null;
  }
};

export default FieldForm;
