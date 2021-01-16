import addToFavoritesApi from '@/api/addToFavorites';
export const mutationTypes = {
  addToFavoritesStart: '[addToFavorites] Add to favorites start',
  addToFavoritesSuccess: '[addToFavorites] Add to favorites success',
  addToFavoritesFailure: '[addToFavorites] Add to favorites failure'
};

export const actionTypes = {
  addToFavorites: '[addToFavorites] Add to favorites'
};

const mutations = {
  [mutationTypes.addToFavoritesStart]() {},
  [mutationTypes.addToFavoritesSuccess]() {},
  [mutationTypes.addToFavoritesFailure]() {}
};

const actions = {
  [actionTypes.addToFavorites]({commit}, {slug, isFavorited}) {
    return new Promise(resolve => {
      commit(mutationTypes.addToFavoritesStart);
      const promise = isFavorited
        ? addToFavoritesApi.removeFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug);
      promise
        .then(article => {
          commit(mutationTypes.addToFavoritesSuccess, article);
          resolve();
        })
        .catch(() => {
          commit(mutationTypes.addToFavoritesFailure);
        });
    });
  }
};

export default {
  actions,
  mutations
};
