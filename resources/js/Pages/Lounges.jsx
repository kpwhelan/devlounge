import LoungePreviewCard from "@/Components/LoungePreviewCard";
import NewLoungeModal from "@/Components/Modals/NewLoungeModal";
import PrimaryButton from "@/Components/PrimaryButton";
import FeedContainer from "@/Containers/FeedContainer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Lounges({ auth, lounges }) {
    const [showNewLoungeModal, setShowNewLoungeModal] = useState(false);
    const [theLounges, setTheLounges] = useState([]);

    useEffect(() => {
        setTheLounges(lounges.data);
    }, []);

    const toggleSetShowNewLoungeModal = () => {
        showNewLoungeModal ? setShowNewLoungeModal(false) : setShowNewLoungeModal(true);
    }

    const addNewLounge = (lounge) => {
        setTheLounges(lounges => [lounge, ...lounges]);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Lounges</h2>}
        >

            <Head title="Lounges" />

            <FeedContainer className='w-[40%] mx-auto mt-4'>
                <PrimaryButton onClick={toggleSetShowNewLoungeModal} className="mb-2 bg-devlounge-accent">
                    New Lounge
                </PrimaryButton>

                {theLounges.map(lounge => {
                    return <LoungePreviewCard key={lounge.id} lounge={lounge} />
                })}
            </FeedContainer>

            <NewLoungeModal addNewLounge={addNewLounge} showNewLoungeModal={showNewLoungeModal} toggleSetShowNewLoungeModal={toggleSetShowNewLoungeModal} />
        </AuthenticatedLayout>
    );
}
