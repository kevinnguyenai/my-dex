// deploy/00_deploy_your_contract.js

const { utils } = require("ethers");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  let tokenDeployResult = await deploy("YourContract", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: [ utils.parseEther("10000") ],
    log: true,
  });

  await deploy("YourDEX", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    args: [tokenDeployResult.address],
    log: true,
  });

  // Getting a previously deployed contract
  const YourContract = await ethers.getContract("YourContract", deployer);
  await YourContract.transfer(
    "0x298D799551f223C7497B17227db502b5A31f27f5",
    "" + 100 * 10 ** 18
  );
  // uncomment to init DEX on deploy
  const DexContract = await ethers.getContract("YourDEX", deployer);
  console.log(
    "Approving DEX (" +
      DexContract.address +
      ") to take some Rabbit from main account..."
  );
  await YourContract.approve(DexContract.address, utils.parseEther("100"));
  console.log("Init exchange...");
  await DexContract.init(utils.parseEther("5"), {
    value: utils.parseEther("5"),
  });
  // await YourContract.setPurpose("Hello");

  //const yourContract = await ethers.getContractAt('YourContract', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
};
module.exports.tags = ["YourContract"];
