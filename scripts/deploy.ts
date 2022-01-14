import { ethers } from 'hardhat'
import type { Token, NFTFactory } from '../@types'

async function main() {
  // ---- Deployer Account  -----
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with account:', deployer.address)

  const balance = await deployer.getBalance()
  console.log('Account balance: ', balance.toString())

  // ----- Deploy Token Contract -----
  const _Token = await ethers.getContractFactory('Token')
  const token = (await _Token.deploy()) as Token

  console.log('Token deployed at:', token.address)

  // ----- Deploy NFT Contract -----
  const _NFTFactiry = await ethers.getContractFactory('NFTFactory')
  const nftFactory = (await _NFTFactiry.deploy()) as NFTFactory

  console.log('NFTFactory deployed at:', nftFactory.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
