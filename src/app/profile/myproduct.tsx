/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import CustomButton from '../components/common/button';
import { ProductInfo, useProductContext } from '../context/productContext';

const MyProduct: React.FC = () => {
    const { address } = useAccount();
    const { products } = useProductContext();
    const [location, setLocation] = useState('');
    const [condition, setCondition] = useState('');

    const {shipProduct, updateProduct, deliverProduct} = useProductContext();

    const handleShipProduct = async(product: ProductInfo) => {
        if(location && condition) {
            try {
                await shipProduct(product, location, condition);
                //handleSuccess
                // Show success notification
                setLocation('');
                setCondition('');
            } catch (error) {
                //handleError
            }
        }
        else {
            // Error
            // Location and condition must be provided
        }
    }

    const handleUpdateProduct = async(product: ProductInfo) => {
        if(location && condition) {
            try {
                await updateProduct(product, location, condition);
                //handleSuccess
                // Show success notification
                setLocation('');
                setCondition('');
            } catch (error) {
                //handleError
            }
        }
        else {
            // Error
            // Location and condition must be provided
        }
    }

    const handleDeliverProduct = async(product: ProductInfo) => {
        if(condition) {
            try {
                await deliverProduct(product, condition);
                //handleSuccess
                // Show success notification
                setLocation('');
                setCondition('');
            } catch (error) {
                //handleError
            }
        }
        else {
            // Error
            // Condition must be provided
        }
    }

    return (
        <div className='flex flex-col pt-8 pl-8'>
            <div className='font-bold text-md'>
                {address ?
                    `My Products`
                    :
                    'Wallet not connected'
                }
            </div>
            {products.length > 0 ? (
                <div className="flex gap-3 flex-wrap-reverse">
                    {products.map((product, index) => (
                        <div key={index} className='bg-white rounded-[16px] border-[#0000001A] flex-col flex w-[340px] p-4 text-[16px] gap-2'>
                            {product.productImage && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={URL.createObjectURL(new File([product.productImage], 'product.png', { type: 'image/png' }))}
                                    alt='Product Image'
                                    className='w-full h-[250px] rounded-[12px] bg-cover object-cover'
                                />
                            )}
                            <p className='font-semibold my-2'>{product.businessName}</p>
                            <div className='between text-[14px]'>
                                <p className=''>Product ID:</p>
                                <p className="font-semibold">{String(product.id).padStart(10, "0")}</p>
                            </div>
                            <div className='between text-[14px]'>
                                <p className='text-[14px] break-all'>Receiver&rsquo;s Address:</p>
                                <a href={`https://calibration.filscan.io/address/${product.receiversAddress}`} target='_blank'>
                                {
                                    address == product.receiversAddress ?
                                    <span className='font-semibold text-blue'>you</span> :
                                    <span className='font-semibold text-blue'>{product.receiversAddress.slice(0, 6)}..</span>
                                }
                                </a>
                            </div>
                            <div className='between text-[14px]'>
                                <p>Receiver&rsquo;s Location:</p>
                                <p className='font-semibold'>{product.receiversLocation}</p>
                            </div>
                            <div className='flex flex-col'>
                                <div className='between text-[14px]'>
                                    <p>Status</p>
                                    <p className='font-semibold'>{product.status}</p>
                                </div>
                                { product.intermediariesWallet == address &&
                                    <div className='w-full border-[#0000001A] border-t py-3 mt-3'>
                                        <div className="flex">
                                        <div className='flex rounded-lg w-[48.5%] flex-col gap-3 border border-[#0000001A] px-[20px] py-[10px] mb-3 mr-3'>
                                            <input type="text" name="name" id="name" placeholder='Location' className='outline-none text-black text-[16px] font-semibold leading-[16px]' value={location} onChange={(e) => setLocation(e.target.value)} />
                                        </div>
                                        <div className='flex rounded-lg w-[48.5%] flex-col gap-3 border border-[#0000001A] px-[20px] py-[10px] mb-3'>
                                            <input type="text" name="name" id="name" placeholder='Condition' className='outline-none text-black text-[16px] font-semibold leading-[16px]' value={condition} onChange={(e) => setCondition(e.target.value)} />
                                        </div>
                                        </div>
                                        { product.status == "Created" ?
                                            <CustomButton onClick={() => handleShipProduct(product)} background='#2F7AEA' borderRadius='8px' textColor='#fff'>Ship product</CustomButton>
                                            :
                                            <CustomButton onClick={() => handleUpdateProduct(product)} background='#2F7AEA' borderRadius='8px' textColor='#fff'>Update product</CustomButton>
                                        }
                                    </div>
                                }
                            </div>
                        </div>  
                    ))}
                </div>
            ) : (
                <div className=''>
                    <p className='text-sm leading-[line-height: 154%]'>
                        Here you have the information about all your deployed products
                    </p>
                </div>
            )}
        </div>
    );
};

export default MyProduct;
