import { beforeAll, describe, expect, test } from "vitest";
import { ensureBundlerIsReady, ensurePaymasterIsReady } from "./healthCheck";
import { foundry } from "viem/chains";
import { http } from "viem";
import {
  createBundlerClient,
  entryPoint06Address,
  entryPoint07Address,
  entryPoint08Address
} from "viem/account-abstraction";
 
describe("Test basic bundler functions", () => {

  beforeAll(async () => { 
    console.log('Starting bundler...');
    await ensureBundlerIsReady(); 
    console.log('end 1 bundler...');
    await ensurePaymasterIsReady(); 
    console.log('end 2 bundler...');
  }, 50000); // Increase timeout to 50 seconds
 
  test("Can get chainId", async () => {
    const bundlerClient = createBundlerClient({
      chain: foundry,
      transport: http("http://localhost:4337"),
    });
 
    const chainId = await bundlerClient.getChainId();
 
    expect(chainId).toEqual(foundry.id);
  });
 
  test("Can get supported entryPoints", async () => {
    const bundlerClient = createBundlerClient({
      chain: foundry,
      transport: http("http://localhost:4337"),
    });
 
    const supportedEntryPoints = await bundlerClient.getSupportedEntryPoints();
 
    expect(supportedEntryPoints).toEqual([
      entryPoint06Address,
      entryPoint07Address,
      entryPoint08Address,
    ]);
  });
});
