import { format } from "date-fns";
import { create } from "zustand";

type State = {
  fromTimeZone: string;
  fromOffset: number;
  toTimeZone: string;
  toOffset: number;
  selectedTime: string;
  mode: "timezone" | "location";
};

type Action = {
  updateTimeZone: (timeZone: string, to: boolean) => void;
  updateOffset: (offset: number, to: boolean) => void;
  setMode: (mode: State["mode"]) => void;
  setSelectedTime: (time: string) => void;
};

const useTimeStore = create<State & Action>((set) => ({
  fromTimeZone: "UTC",
  fromOffset: 0,
  toTimeZone: "UTC",
  toOffset: 0,
  selectedTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  mode: "timezone",

  updateTimeZone: (timeZone, to) =>
    set(() => (to ? { toTimeZone: timeZone } : { fromTimeZone: timeZone })),

  updateOffset: (offset, to) =>
    set(() => (to ? { toOffset: offset } : { fromOffset: offset })),

  setMode: (mode) => set({ mode }),
  setSelectedTime: (time) => set({ selectedTime: time }),
}));

export default useTimeStore;
