<script setup lang="ts">
import { ref } from 'vue'
defineOptions({
  name: 'trademarkIndex',
})
// 分页器
// 当前页码
const pageNo = ref<number>(1)
// 每页显示条数
const limit = ref<number>(3)
// 分页器大小
const size = ref<string>('default')
// 是否禁止分页
const disabled = ref<boolean>(false)
//
</script>
<template>
  <el-card>
    <!-- 添加品牌按钮 -->
    <el-button type="primary" icon="Plus" size="default">添加品牌</el-button>
    <!-- 品牌展示表格 -->
    <!--
      border ：纵向边框
      width ：这一列的宽度
      align ：这一列的对齐方式

     -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="序号" width="80px" align="center" />
      <el-table-column label="品牌名称" />
      <el-table-column label="品牌LOGO" />
      <el-table-column label="品牌操作" />
    </el-table>
    <!-- 分页器 -->
    <!--
        v-model:current-page:当前的页码
        v-model:page-size:每页显示的条数
        :page-sizes:每页显示的条数的选项
        :size:分页器的大小
        :disabled:是否禁止分页
        :background:页码是否有背景颜色
        layout:自定义组件的位置，->表示顶到最右侧
        :total:总条数
     -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :size="size"
      :disabled="disabled"
      :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes,"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>
<style scoped lang="scss"></style>
