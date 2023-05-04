<template>
  <v-card class="mb-3">
    <v-card-title class="text-h5">
      {{ post.title }}
    </v-card-title>
    <v-card-text class="text--primary">
      <p>{{ post.body }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn icon color="pink" @click="addToFavorites(post.id)">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'PostItem',
  props: {
    post: Object
  },
  methods: {
    ...mapMutations(['addToFavorites'])
  }
};
</script>

<style lang="scss" scoped></style>
