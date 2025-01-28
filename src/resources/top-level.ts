// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export type Properties =
  | Properties.ConverseResponse
  | Properties.ConverseStatusEvent
  | Properties.ConverseContentMessageDeltaEvent;

export namespace Properties {
  export interface ConverseResponse {
    /**
     * The ID of the agent used for the converse.
     */
    agent_id: string;

    /**
     * Contents of the converse response.
     */
    content: Array<ConverseResponse.Content>;

    /**
     * The ID of the agent conversation.
     */
    conversation_id: string;

    object: 'conversation.message';
  }

  export namespace ConverseResponse {
    export interface Content {
      text: string;
    }
  }

  export interface ConverseStatusEvent {
    data: ConverseStatusEvent.Data;

    event: 'start' | 'end';
  }

  export namespace ConverseStatusEvent {
    export interface Data {
      /**
       * The ID of the agent used for the converse.
       */
      agent_id: string;

      /**
       * The ID of the agent conversation.
       */
      conversation_id: string;

      /**
       * Name of the status
       */
      status: string;
    }
  }

  export interface ConverseContentMessageDeltaEvent {
    data: ConverseContentMessageDeltaEvent.Data;

    /**
     * Type of the event which is always delta
     */
    event: 'delta';
  }

  export namespace ConverseContentMessageDeltaEvent {
    export interface Data {
      /**
       * Delta of the response message produced by the agent.
       */
      delta: Data.Delta;
    }

    export namespace Data {
      /**
       * Delta of the response message produced by the agent.
       */
      export interface Delta {
        text: string;

        type: 'text';
      }
    }
  }
}

export interface ConverseResponse {
  /**
   * The ID of the agent used for the converse.
   */
  agent_id: string;

  /**
   * Contents of the converse response.
   */
  content: Array<ConverseResponse.Content>;

  /**
   * The ID of the agent conversation.
   */
  conversation_id: string;

  object: 'conversation.message';
}

export namespace ConverseResponse {
  export interface Content {
    text: string;
  }
}

export interface ConverseParams {
  /**
   * The input prompt.
   */
  prompt: string;

  /**
   * The ID of the agent that should be used for the converse. If both agent_id and
   * conversation_id aren't provided - the new agent is created.
   */
  agent_id?: string;

  /**
   * The config that overrides the default config of the agent for that converse.
   */
  config?: ConverseParams.Config;

  /**
   * The ID of the present conversation to use. If it's not provided - a new
   * conversation will be created.
   */
  conversation_id?: string;

  /**
   * Determines the response type of the converse. Response is the Server-Sent Events
   * if stream is set to true.
   */
  stream?: boolean;
}

export namespace ConverseParams {
  /**
   * The config that overrides the default config of the agent for that converse.
   */
  export interface Config {
    /**
     * The version of Datagrid's agent brain.
     */
    agent_model?: 'magpie-1' | 'mapgie-1.1';

    /**
     * Array of Knowledge IDs the agent should use during the converse. If not
     * provided - default settings are used. If null provided - all available knowledge
     * is used.
     */
    knowledge_ids?: Array<string> | null;

    /**
     * Directs your AI Agent's operational behavior.
     */
    system_prompt?: string;
  }
}

export declare namespace TopLevel {
  export {
    type Properties as Properties,
    type ConverseResponse as ConverseResponse,
    type ConverseParams as ConverseParams,
  };
}
