<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3">
        <div class="buttons">
          <router-link to="/add-contact" class="btn btn-primary">
            Add new contact
          </router-link>
          <!-- <a href="#" class="btn btn-primary" [routerLink]="['/contact/add-contact']"></a> -->
        </div>
      </div>
      <div class="col-lg-6">
        <div
          v-for="contact in contacts"
          :key="contact.id"
          class="card"
          style="width: 18rem"
        >
          <div class="card-body">
            <h5 class="card-title">
              {{ contact.firstName }} {{ contact.lastName }}
            </h5>
            <h6 class="card-subtitle mb-2 text-muted">
              {{ contact.age }} years old
            </h6>
            <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a> -->
            <div class="actions">
              <fa-icon
                icon="trash"
                class="delete-icon"
                @click="deleteContact(contact)"
              ></fa-icon>
              <router-link to="/edit-contact" class="icon-link">
                <fa-icon icon="edit"></fa-icon>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../../config";
export default {
  data() {
    return {
      contacts: [{ firstName: "Ruddy", lastName: "Palvair", age: 35 }],
    };
  },
  methods: {
    deleteContact(contact) {
      console.log("delete contact", contact);
    },
  },
  created() {
    fetch(config.endpoints.contacts.read).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log("data", data);
          this.contacts = data;
        });
      }
    });
  },
};
</script>
<style scoped>
.buttons {
  margin-top: 20px;
}

.delete-icon {
  cursor: pointer;
}
.icon-link {
  margin-left: 10px;
  color: black;
}
.icon-link:hover {
  color: black;
}
</style>