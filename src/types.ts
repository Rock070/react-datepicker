export interface DateBtn {
  timestamp: number;
  date: Date;
  time: Time;
  clickFn: () => void;
  disabled: boolean;
  selected: boolean;

  isThisMonth?: boolean;
}

export interface Time {
  y: number;
  m: number;
  d: number;
  t: number;
  day: number;
}

export interface TimeItem {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
