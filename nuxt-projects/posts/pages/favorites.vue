<template>
  <div>
    <PostItem v-for="post in favorites" :key="post.id" :post="post" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'FavoritesPage',
  computed: {
    ...mapState([
      "favorites"
    ])
  }
};
</script>

<style lang="scss" scoped></style>
