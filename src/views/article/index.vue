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
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select placeholder="请选择活动区域" v-model="filterForm.channel_id">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="filterForm.begin_pubdate"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 数据展示 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到条符合条件的内容</span>
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
        ref="singleTable"
        :data="articles"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          property="cover"
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
          property="title"
          label="标题"
          width="120">
        </el-table-column>
        <el-table-column
          property="status"
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
          property="pubdate"
          label="发布日期">
        </el-table-column>
        <el-table-column
          property=""
          label="操作">
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="primary" size="mini">编辑</el-button>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  // 建议给每个组件都起一个名字,有一些好处,例如我们可以在调试工具中搜索到这个组件
  name: 'articles',
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        status: '', // 文章状态
        channel_id: '', // id
        begin_pubdate: '', // 起始时间
        end_pubdate: '' // 截止时间
      },
      rangeDate: '',
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
      ]
    }
  },
  methods: {
    loadArticles () {
      // 在我们的项目中,除了登录页不需要token,其它所有的接口都需要提供token才能请求
    // 否则后端返回401错误
    // 我们这里的后端要求把token放到请求头中
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: { // headers用来添加请求头
        // 名字:值
        // 后端要求把token放到请求头中,使用一个名字叫Authorization
        // 注意:token的格式要求:Bearer 用户token  --->  Bearer后面有一个空格
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        // console.log(res)
        this.articles = res.data.data.results
      }).catch(err => {
        console.log('获取数据失败', err)
      })
    }
  },
  created () {
    this.loadArticles()
  }
}
</script>

<style>

</style>
