import { Exercise } from "../types";

export const exercises: Exercise[] = [
  {
    id: "squats",
    name: "深蹲 (Squats)",
    defaultSets: 3,
    defaultReps: 12,
    defaultRest: 60,
  },
  {
    id: "pushups",
    name: "俯卧撑 (Push-ups)",
    defaultSets: 3,
    defaultReps: 12,
    defaultRest: 60,
  },
  {
    id: "plank",
    name: "平板支撑 (Plank)",
    defaultSets: 3,
    defaultReps: 1,
    defaultRest: 30,
  },
];
