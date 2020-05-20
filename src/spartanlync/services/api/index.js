/* eslint-disable one-var */

// Make asyncronous AJAX call using JSON to PHP backend
// Expect JSON response on success or error
export const InitSplAPI = function (serverUrl, csrfToken) {
   const me = this; // required from within methods used as callbacks

   // private variables & methods
   this._url = null;
   this._debug = false;      // Show debugging information (in Chrome dev tools, Firebug, etc.)
   this._timeout = 0;        // How long to wait for a response from the server (in seconds); 0 (or null) means no timeout.
   this._csrfToken = null;

   this.requestService = function (params, callbackSuccess, callbackError) {
      if (me._debug) { console.log("InitAPI(requestService) - callXHR(BEGIN)"); }
      return me.callXHR(params, callbackSuccess, callbackError);
   };

   this.callXHR = function (params, callbackSuccess, callbackError) {
      const xhr = new XMLHttpRequest();
      const getPost = typeof params.options !== "undefined" && typeof params.options.method !== "undefined" && params.options.method === "GET" ? "GET" : "POST";
      const url = typeof params.options !== "undefined" && typeof params.options.url !== "undefined" && params.options.url !== "" ? params.options.url : me._url;
      const payload = typeof params.options !== "undefined" && typeof params.options.json !== "undefined" && params.options.json !== "" ? params.options.json : params;

      xhr.open(getPost, url, true);
      xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
      xhr.withCredentials = true;
      if (me._csrfToken) {
         xhr.setRequestHeader("X-CSRF-Token", me._csrfToken);
      }
      xhr.addEventListener("abort", function (e) {
         if (callbackError) {
            if (me._debug) { console.log("InitAPI(callXHR) - FAILURE-callbackError(Cancelled)"); }
            callbackError("Cancelled", e);
         }
      });
      xhr.onreadystatechange = function () {
         if (xhr.readyState === 4) {
            if (xhr.status === 200) {
               if (me._debug) { console.log("InitAPI(callXHR) - SUCCESS(Response 200)"); }
               let data,
                  error,
                  result;
               try {
                  data = JSON.parse(xhr.responseText);
                  if (data && data.error) {
                     if (me._debug) { console.log("InitAPI(callXHR) - FAILURE(data.error FOUND)"); }
                     error = data.error;
                     me.debugLog("ERROR", error);
                     me.handleError(error, callbackError);
                  }
                  else {
                     if (data && data.result) {
                        result = data.result;
                        if (me._debug) { console.log("InitAPI(callXHR) - SUCCESS(DATA.RESULT FOUND)"); }
                        me.debugLog("SUCCESS", { result: result });
                        callbackSuccess(result);
                     }
                     else if (typeof data !== "undefined" && data !== "") {
                        if (me._debug) { console.log("InitAPI(callXHR) - SUCCESS(DATA FOUND)"); }
                        me.debugLog("SUCCESS", { result: data });
                        callbackSuccess(data);
                     }
                  }
               }
               catch (e) {
                  if (me._debug) { console.log("InitAPI(callXHR) - FAILURE(XHR ERROR-1)"); }
                  if (me._debug) { console.log(e); }
                  me.handleError(e, callbackError);
               }
            } else {
               if (me._debug) { console.log("InitAPI(callXHR) - FAILURE(XHR ERROR-2)"); }
               me.debugLog("ERROR", xhr);
               me.handleError(xhr, callbackError);
            }
         }
      };
      let jsonString;
      try {
         jsonString = JSON.stringify(payload);
      }
      catch (e) {
         if (me._debug) { console.log("InitAPI(callXHR) - FAILURE(JSON.stringify ERROR)"); }
         me.handleError(e, callbackError);
         return;
      }
      if (me._timeout) {
         xhr.timeout = me._timeout * 1000;
      }
      if (me._debug) { console.log("InitAPI(callXHR) - SEND"); }
      xhr.send(jsonString);
      return {
         abort: function () {
            if (me._debug) { console.log("InitAPI(callXHR) - ABORT"); }
            xhr.abort();
         }
      };
   };


   /**
    *  Logs some debug information to the browser console, if _debug is true
    *  @private
    */
   this.debugLog = function () {
      if (me._debug) {
         const logs = [new Date()];
         logs.push.apply(logs, arguments);
         console.log.apply(console, logs);
      }
   };

   /**
    *  Normalizes and handles errors
    *  @private
    *  @param {Object} [error] The error object
    *  @callback {failureCallback} [errorCallback] The function to call once the error has been normalize.
    *                                                  It passes back a string for a known error, and the raw error
    *                                                  object if some custom handling is required.
    */
   this.handleError = function (error, errorCallback) {
      let errorString;
      if (error && error.name && error.message) {
         errorString = error.name + ": " + error.message;
      }
      else if (error.target || (error instanceof XMLHttpRequest && error.status === 0)) {
         errorString = "Network Error: Couldn't connect to the server. Please check your network connection and try again.";
      }
      if (me._debug) {
         console.error(errorString, error);
      }
      if (errorCallback) {
         errorCallback(errorString || "Error", error);
      }
   };

   this.configure = function (url, csrfToken) {
      const me = this;
      if (typeof url !== "undefined" && typeof url !== "") {
         me._url = url;
      }
      if (typeof csrfToken !== "undefined" && typeof csrfToken !== "") {
         me._csrfToken = csrfToken;
      }
   };

   // configure when an instance gets created
   this.configure(serverUrl, csrfToken);
};

