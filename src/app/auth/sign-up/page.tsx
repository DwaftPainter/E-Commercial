'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { validate, notifications } from '@/config/message'
import { passwordRegex } from '@/config/regex'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { formatNotification } from '@/utils/formatNotification'

const formSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters!' }),
    email: z.string().email({ message: 'Invald email!' }),
    password: z.string().regex(passwordRegex, { message: validate.format.password2 })
})

const page = () => {
    const [loading, setLoading] = React.useState(false)
    const route = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            })

            const responseData = await res.json()

            if (!res.ok) {
                throw new Error(responseData.message)
            }
            
            const { data } = await res.json()
            
            route.push('/')
            toast(formatNotification(notifications.account.accountCreated, {
                USERNAME: data.name
            }))

        } catch (error: any) {
            console.log(error.message)
            form.setError("email", {type: "custom", message: error.message})
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='mt-20 flex gap-[130px]'>
            <img
                className='2xl:-ml-[200px] xl:-ml-16 md:-ml-10 -ml-4 w-[70%] max-h-[800px] lg:block hidden'
                src='/assets/images/side-image.png'
                alt=''
            />
            <Form {...form}>
                <form
                    action=''
                    className='flex lg:w-[35%] w-full flex-col gap-10 justify-center items-center 2xl:-mr-[200px]'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className='flex flex-col gap-6 w-full items-start sm:mt-16 lg:mt-0'>
                        <h1 className='lg:font-medium font-bold lg:text-[36px] text-2xl lg:self-start self-center tracking-widest'>
                            Create an account
                        </h1>
                        <p className=''>Enter your detail below</p>
                    </div>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <input
                                        className='w-full border-b-[1px] border-b-black shadow-none rounded-none border-opacity-50 pl-0 pb-2 focus-visible:border-b-[1px] focus-visible:outline-0'
                                        placeholder='Name'
                                        {...field}
                                        autoComplete='off'
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <input
                                        className='w-full border-b-[1px] border-b-black shadow-none rounded-none border-opacity-50 pl-0 pb-2 focus-visible:border-b-[1px] focus-visible:outline-0'
                                        placeholder='Email'
                                        type='email'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormControl>
                                    <input
                                        className='w-full border-b-[1px] border-b-black shadow-none rounded-none border-opacity-50 pl-0 pb-2 focus-visible:border-b-[1px] focus-visible:outline-0'
                                        placeholder='Password'
                                        type='password'
                                        autoComplete='off'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={loading}
                        type='submit'
                        className='bg-secondary2 w-full text-text text-[16px] font-medium  hover:bg-hover2 rounded-sm py-4 h-auto'
                    >
                        {loading ? 'Submiting' : 'Create Account'}
                    </Button>
                    <div className='flex justify-center gap-4'>
                        <p>Already have an account?</p>
                        <Link href={'/auth/sign-in'} className='font-medium hover:underline'>
                            Log in
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default page
