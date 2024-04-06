<script setup lang="ts">
import ProviderTableReport from '../app/ProviderTableReport.vue';
import SidebarVue from '../app/Sidebar.vue';

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
                        <ProviderTableReport />
                    </v-col>
                </v-row>
            </v-container>

        </v-layout>

    </v-app>
</template>
