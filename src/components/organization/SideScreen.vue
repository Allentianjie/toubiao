<template lang='pug'>
    .side-screen(v-if="showSideScreen")
      button.right(v-on:click="$store.commit('closeSideScreen')")
        //- i.material-icons.arrow keyboard_arrow_left
        i.iconfont.iconxiazai6
      template(v-if="activeDepartment")
        .title {{activeDepartment.name}}
        .tabs
          button.tab(:class='{active:activeTab===1}' v-on:click='activeTab=1') 详情
          button.tab(:class='{active:activeTab===2}' v-on:click='activeTab=2') 名片
        template(v-if="activeTab===1")
          .property
            span.label 名字
            br
            input.name(v-if='editMode' :class="{error:!activeDepartment_name}" v-model="activeDepartment_name")
            span(v-else).text {{activeDepartment_name}}

          .property
            span.label 经理
            i.material-icons.edit(v-if='editMode' v-on:click='personPicker="manager"') edit
            br
            span.text(v-if='activeDepartment.manager.name') {{activeDepartment.manager.name}}
            span.untext(v-else) No manager
          .property
            span.label 描述
            br 
            textarea.description(v-if='editMode' v-model="activeDepartment_description")
            span(v-else).text {{activeDepartment_description}}

          .property(v-for="field in activeDepartment.dataFields" v-if="field.value")
            span.label {{field.name}}
            br
            template(v-if='editMode')
              // todo edit extra properties
            templage(v-else)
              template(v-if='field.type==="url"')
                a(:href="field.value" target="_blank") Link
              template(v-else)
                span.text {{field.value}}

          .property
            template(v-if='!editMode')
              span.label 部门类型
              br
              span(v-if='activeDepartment_isStaff') 员工部门
              span(v-else) 普通部门
            template(v-else)
              span.label Staff department:
              input.isstaff(type='checkbox' v-model="activeDepartment_isStaff" :disabled="!editMode")
          .property
            span.label 层次结构
            ul
              li.clickable(v-for='(parent, pnr) in parents' v-on:click="setActiveDepartment(parent)") 
                span(v-for="n in pnr") &nbsp
                i(v-if="pnr !==0").iconfont.iconjiantouarrow496.reset-arrow-right
                span {{parent.name}}
              li.clickable(v-on:click="setActiveDepartment(activeDepartment)")
                span(v-for="n in parents.length") &nbsp
                i(v-if="parents.length").iconfont.iconjiantouarrow496.reset-arrow-right
                span.this-department {{activeDepartment.name}}
              li.clickable(v-for='child in activeDepartment.children' v-on:click="setActiveDepartment(child)") 
                span(v-for="n in parents.length+5") &nbsp
                span {{child.name}}
          img.profile(:src='config.photoUrl.prefix+activeDepartment.manager.photo+config.photoUrl.suffix' v-on:click='visitProfile(activeDepartment.manager)')
        template(v-if='activeTab===2')
          .assignment(v-for='person in department_people' v-on:click='visitProfile(person.person)')
            table
              tr
                td
                  img.photo(v-if="person.photoURL" :src='person.photoURL' @error="markPhotoNotFound(person)")
                  i(v-else).material-icons.nophoto account_box
                td
                  .name 
                    span {{person.person.name}}
                  .role(v-if='!editMode') {{person.assignment.role}}
                  .role(v-else) 
                    input(:value="person.assignment.role" @input="updateRole(person, $event)")
            template(v-if='editMode')
              i.material-icons.delete(title='remove from department' v-on:click='removeFromDepartment(person)') delete
          button(v-if='editMode' v-on:click='personPicker="person"') Add person   
        person-picker(v-if='personPicker' :type='personPicker' v-on:close='personPicker=null') 
        
    .noside-screen(v-else)
      button.right(v-on:click="$store.commit('openSideScreen')")
        //- i.material-icons.arrow keyboard_arrow_right
        i.iconfont.iconjiantou1
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import PersonPicker from '@/components/organization/PersonPicker.vue'

