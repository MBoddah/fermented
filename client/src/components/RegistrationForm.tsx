'use client';

import { FC, useState } from 'react';
import { Button } from './ui/Button';
import Link from 'next/link';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/Form';
import { Input } from './ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, User } from 'lucide-react';

//Set form validations
const formSchema = z
    .object({
        name: z.string().nonempty({ message: 'Это обязательное поле' }),
        birthDate: z.date({
            required_error: 'Это обязательное поле.',
        }),
        email: z
            .string()
            .min(1, {
                message: 'Это обязательное поле',
            })
            .email('Введите существующий адрес почты'),
        password: z
            .string()
            .min(6, {
                message: 'Пароль должен содержать хотя бы 6 символов',
            })
            .max(24, {
                message: 'Пароль не должен быть длиннее 24 символов',
            }),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Пароли должны совпадать',
        path: ['confirmPassword'],
    });

const RegistrationForm: FC = ({}) => {
    const [isLoading, setLoading] = useState(false);
    const { toast } = useToast();

    //Form definition.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            birthDate: new Date(),
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    //Submit handler definition.
    //This is type-safe and validated.
    function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
    }

    return (
        <div className='flex flex-col justify-center w-[280px] sm:w-[340px]'>
            <div className='flex flex-row align-middle justify-center mb-4'>
                <h1 className='text-lg'>Приветствуем в Fermented!</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-.5'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-xs'>Имя</FormLabel>
                                <FormControl>
                                    <Input placeholder='Имя' Icon={User} {...field} />
                                </FormControl>
                                <FormMessage className='text-3xs' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-xs'>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder='example@mail.com' Icon={Mail} {...field} />
                                </FormControl>
                                <FormMessage className='text-3xs' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-xs'>Пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Пароль'
                                        Icon={Lock}
                                        {...field}
                                        type='password'
                                    />
                                </FormControl>
                                <FormMessage className='text-3xs' />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-xs'>Подтвердите пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Пароль'
                                        Icon={Lock}
                                        {...field}
                                        type='password'
                                    />
                                </FormControl>
                                <FormMessage className='text-3xs' />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='w-full text-xs !my-4' isLoading={isLoading}>
                        Зарегистрироваться
                    </Button>
                </form>
            </Form>
            <div className='flex flex-col text-center text-sm'>
                <div className='flex flex-row justify-center gap-2'>
                    <p className='self-center'>Уже зарегистрированы? </p>
                    <Button variant='link' className='text-center p-0'>
                        <Link href='/sign-in'>Авторизируйтесь</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
