// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract VerificationContract {

    address public govt; 
    constructor()
    {
        govt = msg.sender;
    }

    mapping (uint256 => BuyerDetails) aadharToBuyer;
    mapping (uint256 => SellerDetails) aadharToSeller;
    mapping (string => uint256) price;

    struct BuyerMontlyQuota
    {
        uint256 rice;
        uint256 wheat;
        uint256 oil;
    }

    struct SellerStock
    {
        uint256 rice;
        uint256 wheat;
        uint256 oil;
    }

    struct BuyerDetails
    {
        bool isBuyer;
        uint256 aadharNumber;
        string category;
        BuyerMontlyQuota buyerMonthlyQuota;
    }

    struct SellerDetails
    {
        bool isSeller;
        uint256 aadharNumber;
        SellerStock sellerStock;
    }    

    struct Item
    {
        uint256 itemName;
        uint256 totalNumber;
    }

    //Mock Seller and Buyer

    function mocklistSeller() public returns (bool) 
    {
        aadharToSeller[100] = SellerDetails(
            true,
            100,
            SellerStock
            (
                50,
                50,
                40
            )
        );
        return true;
    }

    function mocklistBuyer() public returns (bool) 
    {
        aadharToBuyer[101] = BuyerDetails(
            true,
            100,
            "category1",
            BuyerMontlyQuota
            (
                5,
                5,
                4
            )
        );
        return true;
    }

    function setPrice() public returns (bool)
    {
        price["rice"] = 5;
        price["wheat"] = 5;
        price["oil"] = 10;
        return true;
    }


    // Functions
    function verifySeller(uint256 _aadharNumber) public view returns(bool)
    {
        return aadharToSeller[_aadharNumber].isSeller == true; 
    }

    function verifyBuyer(uint256 _aadharNumber) public view returns(bool)
    {
        return aadharToBuyer[_aadharNumber].isBuyer == true;
    }

    function getBuyerCurrentMonthlyQuota(uint256 _aadharNumber ) public view returns
    (
        BuyerMontlyQuota memory _buyerMonthlyQuota
    )
    {
        _buyerMonthlyQuota = aadharToBuyer[_aadharNumber].buyerMonthlyQuota; 
    }

    function getSellerCurrentStock(uint256 _aadharNumber ) public view returns
    (
        SellerStock memory _sellerStock
    )
    {
        _sellerStock = aadharToSeller[_aadharNumber].sellerStock; 
    }

    function priceCalc(uint256 _rice, uint256 _wheat, uint256 _oil) public view returns(uint256)
    {
        uint256 cost = 0;
        cost = cost + price["rice"]*_rice;
        cost = cost + price["wheat"]*_wheat; 
        cost = cost + price["oil"]*_oil;
        return cost * 1 ether; 
    }

    // function replenishBuyerMonthlyQuota(uint256 _aadharNumber) public returns(bool success)
    // {
    //     if(aadharToBuyer[_aadharNumber].category == "category1")
    //     { 
    //         aadharToBuyer[_aadharNumber].buyerMonthlyQuota.rice =  5;
    //         aadharToBuyer[_aadharNumber].buyerMonthlyQuota.wheat = 5;
    //         aadharToBuyer[_aadharNumber].buyerMonthlyQuota.oil = 4;
    //     }
    //     else if(aadharToBuyer[_aadharNumber].category == "category2")
    //     {
    //         aadharToBuyer[_aadharNumber].buyerMonthlyQuota.rice =  3;
    //         aadharToBuyer[_aadharNumber].buyerMonthlyQuota.wheat = 5;
    //         aadharToBuyer[_aadharNumber].buyerMonthlyQuota.oil = 3;    
    //     }
    //     else
    //     {
    //         aadharToBuyer[_aadharNumber].buyerMonthlyQuota.rice =  2;
    //         aadharToBuyer[_aadharNumber].buyerMonthlyQuota.wheat = 2;
    //         aadharToBuyer[_aadharNumber].buyerMonthlyQuota.oil = 1;       
    //     }        
    // }

    function buy(uint256 _buyerAadharNumber, uint256 _sellerAadharNumber,  uint256 _rice, uint256 _wheat, uint256 _oil) public payable
    {
        uint256 _totalCost = priceCalc(_rice,_wheat,_oil);
        require(msg.value ==   _totalCost);
        payable(govt).transfer(msg.value);

        aadharToBuyer[_buyerAadharNumber].buyerMonthlyQuota.rice -=  _rice;
        aadharToBuyer[_buyerAadharNumber].buyerMonthlyQuota.wheat -= _wheat;
        aadharToBuyer[_buyerAadharNumber].buyerMonthlyQuota.oil -= _oil;

        aadharToSeller[_sellerAadharNumber].sellerStock.rice -= _rice;
        aadharToSeller[_sellerAadharNumber].sellerStock.wheat -= _wheat;
        aadharToSeller[_sellerAadharNumber].sellerStock.oil -= _oil;  
 
    }

    function addToSellerStock(uint256 _aadharNumber, uint256 _rice, uint256 _wheat, uint256 _oil) public payable 
    {
        uint256 _totalCost = priceCalc(_rice,_wheat,_oil);
        require(msg.value ==   _totalCost);
        payable(govt).transfer(msg.value);
        aadharToSeller[_aadharNumber].sellerStock.rice += _rice;
        aadharToSeller[_aadharNumber].sellerStock.wheat += _wheat;
        aadharToSeller[_aadharNumber].sellerStock.oil += _oil;  
    }    
}