"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ExternalLink } from "lucide-react";
import contractABI from "@/data/abi.json";

// Add type declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (params: any) => void) => void;
      removeListener: (event: string, callback: (params: any) => void) => void;
    };
  }
}

const MintButton = () => {
  const [status, setStatus] = useState<
    "idle" | "connecting" | "minting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");

  const contractAddress = "0x84f46ebCe18EF189919868eb759ad7a811cC69B7";

  // Add the missing switchToAmoyNetwork function
  const switchToAmoyNetwork = async (): Promise<void> => {
    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    try {
      // Try to switch to Amoy network
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13882" }], // 80002 in hex
      });
    } catch (switchError: any) {
      // If the network doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13882", // 80002 in hex
                chainName: "Polygon Amoy",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc-amoy.polygon.technology"],
                blockExplorerUrls: ["https://amoy.polygonscan.com"],
              },
            ],
          });
        } catch (addError) {
          throw new Error("Failed to add Amoy network");
        }
      } else {
        throw new Error("Failed to switch to Amoy network");
      }
    }
  };

  const mintNFT = async (): Promise<void> => {
    if (!window?.ethereum) {
      setError("Please install MetaMask to mint NFTs");
      setStatus("error");
      return;
    }

    setStatus("connecting");
    setError("");
    setTxHash("");

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found. Please connect your wallet.");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Get the current account
      const address = await signer.getAddress();
      console.log("Connected address:", address);

      const network = await provider.getNetwork();
      if (network.chainId !== 80002) {
        await switchToAmoyNetwork();
        await provider.send("eth_requestAccounts", []);
      }

      // Get balance before minting
      const balance = await provider.getBalance(address);
      console.log(
        "Account balance:",
        ethers.utils.formatEther(balance),
        "MATIC"
      );

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      setStatus("minting");

      // Try to get current gas price
      const gasPrice = await provider.getGasPrice();
      console.log(
        "Current gas price:",
        ethers.utils.formatUnits(gasPrice, "gwei"),
        "gwei"
      );

      // Prepare the mint transaction
      const mintTx: ethers.providers.TransactionRequest = {
        to: contractAddress,
        from: address,
        gasLimit: ethers.utils.hexlify(500000), // Increased gas limit
        gasPrice: gasPrice,
        data: contract.interface.encodeFunctionData("mint", []), // Encode the mint function call
      };

      console.log("Sending transaction:", mintTx);

      try {
        // First try to estimate gas to check if the transaction will fail
        const estimatedGas = await provider.estimateGas(mintTx);
        console.log("Estimated gas:", estimatedGas.toString());
        mintTx.gasLimit = estimatedGas.mul(120).div(100); // Add 20% buffer
      } catch (gasError) {
        console.error("Gas estimation failed:", gasError);
        // Continue with default gas limit if estimation fails
      }

      // Send transaction
      const tx = await signer.sendTransaction(mintTx);
      console.log("Transaction sent:", tx.hash);
      setTxHash(tx.hash);

      // Wait for confirmation
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);
      setStatus("success");
    } catch (err: any) {
      console.error("Minting error:", err);

      // More detailed error handling
      let errorMessage = "Minting failed. Please try again.";

      if (err.message?.includes("user rejected")) {
        errorMessage = "Transaction was rejected by user";
      } else if (err.error?.message) {
        errorMessage = `Contract error: ${err.error.message}`;
      } else if (err.data?.message) {
        errorMessage = `RPC error: ${err.data.message}`;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={mintNFT}
        disabled={status === "connecting" || status === "minting"}
        className={`${
          status === "success" || (status === "error" && "hidden")
        } w-full bg-slate-100 rounded text-black hover:text-black hover:bg-slate-50`}
      >
        {status === "connecting" && (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting Wallet...
          </>
        )}
        {status === "minting" && (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Minting NFT...
          </>
        )}
        {status === "idle" && "Mint NFT"}
        {/* {status === "success" && "Mint Another"}
        {status === "error" && "Try Again"} */}
      </Button>

      {/* {error && (
        <Alert variant="destructive" className="w-full">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )} */}

      {txHash && (
        <Alert className="w-full bg-slate-100 hover:bg-slate-50 text-black">
          <AlertDescription className="flex items-center gap-2">
            <span className="font-semibold">View on Explorer</span>
            <a
              href={`https://amoy.polygonscan.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center"
            >
              {txHash.slice(0, 6)}...{txHash.slice(-4)}
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default MintButton;
