<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'App',
        mounted() {
            localStorage.command = 'd';
            document.getElementById('app').className = 'themed';
            document.getElementsByTagName("body")[0].className = 'themed';
        }
    }
</script>
<style scoped>

</style>
