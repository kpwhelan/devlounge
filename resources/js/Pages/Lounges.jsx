import LoungePreviewCard from "@/Components/LoungePreviewCard";
import NewLoungeModal from "@/Components/Modals/NewLoungeModal";
import PrimaryButton from "@/Components/PrimaryButton";
import LoungesContainer from "@/Containers/LoungesContainer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Lounges({ auth, lounges }) {
    const [showNewLoungeModal, setShowNewLoungeModal] = useState(false);

    const toggleSetShowNewLoungeModal = () => {
        showNewLoungeModal ? setShowNewLoungeModal(false) : setShowNewLoungeModal(true);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lounges</h2>}
        >

            <Head title="Lounges" />

            

            <LoungesContainer className='w-[60%] mx-auto mt-4'>
                <PrimaryButton onClick={toggleSetShowNewLoungeModal} className="mb-2 bg-devlounge-accent">
                    New Lounge
                </PrimaryButton>

                {lounges.data.map(lounge => {
                    return <LoungePreviewCard key={lounge.id} lounge={lounge} />
                })}
            </LoungesContainer>

            <NewLoungeModal showNewLoungeModal={showNewLoungeModal} toggleSetShowNewLoungeModal={toggleSetShowNewLoungeModal} />
        </AuthenticatedLayout>
    );
}