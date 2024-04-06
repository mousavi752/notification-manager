import './styles.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { fa } from 'vuetify/locale';

import router from './router';

import { createApp } from 'vue';
import App from './app/App.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
  locale: {
    locale: 'fa',
    fallback: 'fa',
    messages: { fa },
    rtl: { fa: true },
  },
});

app.use(vuetify);

app.use(router);

app.mount('#root');
