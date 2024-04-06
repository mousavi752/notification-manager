<template>
    <v-btn color="blue" @click="openDialog">افزودن الگوی جدید</v-btn>

    <v-data-table :headers="headers" :items="items" :items-per-page="20" class="elevation-1 rtl-table">
        <template v-slot:item.actions="{ item }">
            <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
    </v-data-table>

    <!-- Dialog for adding a new row -->
    <v-dialog v-model="dialog" max-width="600" direction="rtl">
        <v-card>
            <v-card-title>افزودن الگوی جدید</v-card-title>
            <v-card-text>
                <!-- Form for adding a new row -->
                <v-form @submit.prevent="addNewRow">
                    <v-text-field v-model="newRow.id" label="شناسه"></v-text-field>
                    <v-text-field v-model="newRow.key" label="کلید"></v-text-field>
                    <v-text-field v-model="newRow.type" label="نوع"></v-text-field>
                    <v-text-field v-model="newRow.name" label="نام"></v-text-field>
                    <v-checkbox v-model="newRow.isActive" label="وضعیت فعال"></v-checkbox>

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
                { title: 'کلید', key: 'key' },
                { title: 'نوع', key: 'type' },
                { title: 'نام', key: 'name' },
                { title: 'وضعیت', key: 'isActive' },
                { title: 'عملیات', key: 'actions' },
            ],
            items: [
                { id: 1, key: 'key1', type: 'type1', name: 'name1', isActive: true },
                { id: 2, key: 'key2', type: 'type2', name: 'name2', isActive: false },
                // Add more rows as needed
            ],
            dialog: false,
            newRow: {
                id: '',
                key: '',
                type: '',
                name: '',
                isActive: false,
            },
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
            this.newRow = {
                id: '',
                key: '',
                type: '',
                name: '',
                isActive: false,
            };
        },
        addNewRow() {
            // Add your logic to add the new row to the table
            this.items.push({ ...this.newRow });
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
  