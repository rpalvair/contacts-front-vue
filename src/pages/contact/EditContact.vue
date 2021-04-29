<template>
  <div class="container">
    <h3>Edit contact</h3>
    <div class="row">
      <div class="col-lg-6 p-5">
        <form @submit.prevent="onSubmit">
          <div class="form-group row">
            <label class="col-sm-2 col-form-label" for="firstName">Firstname</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="firstName"
                v-model.trim="firstName"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label" for="lastName">Lastname</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="lastName"
                v-model.trim="lastName"
              />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label" for="age">Age</label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="age"
                v-model.number="age"
              />
            </div>
          </div>
          <button
            type="submit"
            :disabled="!formIsValid"
            class="btn btn-primary mb-2">
            Save modifications
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../config";
export default {
  data() {
    return {
      formIsValid: false,
      firstName: "",
      lastName: "",
      age: null,
      id: null,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit");
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const contact = {
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        id: this.id,
      };
      console.log("Contact to edit", contact);
      fetch(config.endpoints.contacts.edit, {
        method: "PUT",
        body: JSON.stringify(contact),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        console.log("response", response);
        if (response.ok) {
          this.$router.replace("/");
        }
      });
    },
    validateForm() {
      console.log("validateForm");
      if (this.firstName === "") {
        this.formIsValid = false;
      } else if (this.lastName === "") {
        this.formIsValid = false;
      } else if (this.age == null || this.age === "" || this.age <= 0) {
        this.formIsValid = false;
      } else {
        this.formIsValid = true;
      }
    },
  },
  watch: {
    firstName(_, old) {
      if (old) {
        this.validateForm();
      }
    },
    lastName(_, old) {
      if (old) {
        this.validateForm();
      }
    },
    age(_, old) {
      if (old) {
        this.validateForm();
      }
    },
  },
  created() {
    const id = this.$route.params.id;
    console.log("id", id);
    fetch(config.endpoints.contacts.read + "/" + id).then((response) => {
      response.json().then((data) => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.age = data.age;
        this.id = data.id;
      });
    });
  },
};
</script>