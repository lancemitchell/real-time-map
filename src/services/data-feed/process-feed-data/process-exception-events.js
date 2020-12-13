import storage from "../../../dataStore";
import moment from "moment-timezone";
import { exceptionEventsData } from "../../../dataStore/map-data";
import { createObjectKeyIfNotExist, createKeyArrayIfNotExist, insertIntoOrderedArray } from "../../../utils/helper";

export function processExceptionEvents(data) {
   if (storage.exceptionsEnabled) {
      data.map(processExceptionData);
   }
}

//Process it into a format we can use, and initilize device markers.
export function processExceptionData(data) {
   const {
      activeFrom,
      activeTo,
      device: {
         id: deviceID
      },
      diagnostic,
      distance,
      driver,
      duration,
      id,
      rule: {
         id: ruleID
      },
   } = data;

   const start = moment(activeFrom).unix();
   const end = moment(activeTo).unix();

   const exceptionData = {
      start,
      end,
      distance,
      ruleID
   };

   if (diagnostic.id) {
      exceptionData.diagnosticID = diagnostic.id;
   }

   if (driver.id) {
      exceptionData.driverID = driver.id;
   }

   saveExceptionDataToMemory(exceptionEventsData, deviceID, exceptionData);
}

export function saveExceptionDataToMemory(memoryObject, deviceID, data) {
   const {
      start,
      end,
      distance,
      ruleID,
      ...exceptionData
   } = data;

   const initDeviceExceptions = createObjectKeyIfNotExist(memoryObject, deviceID);
   const deviceObject = memoryObject[deviceID];
   createKeyArrayIfNotExist(deviceObject, "orderedDateTimes");

   const initExceptionStart = createObjectKeyIfNotExist(deviceObject, start);
   if (initExceptionStart) {
      insertIntoOrderedArray(deviceObject.orderedDateTimes, start);
   };

   createObjectKeyIfNotExist(deviceObject[start], end);
   deviceObject[start][end][ruleID] = exceptionData;

   return initDeviceExceptions;
}