export default {
  components: { PersonPicker },
  data: function() {
    return {
      personPicker: null,
      activeTab: 1,
      noPhotos: []
    }
  },
  computed: {
    ...mapGetters([
      'showSideScreen',
      'activeDepartment',
      'editMode',
      'people',
      'assignments',
      'config'
    ]),
    activeDepartment_name: {
      get: function() {
        console.log(666,this.$store.state.origanization.activeDepartment)
        return this.$store.state.origanization.activeDepartment.name
      },
      set: function(val) {
        this.$store.commit('updateActiveDepartmentName', val)
      }
    },
    activeDepartment_description: {
      get: function() {
        return this.$store.state.origanization.activeDepartment.description
      },
      set: function(val) {
        this.$store.commit('updateActiveDepartmentDescription', val)
      }
    },
    activeDepartment_isStaff: {
      get: function() {
        return this.$store.state.origanization.activeDepartment.isStaff
      },
      set: function(val) {
        this.updateActiveDepartmentIsStaff(val)
      }
    },
    department_people: function() {
      var person_ids = this.assignments.filter(
        a => a.department_id == this.activeDepartment.id
      )
      var people = []
      if (!this.editMode) {
        people.push({
          person: {
            name: this.activeDepartment.manager.name,
            id: this.activeDepartment.manager.id
          },
          assignment: { role: 'Manager' },
          photoURL:
            this.config.photoUrl.prefix +
            this.activeDepartment.manager.id +
            this.config.photoUrl.suffix
        })
      }

      person_ids.forEach(pid => {
        var person = this.people.find(p => p.id == pid.person_id)
        if (person) {
          people.push({
            person: person,
            assignment: pid,
            photoURL:
              this.config.photoUrl.prefix +
              person.id +
              this.config.photoUrl.suffix
          })
        }
      })

      return people
    },
    parents: function() {
      var parents = []
      var department = this.activeDepartment
      while (department.parent) {
        department = department.parent
        parents.unshift(department)
      }
      return parents
    },
    children: function() {
      return this.activeDepartment.children
    }
  },
  methods: {
    ...mapActions(['setShowDepartment', 'updateActiveDepartmentIsStaff']),
    markPhotoNotFound(person) {
      if (!this.noPhotos.find(p => p === person)) {
        this.noPhotos.push(person)
      }
    },
    setActiveDepartment(department) {
      this.setShowDepartment(department)
    },
    removeFromDepartment(person) {
      this.$store.commit('removePersonFromActiveDepartment', person)
    },
    updateRole(person, e) {
      this.$store.commit('updateActiveDepartmentPersonRole', {
        person: person,
        role: e.target.value
      })
    },
    visitProfile(person) {
      console.log(person)
      if (this.editMode) return
      if (!this.config.linkUrl) return
      var url =
        this.config.linkUrl.prefix + person.id + this.config.linkUrl.suffix
      window.open(url, '_blank')
    }
  }
}
</script>

<style scoped>
.profile {
  width: 80px;
  max-height: 80px;
  position: absolute;
  right: 16px;
  top: 154px;
  border: 1px solid grey;
  cursor: pointer;
}
.profile:hover {
  border: 2px solid orange;
}
.title {
  text-align: center;
  min-height: 50px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
  width: calc(100% - 30px);
}
.assignment {
  width: 90%;
  height: 60px;
  margin: 4px auto;
  position: relative;
  border: 1px solid lightgrey;
  box-shadow: 3px 3px 3px lightgrey;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}
.assignment:hover {
  border: 2px solid orange;
}
.photo {
  width: 52px;
  max-height: 52px;
  display: block;
  margin: auto;
}
.name {
  font-size: 16px;
}
.role {
  color: grey;
  font-size: 14px;
}
.delete {
  position: absolute;
  top: 5px;
  right: 0px;
  font-size: 20px;
  color: red;
  cursor: pointer;
}
.tabs {
  width: 100%;
  margin-bottom: 20px;
  padding: 0px 10px;
  border-bottom: 2px solid lightgrey;
}
.tab {
  width: 120px;
  margin: 0px 0px 0px 0px;
  border: none;
  background: none;
  margin-bottom: -2px;
  border-bottom: 2px solid transparent;
  outline: none;
  cursor: pointer;
}
.tab.active {
  border: 2px solid lightgrey;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  background-color: lightgrey;
}
.property {
  margin-bottom: 20px;
}
.clickable {
  cursor: pointer;
  font-size: 14px;
}
input.name {
  width: calc(100% - 10px);
}
textarea.description {
  width: calc(100% - 10px);
  height: 80px;
}
.clickable:hover {
  background-color: grey;
}
.noclickable {
  cursor: default;
}
.label {
  font-weight: 600;
  text-decoration: underline;
}
.untext {
  color: grey;
  font-style: italic;
}
ul {
  list-style: none;
  background-color: white;
  padding: 5px;
}
.this-department {
  font-weight: 600;
}
.sub {
  font-size: 16px;

  margin: -8px 0px;
}
.isstaff {
  margin: 0px 10px;
}
.side-screen {
  position: absolute;
  left: 0px;
  top: 50px;
  width: 300px;
  height: 100vh;
  border: 1px solid lightgrey;
  background-color: rgb(245, 250, 255);
  padding: 5px;
  box-shadow: 3px 3px 3px lightgrey;
  overflow: auto;
  padding-bottom: 80px;
}
.noside-screen {
  position: absolute;
  left: 0px;
  top: 50px;
  width: 25px;
  height: 45px;

  border: 1px solid lightgray;
  background-color: rgb(245, 250, 255);
  box-shadow: 3px 3px 3px lightgrey;
  z-index: 9;
}

.right {
  position: absolute;
  right: 0px;
  top: 10px;
  background-color: transparent;
  border: 0px solid grey;
  padding: 1px;
  cursor: pointer;
}
.right:focus {
  outline: none;
}
.error {
  background-color: red;
}
.material-icons.edit {
  font-size: 16px;
  cursor: pointer;
}
.reset-arrow-right{
  display: inline-block;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>
