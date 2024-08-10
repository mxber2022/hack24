import { useReadContract } from 'wagmi';
import { abi } from '../../../abi';
import myconfig from '../../../myconfig.json';
import { Address } from 'viem';
import React from 'react';

interface GetMarketStatusProps {
    marketId: string | number;
}

const GetMarketStatus: React.FC<GetMarketStatusProps> = ({ marketId }) => {
    const { data, isError, isLoading } = useReadContract({
        abi,
        address: myconfig.CONTRACT_ADDRESS_BASE as Address,
        functionName: 'getMarketDetails',
        args: [marketId],
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading market status</div>;

    //@ts-ignore
    let totalPool = data?.[3];
    console.log(data)
    
    return (
        <div>
            <h4>Total Pool</h4>
            <div className='betAmount'>
                <div >
                    <h4>Market Resolved</h4>
                </div>
                <div className='amountText'>
                    <h4>{String(totalPool)}</h4>
                </div>
            </div>
            
        </div>
    );
}

export default GetMarketStatus;