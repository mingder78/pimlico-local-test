import { createPimlicoClient } from "permissionless/clients/pimlico";
import { http, createPublicClient } from "viem";
import { createBundlerClient, entryPoint07Address } from "viem/account-abstraction"
import { foundry } from "viem/chains";
 
const publicClient = createPublicClient({
  chain: foundry,
  transport: http("http://localhost:8545"), 
});
 
const bundlerClient = createBundlerClient({
  chain: foundry,
  transport: http("http://localhost:4337") 
});
 
const pimlicoClient = createPimlicoClient({
    transport: http("http://localhost:3000"),  
    entryPoint: {
        address: entryPoint07Address,
        version: "0.7",
    }
})
