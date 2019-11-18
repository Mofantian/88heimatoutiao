<template>
  <div class="article">
    <!-- 筛选数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="filterForm.status">
            <!--
              单选框组会把选中的radio的label同步给绑定的数据
              接口要求不传为全部
             -->
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <!-- 下拉列表会把选中的option的value同步到数据中 -->
          <!-- <el-select placeholder="请选择频道" v-model="filterForm.channel_id">
            <el-option label="所有频道" :value="null"></el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="channel in channels"
              :key="channel.id"
              ></el-option>
          </el-select> -->
          <channel-select v-model="filterForm.channel_id"></channel-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="rangeDate"
            value-format="yyyy-MM-dd"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- 点击查询按钮,重新发请求获取筛选数据,新查询的数据 -->
          <el-button type="primary" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 数据展示 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{totalCount}}条符合条件的内容</span>
      </div>
      <!--
        el-table 表格组件
        data 表格的数组,要求是数组
        表格组件会使用data数据,在内部自己进行遍历,不需要我们自己v-for
        只需要知道这个表格组件
          data
          列名
          列值
        el-table-column表格列组件
          prop用来指定渲染哪个数据字段
          label表头名称
          width列宽
        默认表格列只能渲染普通文本,如果想要渲染别的东西,需要自定义表格列
       -->
      <el-table
        :data='articles'
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          prop="cover"
          label="封面"
          width="120">
          <!--
            自定义表格列
            在template上声明 slot-scope="scope" 然后就可以通过scope.row获取遍历项
            scope.row就相当于我们自己v-for的item
           -->
          <template slot-scope="scope">
            <img width="50" :src="scope.row.cover.images[0]" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="120">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="120">
          <template slot-scope="scope">
            <!-- 文章状态
              0-草稿
              1-待审核
              2-审核通过
              3-审核失败
              4-已删除
              不传为全部
            -->
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].lable}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布日期">
        </el-table-column>
        <el-table-column
          prop=""
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="onDelete(scope.row.id)">删除</el-button>
            <el-button type="primary" size="mini">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <!--
      分页组件
      默认按照10条每页划分页码
      total 用来指定一共有多少条数据
      background 背景色
      layout 用来控制布局
     -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      :disabled='loading'
      @current-change="onPageChange"
      >
    </el-pagination>
  </div>
</template>

<script>
import ChannelSelect from '@/components/channel-select'
export default {
  // 建议给每个组件都起一个名字,有一些好处,例如我们可以在调试工具中搜索到这个组件
  name: 'articles',
  components: {
    ChannelSelect
  },
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        status: null, // 文章状态
        channel_id: null // id
        // begin_pubdate: '', // 起始时间
        // end_pubdate: '' // 截止时间
      },
      rangeDate: [], // 日期
      articles: [],
      articleStatus: [
        {
          type: '',
          value: 0,
          lable: '草稿'
        }, {
          type: 'warning',
          value: 1,
          lable: '待审核'
        }, {
          type: 'success',
          value: 2,
          lable: '审核通过'
        }, {
          type: 'danger',
          value: 3,
          lable: '审核失败'
        }, {
          type: 'info',
          value: 4,
          lable: '已删除'
        }
      ],
      totalCount: 0,
      loading: true, // 表格的loading状态
      // channels: [], // 存储文章列表
      page: 1 // 当前页码
    }
  },
  methods: {
    // 是否需要token由接口文档告诉你
    // loadChannels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     // console.log(res)
    //     this.channels = res.data.data.channels
    //   }).catch(err => {
    //     console.log('文章类别获取失败', err)
    //   })
    // },
    // 如果page 就是用传递的,如果没传,就默认是1
    loadArticles (page = 1) {
      // 加载loading
      this.loading = true
      // 在我们的项目中,除了登录页不需要token,其它所有的接口都需要提供token才能请求
      // 否则后端返回401错误
      // 我们这里的后端要求把token放到请求头中
      // const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: { // headers用来添加请求头
        // // 名字:值
        // // 后端要求把token放到请求头中,使用一个名字叫Authorization
        // // 注意:token的格式要求:Bearer 用户token  --->  Bearer后面有一个空格
        //   Authorization: `Bearer ${token}`
        // },
        // Query 参数使用params传递
        params: {
          page, // 页码
          per_page: 10, // 每页大小,后端默认每页10条
          status: this.filterForm.status, // 文章状态
          // status: null // axios有个功能,当参数为null,undefined的时候,不发送请求
          channel_id: this.filterForm.channel_id, // 频道id
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始时间
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 结束时间
        }
      }).then(res => {
        // console.log(res)
        // 更新文章列表数组
        this.articles = res.data.data.results
        // console.log(this.articles)
        // 更新总记录数
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        console.log('获取数据失败', err)
      }).finally(() => { // 无论成功还是失败最终都要执行
        this.loading = false
      })
    },
    onPageChange (page) {
      // 记录当前最新页码
      this.page = page
      // 请求加载指定页码的文章列表
      this.loadArticles(page)
    },
    onDelete (articleId) {
      // 这里报400错是因为数据id的问题
      // 这个id不对
      this.$axios({
        method: 'DELETE',
        // 接口说明的application/json不需要传递
        // axios会自动添加发送Content-Type application/json
        // 注意:接口路径中的:target是一个路径参数,是动态的,不要写:
        url: `/articles/${articleId}`
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // }
      }).then(res => {
        // console.log(res)
        // 删除成功,重新加载当前页码的文章列表
        this.loadArticles(this.page)
      }).catch(err => {
        console.log('数据删除失败', err)
      })
    }
  },
  created () {
    this.loadArticles(1)
    // 加载频道列表
    // this.loadChannels()
  }
}
</script>

<style scoped lang="less">
.article {
  .box-card {
    margin-bottom: 20px;
  }
}
</style>
