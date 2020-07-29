<template>
    <div id='logout'>
        <span><a href="http://localhost:8080/#/login">Logout</a> | <a v-bind:href="hrefvalue">{{pendingOrCompleted}}</a></span>
    </div>
</template>

<script>
export default {
    name:'Logout',
    props:['flag'],
    data(){
        return {
            pendingOrCompleted:'',
            hrefvalue:''
        }
    },
    created(){
        if(this.flag)
        {
            this.pendingOrCompleted='Completed'
            this.hrefvalue = 'http://localhost:8080/#/completed'
        }
        else
        {
             this.pendingOrCompleted='Pending'
            this.hrefvalue = 'http://localhost:8080/#/'
        }
    }
}
</script>

<style scoped>
a{
    color: whitesmoke;
}
</style>