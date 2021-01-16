import articleApi from '@/api/article';

const state = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null
};

export const mutationTypes = {
  updateArticleStart: '[updateArticle] Update article start',
  updateArticleSuccess: '[updateArticle] Update article success',
  updateArticleFailure: '[updateArticle] Update article failure',

  getArticleStart: '[updateArticle] Get article start',
  getArticleSuccess: '[updateArticle] Get article success',
  getArticleFailure: '[updateArticle] Get article failure'
};

export const actionTypes = {
  updateArticle: '[updateArticle] Update article',
  getArticle: '[updateArticle] Get article'
};

const mutations = {
  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.article = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.article = payload;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  }
};

const actions = {
  [actionTypes.updateArticle]({commit}, {slug, articleInput}) {
    return new Promise(resolve => {
      commit(mutationTypes.updateArticleStart);
      articleApi
        .updateArticle(slug, articleInput)
        .then(article => {
          commit(mutationTypes.updateArticleSuccess, article);
          resolve(article);
        })
        .catch(result => {
          commit(
            mutationTypes.updateArticleFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.getArticle]({commit}, {slug}) {
    return new Promise(resolve => {
      commit(mutationTypes.getArticleStart);
      articleApi
        .getArticle(slug)
        .then(article => {
          commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          commit(mutationTypes.getArticleFailure);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions
};
