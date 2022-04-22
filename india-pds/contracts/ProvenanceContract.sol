// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract ProvenanceContract 
{
    struct LocationDetails
    {
        uint weight;
        string locationX;
        string locationY;
    }
    mapping(string => LocationDetails[]) rfidtoLocation;
    
    //total number of places it has been
    function getLocationSize(string memory rfid) public view returns(uint256){
        return rfidtoLocation[rfid].length;
    }
    
    //get current location
    function getCurrentLocation(string memory rfid, uint index) public view returns (
        uint _weight,
        string memory _locationX,
        string memory _locationY
    ){
        require(index < rfidtoLocation[rfid].length, "Index out of range");
        _weight = rfidtoLocation[rfid][index].weight;
        _locationX = rfidtoLocation[rfid][index].locationX;
        _locationY = rfidtoLocation[rfid][index].locationY;
    }
    
    //add location
    function addLocation(string memory rfid, uint _weight, string memory _locationX, string memory _locationY) public{
        LocationDetails memory locationDetails = LocationDetails(
            {
                weight:_weight,
                locationX:_locationX,
                locationY:_locationY
            }
        );
        rfidtoLocation[rfid].push(locationDetails);
    }    
}