import { createMachine, assign } from 'xstate';

const increment = (context) => context.count + 1;
const decrement = (context) => context.count - 1;

export const toggleMachine = createMachine({
    id: 'toggle',
    initial: 'inactive',
    states: {
      inactive: {
        on: { TOGGLE: 'active' }
      },
      active: {
        on: { TOGGLE: 'inactive' }
      }
    }
  });

export const counterMachine = createMachine({
  initial: 'active',
  context: {
    count: 0
  },
  states: {
    active: {
      on: {
        INC: { actions: assign({ count: increment }) },
        DEC: { actions: assign({ count: decrement }) }
      }
    }
  }
});

type Context = {};

type Events = { type: "TIMER" | "DISABLE" | "ENABLE" };

type States = {
  value: "red" | "redYellow" | "yellow" | "green" | "disabled";
  context: Context;
};

export const lightMachine = createMachine<Context, Events, States>({
  id: "light",
  initial: "green",
  states: {
    red: {
      on: { TIMER: "redYellow", DISABLE: "disabled" },
    },
    redYellow: {
      on: { TIMER: "green", DISABLE: "disabled" },
    },
    green: {
      on: { TIMER: "yellow", DISABLE: "disabled" },
    },
    yellow: {
      on: { TIMER: "red", DISABLE: "disabled" },
    },
    disabled: {
      on: { ENABLE: "red" },
    },
  },
});