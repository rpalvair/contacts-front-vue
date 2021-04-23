import { createRouter, createWebHistory } from "vue-router"
import NotFound from "./components/pages/NotFound.vue"
import ContactsList from "./components/pages/contact/ContactsList.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: ContactsList },
        { path: '/:notFound(.*)', component: NotFound }
    ]
})

export default router