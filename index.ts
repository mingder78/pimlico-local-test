import { createPimlicoClient } from "permissionless/clients/pimlico";
import { erc20Abi, parseEther, http, createPublicClient } from "viem";
import { createBundlerClient, entryPoint07Address } from "viem/account-abstraction"
import { foundry } from "viem/chains";
import { toSimpleSmartAccount } from 'permissionless/accounts'
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"

const PRIVATE_KEY =
  process.env.PRIVATE_KEY
const BUNDLER_URL =
  process.env.BUNDLER_URL ??
  'https://api.pimlico.io/v2/11155111/rpc?apikey=PIMLICO_API_KEY' // Sepolia
 
const publicClient = createPublicClient({
  chain: foundry,
  transport: http("http://localhost:8545"), 
});
 
const bundlerClient = createBundlerClient({
  chain: foundry,
  //transport: http(BUNDLER_URL)
  transport: http("http://localhost:4337") 
});

    const supportedEntryPoints = await bundlerClient.getSupportedEntryPoints();
const id = await bundlerClient.getChainId();
 
const pimlicoClient = createPimlicoClient({
    transport: http("http://localhost:3000"),  
    entryPoint: {
        address: entryPoint07Address,
        version: "0.7",
    }
})

const owner = privateKeyToAccount(PRIVATE_KEY)

const account = await toSimpleSmartAccount({
  client: publicClient,
  owner,                       // single‑sig owner
  entryPoint: {                // use v0.7 EntryPoint
    address: entryPoint07Address,
    version: '0.7',
  },
})
// A sample ERC‑20 on Sepolia (replace with your own)
const TOKEN: Address = '0xFab46E002BbF0b4509813474841E0716E6730136'

const RECIPIENT: Address = '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
const SPENDER: Address = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' // '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69'
const AMOUNT = parseEther('0.0001') // 1 token (assuming 18 decimals)

const calls = [
  {
    abi: erc20Abi,
    functionName: 'approve',
    args: [SPENDER, AMOUNT],
    to: TOKEN,
  },
  {
    abi: erc20Abi,
    functionName: 'transfer',
    args: [RECIPIENT, AMOUNT],
    to: TOKEN,
  },
]

const hash = await bundlerClient.sendUserOperation({
  account,
  calls,
}) // → submits to the bundler :contentReference[oaicite:0]{index=0}

console.log('UserOp hash →', hash)
