import noUiSlider from "propellerkit-range-slider/node_modules/nouislider/distribute/nouislider";
import storage from "../../../dataStore";
import moment from "moment-timezone";
import splSrv from "../../../spartanlync/services";

import {
   checkIfLive,
   getLiveTime
} from "../../../utils/helper";

import {
   getPixelsPerMinute,
   minutesInDay,
   getMinuteOfDay,
   calcCurrentTime,
   getTimeInlocalFormat,
   minuteOfDayToHour,
   calculateLeftOffset
} from "./slider-helper";

export const sliderModel = {

   userCurrentlySliding: false,
   currentHandle: 2,

   range: {
      "min": 0,
      "max": minutesInDay
   },

   get RTMSlider() {
      return document.getElementById("RTM-TimeSlider");
   },

   initSlider() {

      // Init Slider once Timezone defaults applied
      splSrv.events.register("onLoadSplServices", () => {

         const toolTipFormatter = {
            from: getTimeInlocalFormat,
            to: getTimeInlocalFormat
         };

         noUiSlider.create(this.RTMSlider, {
            step: 1, //Each step is one minute. There are 1440 minutes in a day.
            start: [getMinuteOfDay(storage.timeRangeStart), getMinuteOfDay(storage.currentTime)],
            range: this.range,

            pips: {
               mode: "values",
               values: [...Array(8).keys()].slice(1).map(val => Math.round(val * 180)),
               density: 180,
               format: {
                  to: minuteOfDayToHour, // 'to' the formatted value. Receives a number.
               },
               stepped: true
            },
            behaviour: "drag-tap",
            connect: true,
            tooltips: [toolTipFormatter, toolTipFormatter]
         });

         this.RTMSlider.noUiSlider.on("start.one", this.startSliding.bind(this));
         this.RTMSlider.noUiSlider.on("slide.one", this.userSliding.bind(this));
         this.RTMSlider.noUiSlider.on("set.one", this.sliderValueSet.bind(this));

         storage.dateKeeper$.subscribe(this.updateSlider.bind(this));
         this.createSliderTitles();
      });
   },

   createSliderTitles() {
      const lower = document.getElementsByClassName("noUi-handle-lower");
      lower[0].setAttribute("data-tip", "Start Time");
      lower[0].setAttribute("data-for", "splTooltip");
      lower[0].setAttribute("data-place", "bottom");
      const upper = document.getElementsByClassName("noUi-handle-upper");
      upper[0].setAttribute("data-tip", "Current Time");
      upper[0].setAttribute("data-for", "splTooltip");
      upper[0].setAttribute("data-place", "bottom");
   },

   updateSlider(currentSecond) {

      if (!this.userCurrentlySliding) {
         const endHandleValue = getMinuteOfDay(currentSecond);
         const start = [getMinuteOfDay(storage.timeRangeStart), endHandleValue];

         const options = {
            range: this.range,
            padding: [0, endHandleValue + 1],
            start
         };

         if (this.RTMSlider) {
            if (this.RTMSlider.noUiSlider) {
               this.RTMSlider.noUiSlider.updateOptions(options, false);
            }
            this.handleOverFlowFix(start, 1);
            this.toolTipOverFlowFix(start, 1);
         }
      };
   },

   startSliding(values, handle) {
      this.toolTipOverFlowFix(values, handle);
      this.currentHandle = handle;
      this.userCurrentlySliding = true;
   },

   userSliding(values, handle) {
      if (this.currentHandle === 2) {
         this.handleOverFlowFix(values, handle);
      }
      this.toolTipOverFlowFix(values, handle);
      this.userCurrentlySliding = true;
   },

   sliderValueSet(values, handle) {
      // handle 0 = first handle, 1 = second handle
      this.userCurrentlySliding = false;
      this.handleOverFlowFix(values, handle);

      storage.timeRangeStart = calcCurrentTime(values[0]);
      if (checkIfLive(storage.timeRangeStart) > 600) {
         storage.timeRangeStart = getLiveTime();
      }

      let newTime = calcCurrentTime(values[1]);
      if (this.currentHandle === 0) {
         storage.dateKeeper$.update();
      }
      else {
         if (checkIfLive(newTime) > 600) {
            newTime = getLiveTime();
         }
         storage.dateKeeper$.setNewTime(newTime);
         splSrv.events.exec("onDateTimeChangeTriggerEvents");
      }
      this.currentHandle = 2;
   },

   toolTipOverFlowFix(values, handle) {

      const [lowerValue, upperValue] = values;

      const tooltips = document.getElementsByClassName("noUi-tooltip");
      const [lowerToolTip, upperToolTip] = tooltips;

      const slider = document.getElementById("RTM-TimeSlider");
      const pixelsPerMinute = getPixelsPerMinute(slider.offsetWidth);

      const offsetPixelWidth = 36;

      if (handle === 0) {
         const leftOffset = calculateLeftOffset(offsetPixelWidth, lowerValue, pixelsPerMinute);
         lowerToolTip.style.setProperty("left", `${leftOffset}px`, "important");
      } else {
         const leftOffset = calculateLeftOffset(offsetPixelWidth, upperValue, pixelsPerMinute);
         upperToolTip.style.setProperty("left", `${leftOffset}px`, "important");
      }
   },

   handleOverFlowFix(values) {

      const [lowerValue] = values;

      const slider = document.getElementById("RTM-TimeSlider");
      const pixelsPerMinute = getPixelsPerMinute(slider.offsetWidth);

      const handles = document.getElementsByClassName("noUi-handle");
      const [lowerHandle, upperHandle] = handles;

      const leftOffset = calculateLeftOffset(9, lowerValue, pixelsPerMinute);
      lowerHandle.style.setProperty("left", `${leftOffset - 9}px`, "important");

      if (values[1] === values[0]) {
         upperHandle.style.setProperty("left", `${leftOffset}px`, "important");
      } else {
         upperHandle.style.setProperty("left", "0px", "important");
      }
   }
};