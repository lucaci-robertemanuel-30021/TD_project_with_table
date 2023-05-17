import http from "@/http-common";

/* eslint-disable */
class DeviceDataService {
  getAll(): Promise<any> {
    return http.get("/devices");
  }

  get(id: any): Promise<any> {
    return http.get(`/devices/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/devices", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/devices/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/devices/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/devices`);
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`/devices?title=${title}`);
  }

  // findAllCondition(condition: string): Promise<any> {
  //   return http.get(`/devices?condition=${condition}`);
  // }
}

export default new DeviceDataService();
