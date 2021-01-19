import { ethers, upgrades } from "hardhat";

async function main() {
  const myTokenFactory = await ethers.getContractFactory("MyToken");
  // supply address returned from create-mytoken.ts
  const myToken = await upgrades.upgradeProxy( "MYTOKEN_ADDRESS_FROM_create-mytoken", myTokenFactory);
  console.log("MyToken upgraded:", myToken.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
