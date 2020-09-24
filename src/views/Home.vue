<template>
  <div v-if="isInitialized">
    <label>Id utilisateur
      <input name="id_user" v-model="state.userId" placeholder="Id utilisateur">
    </label>
    <button @click="search()">Tester moi</button>
    <button @click="reset()">Reset</button>
  </div>

  <div v-if="Object.keys(instagramState.user).length !== 0">
    <p>Biography: {{ instagramState.user.biography }}</p>
    <p>Number of pictures: {{ instagramState.user.edge_owner_to_timeline_media.edges.length }}</p>
  </div>
</template>

<script>
import {instagramStore} from "../store/instagram-store";
import {reactive, onBeforeMount} from 'vue'

export default {
  setup() {
    onBeforeMount(async () => await instagramStore.init())

    const state = reactive({
      userId: 'marine_lvdrn',
    })

    const search = () => {
      instagramStore.getUserAction(state.userId)
    }

    const reset = () => {
      instagramStore.resetUserAction()
    }

    return {
      state,
      instagramState: instagramStore.getState(),
      isInitialized: instagramStore.getIsInitialized(),
      search,
      reset
    }
  }
}
</script>
