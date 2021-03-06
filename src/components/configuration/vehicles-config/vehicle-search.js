import storage from "../../../dataStore";
import layerModel from "../../map/layers";
import splSrv from "../../../spartanlync/services";
import { fromEvent } from "rxjs";
import { map, debounceTime } from "rxjs/operators";
import { markerList } from "../../../dataStore/map-data";
import { showSnackBar } from "../../../components/snackbar/snackbar";
import { fetchDataForVeh } from "../../../services/data-feed/data-feed-getter";
import {
   getDevicesInGroups,
   createGroupsByNameCall,
   createDeviceByNameCall,
   makeAPIMultiCall,
   getBlobStorage,
   saveBlobStorage,
   setBlobStorage
} from "../../../services/api/helpers";

export const deviceSearch = {
   shown: true,
   deviceResultsCache: {},
   selectedIDS: {},

   get searchInput() {
      return document.getElementById("RTM-vehicle-search-bar");
   },

   init(mapPropsToComponent) {
      // Init rxjs debounce search.
      const searchInputObservable = fromEvent(deviceSearch.searchInput, "input").pipe(map(i => i.currentTarget.value));
      const debouncedInput = searchInputObservable.pipe(debounceTime(250));
      debouncedInput.subscribe((searchInput) => {
         deviceSearch.buildSearchList(searchInput, mapPropsToComponent);
      });
   },

   buildSearchList(searchInput, mapPropsToComponent) {
      const nameSearchMultiCall = [
         createDeviceByNameCall(searchInput),
         createGroupsByNameCall(searchInput)
      ];
      const selectedDeviceIds = Object.values(storage.selectedDevices).map(vehObj => { return vehObj.id; });

      return makeAPIMultiCall(nameSearchMultiCall).then(results => {
         // deviceList = results[0];
         const deviceList = results[0];

         // Sort Alphabetically by vehicle name
         deviceList.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));

         deviceList
            .map(devObj => {
               // Exclude from search results;
               // - Historical devices
               // - Vehicles already added to panel
               if (devObj.serialNumber !== "000-000-0000" && !selectedDeviceIds.includes(devObj.id)) {
                  deviceSearch.saveDeviceDataToCache(devObj);
               }
            });

         // groupList = results[1];
         results[1]
            .map(deviceSearch.saveGroupDataToCache);
         mapPropsToComponent(Object.values(deviceSearch.deviceResultsCache));
      });
   },

   loadSavedDeviceConfig(mapPropsToComponent) {
      return getBlobStorage().then(val => {
         if (val.length === 0) { return; }
         const cachedDevices = JSON.parse(val[0].data);
         if (cachedDevices.configData.Vehicle) {
            deviceSearch.selectedIDS = cachedDevices.configData.Vehicle;
            deviceSearch.removeAlerts();
            deviceSearch.applyFilter();
            deviceSearch.buildDeviceDisplayList(mapPropsToComponent);
         }
      });
   },

   zoomIntoDevice(id) {
      const deviceMarker = markerList[id];
      if (deviceMarker) {
         const newZoomLevel = Math.max(Math.min(storage.map.getZoom() + 1, 18), 15);
         if (typeof deviceMarker.currentlatLng === "undefined") {
            showSnackBar(splmap.tr("error_vehicle_cannot_fly"));
         }
         else {
            // If vehicles NOT visible
            // Report additional instruction on resolving why cannot fly to vehicle
            if (typeof deviceSearch.selectedIDS[id] !== "undefined" && deviceSearch.selectedIDS[id].visible === false) {
               showSnackBar(splmap.tr("error_vehicle_no_gps_click_show_btn_to_view"));
            }
            else {
               storage.map.flyTo(deviceMarker.currentlatLng, newZoomLevel);
            }
         }
      }
      else {
         // If All selected vehicles are NOT visible
         // Report additional instruction on resolving why cannot fly to vehicle
         let msg = splmap.tr("error_vehicle_no_gps");
         if ((Object.keys(deviceSearch.selectedIDS).length && !Object.keys(storage.selectedDevices).length) ||
            (typeof deviceSearch.selectedIDS[id] !== "undefined" && deviceSearch.selectedIDS[id].visible === false)) {
            msg = splmap.tr("error_vehicle_no_gps_click_show_btn_to_view");
         }
         showSnackBar(msg);
      }
   },

   removeAlerts() {
      for (const deviceID in deviceSearch.selectedIDS) {
         const deviceObj = deviceSearch.selectedIDS[deviceID];
         delete deviceObj.alert;
         delete deviceObj.alertClass;
         delete deviceObj.tooltip;
      }
   },

   saveDeviceDataToCache(deviceData) {
      const data = {};
      ["id", "name", "groups"].forEach(prop => data[prop] = deviceData[prop]);
      data.visible = true;
      deviceSearch.deviceResultsCache[data.name] = data;
      return data;
   },

   saveGroupDataToCache(deviceData) {
      const data = {};
      ["id", "name", "color"].forEach(prop => data[prop] = deviceData[prop]);
      data.visible = true;
      data.name += " (" + splmap.tr("splmap_controlspanel_group") + ")";

      deviceSearch.deviceResultsCache[data.name] = data;
      return data;
   },

   buildDeviceDisplayList(mapPropsToComponent) {
      deviceSearch.mapPropsToComponent = mapPropsToComponent;
      mapPropsToComponent(Object.values(deviceSearch.selectedIDS)
         .filter(device => device.id && device.name));
   },

   handleItemSelected(event, mapPropsToComponent) {
      event.preventDefault();
      deviceSearch.saveSelectedValue(mapPropsToComponent);
   },

   saveSelectedValue(mapPropsToComponent) {

      const { value } = deviceSearch.searchInput;
      if (!deviceSearch.deviceResultsCache.hasOwnProperty(value)) {
         return;
      }

      const deviceData = deviceSearch.deviceResultsCache[value];
      deviceData.visible = true;
      const {
         id,
         name,
         groups,
         color,
         visible
      } = deviceData;

      if (color) { //It's a group
         deviceSearch.selectedIDS[id] = { id, name, color, visible };
      }
      else {
         deviceSearch.selectedIDS[id] = { id, name, groups, visible };
      }

      deviceSearch.searchInput.value = "";
      deviceSearch.saveConfig(mapPropsToComponent);
      return deviceData;
   },

   deleteItemFromdeviceList(id, mapPropsToComponent) {
      delete deviceSearch.selectedIDS[id];
      deviceSearch.saveConfig(mapPropsToComponent);
   },

   deleteAllItems(mapPropsToComponent) {
      deviceSearch.selectedIDS = {};
      deviceSearch.saveConfig(mapPropsToComponent);
   },

   saveConfig(mapPropsToComponent) {
      deviceSearch.removeAlerts();
      storage.setBlobStorageObj ? setBlobStorage("Vehicle", deviceSearch.selectedIDS) : saveBlobStorage("Vehicle", deviceSearch.selectedIDS);
      deviceSearch.applyFilter();
      deviceSearch.buildDeviceDisplayList(mapPropsToComponent);

      // Throw Event for post-Save operations
      splSrv.events.exec("onDeviceSearchSave");
   },

   applyFilter() {
      _getDeviceList(deviceSearch.selectedIDS).then(() => {
         _applyDeviceFilter(Object.keys(storage.selectedDevices));
      });
   },
   showAll(mapPropsToComponent) {
      Object.values(deviceSearch.selectedIDS)
         .forEach(selectedDevice =>
            selectedDevice.visible = true
         );
      deviceSearch.saveConfig(mapPropsToComponent);
   },
   hideAll(mapPropsToComponent) {
      Object.values(deviceSearch.selectedIDS)
         .forEach(selectedDevice =>
            selectedDevice.visible = false
         );
      deviceSearch.saveConfig(mapPropsToComponent);
   },
   toggleDeviceVisibility(id, mapPropsToComponent) {
      const selectedDevice = deviceSearch.selectedIDS[id];
      selectedDevice.visible = !selectedDevice.visible;
      deviceSearch.saveConfig(mapPropsToComponent);
   }
};