export const InitSplSessionMgr = function (myApi, credentials) {
   //
   // Register Add-In session with SpartanLync backend service
   //

   /**
    *  Private Variables
    */
   this._api = null;
   this._credentials = null;

   this._storage = null;
   this._callback = null;
   this._errorCallback = null;

   /**
   * getSettings() Fetch any saved storage settings
   *
   * @param {function} callback - Handler for post-retrieval
   *
   * @return {object}  storageObj - data store in DB or NULL if empty
   *
   */
   this.getSettings = function (callback, errorCallback) {
      const me = this;
      if (!callback || typeof callback !== "function" || !me._api || !me._credentials) { return; }

      me._callback = callback;
      me._errorCallback = errorCallback && errorCallback === "function" ? errorCallback : null;
      me._api.requestService(
         {
            settings: {
               cmd: "get"
            },
            credentials: me._credentials
         },
         (result) => {
            if (me._isSuccess(result)) {
               const settings = result.data;
               if (typeof settings.storageObj !== "undefined" &&
                  typeof settings.deviceIdDb !== "undefined") {

                  // If flash message from server exists,
                  // pass it forward for user notification after App inits
                  if (typeof result.msg !== "undefined" && result.msg) {
                     serverFlashMessage = result.msg;
                  }
                  me._callback(settings.storageObj, settings.deviceIdDb);
               }
               else {
                  me._handleAppError(result, "---- splSessionMgr(): getSettings(): ERROR: RESPONSE MISSING PROPERTY \".storageObj\" ----");
               }
            }
            else {
               me._handleAppError(result, "---- splSessionMgr(): getSettings(): FETCHING ERROR ----");
            }
         },
         // API ERROR FETCHING
         (result) => {
            console.log("---- splSessionMgr(): getSettings(): API ERROR FETCHING ----");
            console.log(result);
         }
      );
   };

   this._isSuccess = function (result) {
      if (typeof result !== "undefined" && result !== null && typeof result === "object" &&
         typeof result.responseStatus !== "undefined" && result.responseStatus !== null &&
         typeof result.responseStatus && result.responseStatus === "success" &&
         typeof result.data !== "undefined" && result.data !== null && result.data
      ) {
         return true;
      }
      return false;
   };

   this._handleAppError = function (result, msg) {
      const me = this,
         outMsg = msg || "";
      console.log(msg);
      if (typeof result !== "undefined" && result !== null && typeof result === "object" &&
         typeof result.responseStatus !== "undefined" && result.responseStatus !== null &&
         typeof result.responseStatus && result.responseStatus === "failure" &&
         typeof result.msg !== "undefined" && result.msg !== null && result.msg
      ) {
         outMsg += "\n" + result.msg;
         console.log(result.msg);
      }
      else {
         console.log(result);
         outMsg += "\n" + JSON.stringify(result);
      }
      if (me._errorCallback) {
         me._errorCallback(outMsg);
      }
   };

   this.configure = function (myApi, myCreds) {
      if (myApi && typeof myApi === "object") {
         this._api = myApi;
      }
      if (myCreds && typeof myCreds === "object") {
         this._credentials = myCreds;
      }
   };

   // configure when an instance gets created
   this.configure(myApi, credentials);
};