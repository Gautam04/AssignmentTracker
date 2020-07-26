<template>
    <div>
        <AssignmentTrackerHeader/>
        <form>
            <input id='Username'  v-model="name" placeholder="Enter username" type=""/><br>
            <input id = 'Roll' v-model="roll" placeholder="Roll Number" type="number"/><br>
            <input id = 'Email' v-model="email" placeholder="Email" type="email"/><br>
            <input id = 'Phone' v-model="phone" placeholder="Phone Number" type="number"/><br>
            <input id = 'Password' v-model="password" placeholder="Password" type="password"/><br>
            <input id = 'ConfPass' v-model="confpass"  placeholder="Confirm Password" type="password"/><br>
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
            name:'',
            roll:'',
            email:'',
            phone:'',
            password:'',
            confpass:''
        }
    },
    methods:{
        validateInputs()
        {
            if(this.name && this.roll && this.email && this.phone && this.password && this.confpass)
            {
                if(this.confpass!==this.password)
                    console.log("Password does not match")
                else
                {
                    axios.post('http://localhost:5050/register',{
                        name:this.name,
                        roll:this.roll,
                        email:this.email,
                        phone:this.phone,
                        password:this.password
                    }).then(res => {
                        console.log(res)
                        this.assignments=res.data
                    }).catch(err => console.log(err))  //TODO: Handle database insert errors here
                }
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