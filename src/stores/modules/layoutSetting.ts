import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useLayoutSettingStore = defineStore('LayoutSetting', () => {
  const fold = ref<boolean>(true)
  const refsh = ref(false)
  return {
    fold, //slider折叠
    refsh, //main刷新
  }
})
