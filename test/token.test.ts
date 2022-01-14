import { ethers } from 'hardhat'
import { expect } from 'chai'
import { Token, Token__factory } from '../@types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe('Token Contract', () => {
  let owner: SignerWithAddress, acc1: SignerWithAddress, acc2: SignerWithAddress
  let TokenFac: Token__factory
  let token: Token
  beforeEach(async () => {
    ;[owner, acc1, acc2] = await ethers.getSigners()

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

  describe('Transactions', () => {
    it('Should transfer tokens between accounts', async () => {
      let amountOfTokens = 50
      await token.transfer(acc1.address, amountOfTokens)
      const acc1Bal = await token.balanceOf(acc1.address)
      expect(acc1Bal).to.equal(amountOfTokens)

      amountOfTokens = 20
      await token.connect(acc1).transfer(acc2.address, amountOfTokens)
      const acc2Bal = await token.balanceOf(acc2.address)
      expect(acc2Bal).to.equal(amountOfTokens)
    })

    it('Should fail if sender doesnt have enough tokens', async () => {
      const initialOwnerBal = await token.balanceOf(owner.address)

      await expect(
        token.connect(acc1).transfer(owner.address, 1),
      ).to.be.revertedWith('Not enough tokens')

      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBal)
    })

    it('Should update account balance after transfer', async () => {
      const initialOwnerBal = await token.balanceOf(owner.address)

      const amount1 = 100
      await token.transfer(acc1.address, amount1)
      expect(await token.balanceOf(acc1.address)).to.equal(amount1)

      const amount2 = 50
      await token.transfer(acc2.address, amount2)
      expect(await token.balanceOf(acc2.address)).to.equal(amount2)

      expect(await token.balanceOf(owner.address)).to.equal(
        initialOwnerBal.sub(amount1 + amount2),
      )
    })
  })
})
