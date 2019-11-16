import axios from "axios";

export default {

  getPanels: function() {
    return axios.get("/api/panels");
  },
  getPanelsByData: function(material, length, width, thickness) {
    let panelData = {
      material,
      length,
      width,
      thickness
    }
    return axios.post("/api/panels/search", panelData); 
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