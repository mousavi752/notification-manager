<template>
  <div>
    <v-btn color="blue" @click="openDialog">ارسال ایمیل جدید</v-btn>

    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="20"
      class="elevation-1 rtl-table"
    >
    </v-data-table>

    <v-dialog v-model="dialog" max-width="600" direction="rtl">
      <v-card>
        <v-card-title>ارسال ایمیل جدید</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="sendEmail">
            <v-text-field
              v-model="emailForm.sender"
              label="فرستنده"
            ></v-text-field>
            <v-text-field
              v-model="emailForm.receiver"
              label="گیرنده"
            ></v-text-field>
            <v-text-field
              v-model="emailForm.subject"
              label="موضوع"
            ></v-text-field>
            <v-textarea v-model="emailForm.message" label="پیام"></v-textarea>
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
import moment from 'jalali-moment';

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { title: 'شناسه', value: 'id' },
        { title: 'فرستنده', value: 'sender' },
        { title: 'گیرنده', value: 'receiver' },
        { title: 'موضوع', value: 'subject' },
        { title: 'پیام', value: 'message' },
        { title: 'وضعیت', value: 'status' },
        { title: 'تاریخ ایجاد', value: 'createdAt' },
      ],
      items: [],
      emailForm: {
        sender: '',
        receiver: '',
        subject: '',
        message: '',
      },
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    async sendEmail() {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/notification/email',
          {
            receiver: this.emailForm.receiver,
            sender: this.emailForm.sender,
            subject: this.emailForm.subject,
            message: this.emailForm.message,
          }
        );
        window.location.reload();
      } catch (error) {
        console.error('Error sending email:', error);
      }
    },
    async fetchEmails() {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/notification/notification?type=EMAIL'
        );
        this.items = response.data.map((notification) => {
          const { id, createdAt } = notification;
          const { sender, receiver, subject, message, status } =
            notification.email;
          return {
            id,
            sender,
            receiver,
            subject,
            message,
            status,
            createdAt: this.convertToJalali(notification.createdAt),
          };
        });
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    },
    convertToJalali(isoDate) {
      // Parse the ISO date string
      const date = moment(isoDate);

      // Convert to Jalali date
      const jalaliDate = date.format('jYYYY/jMM/jDD HH:mm:ss');

      return jalaliDate;
    },
  },
  created() {
    this.fetchEmails();
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
