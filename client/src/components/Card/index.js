import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";

const cardWidth = 250;

const CustomCardMedia = styled.div`
  height: 0;
  padding-top: 56.25%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("${({ image }) => image || ""}")
    ${({ fallbackImage }) => (fallbackImage ? `, url("${fallbackImage}")` : "")};
`;

const CustomCard = styled(Card)`
  &.MuiCard-root {
    width: ${cardWidth}px;
  }
`;

const CustomCardHeader = styled(CardHeader)`
  & .MuiCardHeader-title,
  & .MuiCardHeader-subheader {
    white-space: nowrap;
    max-width: ${cardWidth - 100}px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CardComponent = ({
  title,
  subtitle,
  duration,
  image,
  author,
  onEdit,
  onExpand,
  fallbackImage,
}) => (
  <CustomCard>
    <CustomCardHeader
      avatar={author && <Avatar>{author[0]?.toUpperCase()}</Avatar>}
      title={title}
      subheader={`${parseFloat(duration).toFixed(2)} seconds`}
    />
    <CustomCardMedia image={image} alt={title} fallbackImage={fallbackImage} />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {subtitle}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="edit" onClick={onEdit} size="small">
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={onExpand} aria-label="show more" size="small">
        <ExpandMoreIcon fontSize="small" />
      </IconButton>
    </CardActions>
  </CustomCard>
);

export default CardComponent;
