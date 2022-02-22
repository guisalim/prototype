import styled from "styled-components";
import { fallbackImageSrc } from "_config/constants";
import { Grid } from "components";

const ContentWrapper = styled(Grid)`
  padding: 12px;
  padding-left: 24px;
  font-size: 14px;

  & > div {
    margin: 4px 0px;
    display: flex;
    flex-flow: row nowrap;
  }

  & .label {
    font-weight: 500;
    text-transform: uppercase;
    margin-right: 3px;
  }

  & .value {
    font-weight: 300;
  }
`;

const CustomImg = styled.img`
  width: 100%;
  height: auto;
  box-shadow: 1px 3px 6px #888888;
`;

const fields = [
  { id: "category", label: "Category" },
  {
    id: "duration",
    label: "Duration",
    type: "number",
    decimals: 2,
    suffix: "seconds",
  },
  { id: "description", label: "Description" },
  { id: "isDownloadable", label: "Downloadable", type: "bool" },
  { id: "isStreamable", label: "Streamable", type: "bool" },
  { id: "tags", label: "Tags", type: "array" },
];

const ModalDescription = ({ game }) => {
  const getField = ({ id, type, decimals, suffix }) => {
    switch (type) {
      case "number":
        return parseFloat(game[id] || 0).toFixed(decimals || 0);
      case "bool":
        return game[id] ? "Yes" : "No";
      case "array":
        return game[id]?.join(", ");
      default:
        return game[id] || "";
    }
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item container md={4} sm={12}>
        <CustomImg
          src={game?.images?.[0]?.url}
          alt={game.title}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = fallbackImageSrc;
          }}
        />
      </Grid>
      <ContentWrapper
        item
        container
        md={8}
        sm={12}
        justifyContent="flex-start"
        alignItems="flex-start"
        direction="column"
      >
        {fields.map((field) => (
          <div key={field.id}>
            <span className="label">
              {field.label}:{""}
            </span>
            <span className="value">
              {getField(field)}
              {field.suffix && ` ${field.suffix}`}
            </span>
          </div>
        ))}
      </ContentWrapper>
    </Grid>
  );
};

export default ModalDescription;
