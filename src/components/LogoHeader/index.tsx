import Image from 'next/image';

export default function LogoHeader() {
    return (
        <div className='flex flex-row items-center justify-center gap-4'>
            <Image src="/assets/images/logo.png" alt="Logo" width={175} height={175} className='w-[175px] h-auto' />
        </div>
    );
}