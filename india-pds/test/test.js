describe("Verification", function() {
  it("Should create and execute Verification Contract", async function() {
    /* deploy the marketplace */
    const Verification = await ethers.getContractFactory("Verification")
    const verification = await Verification.deploy()
    await verification.deployed()

    console.log(verification);

    // const ans = await verification.verifyBuyer();
    // listingPrice = listingPrice.toString()

    // const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    // /* create two tokens */
    // await nftMarketplace.createToken("https://www.mytokenlocation.com", auctionPrice, { value: listingPrice })
    // await nftMarketplace.createToken("https://www.mytokenlocation2.com", auctionPrice, { value: listingPrice })

    // const [_, buyerAddress] = await ethers.getSigners()

    // /* execute sale of token to another user */
    // await nftMarketplace.connect(buyerAddress).createMarketSale(1, { value: auctionPrice })

    // /* resell a token */
    // await nftMarketplace.connect(buyerAddress).resellToken(1, auctionPrice, { value: listingPrice })

    // /* query for and return the unsold items */
    // items = await nftMarketplace.fetchMarketItems()
    // items = await Promise.all(items.map(async i => {
    //   const tokenUri = await nftMarketplace.tokenURI(i.tokenId)
    //   let item = {
    //     price: i.price.toString(),
    //     tokenId: i.tokenId.toString(),
    //     seller: i.seller,
    //     owner: i.owner,
    //     tokenUri
    //   }
    //   return item
    // }))
    // console.log('items: ', items)
  })
})
