import { ethers } from 'hardhat'
import type { SimpleContract } from '../@types'

async function main() {
  // ---- Deployer Account  -----
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with account:', deployer.address)

  const balance = await deployer.getBalance()
  console.log('Account balance: ', balance.toString())

  // ----- Deploy Token SimpleContract -----
  const _SimpleContract = await ethers.getContractFactory('SimpleContract')
  const contract = (await _SimpleContract.deploy()) as SimpleContract

  console.log('SimpleContract deployed at:', contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
