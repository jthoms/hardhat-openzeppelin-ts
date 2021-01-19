import { ethers, upgrades } from "hardhat";

async function main() {
  const myTokenFactory = await ethers.getContractFactory("MyToken");
  const myToken = await upgrades.deployProxy(myTokenFactory, ['My Token', 'TKN', '100000000000000000000000'], { initializer: 'initialize' });
  console.log(myToken.deployTransaction.hash);

  await myToken.deployed();
  console.log("MyToken deployed to:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
