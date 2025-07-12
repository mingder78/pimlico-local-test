import { createBundlerClient } from "viem/account-abstraction";
import { http } from "viem";
import { foundry } from "viem/chains";
 
export const ensureBundlerIsReady = async () => {
  const bundlerClient = createBundlerClient({
    chain: foundry,
    transport: http("http://localhost:4337"),
  });
 
  while (true) {
    try {
      await bundlerClient.getChainId();
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};
 
export const ensurePaymasterIsReady = async () => {
  while (true) {
    try {
      // mock paymaster will open up this endpoint when ready
      const res = await fetch(`http://localhost:3000/ping`);
      const data = await res.json();
      if (data.message !== "pong") {
        throw new Error("paymaster not ready yet");
      }
 
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};
