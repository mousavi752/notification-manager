<template>
  <div>
    <v-btn color="blue" @click="openDialog">افزودن الگوی جدید</v-btn>

    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="20"
      class="elevation-1 rtl-table"
    >
    </v-data-table>

    <!-- Dialog for adding a new row -->
    <v-dialog v-model="dialog" max-width="600" direction="rtl">
      <v-card>
        <v-card-title>افزودن الگوی جدید</v-card-title>
        <v-card-text>
          <!-- Form for adding a new row -->
          <v-form @submit.prevent="addNewRow">
            <v-select
              v-model="newProvider.type"
              :items="['SMS', 'EMAIL']"
              label="نوع"
            ></v-select>
            <v-text-field v-model="newProvider.name" label="نام"></v-text-field>
            <v-text-field v-model="newProvider.key" label="کلید"></v-text-field>
            <v-checkbox
              v-model="newProvider.isActive"
              label="فعال"
            ></v-checkbox>
            <v-text-field
              v-model="newProvider.credentials.apiKey"
              label="API Key"
            ></v-text-field>
            <v-text-field
              v-model="newProvider.credentials.sender"
              label="فرستنده"
            ></v-text-field>

            <v-card-actions>
              <v-btn type="submit" color="primary">افزودن</v-btn>
              <v-btn @click="closeDialog">لغو</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      headers: [
        { title: 'شناسه', value: 'id' },
        { title: 'نوع', value: 'type' },
        { title: 'نام', value: 'name' },
        { title: 'کلید', value: 'key' },
        { title: 'فعال', value: 'isActive' },
        { title: 'اعتبارنامه', value: 'credentials' },
      ],
      items: [],
      dialog: false,
      newProvider: {
        type: '',
        name: '',
        key: '',
        isActive: false,
        credentials: {
          apiKey: '',
          sender: '',
        },
      },
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.clearNewProvider();
    },
    clearNewProvider() {
      this.newProvider = {
        type: '',
        name: '',
        key: '',
        isActive: false,
        credentials: {
          apiKey: '',
          sender: '',
        },
      };
    },
    async fetchProviders() {
      try {
        const response = await axios.get('http://localhost:3000/api/provider');
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    },
    async addNewRow() {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/provider',
          this.newProvider
        );
        this.items.push(response.data);
        this.closeDialog();
      } catch (error) {
        console.error('Error adding new provider:', error);
      }
    },
  },
  created() {
    this.fetchProviders();
  },
  computed: {
    formattedItems() {
      return this.items.map((item) => ({
        ...item,
        credentials: `API Key: ${item.credentials.apiKey}, Sender: ${item.credentials.sender}`,
      }));
    },
  },
};
</script>

<style scoped>
.rtl-table {
  direction: rtl;
  text-align: right;
}
</style>
