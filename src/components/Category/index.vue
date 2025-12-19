<script setup lang="ts">
import { onMounted } from 'vue'
// 引入仓库
import { useCategoryStore } from '@/stores/modules/category.ts'

defineOptions({
  name: 'CategoryComponent',
})
// 仓库
const categoryStore = useCategoryStore()
const getC2 = () => {
  // 清空二级三级分类数据
  categoryStore.clearC2()
  categoryStore.ClearC3()
  // 获取二级分类
  categoryStore.getC2()
}
const getC3 = async () => {
  // 清空三级分类
  categoryStore.ClearC3()
  // 获取三级分类
  await categoryStore.getC3()
}
defineProps({
  scence: {
    type: Number,
    default: 0,
  },
})
onMounted(async () => {
  // 获取一级分类
  categoryStore.getC1()
})
</script>
<template>
  <el-card>
    <el-form inline :disabled="scence === 0 ? false : true">
      <el-form-item label="一级分类" style="width: 220px">
        <el-select v-model="categoryStore.C1Id" placeholder="请选择一级分类" @change="getC2">
          <el-option
            v-for="item in categoryStore.Category1Arr"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" style="width: 220px">
        <el-select v-model="categoryStore.C2Id" placeholder="请选择二级分类" @change="getC3">
          <el-option
            v-for="item in categoryStore.Category2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" style="width: 220px">
        <el-select v-model="categoryStore.C3Id" placeholder="请选择三级分类">
          <el-option
            v-for="item in categoryStore.Category3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<style scoped lang="scss"></style>
