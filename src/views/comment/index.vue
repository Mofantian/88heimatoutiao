<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论列表</span>
      </div>
      <el-table
        :data="articles"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数">
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数据">
        </el-table-column>
        <el-table-column
          label="评论状态"
          width="180">
          <template slot-scope="scope">
            <!-- 开关组件绑定的数据是一个布尔值,它会根据布尔值的真假来决定开关状态 -->
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStatusChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template>
            <el-button type="primary">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
export default {
  name: 'CommentIndex',
  data () {
    return {
      articles: [], // 文章列表(文章的评论数据字段)
      totalCount: 0,
      loading: true,
      page: 1
    }
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      this.$axios({
        method: 'GET',
        url: '/articles',
        // Query 参数使用params传递
        params: {
          page, // 页码
          per_page: 10, // 每页大小,后端默认每页10条
          // status: this.filterForm.status, // 文章状态
          // channel_id: this.filterForm.channel_id, // 频道id
          // begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始时间
          // end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 结束时间
          response_type: 'comment'
        }
      }).then(res => {
        // console.log(res)
        // 更新文章列表数组
        this.articles = res.data.data.results
        // 更新总记录数
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        console.log('获取数据失败', err)
      }).finally(() => { // 无论成功还是失败最终都要执行
        this.loading = false
      })
    },
    onStatusChange (article) {
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          allow_comment: article.comment_status
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '启用' : '关闭'}成功`
        })
      }).catch(err => {
        this.$message.error('操作失败')
        console.log('评论状态操作失败', err)
      })
    },
    onPageChange (page) {
    // 记录当前最新页码
      this.page = page
      // 请求加载指定页码的文章列表
      this.loadArticles(page)
    }
  },
  created () {
    this.loadArticles(1)
  }
}
</script>

<style>

</style>
