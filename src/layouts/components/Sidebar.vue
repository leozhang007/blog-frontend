<template>
  <div>
    <el-card shadow="never">
      <el-menu>
        <g-link class="nav-link" :to="item.path" v-for="item in constantRouterMap" :key="item.id">
          <el-menu-item :class="{'is-active': path === item.path}">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item> 
        </g-link>
      </el-menu>
    </el-card>
  </div>
</template>

<static-query>
query {
  allStrapiPage {
		edges {
      node {
        id
        icon
        title
        path
      }
    }
  }
}
</static-query>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      parentUrl: '',
      menuList: [],
    }
  },
  computed: {
    path() {
      return this.$route.path;
    },
    constantRouterMap() {
      return this.$static.allStrapiPage.edges
        .map((item) => item.node)
        .sort((a, b) => {
          return parseInt(a.id) - parseInt(b.id)
        })
    },
    active() {
      let active = '/'
      this.constantRouterMap.forEach((item) => {
        if (this.$route.path.startsWith(item.path)) {
          active = item.path
        }
      })
      return active
    },
  },
  methods: {
    onSelect(index) {
      this.$router.push(index)
    },
  },
}
</script>
