const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Wallet', function () {
    let Wallet, wallet, owner, other;
    // Her testten önce çalışacak
    beforeEach(async() => {
        const Wallet = await ethers.getContractFactory('Wallet'); // kontraktı al
        [owner, other] = await ethers.getSigners(); // kullanıcılar
        wallet = await Wallet.connect(owner).deploy(); // deploy
        await wallet.waitForDeployment(); // blockchain'e yaz
    });

    // Testler
    it("should assign the deployer as owner", async () => {
        expect( await wallet.owner()).to.equal(owner.address); // deploy edenin owner olduğunu kontrol et
    });

    it("should accept ETH and update balances", async() => {
        const walletAddress = await wallet.getAddress(); // cüzdan adresini al
        // console.log("Cüzdan Adresi:", walletAddress); --> adresin varlığını kontrol et
        const initialBalance = await ethers.provider.getBalance(walletAddress); // başlangıç bakiyesi
        const depositAmount = ethers.parseEther("1.0"); // 1 ETH

        // ETH gönder
        await owner.sendTransaction({
            to: walletAddress,
            value: depositAmount
        });

        const newBalance = await ethers.provider.getBalance(walletAddress); // yeni bakiye
        expect(newBalance).to.equal(initialBalance + depositAmount);
    });
});
