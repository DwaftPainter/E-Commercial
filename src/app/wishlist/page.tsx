'use client'

import Product from '@/components/home/product/Product'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useAppContext } from '@/context/AppContext'
import React from 'react'
import HomeLayout from '@/layouts/HomeLayout'
import { Heart } from 'lucide-react'

const page = () => {
    const { wishItems, setWishItems, wishListCount, previewProducts, updateCartBulk, cartItems } =
        useAppContext()

    const hanldeMoveAllToCart = async () => {
        updateCartBulk(
            wishItems?.map(item => {
                return { product: item, quantity: 1 }
            })
        )
        setWishItems([])
        console.log('🚀 ~ page ~ cartItems:', cartItems)
    }

    return (
        <div className='flex flex-col gap-[60px]'>
            <div className='flex flex-col gap-[60px]'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-[20px]'>Wishlist ({wishListCount || 0})</h1>
                    <Button
                        className='bg-transparent hover:bg-button2 rounded-[4px] h-[56px] sm:px-[48px] px-4 sm:py-[16px] py-2 text-black hover:text-white font-medium border-black border-opacity-50 border-[1px] hover:border-secondary2'
                        onClick={hanldeMoveAllToCart}
                    >
                        Move All To Cart
                    </Button>
                </div>
                {wishItems?.length === 0 ? (
                    <div className='w-full flex justify-center items-center gap-3 my-8'>
                        <Heart size={28} />
                        <p className='font-semibold text-xl'>Your wishlist is empty</p>
                    </div>
                ) : (
                    <Carousel
                        opts={{
                            align: 'start'
                        }}
                        className='w-full'
                    >
                        <CarouselContent>
                            {wishItems.map((product, index) => (
                                <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/5'>
                                    <div className='p-1'>
                                        <Product product={product} isWishlist={true} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                )}
            </div>
            <HomeLayout title='Just For You'>
                <Carousel
                    opts={{
                        align: 'start'
                    }}
                    className='w-full mt-[4rem]'
                >
                    <CarouselContent>
                        {previewProducts?.map((product, index) => (
                            <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/5'>
                                <div className='p-1'>
                                    <Product product={product} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </HomeLayout>
        </div>
    )
}

export default page
