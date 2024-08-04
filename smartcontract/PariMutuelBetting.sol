// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PariMutuelBetting {
    struct Market {
        string question; // The question for the market
        string[] outcomes; // Possible outcomes for the market (e.g., ["Yes", "No"])
        mapping(string => uint256) outcomeBets; // Tracks the total amount bet on each outcome
        mapping(address => mapping(string => uint256)) userBets; // Tracks each user's bet on each outcome
        uint256 totalPool; // Total amount of Ether bet in the market
        bool resolved; // Indicates whether the market has been resolved
        string winningOutcome; // The outcome that won when the market was resolved
    }

    mapping(uint256 => Market) public markets; // Maps market IDs to their respective Market structures
    uint256 public marketCount; // Keeps track of the number of markets created

    event MarketCreated(uint256 marketId, string question, string[] outcomes);
    event BetPlaced(uint256 marketId, address indexed user, string outcome, uint256 amount);
    event MarketResolved(uint256 marketId, string winningOutcome);
    event WinningsWithdrawn(uint256 marketId, address indexed user, uint256 amount);

    function createMarket(string memory question, string[] memory outcomes) public {
        require(outcomes.length > 1, "At least two outcomes required");
        marketCount++;
        Market storage market = markets[marketCount];
        market.question = question;
        market.outcomes = outcomes;
        market.resolved = false;

        emit MarketCreated(marketCount, question, outcomes);
    }

    function placeBet(uint256 marketId, string memory outcome) public payable {
        Market storage market = markets[marketId];
        require(!market.resolved, "Market already resolved");
        require(msg.value > 0, "Must send Ether to place bet");

        market.outcomeBets[outcome] += msg.value;
        market.userBets[msg.sender][outcome] += msg.value;
        market.totalPool += msg.value;

        emit BetPlaced(marketId, msg.sender, outcome, msg.value);
    }

    function resolveMarket(uint256 marketId, string memory winningOutcome) public {
        Market storage market = markets[marketId];
        require(!market.resolved, "Market already resolved");

        market.resolved = true;
        market.winningOutcome = winningOutcome;

        emit MarketResolved(marketId, winningOutcome);
    }

    function withdrawWinnings(uint256 marketId) public {
        Market storage market = markets[marketId];
        require(market.resolved, "Market not yet resolved");

        uint256 userBet = market.userBets[msg.sender][market.winningOutcome];
        require(userBet > 0, "No winnings to withdraw");

        uint256 totalBetsOnWinner = market.outcomeBets[market.winningOutcome];
        uint256 winnings = (market.totalPool * userBet) / totalBetsOnWinner;
        market.userBets[msg.sender][market.winningOutcome] = 0; // Prevent re-entrancy

        payable(msg.sender).transfer(winnings);

        emit WinningsWithdrawn(marketId, msg.sender, winnings);
    }

    function getMarketDetails(uint256 marketId) public view returns (string memory, string[] memory, bool, string memory, uint256) {
        Market storage market = markets[marketId];
        return (market.question, market.outcomes, market.resolved, market.winningOutcome, market.totalPool);
    }

    function getUserBet(uint256 marketId, string memory outcome) public view returns (uint256) {
        Market storage market = markets[marketId];
        return market.userBets[msg.sender][outcome];
    }
}
