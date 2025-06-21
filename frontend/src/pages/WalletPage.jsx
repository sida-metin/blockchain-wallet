import React, { useState } from "react";
import { ethers } from "ethers";

const WalletPage = () => {
    const [wallet, setWallet]= useState(null); // for keeping track of the wallet
    const createWallet = async () => {
        const wallet = ethers.Wallet.createRandom();

        const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/841e9040409244cab0f455e38d94ef07"); 
        const rawBalance = await provider.getBalance(wallet.address);
        const balanceInEth = ethers.utils.formatEther(rawBalance);

        setWallet({
            address: wallet.address,
            mnemonic: wallet.mnemonic.phrase,
            privateKey: wallet.privateKey,
            balance: balanceInEth,
        });
    }

    return (
    <div style={{ padding: "20px" }}>
      <h2>Blockchain Wallet</h2>

      {/* Buton – tıklanınca createWallet fonksiyonu çalışır */}
      <button onClick={createWallet}>Yeni Cüzdan Oluştur</button>

      {/* Eğer wallet oluşturulduysa, bilgileri göster */}
      {wallet && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Adres:</strong> {wallet.address}</p>
          <p><strong>Mnemonic:</strong> {wallet.mnemonic}</p>
          <p><strong>Private Key:</strong> {wallet.privateKey}</p>
          <p><strong>Bakiye:</strong> {wallet.balance} ETH</p>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
