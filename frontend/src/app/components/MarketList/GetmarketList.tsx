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
import Image from "next/image";
import GetMarketStatus from './GetMarketStatus';
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from './config';
import ProccingGif from './Assets/proccing.webp';
import CheckGif from './Assets/check.gif';

const MY_QUERY = gql`
  query MyQuery {
    marketCreateds {
      marketId
      outcomes
      question
      imageUri
    }
  }
`;

interface MarketCreated {
  marketId: string;
  outcomes: string; // outcomes is a string
  question: string;
  imageUri: string
}

interface MyQueryData {
  marketCreateds: MarketCreated[];
}

function GetmarketList() {
  const { loading, error, data } = useQuery<MyQueryData>(MY_QUERY);
  const { writeContract, isSuccess, data: writeContractData, status} = useWriteContract(); // create market
  const [amount, setAmount] = useState('');

  const handleButtonClick = useCallback(
    async (marketId: string, outcome: string, amount: string, index: number) => {
  
      writeContract({
        abi,
        address: myconfig.CONTRACT_ADDRESS_BASE as Address,
        functionName: 'placeBet',
        args: [marketId, index],
        value: parseEther(amount)
      });
    },
    [writeContract]
  );

  console.log("isSuccess: ", isSuccess)
  console.log("writeContractData: ", writeContractData)
  console.log("status", status)

  // const transactionReceipt = async() => await  waitForTransactionReceipt( config,{ 
  //   confirmations: 10, 
  //   //@ts-ignore
  //   hash: writeContractData ,
  // })

  //console.log("result: ", transactionReceipt)

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>Error :(</h3>;

    const handleRefresh = (e: any) => {
      e.preventDefault(); // Prevent default anchor behavior
      window.location.reload(); // Refresh the page
    };

  return (
    <section className='marketList'>
      <div className='marketList__container'>
        <h2>Market List</h2>
        <div className='marketList__grid'>
          {data?.marketCreateds.map((market) => (
          <div key={market.marketId} className='marketList__card'>

            <div className='betAmount'>
              <div >
                <Image src={market.imageUri.concat('?raw=true')} alt="img" width={50} height={50} />
              </div>
              <div className='amountText'>
                <h3 className="market-question">{market.question}</h3>
              </div>
            </div>

            <div className='betAmount betAmount-top'>
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
                <button key={index} onClick={() => handleButtonClick(market.marketId, outcome, amount, index)}>
                  {outcome}
                </button>
              ))}
            </div>

            <div className='amount-bottom'>
              <GetMarketStatus marketId={Number(market.marketId)} />
            </div>
          </div>
          ))}
        </div>
      </div>
      <div className={`proccing ${status === 'pending' ? 'pending' : status === 'success' ? 'done' : ''}`}>
            {status === 'pending' && (
              <div className='pending_popup'>
                <Image
                  src={ProccingGif}
                  alt="Processing GIF"
                />
                <p>
                  Don't close the window
                </p>
              </div>
            )}

              {status === 'success' && (
                <div className='success_popup'>
                  <Image
                    src={CheckGif}
                    alt="CheckGif"
                  />
                  <p>
                    Success <br /><br />
                    <a href="#" onClick={handleRefresh}>Close and return to the website</a>
                  </p>
                </div>
              )}
      </div>
    </section>
  );
}

export default GetmarketList;
 