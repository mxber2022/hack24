"use client"

import "./TransactionStatus.css"
import ProccingGif from './Assets/proccing.webp';
import CheckGif from './Assets/check.gif';
import Image from "next/image";

function TransactionStatus(status: any) {

    const handleRefresh = (e: any) => {
        e.preventDefault(); 
        window.location.reload();
    };

    return(
    <>
        <div className={`proccing ${status.status === 'pending' ? 'pending' : status.status === 'success' ? 'done' : ''}`}>
            {status.status === 'pending' && (
              <div className='pending_popup'>
                <Image src={ProccingGif} alt="Processing GIF" />
                <p>
                  Don't close the window
                </p>
              </div>
            )}

              {status.status === 'success' && (
                <div className='success_popup'>
                  <Image src={CheckGif} alt="CheckGif" />
                  <p>
                    Success <br /><br />
                    {/* <p>{writeContractData}</p> */}
                    <a href="#" onClick={handleRefresh}>Close and return to the website</a>
                  </p>
                </div>
              )}
      </div>
    </>
    )
}
export default TransactionStatus;