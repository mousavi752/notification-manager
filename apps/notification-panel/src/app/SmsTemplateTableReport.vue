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
          <v-form @submit.prevent="addNewRow" ref="myForm">
            <v-text-field
              v-for="(field, index) in formFields"
              :key="index"
              :label="field.label"
              v-model="newTemplate[field.model]"
            ></v-text-field>

            <v-select
              v-model="newTemplate.type"
              :items="['TEXTUAL', 'PATTERN']"
              label="نوع"
              :rules="[(v) => !!v || 'نوع is required']"
            ></v-select>

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
        { title: 'نام', value: 'name' },
        { title: 'کلید', value: 'key' },
        { title: 'متن پیام', value: 'message' },
        { title: 'نوع', value: 'type' },
      ],
      items: [],
      dialog: false,
      formFields: [
        { label: 'نام', model: 'name' },
        { label: 'کلید', model: 'key' },
        { label: 'متن پیام', model: 'message' },
      ],
      newTemplate: {
        name: '',
        key: '',
        message: '',
        type: '',
      },
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.clearNewTemplate();
    },
    clearNewTemplate() {
      this.newTemplate = {
        name: '',
        key: '',
        message: '',
        type: '',
      };
    },
    async fetchTemplates() {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/sms-template'
        );
        this.items = response.data;
      } catch (error) {
        console.error('Error fetching SMS templates:', error);
      }
    },
    async addNewRow() {
      if (!['TEXTUAL', 'PATTERN'].includes(this.newTemplate.type)) {
        alert('Invalid type. Must be TEXTUAL or PATTERN.');
        return;
      }

      try {
        const response = await axios.post(
          'http://localhost:3000/api/sms-template',
          this.newTemplate
        );
        window.location.reload();
      } catch (error) {
        console.error('Error adding new template:', error);
      }
    },
  },
  created() {
    this.fetchTemplates();
  },
};
</script>

<style scoped>
.rtl-table {
  direction: rtl;
  text-align: right;
}

.rtl-form {
  direction: rtl;
  text-align: right;
}
</style>
