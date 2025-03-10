'use client'

import { formatDate } from '@/utils/formatters/formatDate'
import React from 'react'
import { OrderType } from '@/types/order.type'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Orders = () => {
    const [orders, setOrders] = React.useState<OrderType[]>([])

    React.useEffect(() => {
        async function getOrders() {
            const res = await fetch('/api/order')
            const { data } = await res.json()
            setOrders(data)
            console.log(data)
        }

        getOrders()
    }, [])

    if (orders.length === 0) {
        return (
            <div className='w-full min-h-[400px] flex flex-col items-center justify-center gap-5    '>
                No order have been made yet.
                <Button
                    type='submit'
                    className='bg-secondary2 text-text text-[16px] font-medium hover:bg-hover2 rounded-sm py-2 px-4 h-auto'
                >
                    <Link href={'/shop'}>Shop now</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className='flex flex-col w-full gap-7'>
            {orders?.map((order, index) => (
                <div className='border rounded-sm' key={index}>
                    <div className='w-full h-fit flex justify-between sm:gap-0 gap-4 sm:items-center items-start py-6 px-5'>
                        <div className='flex flex-col justify-center items-start text-sm'>
                            <p className='font-bold'>Order number:</p>
                            <p>#{order?._id?.toString().split('').slice(-4).join('')}</p>
                        </div>
                        <div className='sm:flex hidden flex-col justify-center items-start text-sm'>
                            <p className='font-bold'>Date:</p>
                            <p>{formatDate(order?.createdAt?.toString())}</p>
                        </div>
                        <div className='flex flex-col justify-center items-start text-sm'>
                            <p className='font-bold'>Status:</p>
                            <p>{order?.status}</p>
                        </div>
                        <div className='sm:flex hidden flex-col justify-center items-start text-sm'>
                            <p className='font-bold'>Total:</p>
                            <p>
                                $
                                {order?.items
                                    ?.reduce(
                                        (total, item) => total + item?.product?.price * item?.quantity,
                                        5
                                    )
                                    .toFixed(2)}
                            </p>
                        </div>
                        <Button className='bg-secondary2 hover:bg-hover2 rounded-sm'>
                            <Link href={`my-account/view-order/?orderId=${order?._id}`}>View</Link>
                        </Button>
                    </div>
                    <div className='border-t p-5 flex flex-col gap-4'>
                        {order?.items?.map((item, index) => (
                            <div
                                className='border px-5 py-4 rounded-sm flex justify-between items-center'
                                key={index}
                            >
                                <p className='text-sm'>
                                    {item?.product?.name}{' '}
                                    <span className='font-semibold'>&times; {item?.quantity}</span>{' '}
                                </p>
                                <img src={item?.product?.image} alt='' className='h-[60px] w-[60px]' />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Orders
