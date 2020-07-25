<template>
    <div>
        <AssignmentTrackerHeader/>
        <form>
            <input id='Username' placeholder="Enter username" type=""/><br>
            <input id = 'Email' placeholder="Email" type="email"/><br>
            <input id = 'Phone' placeholder="Phone Number" type="number"/><br>
            <input id = 'Password' placeholder="Password" type="password"/><br>
            <input id = 'ConfPass' placeholder="Confirm Password" type="password"/><br>
            <button>Submit</button>
        </form>
    </div>
</template>

<script>

import AssignmentTrackerHeader from '../components/assignmentTrackerHeader.vue'

export default {
    name:'Register',
    components:{
        AssignmentTrackerHeader
    }
}
</script>

<style scoped>
    input{
        padding: 1%;
        width: 50%;
        
    }
    
    button{
    background: purple;
    color: white;
    padding: 0.5% 0.5%;
    width:inherit;
    
}

button:hover{
    background: whitesmoke;
    color: purple;
    border-color: purple;
}
</style>