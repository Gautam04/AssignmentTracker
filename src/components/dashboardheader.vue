<template>
    <div id='dashboard'>
        <h1>Hello {{person.name}}</h1>
        <h3>Roll Number: {{person.roll}}</h3>
    </div>
</template>
    
<script>
export default {
    name:'DashboardHeader',
    props:['person']
}
</script>

<style scoped>
#dashboard{
    background-color: purple;
    color:whitesmoke;
    padding: 1%;
    text-align: left;
}
</style>