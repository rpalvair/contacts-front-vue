<template>
  <h3>Add contact</h3>
  <div class="row">
    <div class="col-lg-4 p-5">
      <form @submit.prevent="onSubmit">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="firstName"
            >Firstname</label
          >
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
          class="btn btn-primary mb-2"
        >
          Create contact
        </button>
      </form>
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
      };
      console.log("Contact to create", contact);
      fetch(config.endpoints.contacts.create, {
        method: "POST",
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
      this.formIsValid = true;
      if (this.firstName === "") {
        this.formIsValid = false;
      } else if (this.lastName === "") {
        this.formIsValid = false;
      } else if (this.age == null || this.age === "" || this.age <= 0) {
        this.formIsValid = false;
      }
    },
  },
  watch: {
    firstName() {
      this.validateForm();
    },
    lastName() {
      this.validateForm();
    },
    age() {
      this.validateForm();
    },
  },
};
</script>