import { useState, useEffect } from "react";
import styled from "styled-components";
import { fallbackImageSrc } from "_config/constants";
import { Card, Button, Grid, IconButton, Modal, Paper } from "components";
import { ModalDescription } from "./components";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const CustomListWrapper = styled(Paper)`
  padding: 6px;
`;

const CustomButtonsGrid = styled(Grid)`
  margin: 12px 0px;
  & button {
    margin: 0px 12px;
  }
`;

const CustomText = styled(Grid)`
  margin: 24px;
  padding: 12px;
  border-bottom: 1px solid #e9e9e9;
  width: unset !important;
  & > span {
    font-size: 12px;
    font-weight: 300;
  }
`;

const ListComponent = ({
  games,
  onEdit,
  onRequestPremium,
  listPremium,
  onResetMock,
}) => {
  const [gameModal, openGameModal] = useState(null);
  const [pagination] = useState(4);
  const [{ start, end }, setPage] = useState({ start: 0, end: pagination });

  const handlePage = (forward) => (event) => {
    const factor = (forward ? 1 : -1) * pagination;
    setPage({ start: start + factor, end: end + factor });
  };

  const onCloseGameModal = () => openGameModal(null);
  const onExpand = (game) => (event) => openGameModal(game);
  const onEditGame = (game) => (event) => onEdit({ gameId: game._id });

  useEffect(() => {
    setPage({ start: 0, end: pagination });
  }, [games]);

  return (
    <CustomListWrapper>
      <CustomButtonsGrid container justifyContent="center" alignItems="center">
        <Button variant="contained" color="default" onClick={onResetMock}>
          ResetMock
        </Button>
        <Button
          variant={listPremium ? "outlined" : "contained"}
          color="default"
          onClick={onRequestPremium(0)}
        >
          Regular Content
        </Button>
        <Button
          variant={listPremium ? "contained" : "outlined"}
          color="secondary"
          onClick={onRequestPremium(1)}
        >
          Premium Content
        </Button>
      </CustomButtonsGrid>
      <CustomText container justifyContent="center" alignItems="center">
        {games.length ? (
          <span>
            Total: {games.length} game(s) - Seeing from {start + 1} to {end}
          </span>
        ) : (
          <span>No Game in this Group</span>
        )}
      </CustomText>
      <Grid container justifyContent="space-between" alignItems="center">
        <IconButton
          onClick={handlePage(false)}
          disabled={start <= 0}
          color="primary"
        >
          <ArrowBackIosIcon />
        </IconButton>
        {games.slice(start, end).map((game, key) => (
          <Grid item key={game?._id || key}>
            <Card
              duration={game.duration}
              title={game.title}
              subtitle={game.subtitle}
              image={game.images?.[0]?.url}
              author={game.author}
              onEdit={onEditGame(game)}
              onExpand={onExpand(game)}
              fallbackImage={fallbackImageSrc}
            />
          </Grid>
        ))}
        <IconButton
          onClick={handlePage(true)}
          disabled={end >= games.length}
          color="primary"
        >
          <ArrowForwardIosIcon />
        </IconButton>
        {gameModal && (
          <Modal
            title={gameModal.title}
            onClose={onCloseGameModal}
            open={Boolean(gameModal)}
            fullWidth
            maxWidth="md"
          >
            <ModalDescription game={gameModal} />
          </Modal>
        )}
      </Grid>
    </CustomListWrapper>
  );
};
export default ListComponent;
