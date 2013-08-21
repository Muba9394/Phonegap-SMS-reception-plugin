/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    log: function () {
        var args = Array.prototype.slice.call(arguments, 0);
        if (console && console.log) {
            args = args.join(' ');
            args = "TestSmsApp WebConsoleLog:>>>>>>>>>>: " + args;
            console.log.call(console, args);
        }        
    },
    printObj: function (obj, i) {
        i = typeof(i) === 'undefined' ? '' : i;
        app.log("OBJ " + i + " :-");
        for (var k in obj) {
            app.log("    " + k + " => " + obj[k]);
        }
    },
    printArrOfObjs: function (arr) {
        app.log('Array Start [');
        for (var i=0; i < arr.length; i++) {
            var obj = arr[i];
            app.printObj(obj, i);
        }
        app.log('] Array End');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        
        //--------------- SMS related code starts ----------
        // We log all received / read SMS.
        var SmsPlugin = cordova.require('cordova/plugin/smsplugin');
        
        SmsPlugin.isSupported(function (isSupported) {
            if (isSupported) {
                SmsPlugin.startReception(app.printObj);
                SmsPlugin.getAllUnreadSmsCount(function (count) {
                    SmsPlugin.getAllUnreadSms(count, app.printArrOfObjs); // Gets all unread sms.
                });
                SmsPlugin.getAllSms(10, app.printArrOfObjs);
                
            } else {
                app.log('Listening for SMS not supported!');
            }
        });
    }
};
 