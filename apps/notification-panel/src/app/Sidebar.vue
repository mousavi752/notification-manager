<template>
    <v-navigation-drawer location="right" v-model="drawer" permanent>
        <v-list density="compact" nav>
            <v-list-item v-for="(item, index) in items" :key="index" @click="selectTab(index)">
                <v-list-item :prepend-icon="item.icon" :title="item.title" :value="item.title"></v-list-item>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
  
<script>
export default {
    data() {
        return {
            drawer: true,
            mini: false,
            selectedTabIndex: 0,
            items: [
                { title: 'پیامک‌ها', icon: 'mdi-message', address: '/sms' },
                { title: 'الگو‌های پیامک‌', icon: 'mdi-notebook-multiple', address: '/sms-template' },
                { title: 'ایمیل‌ها', icon: 'mdi-email', address: '/email' },
                { title: 'سرویس دهنده‌ها', icon: 'mdi-server', address: '/provider' },
            ],
        };
    },
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
        selectTab(index) {
            this.selectedTabIndex = index;
            // Add logic to handle tab selection (e.g., navigate to the corresponding view)
            console.log('Selected tab:', this.items[index].address);
            this.$router.push(this.items[index].address);

        },
    },
};
</script>
  
<style scoped>
/* Add your custom styles here */
</style>