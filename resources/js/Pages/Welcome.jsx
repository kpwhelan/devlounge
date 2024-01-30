import Login from '@/Components/Auth/Login';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Devlounge" />
            <div className='flex justify-center items-center min-h-screen'>
                <div className='bg-primary-color p-4 min-w-[35%]'>
                    <div className='mb-4'>
                        <h1>Welcome To Devlounge!</h1>
                        <p>If you work in tech, you need to be here!</p>
                    </div>

                    <Login />
                </div>
            </div>
        </>
    );
}
