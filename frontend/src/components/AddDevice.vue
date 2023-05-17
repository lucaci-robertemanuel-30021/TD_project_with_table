<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="device.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="device.description"
          name="description"
        />
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
          class="form-control"
          id="price"
          required
          v-model="device.price"
          name="price"
        />
      </div>

      <div class="form-group">
        <label for="brand">Brand</label>
        <input
          class="form-control"
          id="brand"
          required
          v-model="device.brand"
          name="brand"
        />
      </div>

      <div class="form-group">
        <label for="condition">Condition</label>
        <input
          class="form-control"
          id="condition"
          required
          v-model="device.condition"
          name="condition"
        />
      </div>

      <div class="form-group">
        <label for="available">Available</label>
        <input
          class="form-control"
          id="available"
          required
          v-model="device.available"
          name="available"
        />
      </div>

      <div class="form-group">
        <label for="in_stock">In stock</label>
        <input
          class="form-control"
          id="in_stock"
          required
          v-model="device.in_stock"
          name="in_stock"
        />
      </div>
      
      <div class="form-group">
        <label for="warranty">Warranty</label>
        <input
          class="form-control"
          id="warranty"
          required
          v-model="device.warranty"
          name="warranty"
        />
      </div>

      <div class="form-group">
        <label for="delivery_options">Delivery Options</label>
        <input
          class="form-control"
          id="delivery_options"
          required
          v-model="device.delivery_options"
          name="delivery_options"
        />
      </div>

      <button @click="saveDevice" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newDevice">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DeviceDataService from "@/services/DeviceDataService";
import Device from "@/types/Device";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "add-device",
  data() {
    return {
      device: {
        id: null,
        title: "",
        description: "",
        price: "",
        brand: "",
        condition: "",
        available: "",
        in_stock: "",
        warranty: "",
        delivery_options: "",
        published: false,
      } as Device,
      submitted: false,
    };
  },
  methods: {
    saveDevice() {
      let data = {
        title: this.device.title,
        description: this.device.description,
        price: this.device.price,
        brand: this.device.brand,
        condition: this.device.condition,
        available: this.device.available,
        in_stock: this.device.in_stock,
        warranty: this.device.warranty,
        delivery_options: this.device.delivery_options,
    
      };

      DeviceDataService.create(data)
        .then((response: ResponseData) => {
          this.device.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    newDevice() {
      this.submitted = false;
      this.device = {} as Device;
    },
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
