<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search by title
          </button>
        </div>
      </div>
    </div>

  <!-- <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by condition"
          v-model="condition"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
           @click="searchCondition"
          >
            Search by condition
          </button>
        </div>
      </div>
    </div>  -->
 
    
    <div class="col-md-6">

      <h4>Devices shop quick view</h4>
      <v-table class="tablee">
    <thead>
      <tr>
        <th style="color: blueviolet;">
          Name
        </th>
        <th style="color: blueviolet">
          Description
        </th>
        <th style="color: blueviolet;" >
          Price
        </th>
        <th style="color: blueviolet">
          Brand
        </th>
        <th style="color: blueviolet">
          Condition
        </th>
        <th style="color: blueviolet">
          Available
        </th>
        <th style="color: blueviolet">
          Stock?
        </th>
        <th style="color: blueviolet">
          Warranty
        </th>
        <th style="color: blueviolet">
          Delivery options
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="device in devices"
        :key="device.title"
      >
        <td>
          <div style="width: 100px"></div>
          {{ device.title }}</td>
        <td>
          <div style="width: 500px"></div>
          {{ device.description }}</td>
        <td>
          <div style="width: 60px"></div>
          {{ device.price }}</td>
        <td>
          <div style="width: 80px"></div>
          {{ device.brand }}</td>
        <td>
          <div style="width: 90px"></div>
          {{ device.condition }}</td>
        <td>
          <div style="width: 100px"></div>
          {{ device.available }}</td>
        <td>
          <div style="width: 60px"></div>
          {{ device.in_stock }}</td>
        <td>
          <div style="width: 80px"></div>
          {{ device.warranty }}</td>
        <td>{{ device.delivery_options }}</td>
      </tr>
    </tbody>
  </v-table>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllDevices">
        Remove All
      </button>
      
      <h4>Dev modify products list</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(device, index) in devices"
          :key="index"
          @click="setActiveDevice(device, index)"
        >
          {{ device.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-10">
      <div v-if="currentDevice.id">
        <h4>Device</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentDevice.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentDevice.description }}
        </div>
        <div>
          <label><strong>Price:</strong></label>
          {{ currentDevice.price }}
        </div>
        <div>
          <label><strong>Brand:</strong></label>
          {{ currentDevice.brand }}
        </div>
        <div>
          <label><strong>Condition:</strong></label>
          {{ currentDevice.condition }}
        </div>
        <div>
          <label><strong>Available:</strong></label>
          {{ currentDevice.available }}
        </div>
        <div>
          <label><strong>In stock:</strong></label>
          {{ currentDevice.in_stock }}
        </div>
        <div>
          <label><strong>Warranty:</strong></label>
          {{ currentDevice.warranty }}
        </div>
        <div>
          <label><strong>Delivery options:</strong></label>
          {{ currentDevice.delivery_options }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentDevice.published ? "Published" : "Pending" }}
        </div>

        <router-link
          :to="'/devices/' + currentDevice.id"
          class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Click on a device for more options</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import DeviceDataService from "@/services/DeviceDataService";
import Device from "@/types/Device";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "devices-list",
  data() {
    return {
      devices: [] as Device[],
      currentDevice: {} as Device,
      currentIndex: -1,
      title: "",
      // condition:"",
    };
  },
  methods: {
    retrieveDevices() {
      DeviceDataService.getAll()
        .then((response: ResponseData) => {
          this.devices = response.data;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveDevices();
      this.currentDevice = {} as Device;
      this.currentIndex = -1;
    },

    setActiveDevice(device: Device, index = -1) {
      this.currentDevice = device;
      this.currentIndex = index;
    },

    removeAllDevices() {
      DeviceDataService.deleteAll()
        .then((response: ResponseData) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    searchTitle() {
      DeviceDataService.findByTitle(this.title)
        .then((response: ResponseData) => {
          this.devices = response.data;
          this.setActiveDevice({} as Device);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    // searchCondition() {
    //   DeviceDataService.findAllCondition(this.condition)
    //     .then((response: ResponseData) => {
    //       this.devices = response.data;
    //       this.setActiveDevice({} as Device);
    //       //console.log(this.condition); //debug
    //     })
    //     .catch((e: Error) => {
    //       console.log(e);
    //     });
    // },
  },
  mounted() {
    this.retrieveDevices();
  },
});
</script>

<style>
.list {
  text-align: margin;
  max-width: 1200px;
  margin: auto;
}
.tablee{
width: 10px;
border-bottom: 3px solid black;
border-collapse: separate;
border-spacing: 0 20px;
}
td {
  width: 150px;
  border-bottom: 1px solid black;
  padding: 5px;
  background-color: azure;
}

</style>