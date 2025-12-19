<script setup lang="ts">
import { watch, ref, reactive, nextTick } from 'vue'
import { useCategoryStore } from '@/stores/modules/category'
import { getAttrList, reqAddOrUpdateAttr } from '@/api/product/attr'
// 引入类型
import type { AttrObj, AttrResponse, AttrValue } from '@/api/product/attr/type.ts'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'attrIndex',
})
const AttrList = ref<AttrObj[]>([])
// '添加品牌属性'按键是否【禁用】
const categoryStore = useCategoryStore()
// 监听三级分类ID变化
// 获取选择三级分类后的属性对象
watch(
  () => categoryStore.C3Id,
  () => {
    // 清除上一次数据
    AttrList.value = []
    // 调用获取属性列表函数
    getArrtList()
  },
)
//获取三级分类属性
const getArrtList = async () => {
  // 保证有三级分类ID才发请求
  if (categoryStore.C3Id === '') return
  const res: AttrResponse = await getAttrList(
    categoryStore.C1Id,
    categoryStore.C2Id,
    categoryStore.C3Id,
  )
  if (res.code === 200) {
    AttrList.value = res.data
    console.log(res)
    console.log(AttrList.value)
  }
}
// 收集新增属性的参数
const attrParams = reactive<AttrObj>({
  attrName: '', //三级分类的名字
  categoryId: categoryStore.C3Id, //三级分类的id
  categoryLevel: 3, //对三级分类进行收集
  attrValueList: [], //属性值数组
})
// input组件实例
const inputArr = ref<any>([])
// 添加编辑表格
const scence = ref<number>(0)
//点击添加品牌属性
const addAttr = () => {
  // 清空属性值数组
  clearAttrParams()
  scence.value = 1
}
// 点击取消
const cancle = () => {
  scence.value = 0
}
// 清空属性值数组
const clearAttrParams = () => {
  // 合并对象，如果有新的属性 此方法对reactive会失去响应式
  Object.assign(attrParams, {
    attrName: '', //三级分类的名字
    categoryId: categoryStore.C3Id, //三级分类的id
    categoryLevel: 3, //对三级分类进行收集
    attrValueList: [], //属性值数组
  })
}
// 添加属性值
const addAttrValue = () => {
  //数组新增一项
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  //聚焦最后一项
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
// 保存属性值
const save = async () => {
  const res = await reqAddOrUpdateAttr(attrParams)
  //保存成功
  if (res.code === 200) {
    //返回scence为0
    scence.value = 0
    //刷新属性列表
    getArrtList()
    //提示
    ElMessage({
      message: attrParams.id ? '添加成功' : '修改成功',
      type: 'success',
    })
  }
  //保存失败
  else {
    ElMessage({
      message: attrParams.id ? '添加失败' : '修改失败',
      type: 'error',
    })
  }
}
// 属性值查看模式
const toLook = (row: AttrValue, $index: number) => {
  // 非法情况【1】
  // 失焦的时候要判断值是否为空
  if (row.valueName === '') {
    //数组删除该项
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      message: '属性值不能为空',
      type: 'error',
    })
    return
  }
  //非法情况【2】
  //值相同
  const repeat = attrParams.attrValueList.find((item) => {
    //要将当前row扣除去再find
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      message: '属性值不能重复',
      type: 'error',
    })
    return
  }
  row.flag = false
}
// 属性值编辑模式
const toEdit = (row: AttrValue, $index: number) => {
  //显示input框
  row.flag = true
  //响应式数据变化后 nexttick 获取组件实例
  //获取到当前index对应的input实例
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}
</script>
<template>
  <div>
    <!-- Category组件 -->
    <!-- 如果是0则不禁用1则禁用 -->
    <Category :scence="scence"></Category>
    <!-- 属性Table组件 -->
    <el-card style="margin: 10px 0">
      <div v-show="scence === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="categoryStore.C3Id ? false : true"
          @click="addAttr"
        >
          添加品牌属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="AttrList">
          <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <el-tag style="margin-left: 5px" v-for="item in row.attrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{ row }">
              <el-button type="primary" size="small" icon="Edit"></el-button>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scence === 1">
        <!-- 添加品牌属性表单 -->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <el-button type="primary" icon="Plus" @click="addAttrValue">添加属性</el-button>
        <el-button type="primary" @click="cancle">取消</el-button>
        <!-- 表格 -->
        <el-table border :data="attrParams.attrValueList">
          <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
          <el-table-column label="属性值">
            <template #default="{ row, $index }">
              <!-- 渲染了input就添加一个实例 -->
              <el-input
                :ref="(el: any) => (inputArr[$index] = el)"
                v-if="row.flag"
                v-model="row.valueName"
                placeholder="请输入属性值"
                @blur="toLook(row, $index)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作">
            <template #default="{ $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="
                  ($index: any) => {
                    attrParams.attrValueList.splice($index, 1)
                  }
                "
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部按钮 -->
        <el-button
          type="primary"
          @click="save"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="primary" @click="cancle">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<style scoped lang="scss"></style>
