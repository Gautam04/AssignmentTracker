<template>
    <div id='dashboard'>
        <h1>Hello {{person.name}}</h1>
        <h3>Roll Number: {{person.roll}}</h3>
        <Logout id="logoutheader" v-bind:flag="flag"/>
    </div>
</template>
    
<script>

import Logout from '../components/logout.vue'

export default {
    name:'DashboardHeader',
    props:['person','flag'],
    components:{
        Logout
    }
}
</script>

<style scoped>
#dashboard{
    background-color: purple;
    color:whitesmoke;
    padding: 1%;
    text-align: left;
}

#logoutheader{
    position: relative;
}

</style>