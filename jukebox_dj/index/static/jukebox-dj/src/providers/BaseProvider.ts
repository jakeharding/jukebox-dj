/**
 * BaseProvider.ts - (C) Copyright - 11/7/17
 * This software is copyrighted to contributors listed in CONTRIBUTIONS.md.
 *
 * SPDX-License-Identifier: SEE LICENSE.txt
 *
 * Author(s) of this file:
 *   jake
 *
 * Base Provider class to hold logic common for all providers.
 */
import {HttpParams} from "@angular/common/http";


export class BaseProvider {

  // constructor(){}

  buildQueryParams(paramsObj:any): HttpParams {
    let params: HttpParams = new HttpParams();
    Object.keys(paramsObj).forEach((k) => {
      params = params.append(k, paramsObj[k]);
    });
    return params;
  }
}
