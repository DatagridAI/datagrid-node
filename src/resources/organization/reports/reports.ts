// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as UserCreditsConsumptionAPI from './user-credits-consumption';
import {
  UserCreditConsumption,
  UserCreditConsumptionList,
  UserCreditsConsumption,
  UserCreditsConsumptionListParams,
} from './user-credits-consumption';

export class Reports extends APIResource {
  userCreditsConsumption: UserCreditsConsumptionAPI.UserCreditsConsumption =
    new UserCreditsConsumptionAPI.UserCreditsConsumption(this._client);
}

Reports.UserCreditsConsumption = UserCreditsConsumption;

export declare namespace Reports {
  export {
    UserCreditsConsumption as UserCreditsConsumption,
    type UserCreditConsumption as UserCreditConsumption,
    type UserCreditConsumptionList as UserCreditConsumptionList,
    type UserCreditsConsumptionListParams as UserCreditsConsumptionListParams,
  };
}
