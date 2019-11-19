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
          label="头像"
          width="180">
          <template slot-scope="scope">
            <img :src="scope.row.aut_photo" width="50">
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="like_count"
          label="点赞数量"
          width="180">
        </el-table-column>
        <el-table-column
          label="点赞"
          width="180">
          <template slot-scope="scope">
            {{scope.row.is_liking === 1 ? '已赞' : '没有赞'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="评论时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="reply_count"
          label="回复数量"
          width="180">
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
        this.commentlist = res.data.data.results
      }).catch(err => {
        console.log('获取评论数据失败', err)
      })
    }
  }
}
</script>

<style>

</style>
