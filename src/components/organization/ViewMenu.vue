<template lang='pug'>
   #view_menu
    ul
        li(v-if="activeDepartment.showParents" v-on:click="hideParents(true)") 隐藏父级
        li(v-else v-on:click="hideParents(false)") 显示父级
        // disable hide siblings options, because too confusing
        li( v-if="false" v-on:click="hideSiblings()") 切换为相邻
        li(v-on:click="onlyParents()") 切换为仅显示父级
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'chart',
      'showViewMenu',
      'activeDepartment',
      'moveDepartment',
      'onlyShowParents'
    ])
  },
  mounted: function() {
    var d = document.getElementById('view_menu')
    var chartpos = document.getElementById('chart').getBoundingClientRect()
    d.style.display = 'inline-block'
    d.style.left = this.showViewMenu.clientX - chartpos.left +25+'px'
    d.style.top = this.showViewMenu.clientY + -chartpos.top -5+'px'
  },
  methods: {
    ...mapActions([
      'setHideParents',
      'setHideSiblings',
      'setShowDepartment',
      'setOnlyShowParents'
    ]),
    hideParents: function(val) {
      this.setHideParents(val)
      this.$store.commit('showViewMenu', null)
    },
    hideSiblings: function() {
      this.setHideSiblings(this.activeDepartment)
      this.$store.commit('showViewMenu', null)
    },
    onlyParents: function() {
      this.setOnlyShowParents(!this.onlyShowParents)
      this.setShowDepartment(this.activeDepartment)
      this.$store.commit('showViewMenu', null)
    }
  }
}
</script>
<style scoped>
#view_menu {
  position: absolute;
  width: 150px;
  background-color: lightgrey;
  box-shadow: 5px 5px 5px black;
  top: 50px;
  left: 50px;
  padding: 5px;
  z-index: 2;
  text-align: left;
  border-radius: 2px;
  font-size: 14px;
}

ul {
  padding: 0;
  list-style-type: none;
  margin: 0px;
}

li {
  cursor: pointer;
}
li:hover {
  background-color: grey;
  color: white;
}
.noclick {
  cursor: default;
}
.noclick:hover {
  background-color: lightgrey;
  color: black;
}
.delete {
  color: red;
}
</style>
