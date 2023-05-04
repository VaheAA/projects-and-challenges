<template>
  <v-list v-if="posts.length > 0" class="d-flex flex-column gap-4">
    <PostItem v-for="post in posts" :key="post.id" :post="post" />
  </v-list>
</template>

<script>
export default {
  name: 'PostList',
  computed: {
    posts () {
      return this.$store.state.posts;
    }
  },
  mounted () {
    this.$store.dispatch('fetchPosts');
  }
};
</script>

<style lang="scss" scoped></style>
