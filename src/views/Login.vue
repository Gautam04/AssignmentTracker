<template>
    <div>
        <AssignmentTrackerHeader/>
        <form>
            <input id='Roll'  v-model="roll" placeholder="Enter Roll" type="number"/><br>
            <input id = 'Password' v-model="password" placeholder="Password" type="password"/><br>
            <button v-on:click="validateInputs">Submit</button>
        </form>
    </div>
</template>

<script>

import AssignmentTrackerHeader from '../components/assignmentTrackerHeader.vue'
import axios from 'axios'


export default {
    name:'Register',
    components:{
        AssignmentTrackerHeader
    },
    data(){
        return {
            roll:'',
            password:''  
        }
    },
    methods:{
        validateInputs()
        {
    
            if(this.roll && this.password)
            {
                    axios.post('http://localhost:5050/login',{
                        roll:this.roll,
                        password:this.password,
                    }).then(res => {
                        console.log(res)
                        console.log(document.cookie)
                        
                        // this.$router.push("/")
                    }).catch(err => console.log(err))  //TODO: Handle database insert errors here
                
            }
            else
            console.log("Fill all fields first")
        }
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