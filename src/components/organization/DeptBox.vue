<template lang='pug'>
    div(v-on:mouseenter="mouseOverBox(true)" v-on:mouseleave="mouseOverBox(false)")
      template(v-if="departmentData")
        template(v-if="!managerPhotoView")
          .department( :id="'ID_'+ departmentData.id" :class="[type, active]" v-on:click="setActiveDepartment(departmentData, $event)" v-on:contextmenu.prevent="showCtxMenu(departmentData,  $event)")
            .level_indicator(:style="{backgroundColor:config.levelColors[level-1]||'#FFFFFF'}")
            template(v-if="managerNameView")
              .name1(v-html="departmentData.name")
              .name_manager(v-if="managerNameView") {{departmentData.manager.name}}
            template(v-else)
              .name2(v-html="departmentData.name")
            i.iconfont.iconjiantouarrow483(v-if='!departmentData.showChildren && departmentData.children.length' v-on:click="doShowChildren(true)") 
            i.iconfont.iconjiantou-copy-copy-copy(v-if='departmentData.showChildren && departmentData.children.length' v-on:click="doShowChildren(false)") 
            i.iconfont.iconchakan.view(v-if="displaySiblingIcon" v-on:click="showViewMenu(departmentData, $event)" title="查看选项") 
            i.iconfont.iconmore(v-if="hiddenParents" v-on:click="setHideParents(false)") 更多
            div.hidden_dept(v-if='departmentData.children.length' title='Nr of subdepartments') {{departmentData.children.length}}
        template(v-else)
          .department.manager_photo(:id="'ID_'+ departmentData.id" :class="[type, active]" v-on:click="setActiveDepartment(departmentData, $event)" v-on:contextmenu.prevent="showCtxMenu(departmentData,  $event)")
            .level_indicator(:style="{backgroundColor:config.levelColors[level-1]||'#FFFFFF'}")
            table
              tr
                td
                  img.profile(:src='config.photoUrl.prefix+departmentData.manager.photo+config.photoUrl.suffix')
                td
                  div.textdiv
                    .name(v-html="departmentData.name")
                    .name_manager(v-if="managerNameView") {{departmentData.manager.name}}
            i.iconfont.iconjiantouarrow483(v-if='!departmentData.showChildren && departmentData.children.length' v-on:click="doShowChildren(true)") 
            i.iconfont.iconjiantou-copy-copy-copy(v-if='departmentData.showChildren && departmentData.children.length' v-on:click="doShowChildren(false)") 
            i.iconfont.iconchakan.view(v-if="displaySiblingIcon" v-on:click="showViewMenu(departmentData, $event)" title="查看选项") 
            i.iconfont.iconmore(v-if="hiddenParents" v-on:click="setHideParents(false)") 更多
            div.hidden_dept(v-if='departmentData.children.length' title='Nr of subdepartments') {{departmentData.children.length}}
      template(v-if="!departmentData")
          .department.invisible(v-if='!managerPhotoView' :class="[type]")
          .department.manager_photo.invisible(v-else :class="[type]")

</template>

<script>
import { mapGetters,mapActions } from 'vuex'

