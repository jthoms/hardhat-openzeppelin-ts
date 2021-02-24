# hardhat-openzeppelin-ts
My first steps with 
- [Hardat](https://hardhat.org/getting-started)
- [OpenZeppelin](https://docs.openzeppelin.com/learn)
- [OZ Upgradeable contracts](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable)
- [Typescript](https://hardhat.org/guides/typescript.html)
- [TypeChain](https://github.com/ethereum-ts/TypeChain)
- [Ethers](https://github.com/ethers-io/ethers.js/)
- [Waffle](https://ethereum-waffle.readthedocs.io)

Based on:
- [Hardhat Hackathon Boilerplate](https://github.com/nomiclabs/hardhat-hackathon-boilerplate)
- [Rahul Sethuram's blog post](https://rahulsethuram.medium.com/the-new-solidity-dev-stack-buidler-ethers-waffle-typescript-tutorial-f07917de48ae)
- [Typescript Solidity Dev Starter Kit](https://github.com/rhlsthrm/typescript-solidity-dev-starter-kit)
- [Solidity Template](https://github.com/paulrberg/solidity-template)

## Node via nvm
https://github.com/nvm-sh/nvm

## Quick start
```sh
git clone https://github.com/jthoms/hardhat-openzeppelin-ts.git
cd hardhat-openzeppelin-ts
npm install
# list hardhat tasks:
npx hardhat
```
Clean, compile and test:
```sh
npx hardhat clean
npx hardhat compile
npx hardhat test

npx hardhat coverage
```
## Local test deployment and upgrade

```sh
npx hardhat node
```
On a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run --network localhost scripts/create-mytoken.ts
```
Edit scripts/upgrade-mytoken.ts, replace MYTOKEN_ADDRESS_FROM_create-mytoken with deployed address from above

```sh
npx hardhat run --network localhost scripts/upgrade-mytoken.ts
```
## Rinkeby Testnet, Etherscan
Get ether on Rinkeby:
https://faucet.rinkeby.io/

Create free accounts on:
https://infura.io
https://etherscan.io

Create .env (listed in .gitignore) supplying the following values:
```sh
RINKEBY_PRIVATE_KEY=
INFURA_API_KEY=
ETHERSCAN_API_KEY=
```

```sh
npx hardhat run --network rinkeby scripts/create-mytoken.ts
```
To verify via etherscan, use the address from the .openzeppelin/rinkeby.json generated from above:
```sh
npx hardhat verify --network rinkeby <ADDRESS_FROM_.openzeppelin/rinkeby.json>
```
To upgrade, use contract address from create-mytoken.ts
Edit scripts/upgrade-mytoken.ts, replace MYTOKEN_ADDRESS_FROM_create-mytoken with deployed address from above:
```sh
npx hardhat run --network rinkeby scripts/upgrade-mytoken.ts
```
