<template>
  <div class="comment-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论详情列表</span>
      </div>
      <el-table
        :data="commentlist"
        style="width: 100%">
        <el-table-column
          label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.aut_photo" width="50">
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容">
        </el-table-column>
        <el-table-column
          prop="like_count"
          label="点赞数量">
        </el-table-column>
        <el-table-column
          label="点赞">
          <template slot-scope="scope">
            {{scope.row.is_liking === 1 ? '已赞' : '没有赞'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="评论时间">
          <template slot-scope="scope">
            {{ scope.row.pubdate | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column
          label="是否推荐">
          <template slot-scope="scope">
            <!-- 开关组件绑定的数据是一个布尔值,它会根据布尔值的真假来决定开关状态 -->
            <el-switch
              v-model="scope.row.is_top"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onTop(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="reply_count"
          label="回复数量">
        </el-table-column>
        <!-- <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button type="primary" @click="$router.push('/comment/'+scope.row.id)">修改</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
  </div>
</template>

<script>
// import moment from 'moment'
export default {
  name: 'CommentList',
  // 除了可以通过this.$route.params.articleID获取路由参数
  // 还有一种更方便的方式: 通过props解耦,就是自动把路由参数映射到props中
  // 然后就可以像访问data数据一样来访问路由参数了
  data () {
    return {
      commentlist: []
    }
  },
  // 实例选项: 过滤器
  // 全局:任何组件都可以使用
  // 局部:只能用在当前组件
  // 作用:常用于一些简单的文本可视化,例如日期格式化处理
  // 过滤器函数可以直接在模板中调用
  // filters: {
  //   dateFormat (value) {
  //     return moment(value).format('YYYY-MM-DD')
  //   }
  // },
  props: {
    articleID: {
      type: String,
      required: true
    }
  },
  created () {
    this.loadComments()
  },
  methods: {
    loadComments () {
      this.$axios({
        method: 'GET',
        url: '/comments',
        params: {
          type: 'a',
          source: this.articleID
        }
      }).then(res => {
        // console.log(res)
        const comments = res.data.data.results
        // comments.forEach(item => {
        //   item.pubdate = moment(item.pubdate).format('YYYY-MM-DD HH:mm:ss')
        // })
        this.commentlist = comments
      }).catch(() => {
        // console.log('获取评论数据失败', err)
      })
    },
    onTop (comment) {
      this.$axios({
        url: `/comments/${comment.com_id}/sticky`,
        method: 'PUT',
        data: {
          sticky: comment.is_top
        }
      }).then(res => {
        this.$message.success('操作成功')
        // console.log(res)
      }).catch(() => {
        this.$message.error('操作失败')
        // console.log('操作失败', err)
      })
    }
  }
}
</script>

<style>

</style>
