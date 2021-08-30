import { defineStore } from 'pinia';
import { createMachine, assign } from 'xstate';
import xstate from '../lib';

const increment = (context) => context.count + 1;
const decrement = (context) => context.count - 1;

export const counterMachine = createMachine({
  id: 'counter',
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

export const useCounterStore = defineStore(counterMachine.id, xstate(counterMachine))