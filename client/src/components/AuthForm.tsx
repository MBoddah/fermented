'use client';

import { FC, useState } from 'react';
import { Button } from './ui/Button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Icons } from './Icons';
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
import { Lock, Mail } from 'lucide-react';

//Set form validations
const formSchema = z.object({
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
});

enum LoginSocials {
    GOOGLE = 'Google',
    YANDEX = 'Yandex',
    APPLE = 'Apple',
    VK = 'VK',
}

const AuthForm: FC = ({}) => {
    const [loggingSocial, setLoggingSocial] = useState<LoginSocials | null>(null);
    const { toast } = useToast();

    const loginWithSocial = async (social: LoginSocials) => {
        setLoggingSocial(social);
        try {
            await signIn(social.toLowerCase());
        } catch (error) {
            toast({
                title: `Не удалось авторизироваться через ${social}`,
                description: 'Пожалуйста, выберите другой способ авторизации или попробуйте позже',
                variant: 'destructive',
            });
        } finally {
            setLoggingSocial(null);
        }
    };

    //Form definition.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    //Submit handler definition.
    //This is type-safe and validated.
    function onSubmit(values: z.infer<typeof formSchema>) {
        toast({
            title: 'Авторизация через почту временно не работает',
            description: 'Приносим извинения за неудобства',
            variant: 'default',
        });
    }

    return (
        <div className='flex flex-col justify-center w-[280px] sm:w-[340px] '>
            <div className='flex flex-row align-middle justify-center mb-4'>
                <h1 className='text-xl mb-2'>Авторизируйтесь в Fermented</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-.5'>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-xs'>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder='E-mail' Icon={Mail} {...field} />
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
                    <Button type='submit' className='w-full !my-4 text-sm'>
                        Авторизоваться
                    </Button>
                </form>
            </Form>
            <div className='w-full flex flex-row justify-center align-middle text-center mb-4'>
                <span className='w-full h-[1px] bg-slate-400 rounded-full self-center' />
                <p className='mx-2 text-sm'>ИЛИ</p>
                <span className='w-full h-[1px] bg-slate-400 rounded-full self-center' />
            </div>
            <div className='flex flex-row justify-center space-x-8  mb-6'>
                <Button
                    onClick={() => loginWithSocial(LoginSocials.GOOGLE)}
                    size='sm'
                    className='w-12 h-12 rounded-full'
                    isLoading={loggingSocial === LoginSocials.GOOGLE}
                >
                    <Icons.google className='h-6 w-6' />
                </Button>
                <Button
                    onClick={() => loginWithSocial(LoginSocials.APPLE)}
                    size='sm'
                    className='w-12 h-12 rounded-full'
                    isLoading={loggingSocial === LoginSocials.APPLE}
                >
                    <Icons.apple className='h-6 w-6' />
                </Button>
                <Button
                    onClick={() => loginWithSocial(LoginSocials.YANDEX)}
                    size='sm'
                    className='w-12 h-12 rounded-full'
                    isLoading={loggingSocial === LoginSocials.YANDEX}
                >
                    <Icons.yandex className='h-6 w-6' />
                </Button>
                <Button
                    onClick={() => loginWithSocial(LoginSocials.VK)}
                    size='sm'
                    className='w-12 h-12 rounded-full'
                    isLoading={loggingSocial === LoginSocials.VK}
                >
                    <Icons.vk className='h-6 w-6' />
                </Button>
            </div>
            <div className='flex flex-col text-center space-y-2 text-sm'>
                <Button
                    variant={'link'}
                    onClick={() =>
                        toast({
                            title: 'Восстановление пароля временно недоступно',
                            description: 'Приносим извенения за неудобоства',
                            variant: 'destructive',
                        })
                    }
                >
                    <Link href='/sign-in' type='ghost'>
                        Забыли пароль?
                    </Link>
                </Button>
                <div className='flex flex-row justify-center gap-2'>
                    <p className='self-center'>Еще не с нами? </p>
                    <Button variant='link' className='text-center p-0'>
                        <Link href='/sign-up'>Зарегистрироваться</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
