<template>
    <div>        
        <div v-bind:key="assignment.id" v-for="assignment in assignments">
            <ListItem v-bind:assignment="assignment" :flag='flag' v-on:markcompleted="handleMarkCompleted"/>
        </div>
    </div>
</template>

<script>

import ListItem from './listitem.vue'

export default {
    name:'AssignmentList',
    components:{
        ListItem
    },
    props:['assignments','flag'],
    methods:{
        handleMarkCompleted(id){
            this.$emit('completed',id);
        }
    }
}
</script>

<style scoped>

</style>