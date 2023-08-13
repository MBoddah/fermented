'use client';

import { Button } from '@/components/ui/Button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { PersonIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React, { useState } from 'react';

export const ProfileMenu = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <DropdownMenu onOpenChange={open => setOpen(open)}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    className={
                        isOpen
                            ? 'flex flex-row p-1 rounded-sm bg-slate-200'
                            : 'flex flex-row p-1 rounded-sm'
                    }
                >
                    <PersonIcon className='h-5 w-5' />
                    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 relative'>
                <DropdownMenuLabel>Мой профиль</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link href='/sign-up'>Зарегистрироваться</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href='/sign-in'>Авторизироваться</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
