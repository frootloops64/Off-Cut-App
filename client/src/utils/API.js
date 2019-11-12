import axios from "axios";

export default {

  getPanels: function() {
    return axios.get("/api/panels");
  },

  getPanel: function(id) {
    return axios.get("/api/panels/" + id);
  },

  deletePanel: function(id) {
    return axios.delete("/api/panels/" + id);
  },

  savePanel: function(panelData) {
    return axios.post("/api/panels", panelData);
  }

};