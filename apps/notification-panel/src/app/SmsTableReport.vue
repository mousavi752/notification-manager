<template>
    <v-btn color="blue" @click="openDialog">ارسال پیام جدید</v-btn>

    <v-data-table :headers="headers" :items="items" :items-per-page="20" class="elevation-1 rtl-table">
    </v-data-table>

    <v-dialog v-model="dialog" max-width="600" direction="rtl">
        <v-card>
            <v-card-title>ارسال پیام جدید</v-card-title>
            <v-card-text>
                <v-form @submit.prevent="sendNotification">
                    <v-text-field v-model="row.receiver" label="گیرنده"></v-text-field>
                    <v-text-field v-model="row.messages" label="توکن‌ها"></v-text-field>
                    <v-text-field v-model="row.smsTemplate" label="الگوی ارسال"></v-text-field>

                    <v-card-actions>
                        <v-btn type="submit" color="primary">افزودن</v-btn>
                        <v-btn @click="closeDialog">لغو</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
  
<script>
import axios from 'axios';
import moment from 'jalali-moment';

export default {
    data() {
        return {
            headers: [
                { title: 'شناسه', key: 'id' },
                { title: 'گیرنده', key: 'receiver' },
                { title: 'توکن‌ها', key: 'messages' },
                { title: 'وضعیت', key: 'status' },
                { title: 'الگوی ارسال', key: 'smsTemplate' },
                { title: 'تاریخ', key: 'date' },
            ],
            items: [],
            dialog: false,
            row: {
                receiver: '',
                messages: '',
                smsTemplate: '',
            }
        };
    },
    methods: {
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
            this.clearrow();
        },
        clearrow() {
            this.row = {
                receiver: 'sas',
                messages: '',
                smsTemplate: '',
            };
        },

        async sendNotification() {
            await axios.post('http://localhost:3000/api/notification/sms', {
                receiver: this.row.receiver,
                template: this.row.smsTemplate,
                messages: this.row.messages.split(',').map(msg => msg.trim()) // Assuming messages are comma-separated
            }, {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            })
            window.location.reload();
        },

        async fetchNotifications() {
            const response = await axios.get('http://localhost:3000/api/notification/notification?type=SMS', {
                headers: {
                    'accept': '*/*'
                }
            })

            this.items = response.data.map(notification => {
                return {
                    id: notification.id,
                    receiver: notification.sms.receiver,
                    messages: this.extractMessage(notification.sms.messages),
                    status: notification.sms.status,
                    smsTemplate: notification.sms.smsTemplate.name,
                    date: this.convertToJalali(notification.createdAt)
                }
            });

        },
        extractMessage(messages) {
            return messages.reduce((p, c, i) => p + c + (i < messages.length - 1 ? ', ' : ''), '')
        },
        convertToJalali(isoDate) {
            // Parse the ISO date string
            const date = moment(isoDate);

            // Convert to Jalali date
            const jalaliDate = date.format('jYYYY/jMM/jDD HH:mm:ss');

            return jalaliDate;
        }

    },
    created() {
        this.fetchNotifications();
    }
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
  