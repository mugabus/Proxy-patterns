import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Contract, Signer } from "ethers";

describe("Counter Upgradeable", function () {
  let owner: Signer;
  let otherAccount: Signer;
  let counterProxy: Contract;

  async function deployCounterV1Fixture() {
    [owner, otherAccount] = await ethers.getSigners();

    const CounterV1 = await ethers.getContractFactory("CounterV1");
    counterProxy = await upgrades.deployProxy(CounterV1, [], {
      initializer: "initialize",
    });

    return { counterProxy, owner, otherAccount };
  }

  describe("Deployment & V1 Functionality", function () {
    it("Should initialize count to 0", async function () {
      const { counterProxy } = await deployCounterV1Fixture();
      expect(await counterProxy.getCount()).to.equal(0);
    });

    it("Should increment the counter", async function () {
      const { counterProxy } = await deployCounterV1Fixture();
      await counterProxy.increment();
      expect(await counterProxy.getCount()).to.equal(1);
    });

    it("Should decrement the counter", async function () {
      const { counterProxy } = await deployCounterV1Fixture();
      await counterProxy.increment();
      await counterProxy.decrement();
      expect(await counterProxy.getCount()).to.equal(0);
    });

    it("Should revert when decrementing at 0", async function () {
      const { counterProxy } = await deployCounterV1Fixture();
      await expect(counterProxy.decrement()).to.be.revertedWith(
        "the count is already zero"
      );
    });
  });

  describe("Upgrade to CounterV2", function () {
    it("Should retain state and support new logic after upgrade", async function () {
      const { counterProxy } = await deployCounterV1Fixture();

      await counterProxy.increment();
      await counterProxy.increment();
      expect(await counterProxy.getCount()).to.equal(2);

      const CounterV2 = await ethers.getContractFactory("CounterV2");
      const upgraded = await upgrades.upgradeProxy(counterProxy.address, CounterV2);

      expect(await upgraded.getCount()).to.equal(2);

      await upgraded.decrement();
      expect(await upgraded.getCount()).to.equal(1);
    });

    it("Should revert on decrement below 0 using V2", async function () {
      const { counterProxy } = await deployCounterV1Fixture();

      const CounterV2 = await ethers.getContractFactory("CounterV2");
      const upgraded = await upgrades.upgradeProxy(counterProxy.address, CounterV2);

      await expect(upgraded.decrement()).to.be.revertedWith("Underflow");
    });
  });
});