export default {
  name: 'DeptBox',
  props: {
    departmentData: {
      type: Object,
      default: null
    },
    level: {
      type: Number,
      required: true,
      default: 0
    },
    type: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      displaySiblingIcon: false,
      hiddenDept: 5
    }
  },
  computed: {
    ...mapGetters([
      'columnView',
      'managerNameView',
      'managerPhotoView',
      'activeDepartment',
      'editMode',
      'moveDepartment',
      'config',
      'chart'
    ]),
    active: function() {
      return this.departmentData === this.activeDepartment
        ? 'active_department'
        : ''
    },
    hiddenParents: function() {
      return this.departmentData === this.chart && this.chart.parent
    }
  },
  methods: {
    ...mapActions([
      'showChildren',
      'hideChildren',
      'setHideSiblings',
      'setHideParents'
    ]),

    doShowChildren(down) {
      var department =
        this.departmentData.parent &&
        !this.departmentData.parent.showChildren &&
        down
          ? this.departmentData.parent
          : this.departmentData
      if (down) {
        this.showChildren(department)
      } else {
        this.hideChildren(department)
      }
    },

    setActiveDepartment(department, event) {
      this.$store.commit('setActiveDepartment', department)
    },
    showCtxMenu(department, event) {
      this.$store.commit('setActiveDepartment', department)
      this.$store.commit('showEditMenu', null)

      this.$nextTick(e => {
        if (this.editMode) {
          this.$store.commit('showEditMenu', event)
        }
      })
    },
    showViewMenu(department, event) {
      this.$store.commit('setActiveDepartment', department)
      this.$store.commit('showViewMenu', null)

      this.$nextTick(e => {
        this.$store.commit('showViewMenu', event)
      })
    },
    mouseOverBox(value) {
      if (!value) {
        this.displaySiblingIcon = false
      } else {
        if (
          this.departmentData.parent &&
          this.departmentData.parent.showChildren
        ) {
          this.displaySiblingIcon = true
        }
      }
    },
    hideSiblings() {
      this.setHideSiblings(this.departmentData)
    }
  }
}
</script>
<style scoped>
.iconfont{
  margin-left: -25px;
  margin-bottom: -30px;
  /* border:1px solid red; */
  position: relative;
  font-size:24px;
  /* z-index:999; */
}
.view{
  font-size:30px;
  margin-left: -28px;
  margin-bottom: 25px;
}
.down-icon1 {
  width: 20px;
  height: auto;
  margin: 3px 0px 0px 0px;
}
.profile {
  width: 55px;
  max-height: 55px;
  display: block;
  margin: auto;
  border-radius: 30px;
}
.active_department {
  background-color: yellow !important;
  color: black !important;
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
.view_button {
  font-size: 24px;
  position: absolute;
  top: 0px;
  right: 0px;
  margin: 0px;
  color: black;
}
.department {
  width: 120px;
  height: 60px;
  border: 1px solid rgb(180, 180, 180);
  margin: 30px 0px 5px 0px;
  text-align: center;
  font-size: 11px;
  vertical-align: middle;
  display: flex;
  border-radius: 3px;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  padding: 2px 2px;
  position: relative;
  /*box-shadow: 3px 3px 3px lightgrey;*/
}
.manager_photo {
  width: 180px;
  height: 60px;
  margin-top: 20px;
}
.invisible {
  visibility: hidden;
}
.level_indicator {
  position: absolute;
  height: 3px;
  width: 100px;
  right: 10px;
  top: 3px;
  border-radius: 5px;
}
.textdiv {
  width: 114px;
  height: 50px;
  position: relative;
}
.column {
  margin-top: 1px;
  margin-bottom: 0px;
}
.staff,
.staff_column {
  margin: 2px 80px 2px 80px;
}
.staff_child {
  margin: 2px 80px 2px 100px;
}
.name,
.name1,
.name2 {
  overflow-wrap: break-word;
  min-width: 1%;
  width: 114px;
  display: inline-block;
  position: absolute;
  left: 0px;
  top: 8px;
}
.name1 {
  top: 10px;
}
.name2 {
  top: 14px;
}
.name_manager {
  overflow-wrap: break-word;
  min-width: 1%;
  width: 114px;
  display: inline-block;
  position: absolute;
  left: 0px;
  bottom: 5px;
  color: grey;
}
.hidden_dept {
  position: absolute;
  bottom: 1px;
  left: 1px;
  background-color: white;
  color: grey;
  font-size: 12px;
  padding: 0px 2px;
  border-radius: 4px;
}
.hidden_parents,
.hidden_parents1 {
  position: absolute;
  top: -24px;
  left: 78px;
  font-size: 24px;
  color: grey;
}
.hidden_parents1 {
  left: 50px;
}
</style>
