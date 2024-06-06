<script setup lang="ts">
import SidebarVue from '../app/Sidebar.vue';
import EmailTableReport from '../app/EmailTableReport.vue';

</script>

<template>
    <v-app>

        <v-layout>
            <v-container fluid>
                <v-row>
                    <v-col cols="2">
                        <SidebarVue />
                    </v-col>
                    <v-col cols="8">
                    <EmailTableReport />
                    </v-col>
                </v-row>
            </v-container>

        </v-layout>

    </v-app>
</template>
