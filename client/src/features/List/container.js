import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { list, select, mock } from "_actions";

import Component from "./component";

const ListContainer = () => {
  const dispatch = useDispatch();
  const [games, listPremium] = useSelector(
    ({ game_reducer: { games, listPremium } }) => [games, listPremium],
    shallowEqual
  );

  const onEdit = (gameId) => {
    dispatch(select(gameId ?? null));
  };

  const onRequestPremium =
    (premium = 0) =>
    () => {
      if (listPremium !== Boolean(premium)) dispatch(list({ premium }));
    };

  const onResetMock = () => {
    dispatch(mock());
  };

  useEffect(() => {
    dispatch(list());
  }, []); //eslint-disable-line
  return (
    <Component
      games={games}
      onEdit={onEdit}
      listPremium={listPremium}
      onRequestPremium={onRequestPremium}
      onResetMock={onResetMock}
    />
  );
};

export default ListContainer;
