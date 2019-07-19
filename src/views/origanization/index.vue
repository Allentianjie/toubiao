<template lang='pug'>
  .p-container
    page-header
    .container1(id='xparent')
      org-chart(v-if="chart")
    side-screen(v-if='chart')
</template>

<script>
import PageHeader from '@/components/organization/PageHeader.vue'
import OrgChart from '@/components/organization/OrgChart.vue'
import SideScreen from '@/components/organization/SideScreen.vue'
import { mapGetters,mapActions } from 'vuex'

export default {
  components: {
    OrgChart,
    PageHeader,
    SideScreen
  },
  computed: {
    ...mapGetters(['chart', 'activeDepartment', 'onlyShowParents']),
    urlParam: function() {
      // console.log(999,this.activeDepartment,this.onlyShowParents)
      if (!this.activeDepartment) {
        return null
      }
      var parents
      if (!this.activeDepartment.showParents) {
        parents = 'hide'
      } else if (this.onlyShowParents) {
        parents = 'only'
      } else {
        parents = 'all'
      }
      var children = this.activeDepartment.showChildren ? 'show' : 'hide'
      return {
        dept: this.activeDepartment.id,
        parents: parents,
        children: children
      }
    }
  },
  watch: {
    urlParam(qry) {
      this.setUrl(qry)
    }
  },
  mounted: function() {
    // console.log("xxxx",this.chart, this.activeDepartment, this.onlyShowParents)
    this.initStore()
    this.getUrl(this.$route.query)
  },
  methods: {
    ...mapActions([
      'initStore',
      'setActiveDepartmentById',
      'setHideParents',
      'setOnlyShowParents',
      'showChildren'
    ]),
    setUrl: function(qry) {
      // console.log(888,qry)
      this.$router.push({ path: this.$route.path, query: qry })
    },
    getUrl: function(qry) {
      if (qry && qry.dept) {
        this.setActiveDepartmentById(qry.dept)
        if (qry.parents == 'hide') {
          this.setHideParents(true)
        } else if (qry.parents == 'only') {
          this.setOnlyShowParents(true)
          this.setActiveDepartmentById(qry.dept)
        }
      }
      if (this.activeDepartment && qry.children == 'show') {
        this.showChildren(this.activeDepartment)
      }
      if (!this.activeDepartment) {
        this.$router.push({ path: this.$route.path, query: null })
      }
    }
  }
}
</script>

<style>

*:focus {
  outline: 0;
}
body {
  background-color: white;
  overflow: hidden;
}
.p-container{
  width:100%;
  height:100%;
}
</style>
