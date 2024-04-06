<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card>
                    <v-card-title class="text-center">ورود</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="login">
                            <v-text-field v-model="username" label="نام کاربری" required></v-text-field>
                            <v-text-field v-model="password" label="رمز عبور" type="password" required></v-text-field>
                            <v-btn type="submit" color="primary">ورود</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        login() {
            // Add your login logic here
            console.log('Logging in with:', this.username, this.password);

            this.$router.push('/dashboard');
        },
    },
};
</script>
  
<style scoped>
/* Add your custom styles here */
</style>