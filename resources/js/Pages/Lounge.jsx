import LoungesContainer from "@/Containers/LoungesContainer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Lounge({ auth, lounge  }) {
    console.log(lounge)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lounge - {lounge.name}</h2>}
        >

            <Head title={`Lounge - ${lounge.name}`} />

            <LoungesContainer className='w-[60%] mx-auto mt-4'>
                <h1 className="text-black">hi</h1>
            </LoungesContainer>
        </AuthenticatedLayout>
    );
}