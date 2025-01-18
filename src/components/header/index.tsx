import Layout from '@/layouts/layout'
import Link from 'next/link'
import React from 'react'
import { Input } from '../ui/input'
import { Heart, Search, ShoppingCart, User } from 'lucide-react'
import Image from 'next/image'

const Header = () => {
  return (
    <Layout>
      <div className="flex w-full justify-between items-center h-[96px]">
        <div>
            <h1 className='font-bold text-[24px]'>Neo Store</h1>
        </div>
        <nav className="flex gap-[48px] text-[16px]">
          <Link href={"#"}>Home</Link>
          <Link href={"#"}>Contact</Link>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Sign Up</Link>
        </nav>
        <div className='flex items-center gap-[24px]'>
          <div className='relative w-[243px]'>
            <Input className='text-[12px] opacity-[0.5] pl-[20px] pr-[25px] py-[7px] bg-secondary' type='text' placeholder='What are you looking for?'/>
            <div className='absolute top-[10px] right-3'>
              <Search size={'16px'} className='cursor-pointer'/>
            </div>
          </div>
          <div className='flex gap-[16px]'>
            <Heart className='cursor-pointer'/>
            <ShoppingCart className='cursor-pointer'/>
            <User className='cursor-pointer'/>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Header