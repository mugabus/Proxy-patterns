// ignition/modules/CounterModule.ts

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CounterModule = buildModule("CounterModule", (m) => {
  const counter = m.contract("CounterV1", []);

  return { counter };
});

export default CounterModule;
