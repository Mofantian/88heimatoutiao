<template>
  <div class="channel-select">
    <!--
      这个组件要求绑定数据
      这里没有绑定报错
      Missing required prop: "value"
    -->
    <!--
      v-model="value"
        :value="value"
        @input="value = 事件参数"

      :value="value"
        前者是组件的属性名
        后者是props数据

      element的select组件的切换选项的时候会触发一个名字叫input的自定义事件
      该事件可以获得一个回调参数:选中的option的value
      所以我们就手动监听这个事件,事件触发的时候,使用$emit给父组件发出一个通知,让组件修改绑定的数据channel_id

     -->
    <el-select
      placeholder="请选择频道"
      :value="value"
      @input="onInput"
      >
      <el-option label="所有频道" :value="null"></el-option>
      <el-option
        :label="channel.name"
        :value="channel.id"
        v-for="channel in channels"
        :key="channel.id"
        ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ChannelSelect',
  props: {
    value: {
      type: [String, Number],
      require: true
    }
  },
  data () {
    return {
      channels: []
    }
  },
  methods: {
    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log('文章类别获取失败', err)
      })
    },
    onInput (data) { // data是选中的option的value
      // 发布一个自定义事件,由于父组件使用的v-model简写,所以这里的事件名称必须叫input
      this.$emit('input', data)
    }
  },
  created () {
    // 加载频道列表
    this.loadChannels()
  }
}
</script>

<style>

</style>
