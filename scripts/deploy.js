const { ethers } = require("hardhat");

async function main() {
  const Wallet = await ethers.getContractFactory("Wallet");    
  const wallet = await Wallet.deploy();                         
  await wallet.waitForDeployment();                             

  const address = await wallet.getAddress();                  
  console.log("✅ Contract deployed to:", address);
}

main().catch((error) => {
  console.error("🚨 Hata oluştu:", error);
  process.exitCode = 1;
});
