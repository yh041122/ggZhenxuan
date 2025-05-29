<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
// 引入已有品牌接口返回数据类型
import type {
  hasTrademarkResponseDataRecordsItem,
  hasTrademarkResponse,
} from '@/api/product/trademark/type.ts'
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
// 当前数据总条数
const total = ref<number>(0)
// 已有品牌数组
const hasTrademarkArr = ref<hasTrademarkResponseDataRecordsItem[]>([])
//获取已有品牌的方法
//没有传pager 默认是1
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager
  const res: hasTrademarkResponse = await reqHasTrademark(pageNo.value, limit.value)
  // 请求成功
  if (res.code === 200) {
    // 修改数据总条数
    total.value = res.data.total
    // 获取已有品牌数组
    hasTrademarkArr.value = res.data.records
    console.log(res)
  }
}
// limit页条数变化
const handelSizeChange = () => {
  getHasTrademark()
}
// 对话框组件
const dialogVisible = ref<boolean>(false)
// 添加品牌
const addTradeMark = () => {
  dialogVisible.value = true
}
// 编辑品牌
const editTradeMark = () => {
  dialogVisible.value = true
}
// 取消操作
const cancel = () => {
  dialogVisible.value = false
}
//确定操作
const confirm = () => {
  dialogVisible.value = false
}
// 组件挂载完毕
onMounted(() => {
  // 发一次请求，第一页，一页三条数据
  getHasTrademark()
})
</script>
<template>
  <div>
    <el-card>
      <!-- 添加品牌按钮 -->
      <el-button type="primary" icon="Plus" size="default" @click="addTradeMark">
        添加品牌
      </el-button>
      <!-- 品牌展示表格 -->
      <!--
      table:
      -- data ：表格的数据
      -- border ：纵向边框
      -- width ：这一列的宽度
      -- align ：这一列的对齐方式
     -->
      <el-table :data="hasTrademarkArr" style="width: 100%" border>
        <el-table-column label="序号" width="80px" align="center" type="index" />
        <!--
      el-table-column是用div展示的
      想要有自己的样式要使用插槽
        -->
        <el-table-column label="品牌名称">
          <template #default="{ row }">
            <pre style="color: brown">{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #default="{ row }">
            <img
              :src="/^http?:\/\//i.test(row.logoUrl) ? row.logoUrl : `http://` + row.logoUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="{ row }">
            <el-button type="warning" icon="Edit" size="small" @click="editTradeMark"></el-button>
            <el-button type="danger" icon="Delete" size="small"></el-button>
          </template>
        </el-table-column>
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
        API
        @current-change="getHasTrademark(pageNo)"会把当前页作为参数
        @size-change="handleSizeChange(limit)"会把当前页条数作为参数
     -->
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :size="size"
        :disabled="disabled"
        :background="true"
        layout=" prev, pager, next, jumper,->,total, sizes,"
        :total="total"
        @current-change="getHasTrademark"
        @size-change="handelSizeChange"
      />
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加品牌" v-model="dialogVisible">
      <el-form style="width: 80%" label-width="auto" label-position="left">
        <el-form-item label="品牌名称">
          <el-input placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO">
          <el-upload
            class="avatar-uploader"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
