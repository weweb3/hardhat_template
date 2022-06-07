import { ethers } from 'hardhat'
import type { Contract } from '../@types'

async function main() {
  // ---- Deployer Account  -----
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with account:', deployer.address)

  const balance = await deployer.getBalance()
  console.log('Account balance: ', balance.toString())

  // ----- Deploy Token Contract -----
  const _Contract = await ethers.getContractFactory('Contract')
  const contract = (await _Contract.deploy()) as Contract

  console.log('Contract deployed at:', contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
