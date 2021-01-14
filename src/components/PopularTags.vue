<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something bad happened</div>
    <div v-if="tags">
      <div class="sidebar">
        <p>Popular tags</p>
        <div class="tag-list">
          <router-link class="tag-default tag-pill"
                       v-for="tag in tags"
                       :key="tag"
                       :to="{name: 'tag', params: {slug: tag}}"
          >
            {{tag}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/tags';
import {mapState} from 'vuex';

export default {
  name: 'McvPopularTags',
  mounted() {
    this.$store.dispatch(actionTypes.getTags);
  },
  computed: {
    ...mapState({
      isLoading: state => state.tags.isLoading,
      tags: state => state.tags.data,
      error: state => state.tags.error
    }),
  }
}
</script>