import { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { edit, select } from "_actions";
import Component from "./component";

const FormContainer = () => {
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState(null);
  const [games, gameId, tags] = useSelector(
    ({ game_reducer: { games, gameId, tags } }) => [games, gameId, tags],
    shallowEqual
  );
  const dispatch = useDispatch();

  const onSubmit = async (form) => {
    setLoading(true);
    try {
      const { game } = await dispatch(edit(form));
      setGame(game?._id ? game : null);
    } catch (e) {}

    setLoading(false);
  };

  const onClear = () => {
    dispatch(select());
  };

  useEffect(() => {
    !loading && setGame(games.find(({ _id }) => _id === gameId));
  }, [gameId, games, loading]);

  return (
    <Component
      onSubmit={onSubmit}
      loading={loading}
      game={game}
      onClear={onClear}
      tags={tags}
    />
  );
};
export default FormContainer;
