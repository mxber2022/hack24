"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';

const MY_QUERY = gql`
  query MyQuery {
    marketCreateds {
      marketId
      outcomes
      question
    }
  }
`;

interface MarketCreated {
  marketId: string;
  outcomes: string; // outcomes is a string
  question: string;
}

interface MyQueryData {
  marketCreateds: MarketCreated[];
}

function GetmarketList() {
  const { loading, error, data } = useQuery<MyQueryData>(MY_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleButtonClick = (marketId: string, outcome: string) => {
    console.log(`Market ID: ${marketId}, Outcome: ${outcome}`);
  };

  return (
    <div>
      {data?.marketCreateds.map((market) => (
        <div key={market.marketId}>
          <h3>{market.question}</h3>
          <div>
            {market.outcomes.split(',').map((outcome, index) => (
              <button key={index} onClick={() => handleButtonClick(market.marketId, outcome)}>
                {outcome}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetmarketList;
