<template lang='pug'>
  div
    .file(v-on:click='editMenuOpen = !editMenuOpen') 
      i.iconfont.iconxitongyonghu(v-on:click="" title='Set options') 
    .file_menu(v-if='editMenuOpen')
        ul
          li
            input(type="checkbox" id="checkbox" v-model="columnView" )
            label(for="checkbox") 以列查看
          li
            span &nbsp &nbsp
            input(type="checkbox" id="checkbox3" v-model="columnView_noStaff")
            label(for="checkbox3") 排除员工部门
          li
              input(type="checkbox" id="checkbox1" v-model="managerNameView")
              label(for="checkbox1") 显示管理者名字
          li
              input(type="checkbox" id="checkbox4" v-model="managerPhotoView")
              label(for="checkbox4") 显示管理者照片
          li(v-if="false")
              input(type="checkbox" id="checkbox5" v-model="onlyShowParents")
              label(for="checkbox5") 只有父层次结构
          li(v-if="false")
              input(type="checkbox" id="checkbox2" v-model="editMode")
              label(for="checkbox2") 编辑 Mode
</template>

<script>
import XLSX from 'xlsx'

import { mapGetters, mapActions } from 'vuex'
export default {
  data: function() {
    return {
      editMenuOpen: false
    }
  },
  computed: {
    ...mapGetters(['chart', 'editMode']),
    columnView: {
      get() {
        return this.$store.state.columnView
      },
      set(value) {
        this.setColumnView(value)
        console.log('jaaa')
        this.$store.commit('cancelAll')
      }
    },
    columnView_noStaff: {
      get() {
        return this.$store.state.columnView_noStaff
      },
      set(value) {
        this.setColumnView_noStaff(value)
        this.$store.commit('cancelAll')
      }
    },
    managerNameView: {
      get() {
        return this.$store.state.managerNameView
      },
      set(value) {
        this.$store.commit('setManagerNameView', value)
        this.$store.commit('cancelAll')
      }
    },
    managerPhotoView: {
      get() {
        return this.$store.state.managerPhotoView
      },
      set(value) {
        this.setManagerPhotoView(value)
        this.$store.commit('cancelAll')
      }
    },
    editMode: {
      get() {
        return this.$store.state.editMode
      },
      set(value) {
        this.$store.commit('setEditMode', value)
        this.$store.commit('cancelAll')
      }
    },
    onlyShowParents: {
      get() {
        return this.$store.state.onlyShowParents
      },
      set(value) {
        this.setOnlyShowParents(value)
        this.$store.commit('cancelAll')
      }
    }
  },
  methods: {
    ...mapActions([
      'setManagerPhotoView',
      'setColumnView_noStaff',
      'setColumnView',
      'setOnlyShowParents'
    ])
  }
}
</script>

<style scoped>
.file {
  display: inline-block;
  position: relative;
  width: 50px;
  height: 50px;
}
.settings {
}
.settings:hover {
  border: 1px solid white;
}
.file_select,
.file {
  cursor: pointer;
}
.file .iconfont{
  font-size: 24px;
}
.file_select > input[type='file'] {
  display: none;
}
.file_menu {
  font-size: 14px;
  background-color: #006696;
  display: inline-block;
  position: absolute;
  left: 0px;
  top: 45px;
  width: 170px;
  border: 1px solid grey;
  border-top: 1px solid white;
}
ul {
  list-style: none;

  padding: 5px;
  text-align: left;
}

input {
  margin: 0px 5px;
}

li:hover {
  background: lightblue;
  cursor: pointer;
  color: black;
}
</style>
