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

const initialProps: State = {
  fromTimeZone: "UTC",
  fromOffset: 0,
  toTimeZone: "UTC",
  toOffset: 0,
  selectedTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
  mode: "timezone",
};

const useTimeStore = create<State & Action>((set) => ({
  ...initialProps,
  updateTimeZone: (timeZone, to) =>
    set(() => (to ? { toTimeZone: timeZone } : { fromTimeZone: timeZone })),

  updateOffset: (offset, to) =>
    set(() => (to ? { toOffset: offset } : { fromOffset: offset })),

  setMode: (mode) =>
    set((state) => {
      return {
        mode,
        fromOffset: mode === "location" ? 0 : state.fromOffset,
        toOffset: mode === "location" ? 0 : state.toOffset,
      };
    }),
  setSelectedTime: (time) => set({ selectedTime: time }),
}));

export default useTimeStore;
