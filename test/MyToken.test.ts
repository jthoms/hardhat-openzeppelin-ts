import { ethers, upgrades } from "hardhat";
import chai from "chai";
import { MyToken__factory, MyToken } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

const { expect } = chai;

let myTokenFactory: MyToken__factory;
let myToken: MyToken;
let owner: SignerWithAddress;
let addr1: SignerWithAddress;
let addr2: SignerWithAddress;
let addrs: SignerWithAddress[];

describe("MyToken", () => {

    beforeEach(async () => {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        myTokenFactory = (await ethers.getContractFactory(
            'MyToken',
            owner
        )) as MyToken__factory;

        myToken = (await upgrades.deployProxy(
            myTokenFactory,
            ['My Token', 'TKN', '100000000000000000000000'],
            { initializer: 'initialize' }
        )) as MyToken;

        await myToken.deployed();

        expect(myToken.address).to.properAddress;
        expect(await myToken.name()).to.equal('My Token');
    });

    describe("Deployment", async () => {
        it("Should set the right owner", async () => {
            expect(await myToken.owner()).to.equal(owner.address);
        });

        it("Should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await myToken.balanceOf(owner.address);
            expect(await myToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", async () => {
        it("Should transfer tokens between accounts", async () => {
            await expect(myToken.transfer(addr1.address, 50))
                .to.emit(myToken, 'Transfer')
                .withArgs(owner.address, addr1.address, 50);

            const addr1Balance = await myToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            await expect(myToken.connect(addr1).transfer(addr2.address, 50))
                .to.emit(myToken, 'Transfer')
                .withArgs(addr1.address, addr2.address, 50);
            const addr2Balance = await myToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50)
        });

        it("Should fail if sender doesn’t have enough tokens", async () => {
            const initialOwnerBalance = await myToken.balanceOf(owner.address);
            await expect(myToken.connect(addr1).transfer(owner.address, 1))
                .to.be.revertedWith("revert ERC20: transfer amount exceeds balance");
            expect(await myToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        });

        it("Should update balances after transfers", async () => {
            const initialOwnerBalance = await myToken.balanceOf(owner.address);
            await myToken.transfer(addr1.address, 100);
            await myToken.transfer(addr2.address, 50);

            const finalOwnerBalance = await myToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

            const addr1Balance = await myToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);

            const addr2Balance = await myToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });
    });

    describe("Upgrade", async () => {
        it("should upgrade myToken", async () => {
            const myTokenAddress = myToken.address;
            myToken = (await upgrades.upgradeProxy(
                myToken.address, myTokenFactory
            )) as MyToken;
            expect(myToken.address).to.properAddress;
            expect(myToken.address).to.equal(myTokenAddress);
        });
    });
});

