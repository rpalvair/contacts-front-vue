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
              :class="{ 'is-invalid': !firstName.isValid && showValidations }"
              id="firstName"
              v-model.trim="firstName.value"
              @change="updateValidity('firstName')"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label" for="lastName">Lastname</label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': !lastName.isValid && showValidations }"
              id="lastName"
              v-model.trim="lastName.value"
              @change="updateValidity('lastName')"
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
              :class="{ 'is-invalid': !age.isValid && showValidations }"
              v-model.number="age.value"
              @change="updateValidity('age')"
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
import config from "../../../config";
export default {
  data() {
    return {
      formIsValid: false,
      showValidations: false,
      firstName: {
        isValid: true,
        value: "",
      },
      lastName: {
        isValid: true,
        value: "",
      },
      age: {
        isValid: true,
        value: null,
      },
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
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        age: this.age.value,
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
      this.formIsValid = true;
      if (this.firstName.value === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      } else {
        this.firstName.isValid = true;
      }
      if (this.lastName.value === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      } else {
        this.lastName.isValid = true;
      }
      if (
        this.age.value == null ||
        this.age.value === "" ||
        this.age.value <= 0
      ) {
        this.age.isValid = false;
        this.formIsValid = false;
      } else {
        this.age.isValid = true;
      }
    },
    updateValidity() {
      this.validateForm();
      this.showValidations = true;
    },
  },
};
</script>