<template>
  <div id="app">
    <DashboardHeader v-bind:person="person"/>
    <AssignmentList v-bind:assignments='assignments' v-on:completed="deleteAssignment"/>
  </div>
</template>

<script>

import DashboardHeader from '../components/dashboardheader.vue';
import AssignmentList from '../components/assignmentlist.vue'
import axios from 'axios'


export default {
  name: 'Home',

  data(){
        return {
            person:{
              name:'Gaurav',
              roll:25,
            },
            // assignments:[]
             assignments:[]
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
      axios.post('http://localhost:5050/markcomplete',{
    
          roll: this.person.roll,
          assignment_id:id
      }).then((res)=>{
        console.log(res)
      }).catch((err)=>console.log(err))

    },
  },
  created(){
      axios.get('http://localhost:5050/getAssignmentList?roll=25').then(res => {
        console.log(res)
        this.assignments=res.data
        }).catch(err => console.log(err))  
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
