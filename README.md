# VERIDICT

## Overview

**VERIDICT** is a decentralized pari-mutuel betting platform aimed at revolutionizing the prediction market. Built on blockchain technology, it offers a transparent, trustless, and efficient betting experience. This README provides an overview of the platform, its features, technical architecture, market potential, revenue model, upcoming plans, and instructions for running the Next.js project.

## Contract Addresses

The smart contract for **BetBazaar** is deployed on the Hedera Testnet at the following address:

- **Hedera Testnet:** `0xAaa906c8C2720c50B69a5Ba54B44253Ea1001C98`

## Table of Contents

1. [Introduction](#introduction)
2. [How Pari-Mutuel Algorithm Works](#how-pari-mutuel-algorithm-works)
3. [Platform Features](#platform-features)
4. [Technical Architecture](#technical-architecture)
5. [Market Potential](#market-potential)
6. [Revenue Model](#revenue-model)
7. [Upcoming Features](#upcoming-features)
8. [Contract Addresses](#contract-addresses)
9. [Running the Project](#running-the-project)
10. [Contributing](#contributing)
11. [License](#license)

## Introduction

**VERIDICT** is a prediction market based on a pari-mutuel algorithm, designed to provide a fair and transparent betting environment. The platform is set to transform the prediction market industry with its innovative approach.

- **Name:** MX
- **Date:** 20.Aug 2024
- **Goal:** Revolutionizing the Prediction Market

## How Pari-Mutuel Algorithm Works

The pari-mutuel betting system pools all bets of a particular type into a single pool. Payouts are then distributed proportionally based on the amount bet on each outcome. Here's how the process works:

1. **Collect Bets:** Aggregate all bets placed on the specific event into a single pool.
2. **Apply Deductions:** Subtract the house takeout, taxes, and any other fees from the total pool.
3. **Determine Winning Bets:** Identify which bets are winners based on the event outcome.
4. **Calculate Payouts:** Distribute the net pool among the winning bets proportionally.

   ```
   Payout per Winning Bet = (Net Pool / Total Amount Bet on Winning Outcome) * Amount Bet on Individual Winning Bet
   ```

5. **Distribute Winnings:** Payout amounts are credited to the accounts of those holding winning bets.

## Platform Features

**BetBazaar** offers several key features:

- **Decentralization:** Powered by smart contracts on Ethereum, eliminating the need for intermediaries.
- **Transparency:** All bets and market resolutions are recorded on the blockchain, ensuring fairness and visibility.
- **Automatic Payouts:** Winnings are automatically distributed once a market is resolved.
- **Low Fees:** Reduced operational costs due to the lack of intermediaries.
- **User-friendly Interface:** Easy to create markets, place bets, and withdraw winnings.

## Technical Architecture

The technical infrastructure of **BetBazaar** includes:

- **Blockchain:** Hedera
- **Subgraph:** Data provider

## Market Potential

**VERIDICT** is positioned to tap into a vast market:

- **Industry Size:** Predicted $500 billion by 2028
- **Target Audience:** Crypto enthusiasts, sports bettors, eSports fans, and casual gamblers seeking transparency and fairness.
- **Competitive Advantage:** Trustless environment, lower operational costs, and global accessibility.

## Revenue Model

**VERIDICT** generates revenue through:

- **Fee Structure:** Small fees on each transaction (e.g., a percentage of the total pool).
- **Additional Revenue Streams:** Partnerships, sponsored markets, or premium features.
- **Growth Potential:** Strategies for user acquisition and retention to drive platform growth.

## Upcoming Features

**VERIDICT** has an exciting roadmap:

- **Phase 1:** Using oracle to resolve markets
- **Phase 1.1:** Going Crosschain (Wormhole)
- **Phase 2:** Feature Expansion - Introducing advanced features like analytics, multi-crypto support, and mobile apps.
- **Phase 3:** Community & Partnerships - Building a strong user base and forming strategic partnerships.
- **Phase 4:** Global Scaling - Expanding the platform’s reach to new markets.

## Running the Project

To run the **BetBazaar** Next.js project locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/betbazaar.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd VERIDICT
   ```

3. **Install Dependencies:**

   Ensure you have [Node.js](https://nodejs.org/) installed. Then run:

   ```bash
   yarn
   ```

4. **Set Up Environment Variables:**

   Create a `.env.local` file in the root directory and add your environment variables. Refer to `.env.example` for required variables.

5. **Run the Development Server:**

   ```bash
   yarn dev
   ```

   This will start the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

6. **Build for Production:**

   To build the project for production, run:

   ```bash
   yarn build
   ```

   After building, you can start the production server with:

   ```bash
   yarn dev
   ```

## Contributing

We welcome contributions to improve **BetBazaar**. Please refer to our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

**VERIDICT** is licensed under the [MIT License](LICENSE).

---

Feel free to adjust any specifics related to your project setup and development practices.