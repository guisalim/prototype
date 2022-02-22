import { createSlice } from "@reduxjs/toolkit";
import { Add, Edit, List } from "_api/games";
import { Reset } from "_api/mocks";
import { Game_Model } from "_models";

export const gamesSlice = createSlice({
  name: "game_slice",
  initialState: {
    games: [],
    gameId: null,
    tags: [],
    listPremium: false,
  },
  reducers: {
    setListPremium: (state, action) => {
      state.listPremium = Boolean(action.payload);
    },
    list: (state, action) => {
      if (Array.isArray(action?.payload?.listings)) {
        let tags = [];
        state.games = action.payload.listings.map((game) => {
          const model = new Game_Model(game).toJson();
          tags.push(...model.tags);
          return model;
        });
        state.tags = [...new Set(tags)];
      }
    },
    select: (state, action) => {
      state.gameId = action?.payload?.gameId ?? null;
    },
    edit: (state, action) => {
      const newModel = new Game_Model(action?.payload?.game || {}).toJson();
      const existingGameIndex = state.games.findIndex(
        ({ _id }) => _id === newModel._id
      );
      if (newModel.isPremiumContent !== state.listPremium) {
        if (existingGameIndex >= 0) {
          state.games = state.games.filter(({ _id }) => _id !== newModel._id);
        }
        return;
      }
      if (existingGameIndex >= 0) {
        state.games[existingGameIndex] = newModel;
      } else if (newModel._id) {
        state.games = [newModel, ...state.games];
      }
      state.tags = [...new Set([...newModel.tags, ...state.tags])];
    },
  },
});

export const game_reducer = gamesSlice.reducer;
export const { select } = gamesSlice.actions;

export const list = (params) => async (dispatch) => {
  let response = {},
    { premium } = params || {};

  try {
    response = await List({ premium: premium ? 1 : 0 });
  } catch (e) {}
  dispatch(gamesSlice.actions.setListPremium(premium));
  dispatch(gamesSlice.actions.list(response));
  return response;
};

export const edit = (form) => async (dispatch) => {
  let response = {};
  try {
    const game = new Game_Model(form);
    if (game?._id) {
      response = await Edit({ game }, game._id);
    } else {
      response = await Add({ game });
    }
    dispatch(gamesSlice.actions.edit(response || {}));
  } catch (e) {}
  return response || {};
};

export const mock = () => async (dispatch, getState) => {
  try {
    await Reset();
    const {
      game_reducer: { listPremium },
    } = getState();
    dispatch(list({ premium: listPremium ? 1 : 0 }));
  } catch (e) {}
};
