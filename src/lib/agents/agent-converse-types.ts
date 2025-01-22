import { ConverseParams, Properties } from '../../resources/top-level';

export interface ConverseNonStreamParams extends ConverseParams {
  stream?: false;
}

export interface ConverseStreamParams extends ConverseParams {
  stream: true;
}

export type AllConverseParams = ConverseNonStreamParams | ConverseStreamParams;

export type ConverseEvent = Properties.ConverseStatusEvent | Properties.ConverseContentMessageDeltaEvent;
