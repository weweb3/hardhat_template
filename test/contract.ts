import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Token, Token__factory } from '../@types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe('Test Contract', () => {
  let owner: SignerWithAddress
  let TokenFac: Token__factory
  let token: Token
  beforeEach(async () => {
    ;[owner] = await ethers.getSigners()

    TokenFac = (await ethers.getContractFactory('Token')) as Token__factory
    token = await TokenFac.deploy()
  })

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await token.owner()).to.equal(owner.address)
    })
    it('Should assign the total supply of tokens to the owner', async () => {
      const ownerBalance = await token.balanceOf(owner.address)
      expect(ownerBalance).to.equal(await token.totalSupply())
    })
  })
})
