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

// 'use client';

// import React, { useState } from 'react';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from '@/components/ui/DropdownMenu';
// import { PersonIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

// export const ProfileMenu = () => {
//     const [isOpen, setOpen] = useState(false);

//     return (
//         // <DropdownMenu onOpenChange={open => setOpen(open)}>
//         //     <DropdownMenuTrigger
//         //         className={
//         //             isOpen
//         //                 ? 'flex flex-row outline-none bg-slate-200 p-1 rounded-sm'
//         //                 : 'flex flex-row outline-none p-1 rounded-sm'
//         //         }
//         //     >
//         //         <PersonIcon className='h-5 w-5' />
//         //         {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
//         //     </DropdownMenuTrigger>
//         //     <DropdownMenuContent className='bg-slate-100 border-slate-200'>
//         //         <DropdownMenuLabel>Профиль</DropdownMenuLabel>
//         //         <DropdownMenuSeparator className='bg-slate-200' />
//         //         <DropdownMenuItem>Sign In</DropdownMenuItem>
//         //         <DropdownMenuItem>Sign Up</DropdownMenuItem>
//         //     </DropdownMenuContent>
//         // </DropdownMenu>
//     );
// };
