<template>
    <div id='ListItem'>
        <span><b>{{assignment.id}}.</b>   {{assignment.name}}</span>
        <!-- <input type="checkbox" id='completed'/>       -->
        <button  v-if=" flag" v-on:click="$emit('markcompleted',assignment.id)">Mark as completed</button>  
    </div>
</template>

<script>
export default {
    name:'ListItem',
    props:['assignment','flag']  
}
</script>

<style scoped>
#ListItem{
    background-color: whitesmoke;
    color:black;
    border-style: solid;
    padding: 2%;
    text-align: left;
}

button{
    float:right;
    background: purple;
    color: white;
    padding: 0.5% 0.5%;
    
}

button:hover{
    background: whitesmoke;
    color: purple;
    border-color: purple;
}

</style>