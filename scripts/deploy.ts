import { ethers } from 'hardhat'
import { Token } from '../contracts/types'

async function main() {
  // ---- Deployer Account  -----
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with account:', deployer.address)

  const balance = await deployer.getBalance()
  console.log('Account balance: ', balance.toString())

  // ----- Token Contract -----
  const token = (await (
    await ethers.getContractFactory('Token')
  ).deploy()) as Token
  console.log('Token Address: ', token.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
