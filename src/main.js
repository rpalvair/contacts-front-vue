import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash)
library.add(faEdit)

const app = createApp(App)
app.use(router)
app.component('fa-icon', FontAwesomeIcon)
app.mount('#app')
