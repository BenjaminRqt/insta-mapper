<template>
  <div v-if="isInitialized">
    <label>Id utilisateur
      <input name="id_user" v-model="state.userId" placeholder="Id utilisateur">
    </label>
    <button @click="search()">
      <span v-if="instagramState.loading">Traitement en cours</span>
      <span v-else>Tester moi</span>
    </button>
    <button @click="reset()">Reset</button>
  </div>

  <div v-if="instagramState.user !== undefined">
    <p>Biography: {{ instagramState.user.biography }}</p>
    <p>Number of pictures: {{ instagramState.user.pictures.length }}</p>
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
