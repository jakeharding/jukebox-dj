"use strict";
/**
 AppConfig.ts - (C) Copyright - 2017
This software is copyrighted to contributors listed in CONTRIBUTIONS.md.

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Set up the environment configuration.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AppConfig = (function () {
    function AppConfig() {
        this.apiHost = "localhost:8000";
        this.staticPath = "static/";
        this.environment = "local";
    }
    AppConfig.prototype.isSecure = function () {
        return false;
    };
    return AppConfig;
}());
AppConfig = __decorate([
    core_1.Injectable()
], AppConfig);
exports.AppConfig = AppConfig;
