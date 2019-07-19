<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical-demo" :default-active="initexpandNode" unique-opened>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu @click="open(item)" :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                @click="open(subItem)"
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item
                @click="open(subItem)"
                v-else
                :index="subItem.index"
                :key="subItem.index"
              >{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import store from '@/store'
export default {
  name: "my_nav",
  data() {
    return {
      defaultMenuId : '9000',
      initexpandNode : null,
     /* menu: {
        authority: null,
        children: [
          {
            authority: null,
            children: [],
            code: null,
            component: "views/cockpit/cockpitinfo/index",
            icon: "icon-setting",
            id: 4100,
            keepAlive: "0",
            label: "驾驶舱",
            name: "驾驶舱",
            parentId: 4000,
            path: "info",
            redirect: null,
            sort: 8,
            spread: false,
            type: "0"
          },
          {
            authority: null,
            children: [],
            code: null,
            component: "views/cockpit/funcmodule/index",
            icon: "icon-menu",
            id: 4200,
            keepAlive: "0",
            label: "功能模块",
            name: "功能模块",
            parentId: 4000,
            path: "func",
            redirect: null,
            sort: 8,
            spread: false,
            type: "0"
          }
        ],
        code: null,
        component: "",
        icon: "icon-shouji",
        id: 4000,
        keepAlive: "0",
        label: "驾驶舱管理",
        name: "驾驶舱管理",
        parentId: -1,
        path: "/cockpit",
        redirect: null,
        sort: 8,
        spread: false,
        type: "0"
      },*/
      items: [



      ]
    };
  },
  watch: {
    $route(to, from) {
      // console.log(55, to);
    }
  },
  mounted() {
    var that = this;
    this.items = this.mountLoadNavMenu();
    setTimeout(function(){
      that.$router.push("/" + that.initexpandNode); //默认跳转第一个路由
    }, 500);
  },
  computed: {},
  methods: {
    mountLoadNavMenu() {
      var expandnode = null;
      var umenus = store.state.userMenus;
      var that = this;
      var allchildren = null;

      umenus.forEach(e => {
        if (e.id == that.defaultMenuId) {
          allchildren = e.children;
        }
      });

      var itemdata = [];
      if (allchildren != null && allchildren.length > 0) {
        for (var i = 0; i < allchildren.length; i++) {
          // 第一层的component为Layout的情况表示下级还有子菜单，子菜单为功能菜单
          var e = allchildren[i];
          var pushobj = {};
          if (e.component == 'Layout') {

            pushobj.icon = e.icon;
            pushobj.index = (i + 1).toString();
            pushobj.title = e.name;
            pushobj.subs = [];
            for (var j = 0; j < e.children.length; j++) {
              var subobj = {};
              subobj.title = e.children[j].name;
              subobj.index = e.children[j].path;
              if (this.initexpandNode == null) {
                this.initexpandNode = e.children[j].path;
              }
              pushobj.subs.push(subobj);
            }

          } else {
            pushobj.icon = e.icon;
            pushobj.index = e.path;
            pushobj.title = e.name;
            if (this.initexpandNode == null) {
              this.initexpandNode = e.path;
            }
          }
          itemdata.push(pushobj);
        }
      }

      return itemdata;

    },
    open(item) {
      //点击跳转路由
      this.$router.push("/" + item.index);
    }
  }
};
</script>

<style lang="less" scoped>

</style>
