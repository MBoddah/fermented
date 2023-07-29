import RegistrationForm from '@/components/RegistrationForm';
import { FC } from 'react';

const page: FC = () => {
    return (
        <div className='flex w-full h-full align-middle justify-center'>
            <div className=' h-full max-w-2xl mx-auto flex flex-col items-center align-middle justify-center'>
                <RegistrationForm />
            </div>
        </div>
    );
};

export default page;
