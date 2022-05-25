import type { ComputedRef } from 'vue'

export type VerifyCode = string

type CurrentTime = {
  days: number;
  hours: number;
  total: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export type CountDown = {
  start: () => void;
  pause: () => void;
  reset: (totalTime?: number) => void;
  current: ComputedRef<CurrentTime>;
};