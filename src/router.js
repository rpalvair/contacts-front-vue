import { createRouter, createWebHistory } from "vue-router"
import NotFound from "./components/pages/NotFound.vue"
import ContactsList from "./components/pages/contact/ContactsList.vue"
import AddContact from "./components/pages/contact/AddContact.vue"
import EditContact from "./components/pages/contact/EditContact.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: ContactsList },
        { path: '/add-contact', component: AddContact },
        { path: '/edit-contact/:id', component: EditContact },
        { path: '/:notFound(.*)', component: NotFound }
    ]
})

export default router