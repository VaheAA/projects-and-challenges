export const state = () => ({
  posts: [],
  favorites: [],
});

export const mutations = {
  setPosts(state, postsData) {
    state.posts = postsData.map((post) => post);
  },
  addToFavorites(state, postId) {
    const post = state.posts.find((post) => post.id === postId);
    state.favorites.push(post);
  },
};

export const actions = {
  async fetchPosts({ commit }) {
    try {
      const response = await fetch(`${this.$config.base_url}/posts`);
      const data = await response.json();
      commit("setPosts", data);
    } catch (error) {
      alert(error.message);
    }
  },
};
