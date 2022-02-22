import { useEffect, useState } from "react";
import styled from "styled-components";
import { Game_Model } from "_models";
import { Button, Grid, Paper } from "components";
import { FieldForm } from "./components";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";
import TvOffIcon from "@material-ui/icons/TvOff";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const CustomPaper = styled.form`
  margin: 15px 0px;
  & > div {
    padding: 12px;
  }
`;

const CustomFieldGrid = styled(Grid)`
  padding: 6px;
`;
const CustomGridCheckboxes = styled(Grid)`
  padding: 6px;

  &>div {
    padding: 0px 3px;
  }
`;

const CustomGridActions = styled(Grid)`
  padding: 6px;
  width: 100%;
`;

const FormComponent = ({ game, loading, onSubmit, onClear, tags }) => {
  const [form, setForm] = useState(new Game_Model());

  const submit = () => onSubmit(form);
  const clear = () => {
    setForm(new Game_Model());
    onClear();
  };

  const onChange = (event) => {
    event?.preventDefault && event.preventDefault();
    setForm({ ...form, [event.target.id]: event.target.value });
  };

  const onChangeImage = (event) => {
    event?.preventDefault && event.preventDefault();
    setForm({
      ...form,
      images: [{ type: 1, id: "1", url: event.target.value }],
    });
  };

  const onCheckBoxChange = (event) => {
    event?.preventDefault && event.preventDefault();
    setForm({ ...form, [event.target.id]: Boolean(event.target.checked) });
  };

  const fields = [
    { id: "title", type: "text", label: "Title" },
    { id: "category", type: "text", label: "Category" },
    { id: "subtitle", type: "textarea", label: "Subtitle" },
    { id: "description", type: "textarea", label: "Description" },
    { id: "author", type: "text", label: "Author" },
    {
      id: "tags",
      type: "select",
      label: "Tags",
      options: tags,
      multiple: true,
    },
    {
      id: "image",
      type: "text",
      label: "Image URL",
      onCustomChange: onChangeImage,
      value: form.images?.[0]?.url,
    },
    { id: "duration", type: "number", label: "Duration (s)" },
  ];

  const checkBoxesField = [
    {
      id: "isDownloadable",
      type: "bool",
      label: "Downloadable",
      Icon: CloudDownloadOutlinedIcon,
      IconChecked: CloudDownloadIcon,
      onCustomChange: onCheckBoxChange,
    },
    {
      id: "isStreamable",
      type: "bool",
      label: "Streamable",
      Icon: TvOffIcon,
      IconChecked: LiveTvIcon,
      onCustomChange: onCheckBoxChange,
    },
    {
      id: "isPremiumContent",
      type: "bool",
      label: "Premium",
      Icon: MoneyOffIcon,
      IconChecked: AttachMoneyIcon,
      onCustomChange: onCheckBoxChange,
    },
  ];

  useEffect(() => {
    if (game) {
      setForm(new Game_Model(game));
    }
  }, [game]);

  return (
    <CustomPaper onSubmit={submit}>
      <Paper elevation={3}>
        <Grid container justifyContent="flex-start" alignItems="center">
          {fields.map((field) => (
            <CustomFieldGrid key={field.id} item lg={6} sm={12}>
              <FieldForm
                form={form}
                onChange={onChange}
                loading={loading}
                {...field}
              />
            </CustomFieldGrid>
          ))}
          <CustomGridCheckboxes
            item
            container
            sm={12}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            {checkBoxesField.map((field) => (
              <div key={field.id}>
                <FieldForm
                  form={form}
                  onChange={onChange}
                  loading={loading}
                  {...field}
                />
              </div>
            ))}
          </CustomGridCheckboxes>
          <CustomGridActions
            container
            item
            sm={12}
            justifyContent="space-between"
            alignItems="center"
            direction="row"
          >
            <Button
              onClick={clear}
              variant="contained"
              color="default"
              disabled={loading}
            >
              Clear
            </Button>
            <Button
              onClick={submit}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </CustomGridActions>
        </Grid>
      </Paper>
    </CustomPaper>
  );
};

export default FormComponent;
