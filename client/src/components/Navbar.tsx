import { FC } from 'react';
import Link from 'next/link';
import { ProfileMenu } from './ProfileMenu';
import { Icons } from './Icons';
import { Input } from './ui/Input';
import { SearchIcon } from 'lucide-react';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
    return (
        <div className='fixed top-0 inset-x-0 h-fit w-full bg-slate-100 z-[10]'>
            <div className='w-full h-full flex items-center justify-center gap-4 p-2 sm:px-6'>
                {/* logo */}
                <Link href='/' className='flex gap-2 items-center'>
                    <Icons.logo className='w-5 h-5' />
                    <p className='text-sm font-medium text-gray-dark'>Fermented</p>
                </Link>
                <Input
                    placeholder='Поиск...'
                    Icon={SearchIcon}
                    iconClassName='w-4 h-4'
                    className='flex max-w-xl justify-self-center place-self-center
                    '
                />
                <ProfileMenu />
                {/* <Link href='/sign-in'>Войти</Link> */}
            </div>
        </div>
    );
};

export default Navbar;
