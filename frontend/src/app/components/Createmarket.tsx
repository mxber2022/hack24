"use client"
import { useState } from 'react';
import { useWriteContract } from 'wagmi'
import { abi } from '../../abi'
import myconfig from '../../myconfig.json'
import { Address } from 'viem';

function Createmarket() {
    
    const [question, setQuestion] = useState('');
    const [outcomes, setOutcomes] = useState(['']);
    const [status, setStatus] = useState('');
        
    // Handler to add a new outcome input field
    const addOutcome = () => {
        setOutcomes([...outcomes, '']);
    };
        
    // Handler to update outcome value
    //@ts-ignore
    const handleOutcomeChange = (index, event) => {
        const newOutcomes = outcomes.slice();
        newOutcomes[index] = event.target.value;
        setOutcomes(newOutcomes);
    };
        
    // Handler to create market

    const { writeContract } = useWriteContract()

    //@ts-ignore
    const createMarket = async (event) => {
        event.preventDefault();
        writeContract({ 
            abi,
            address: myconfig.CONTRACT_ADDRESS_BASE as Address,
            functionName: 'createMarket',
            args: [
                question,
                outcomes
            ],
         })
    };
    
    return (
        <div>
            <h1>Create Market</h1>
            <form onSubmit={createMarket}>
                <div>
                  <label>Market Question:</label>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label>Outcomes:</label>
                  {outcomes.map((outcome, index) => (
                    <input
                      key={index}
                      type="text"
                      value={outcome}
                      onChange={(e) => handleOutcomeChange(index, e)}
                      required
                    />
                    ))}
                    <button type="button" onClick={addOutcome}> Add Outcome </button>
                </div>
                <button type="submit">Create Market</button>
            </form>
            {status && <p>{status}</p>}
        </div>
          );
}

export default Createmarket;