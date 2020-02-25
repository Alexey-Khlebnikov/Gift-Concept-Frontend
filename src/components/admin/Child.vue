<template>
    <div style="display: flex; justify-content: space-between; width: 100%;">
        <vs-button radius color="warning" type="filled" icon-pack="feather" icon="icon-archive"></vs-button>
        <vs-button disabled color="primary" type="border" icon-pack="feather" icon="icon-search"></vs-button>
        <vs-button radius color="danger" type="gradient" icon-pack="feather" @click="deleteUser" icon="icon-user-plus">
        </vs-button>
    </div>
</template>

<script>
    import Vue from "vue";

    export default Vue.extend({
        methods: {
            deleteUser() {
                console.log(this.params);
            }
        }
    });
</script>