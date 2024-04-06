<template>
    <v-btn color="blue" @click="openDialog">افزودن الگوی جدید</v-btn>

    <v-data-table :headers="headers" :items="items" :items-per-page="20" class="elevation-1 rtl-table">
    </v-data-table>

    <!-- Dialog for adding a new row -->
    <v-dialog v-model="dialog" max-width="600" direction="rtl">
        <v-card>
            <v-card-title>افزودن الگوی جدید</v-card-title>
            <v-card-text>
                <!-- Form for adding a new row -->
                <v-form @submit.prevent="addNewRow" ref="myForm">

                    <v-text-field v-for="(field, index) in formFields" :key="index" :label="field.label"
                        :v-model="field.model"></v-text-field>

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
export default {
    data() {
        return {
            headers: [
                { title: 'شناسه', key: 'id' },
                { title: 'نام', key: 'name' },
                { title: 'کلید', key: 'key' },
                { title: 'متن پیام', key: 'message' },
                { title: 'نوع', key: 'type' },
            ],
            items: [
                { id: 1, name: 'رمز عبور', message: 'رمز عبور شما %token1 می‌باشد.', key: 'OTP', type: 'TEXTUAL' },
                { id: 2, name: 'سفارش جدید', message: '', key: 'NEW_ORDER', type: 'PATTERN' },
                // Add more rows as needed
            ],
            dialog: false,
            formFields: [
                { label: 'نام', model: 'name' },
                { label: 'کلید', model: 'key' },
                { label: 'متن پیام', model: 'message' },
                { label: 'نوع', model: 'type' },
            ],
            tableData: [],
        };
    },
    methods: {
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
            this.clearNewRow();
        },
        clearNewRow() {
        },
        addNewRow() {
            // const newRow = {};
            // this.formFields.forEach(field => {
            //     newRow[field.model] = ''; // Initialize each field with an empty string
            // });
            // this.tableData.push(newRow);
            // const formData = {};
            // this.formFields.forEach(field => {
            //     formData[field.model] = this.$refs.myForm[field.model];
            // });
            // console.log('Form Data:', formData);
            // // For demonstration purposes, add the form data to the table
            // this.tableData.push({ ...formData });

            this.closeDialog();

        },
        editItem(item) {
            // Add your edit logic here
            console.log('Editing item:', item);
        },
        deleteItem(item) {
            // Add your delete logic here
            console.log('Deleting item:', item);
            // Remove the item from the items array to reflect the deletion in the table
            const index = this.items.indexOf(item);
            if (index !== -1) {
                this.items.splice(index, 1);
            }
        },
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
  