<template>
  <div id="app">
    <DashboardHeader v-bind:person="person"/>
    <AssignmentList v-bind:assignments='assignments' v-on:completed="deleteAssignment"/>
  </div>
</template>

<script>

import DashboardHeader from './components/dashboardheader.vue';
import AssignmentList from './components/assignmentlist.vue'

export default {
  name: 'App',
  data(){
        return {
            person:{
              name:'Gaurav',
              roll:8,
            },
             assignments:[{
                        id:1,
                        name:'SHM',
                        subject:'Physics'
                    },{
                         id:2,
                        name:'Integration',
                        subject:'Mathematics'
                    }]
        }
    },
  components: {
    DashboardHeader,
    AssignmentList 
  },
  methods:{
    deleteAssignment(id){
      this.assignments=this.assignments.filter((assignment)=>{
        return assignment.id!==id;
      })
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