export function _getDeviceList(selectedIDs) {
   storage.selectedDevices = {};
   return Promise.all(Object.values(selectedIDs).map(data => {
      const {
         id,
         color,
         visible
      } = data;

      if (!visible) {
         return Promise.resolve("done");
      }

      if (color) { //It's a group
         return getDevicesInGroups([{ id }]).then(devices =>
            devices.forEach(device => {
               const {
                  id,
                  name,
                  groups
               } = device;
               storage.selectedDevices[id] = { id, name, groups, visible: true };
            })
         );
      }
      else {
         storage.selectedDevices[id] = data;
         return Promise.resolve("done");
      }
   }));
}

window.addDeviceToFilter = (id, name = "Go Device") => {
   deviceSearch.selectedIDS[id] = { id, name, visible: true };
   deviceSearch.saveConfig(deviceSearch.mapPropsToComponent);
   openPopup();
};

export function _applyDeviceFilter(deviceIDS) {
   layerModel.clearAllLayers();

   if (deviceIDS.length === 0) {
      return;
   }
   const layerName = "Filter";

   if (!layerModel.layerList.hasOwnProperty(layerName)) {
      layerModel.createNewLayer(layerName);
   }
   layerModel.layerList[layerName].clearLayers();
   layerModel.showLayer(layerName);

   deviceIDS.forEach(deviceID => {
      const deviceMarker = markerList[deviceID];
      if (deviceMarker) {
         deviceMarker.setLayer(layerName);
      }
      // Fetch historical data for newly activated vehicle(s)
      else if (storage.realTimeFeedDataGetter) {
         fetchDataForVeh.getHistorical(deviceID);
      }
   });
}

function openPopup() {
   const collapseButton = document.getElementsByClassName("collapsible");
   const vehicleTab = document.getElementById("RTM-VehicleTitle");
   if (!collapseButton[0].classList.contains("active")) {
      collapseButton[0].click();
      vehicleTab.click();
   }
}
