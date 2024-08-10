"use client";

import React, { useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useWriteContract } from 'wagmi';
import { abi } from '../../../abi';
import myconfig from '../../../myconfig.json';
import { Address } from 'viem';
import { parseEther } from 'viem';
import "./MarketList.css";
import { useState } from 'react';

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
  const [amount, setAmount] = useState('');

  const handleButtonClick = useCallback(
    async (marketId: string, outcome: string, amount: string) => {
      writeContract({
        abi,
        address: myconfig.CONTRACT_ADDRESS_BASE as Address,
        functionName: 'placeBet',
        args: [marketId, outcome],
        value: parseEther(amount)
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
            <h3 className="market-question">{market.question}</h3>
            
            <div className='betAmount'>
              <div>
                <h3>Amount</h3>
              </div>
              <div className='amountText'>
              <input
                onChange={(e) => setAmount(e.target.value)}
                required
                style={{ backgroundColor: 'black', color: 'white', border: '1px solid #ccc', padding: '5px', borderRadius: '5px',}}
              />
              </div>
            </div>
      
            <div className='marketList__cardBtns'>
              {market.outcomes.split(',').map((outcome, index) => (
                <button key={index} onClick={() => handleButtonClick(market.marketId, outcome, amount)}>
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
 