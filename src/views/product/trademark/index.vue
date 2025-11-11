<script setup lang="ts">
import { ElMessage, type UploadProps } from 'element-plus'
import { ref, onMounted, reactive } from 'vue'
import { reqHasTrademark, reqAddOrUpdateTrademark } from '@/api/product/trademark'
// 引入已有品牌接口返回数据类型
import type { TradeMark, hasTrademarkResponse } from '@/api/product/trademark/type.ts'
import { rewriteDefault } from 'vue/compiler-sfc'
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
const hasTrademarkArr = ref<TradeMark[]>([])
// 添加品牌表单数据
const tradmarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
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
  // 清空表单数据 在此设置 保证清空任务只用设置一次
  clearFormData()
}
// 编辑品牌
const editTradeMark = () => {
  dialogVisible.value = true
}
// 清空表单数据
const clearFormData = () => {
  tradmarkParams.tmName = ''
  tradmarkParams.logoUrl = ''
}
// 取消操作
const cancel = () => {
  dialogVisible.value = false
  // 清除数据
  // clearFormData()
}
//确定操作
const confirm = async () => {
  const res = await reqAddOrUpdateTrademark(tradmarkParams)
  if (tradmarkParams.tmName === '') {
    ElMessage({
      type: 'error',
      message: '请填写品牌名称',
    })
    return
  } else {
    if (tradmarkParams.logoUrl === '') {
      ElMessage({
        type: 'error',
        message: '请上传品牌LOGO',
      })
      return
    }
  }

  console.log(res)
  // 上传成功
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加品牌成功',
    })
    // 添加成功关闭对话框
    dialogVisible.value = false
    // 重新获取已有品牌列表
    getHasTrademark()
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败',
    })
    dialogVisible.value = false
  }
  // 清空表单数据
  // clearFormData()
}
// 文件上传之前before-upload的回调beforeAvatarUpload
// 如果返回false或者Promise的reject则停止上传
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // rawFile.type是文件的类型
  // rawFile.size是文件的大小
  //如果上传的文件类型为png|jpeg|gif则允许上传
  if (
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/gif'
  ) {
    //文件大小不能超过4M
    //rawFile.type单位是字节 1024字节=1KB 1024KB=1M 所以要除以两个1024
    if (rawFile.size / 1024 / 1024 <= 4) {
      console.log('成功')
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '文件大小不能超过4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '文件类型只能是png|jpeg|gif',
    })
    return false
  }
}
// 文件上传成功后on-success的回调handleAvatarSuccess
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  tradmarkParams.logoUrl = response.data
}
// 组件挂载完毕
onMounted(() => {
  // 发一次请求，第一页，一页三条数据
  getHasTrademark()
  // 清空表单数据
  // clearFormData()
})
</script>
<template>
  <div>
    <el-card>
      <!-- 添加品牌按钮 -->
      <el-button
        type="primary"
        icon="Plus"
        size="default"
        @click="addTradeMark"
        style="margin-bottom: 10px"
      >
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
          <el-input placeholder="请输入品牌名称" v-model="tradmarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO">
          <!--
            action：文件上传的地址
            ** 路径前要添加/api 因为在vite的额外配置中已经配置了代理
            before-upload:文件上传之前触发的钩子，回调函数可以约束文件的类型和大小
            on-success：文件上传成功后触发的钩子
          -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tradmarkParams.logoUrl" :src="tradmarkParams.logoUrl" class="avatar" />
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
