<template lang='pug'>
    .file(v-on:click='editMenuOpen = !editMenuOpen')
      i.material-icons.screenshot(v-on:click="" title='Load/Save') save
      .file_menu(v-if='editMenuOpen')
          ul
            li 
              label.file_select(v-on:click="editMenuOpen=!editMenuOpen") Import excel
                input(type="file" v-on:change="importData")
            li(v-on:click="doExportXls") Export excel
            li(v-on:click="generateInputFile") Generate inputfile

</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

import {mapGetters} from 'vuex'
export default {
  data: function() {
    return {
      editMenuOpen: false
    }
  },
  computed: {
    ...mapGetters(['chart', 'people', 'assignments', 'editMode', 'config'])
  },
  watch: {
    editMode: function(val) {
      if (!val) {
        this.editMenuOpen = false
      }
    }
  },
  methods: {
    generateInputFile: function() {
      var chartTable = this.tree2arrayJSON(this.chart, [])
      var today = new Date()
      var dd = today.getDate()
      var mm = today.getMonth() + 1 //January is 0!
      var yyyy = today.getFullYear()

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }
      var updated = '"' + dd + '-' + mm + '-' + yyyy + '"'

      var json =
        'var INPUT_DATA=' +
        JSON.stringify({
          chart: chartTable,
          people: this.people,
          assignments: this.assignments
        }) +
        ';var UPDATED_ON=' +
        updated
      var blob = new Blob([json], { type: 'text/plain;charset=utf-8' })
      FileSaver.saveAs(blob, 'data.js')
    },
    importData: function(infile) {
      var f = infile.target.files[0]
      var reader = new FileReader()
      var that = this
      reader.onload = function(e) {
        var data = e.target.result
        var workbook = XLSX.read(data, { type: 'binary' })
        var chartdata = XLSX.utils.sheet_to_json(workbook.Sheets['chart'], {
          defval: ''
        })
        var people = XLSX.utils.sheet_to_json(workbook.Sheets['people'], {
          defval: ''
        })
        var assignments = XLSX.utils.sheet_to_json(
          workbook.Sheets['assignment'],
          {
            defval: ''
          }
        )
        var newchart = []

        chartdata.forEach(x => {
          var manager = people.find(p => p.id == x.manager_id)
          var dataFields = []
          for (var property in x) {
            if (x.hasOwnProperty(property)) {
              if (property.indexOf('DATA_') === 0) {
                var name = property.substring(5).replace(/_/g, ' ')
                var fnd = that.config.dataFields.find(d => d.name === name)
                var type = fnd ? fnd.type : ''
                dataFields.push({ name: name, value: x[property], type })
              }
            }
          }
          newchart.push({
            showChildren: false,
            parent: null,
            parentId: x.parent_id,
            children: null,
            isStaff: x.staff_department === 'Y' ? true : false,
            id: x.id,
            name: x.name,
            description: x.description,
            manager: manager ? manager : { name: '' },
            dataFields: dataFields
          })
        })
        that.$store.commit('createTree', newchart)
        that.$store.commit('setPeople', people)
        that.$store.commit('setAssignments', assignments)
        alert('Data is imported')
      }
      reader.readAsBinaryString(f)
    },
    doExportXls: function(a) {
      var chartTable = this.tree2array(this.chart, [])
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(chartTable),
        'chart'
      )
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(this.people),
        'people'
      )
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(this.assignments),
        'assignment'
      )
      XLSX.writeFile(wb, 'chart_data.xlsx')
    },
    tree2array(chart, array) {
      var dataFields = chart.dataFields.reduce(function(acc, cur, i) {
        var name = 'DATA_' + cur.name.replace(/ /g, '_')
        acc[name] = cur.value
        return acc
      }, {})
      console.log(chart.dataFields, dataFields)
      array.push({
        id: chart.id,
        name: chart.name,
        description: chart.description,
        parent_id: chart.parent ? chart.parent.id : '',
        staff_department: chart.isStaff ? 'Y' : 'N',
        manager_id: chart.manager.id,
        ...dataFields
      })
      chart.children.forEach(child => this.tree2array(child, array))
      return array
    },

    tree2arrayJSON(chart, array) {
      array.push({
        id: chart.id,
        name: chart.name,
        description: chart.description,
        parent_id: chart.parent ? chart.parent.id : '',
        staff_department: chart.isStaff ? 'Y' : 'N',
        manager_id: chart.manager.id,
        dataFields: chart.dataFields
      })
      chart.children.forEach(child => this.tree2arrayJSON(child, array))
      return array
    }
  }
}
</script>

<style scoped>
.file {
  display: inline-block;
  position: relative;
}
.file {
  display: inline-block;
  box-sizing: content-box;
  position: absolute;
  top: 10px;
  left: 130px;
}
.screenshot {
  cursor: pointer;
  color: white;
}
.screenshot:hover {
  border: 1px solid white;
}

.file_select,
.file {
  cursor: pointer;
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
  top: 35px;
  width: 150px;
  border: 1px solid grey;
  border-top: 1px solid white;
}
ul {
  list-style: none;
  padding: 5px;
  text-align: left;
}

li:hover {
  background: lightblue;
  cursor: pointer;
  color: black;
}
</style>
