/**
 AppConfig.ts - (C) Copyright - 2017
This software is copyrighted to contributors listed in CONTRIBUTIONS.md.

SPDX-License-Identifier: SEE LICENSE.txt

Author(s) of this file:
  J. Harding

Set up the environment configuration.
 */


import {Injectable} from "@angular/core";


@Injectable()
export class AppConfig {
  apiHost: string = "localhost:8000";
  staticPath: string = "static/";
  environment: string = "local";

  isSecure () {
    return false;
  }
}


