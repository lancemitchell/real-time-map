import storage from "../dataStore";
import moment from "moment-timezone";
import splSrv from "../spartanlync/services";
import { markerList } from "../dataStore/map-data";

export function createObjectKeyIfNotExist(obj, key) {
   if (!obj.hasOwnProperty(key)) {
      obj[key] = {};
      return true;
   }
   return false;
}

export function createKeyArrayIfNotExist(obj, key) {
   if (!obj.hasOwnProperty(key)) {
      obj[key] = [];
      return true;
   }
   return false;
}

export function arrayBinaryIndexSearch(array, searchElement) {
   let minIndex = 0;
   let maxIndex = array.length - 1;

   if (!array.length || searchElement < array[minIndex]) {
      return 0;
   }

   if (searchElement > array[maxIndex]) {
      return maxIndex + 1;
   }

   let currentIndex;
   let currentElement;

   while (minIndex <= maxIndex) {

      currentIndex = ~~((minIndex + maxIndex) / 2);
      currentElement = array[currentIndex];

      if (currentElement < searchElement) {
         minIndex = currentIndex + 1;
      } else if (currentElement > searchElement) {
         maxIndex = currentIndex - 1;
      } else {
         return currentIndex;
      }
   }

   return minIndex;
}

export function insertIntoOrderedArray(array, element) {
   const index = arrayBinaryIndexSearch(array, element);
   if (array[index] !== element) {
      array.splice(index, 0, element);
   }
   return index;
}

export function checkIfLive(dateTime) {
   const date = moment.unix(dateTime);
   if (!checkSameDay(date, moment())) {
      return false;
   }
   const liveTime = getLiveTime();
   const difference = date.unix() - liveTime;

   if (difference < 0) {
      // Correct for variances of a 30 seconds or less, by reseting the CurrentTime clock
      // Note: Variance happens when Javascript processing halts causing the datekeeper timer clock to fall behind
      if (difference < -30) {
         return false;
      }
      else {
         storage.dateKeeper$.setNewTime(liveTime);
         splSrv.events.exec("onUpdateCurrentSecond", liveTime);
         return true;
      }
   }
   if (difference > 0) {
      return difference;
   }
   return true;
}

export function getLiveTime() {
   return moment.unix(moment().unix() - storage.delay).unix();
}

export function checkSameDay(date1, date2) {
   return moment(date1).isSame(moment(date2), "day");
}

export function resetAnimationOnFocus() {
   let hidden;
   let visibilityChange;
   if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilityChange = "visibilitychange";
   } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
   } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
   }

   function handleVisibilityChange() {
      if (!document[hidden]) {
         console.log("Focused again!");
         resetTransitionAnimation();

         // SpartanLync tasks invoked on App Focus
         splSrv.events.exec("onAppFocus");
      }
   }

   // Warn if the browser doesn't support addEventListener or the Page Visibility API
   if (typeof document.addEventListener === "undefined" || hidden === undefined) {
      console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
   } else {
      // Handle page visibility change
      document.addEventListener(visibilityChange, handleVisibilityChange, false);
   }
}

export function resetTransitionAnimation() {
   Object.values(markerList)
      .forEach(marker => {
         const element = marker.mapMarker.getElement();
         if (element) {
            element.style[L.DomUtil.TRANSITION] = "";
         }
         marker.popupModel.resetAnimation();
      });
}

export function getExceptionColor(ruleID) {

   if (ruleID && storage.selectedExceptions.hasOwnProperty(ruleID)) {
      // console.log(storage.selectedExceptions[ruleID]);
      const {
         b,
         g,
         r
      } = storage.selectedExceptions[ruleID].color;
      return rgbToHex([r, g, b]);
   }
   return "#00AEEF";
}

export function rgbToHex(rgb) {

   const result = rgb.map(color => {
      const hex = Number(color).toString(16);
      if (hex.length < 2) {
         return "0" + hex;
      }
      return hex;
   });

   const resultHex = result.join("");
   return "#" + resultHex;
};

export function calculateHeadingAngle(prevLatLng, nextLatLng) {
   const [prevLat, prevLng] = prevLatLng;
   const [nextLat, nextLng] = nextLatLng;

   const lngDelta = toRadians(nextLng - prevLng);

   const cosNextLat = Math.cos(toRadians(nextLat));

   const x = Math.sin(toRadians(nextLat)) * Math.cos(toRadians(prevLat)) -
      Math.sin(toRadians(prevLat)) * Math.cos(lngDelta) * cosNextLat;

   const y = Math.sin(lngDelta) * cosNextLat;

   const result = Math.atan2(y, x) * 180 / Math.PI;

   return ((result + 360) % 360);
};

function toRadians(deg) {
   return deg * Math.PI / 180;
};


export function calculateAnimatedAngleDelta(currentAngle, nextAngle) {

   const modCurrentAngle = currentAngle % 360;
   const modNextAngle = nextAngle % 360;

   const startAngle = modCurrentAngle < 0 ? modCurrentAngle + 360 : modCurrentAngle;
   const endAngle = modNextAngle < 0 ? modNextAngle + 360 : modNextAngle;

   let angleDelta = Math.round(endAngle - startAngle);

   if (angleDelta > 180) {
      angleDelta -= 360;
   }

   if (angleDelta < -180) {
      angleDelta += 360;
   }

   return angleDelta;
}

export function getDayPerentage(dateTime) {
   const secondOfDay = moment.unix(dateTime).unix() - storage.dayStart;
   if (secondOfDay < 0) {
      return false;
   }
   const totalSecondsForDay = storage.isLiveDay ? getLiveTime() - storage.dayStart : 86400;
   return secondOfDay / totalSecondsForDay;
}