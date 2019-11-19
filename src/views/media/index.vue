<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>素材管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">上传图片</el-button>
      </div>
      <div>
        <el-radio-group v-model="type" @change="onFind">
          <el-radio-button label="全部">全部</el-radio-button>
          <el-radio-button label="收藏">收藏</el-radio-button>
        </el-radio-group>
      </div>
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :md="4"
          :sm="12"
          v-for="item in images"
          :key="item.id"
          class="col-item"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="item.url"
              class="image"
              height="200"
            >
            <div style="padding: 14px;" class="action">
              <i :class="{
                'el-icon-star-on': item.is_collected,
                'el-icon-star-off': !item.is_collected
              }"></i>
              <!-- <i :class="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"></i> -->
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MediaIndex',
  data () {
    return {
      images: [],
      type: ''
    }
  },
  created () {
    this.loadImages()
  },
  methods: {
    loadImages (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect // 是否获取收藏图片
        }
      }).then(res => {
        // console.log(res)
        this.images = res.data.data.results
      }).catch(err => {
        console.log('数据获取失败', err)
      })
    },
    // 该函数是radio的change事件处理函数
    // 通过文档得知,事件函数有个回调参数,选中的radio label的值
    // 所以我们可以声明一个形参来接收使用
    onFind (value) {
      // console.log(value)
      this.loadImages(value !== '全部')
    }
  }
}
</script>

<style lang="less" scoped>
.col-item {
  margin-bottom: 20px;
  .action {
    display: flex;
    justify-content: center;
    font-size: 24px;
    .el-icon-delete-solid {
      margin-left: 20px;
    }
  }
}
</style>
