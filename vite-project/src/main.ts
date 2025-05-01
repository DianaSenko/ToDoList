import { createApp } from 'vue'

import './style.css'



import 'vuetify/styles'

import {createPinia} from 'pinia'
import { createVuetify } from 'vuetify'


import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './routes/routes'
const pinia = createPinia()
const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
    },
  })





const app = createApp(App)

app.use(pinia)
app.use(vuetify)
app.use(router)
app.mount('#app')
