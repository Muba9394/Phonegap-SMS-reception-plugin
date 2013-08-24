/*
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

cordova.define("cordova/plugin/smsplugin", function(require, exports, module) {
  var exec = require('cordova/exec');
  
  var SmsPlugin = function() {};
  
  SmsPlugin.COLS = {
          _ID: "_id",
          READ: "read",
          THREAD_ID: "thread_id",
          ADDRESS: "address",
          DATE: "date",
          SUBJECT: "subject",
          BODY: "body"
  };


  /**
   * Check if the device has a possibility to send and receive SMS
   */
  SmsPlugin.prototype.isSupported = function(successCallback,failureCallback) {
    return exec(successCallback, failureCallback, 'SmsPlugin', 'HasSMSPossibility', []);
  }

  /**
   * Check if the device has a possibility to send and receive SMS
   * the successCallback function receives string parameters with
   * the values.
   */
  SmsPlugin.prototype.startReception = function(successCallback,failureCallback) {
    return exec(successCallback, failureCallback, 'SmsPlugin', 'StartReception', []);
  }

  /**
   * Stop the receiving sms.
   */
  SmsPlugin.prototype.stopReception = function(successCallback,failureCallback) {
    return exec(successCallback, failureCallback, 'SmsPlugin', 'StopReception', []);
  }
  
  /**
   * Gets sms messages stored on the device based on your custom criteria.
   * Use the columns names mentioned in SmsPlugin.COLS.
   * 
   * @param maxRowsCount The maximum number of rows to fetch. If not needed this can be -1.
   * @param whereClause A string with the WHERE-clause, (w/o the WHERE keyword).
   *  If not needed this can be null.
   * @param whereArgsArray If any '?' is used in the above WHERE-clause then supply the
   * value for that in this array. If not needed this can be null.
   */
  SmsPlugin.prototype.getSmsByCustomCriteria = function(maxRowsCount, whereClause, whereArgsArray, orderByClause,
          successCallback,failureCallback) {
    return exec(successCallback, failureCallback, 'SmsPlugin', 'GetSmsByCustomCriteria', [maxRowsCount, whereClause, whereArgsArray, orderByClause]);
  }
  
  /**
   * Gets all sms stored on the device.
   * 
   * @param maxRowsCount The maximum number of rows to fetch. If not needed this can be -1.
   */
  SmsPlugin.prototype.getAllSms = function(maxRowsCount, successCallback,failureCallback) {
    return exec(successCallback, failureCallback, 'SmsPlugin', 'GetAllSms', [maxRowsCount]);
  }
  
  /**
   * Gets the count of all sms stored on the device.
   */
  SmsPlugin.prototype.getAllSmsCount = function(successCallback,failureCallback) {
    return exec(successCallback, failureCallback, 'SmsPlugin', 'GetAllSmsCount', []);
  }
  
  /**
   * Gets all unread sms stored on the device.
   * 
   * @param maxRowsCount The maximum number of rows to fetch. If not needed this can be -1.
   */
  SmsPlugin.prototype.getAllUnreadSms = function(maxRowsCount, successCallback,failureCallback) {
    return exec(successCallback, failureCallback, 'SmsPlugin', 'GetAllUnreadSms', [maxRowsCount]);
  }
  
  /**
   * Gets the count of all unread sms stored on the device.
   */
  SmsPlugin.prototype.getAllUnreadSmsCount = function(successCallback,failureCallback) {
    return exec(successCallback, failureCallback, 'SmsPlugin', 'GetAllUnreadSmsCount', []);
  }
  
  /**
   * Sets a given stored sms as read on the device. Note you need android.permission.WRITE_SMS permission for this. 
   * 
   * @param smsId The value of _id column of the sms.
   */
  SmsPlugin.prototype.setSmsAsRead = function(smsId, successCallback,failureCallback) {
    return exec(successCallback, failureCallback, 'SmsPlugin', 'SetSmsAsRead', [smsId]);
  }

  var smsplugin = new SmsPlugin();
  module.exports = smsplugin;
});

