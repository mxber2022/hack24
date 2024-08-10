"use client";

import React, { useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useWriteContract } from 'wagmi';
import { abi } from '../../../abi';
import myconfig from '../../../myconfig.json';
import { Address } from 'viem';
import { parseEther } from 'viem';
import "./MarketList.css";

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
  const { writeContract } = useWriteContract();

  const handleButtonClick = useCallback(
    async (marketId: string, outcome: string) => {
      writeContract({
        abi,
        address: myconfig.CONTRACT_ADDRESS_BASE as Address,
        functionName: 'placeBet',
        args: [marketId, outcome],
        value: parseEther('0.0001')
      });
    },
    [writeContract]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <section className='marketList'>
      <div className='marketList__container'>
        <h2>Market List</h2>
        <div className='marketList__grid'>
          {data?.marketCreateds.map((market) => (
          <div key={market.marketId} className='marketList__card'>
            <h3>{market.question}</h3>
            <div className='marketList__cardBtns'>
              {market.outcomes.split(',').map((outcome, index) => (
                <button key={index} onClick={() => handleButtonClick(market.marketId, outcome)}>
                  {outcome}
                </button>
              ))}
            </div>
          </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GetmarketList;
 