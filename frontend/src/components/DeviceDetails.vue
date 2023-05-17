<template>
  <div v-if="currentDevice.id" class="edit-form">
    <h4>Device</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentDevice.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentDevice.description"
        />
      </div>

      <div class="form-group">
        <label for="price">Price</label>
        <input
          class="form-control"
          id="price"
          required
          v-model="currentDevice.price"
          name="price"
        />
      </div>

      <div class="form-group">
        <label for="brand">Brand</label>
        <input
          class="form-control"
          id="brand"
          required
          v-model="currentDevice.brand"
          name="brand"
        />
      </div>

      <div class="form-group">
        <label for="condition">Condition</label>
        <input
          class="form-control"
          id="condition"
          required
          v-model="currentDevice.condition"
          name="condition"
        />
      </div>

      <div class="form-group">
        <label for="available">Available</label>
        <input
          class="form-control"
          id="available"
          required
          v-model="currentDevice.available"
          name="available"
        />
      </div>

      <div class="form-group">
        <label for="in_stock">In stock</label>
        <input
          class="form-control"
          id="in_stock"
          required
          v-model="currentDevice.in_stock"
          name="in_stock"
        />
      </div>
      
      <div class="form-group">
        <label for="warranty">Warranty</label>
        <input
          class="form-control"
          id="warranty"
          required
          v-model="currentDevice.warranty"
          name="warranty"
        />
      </div>

      <div class="form-group">
        <label for="delivery_options">Delivery Options</label>
        <input
          class="form-control"
          id="delivery_options"
          required
          v-model="currentDevice.delivery_options"
          name="delivery_options"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentDevice.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentDevice.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteDevice">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateDevice">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Device...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DeviceDataService from "@/services/DeviceDataService";
import Device from "@/types/Device";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "device",
  data() {
    return {
      currentDevice: {} as Device,
      message: "",
    };
  },
  methods: {
    getDevice(id: any) {
      DeviceDataService.get(id)
        .then((response: ResponseData) => {
          this.currentDevice = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updatePublished(status: boolean) {
      let data = {
        id: this.currentDevice.id,
        title: this.currentDevice.title,
        description: this.currentDevice.description,
        price: this.currentDevice.price,
        brand: this.currentDevice.brand,
        condition: this.currentDevice.condition,
        available: this.currentDevice.available,
        in_stock: this.currentDevice.in_stock,
        warranty: this.currentDevice.warranty,
        delivery_options: this.currentDevice.delivery_options,
        published: status,
      };

      DeviceDataService.update(this.currentDevice.id, data)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.currentDevice.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    updateDevice() {
      DeviceDataService.update(this.currentDevice.id, this.currentDevice)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.message = "The device was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    deleteDevice() {
      DeviceDataService.delete(this.currentDevice.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          this.$router.push({ name: "devices" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getDevice(this.$route.params.id);
  },
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
