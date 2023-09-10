'use client';

import React, { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi' // Import the appropriate hook

const Account: React.FC = () => {
    const { address } = useAccount()
    const { data } = useBalance({
        address: address,
      })

    return (
        <div className='flex flex-col gap-16 p-8'>
            <div>
                {address ? (
                    <div className='flex gap-3 flex-col font-bold'>
                        <h1 className='text-md'>
                            Wallet Connected: {address}
                        </h1>
                        <h1 className='text-md'>
                            {data && `Wallet Balance: ${data.formatted} ${data.symbol}`}
                        </h1>
                    </div>
                ) : (
                    <div>
                        <h1 className='font-bold text-md'>
                            Wallet not connected
                        </h1>
                        <p className='text-sm'>
                            Get started by connecting your wallet first
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default Account;
