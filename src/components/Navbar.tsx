import { FC } from 'react';
import Link from 'next/link';
import { ProfileMenu } from './ProfileMenu';
import { Icons } from './Icons';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
    return (
        <div className='fixed top-0 inset-x-0 h-fit bg-slate-100 z-[10] p-4'>
            <div className='container max-w-7x1 h-full mx-auto flex items-center justify-between gap-2'>
                {/* logo */}
                <Link href='/' className='flex gap-2 items-center'>
                    <Icons.logo className='w-5 h-5' />
                    <p className='text-sm font-medium text-gray-dark'>Fermented</p>
                </Link>
                <ProfileMenu />
            </div>
        </div>
    );
};

export default Navbar;
