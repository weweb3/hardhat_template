import { ethers } from 'hardhat'
import { expect } from 'chai'
import { SimpleContract, SimpleContract__factory } from '../@types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe('Test SimpleContract', () => {
  let owner: SignerWithAddress
  let contractFac: SimpleContract__factory
  let contract: SimpleContract
  beforeEach(async () => {
    ;[owner] = await ethers.getSigners()

    contractFac = (await ethers.getContractFactory(
      'Token',
    )) as SimpleContract__factory
    contract = await contractFac.deploy()
  })

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await contract.owner()).to.equal(owner.address)
    })
  })
})
