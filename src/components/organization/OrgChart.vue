<template lang='pug'>
    #chart(v-on:mousemove.selve="onMouseMove")
      .chart_container   
        show-dept(v-if="chart" :parent="chart" :level=1)
        draw-lines(v-if="chart")
        edit-menu(v-if="showEditMenu")
        view-menu(v-if="showViewMenu")
        #move_dept(v-if="moveDepartment" :style="{ left: page.left + 'px', top: page.top + 'px' }")
          div {{moveDepartment.name}}
          i.iconfont.iconjiantouarrow483(v-if='moveDepartment.children.length') arrow_drop_down
</template>

<script>
import { createTree } from '@/util/plugins/HelpFunctions.js'
import ShowDept from '@/components/organization/ShowDept.vue'
import DrawLines from '@/components/organization/DrawLines.vue'
import EditMenu from '@/components/organization/EditMenu.vue'
import ViewMenu from '@/components/organization/ViewMenu.vue'

import { mapGetters,mapActions } from 'vuex'

export default {
  components: { ShowDept, DrawLines, EditMenu, ViewMenu },
  data: function() {
    return {
      tree: null,
      page: { left: 0, top: 0 },
      cancelScroll: null,
      scrollOptions: {
        container: 'body',
        easing: 'ease-in',
        offset: -500,
        force: true,
        cancelable: true,
        onStart: function(element) {
          // scrolling started
        },
        onDone: function(element) {
          // scrolling is done
        },
        onCancel: function() {
          // scrolling has been interrupted
        },
        x: true,
        y: true
      }
    }
  },
  computed: {
    ...mapGetters([
      'chart',
      'options',
      'showEditMenu',
      'showViewMenu',
      'moveDepartment',
      'columnView',
      'columnView_noStaff',
      'activeDepartment'
    ])
  },
  watch: {
    activeDepartment: function(val) {}
  },
  mounted: function() {
    this.initZoom()
    setTimeout(x => {
      this.$store.commit('addLine')
    }, 500)
  },
  methods: {
    ...mapActions(['initZoom']),
    onMouseMove(e) {
      var chartpos = document.getElementById('chart').getBoundingClientRect()
      this.page.left = e.clientX - chartpos.left + 10
      this.page.top = e.clientY - chartpos.top + 10
    }
  }
}
</script>
<style scoped>
#chart {
  position: relative;
  margin-left: 300px;
  padding: 10px;
  margin-top: 50px;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  min-width: 500px;
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
  /*box-shadow: 0px 0px 25px 3px lightgrey;*/

  background-color: white;
  cursor: grab;
}
.chart-container {
  margin: auto;
  display: inline-block;
}
#move_dept {
  position: absolute;
  width: 114px;
  height: 50px;
  margin: 4px 10px;
  text-align: center;
  font-size: 11px;
  vertical-align: middle;
  display: flex;
  border-radius: 3px;
  align-items: center; /* align vertical */

  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  padding: 2px 2px;
  box-sizing: border-box;
  top: 0px;
  left: 0px;
  border: 1px dashed #006696;
}
.arrow {
  font-size: 30px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  margin: -8px;
}
.down {
  cursor: zoom-in;
}
.up {
  cursor: zoom-out;
}
</style>
