// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as ConsumptionBreakdownAPI from './consumption-breakdown';
import {
  ConsumptionBreakdown,
  ConsumptionBreakdownList,
  ConsumptionBreakdownListParams,
  ConsumptionBreakdownResource,
} from './consumption-breakdown';
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
  consumptionBreakdown: ConsumptionBreakdownAPI.ConsumptionBreakdownResource =
    new ConsumptionBreakdownAPI.ConsumptionBreakdownResource(this._client);
}

Reports.UserCreditsConsumption = UserCreditsConsumption;
Reports.ConsumptionBreakdownResource = ConsumptionBreakdownResource;

export declare namespace Reports {
  export {
    UserCreditsConsumption as UserCreditsConsumption,
    type UserCreditConsumption as UserCreditConsumption,
    type UserCreditConsumptionList as UserCreditConsumptionList,
    type UserCreditsConsumptionListParams as UserCreditsConsumptionListParams,
  };

  export {
    ConsumptionBreakdownResource as ConsumptionBreakdownResource,
    type ConsumptionBreakdown as ConsumptionBreakdown,
    type ConsumptionBreakdownList as ConsumptionBreakdownList,
    type ConsumptionBreakdownListParams as ConsumptionBreakdownListParams,
  };
}
