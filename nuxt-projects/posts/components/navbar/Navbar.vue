<template>
  <v-app-bar fixed app>
    <nuxt-link class="link" to="/">
      <v-toolbar-title class="display-1" tag="h1">{{ title }}</v-toolbar-title>
    </nuxt-link>
    <v-spacer />
    <nav>
      <v-list class="d-flex gap-3" tag="ul">
        <v-list-item tag="li" class="mr-3" v-for="item in items" :key="item.title" :title="item.title">
          <nuxt-link :to="`/${item.value}`">{{ item.title }}</nuxt-link></v-list-item>
      </v-list>
    </nav>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: String
  },
  data: () => ({
    items: [
      {
        title: 'Bookmarked',
        value: 'favorites',
      },
    ],
  })
};
</script>

<style lang="scss">
.v-application a {
  text-decoration: none;
  color: #fff;
}

.v-list .nuxt-link-exact-active.nuxt-link-active {
  color: #2196F3;
}
</style>
