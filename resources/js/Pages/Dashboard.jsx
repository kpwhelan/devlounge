import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { faUser} from '@fortawesome/free-regular-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import EditLinksModal from '@/Components/Modals/EditLinksModal';
import { Typography } from '@material-tailwind/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import EditAboutModal from '@/Components/Modals/EditAboutModal';

export default function Dashboard({ auth }) {
    const notifySuccess = () => toast.success("Successfully Updated!");
    const notifyError = (message) => toast.error(message);

    const [showEditLinksModal, setShowEditLinksModal] = useState(false);
    const [showEditAboutModal, setShowEditAboutModal] = useState(false);

    const toggleSetShowEditLinksModal = () => {
        showEditLinksModal ? setShowEditLinksModal(false) : setShowEditLinksModal(true);
    }

    const toggleSetShowEditAboutModal = () => {
        showEditAboutModal ? setShowEditAboutModal(false) : setShowEditAboutModal(true);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <ToastContainer />

            <div className="my-10 py-10 px-10 bg-primary-color max-w-[40%]">
                <div className='mb-4'>
                    <div className='py-3 px-4 mb-2 border-white border-2 max-w-fit rounded-full'>
                        <FontAwesomeIcon icon={faUser} size='2x' />
                    </div>

                    <p className='text-2xl font-bold'>{auth.user.first_name} {auth.user.last_name}</p>
                    <p>{auth.user.title}</p>
                </div>

                <div className='border-t-2 pl-1 pt-2'>
                    <div className='flex'>
                        <p className='text-gray-100 font-bold text-xl'>About</p>
                        <Typography onClick={toggleSetShowEditAboutModal} className="hover:cursor-pointer underline mx-auto text-lg hover:text-brown-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            edit
                        </Typography>
                    </div>

                    <p className='mb-4 whitespace-pre-line'>{auth.user.about_me}</p>
                </div>

                <div className='border-t-2 pl-1 pt-2'>
                    <div className='flex'>
                        <p className='text-gray-100 font-bold text-xl'>Links</p>
                        <Typography onClick={toggleSetShowEditLinksModal} className="hover:cursor-pointer underline mx-auto text-lg hover:text-brown-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            edit
                        </Typography>
                    </div>
                    <p>Github: {auth.user.github_url}</p>
                    <p>Linkedin: {auth.user.linkedin_url}</p>
                    <p><FontAwesomeIcon icon={faXTwitter} />: {auth.user.x_url}</p>
                    <p>Instagram: {auth.user.instagram_url}</p>
                </div>
            </div>

            {showEditLinksModal &&
                <EditLinksModal
                    toggleSetShowEditLinksModal={toggleSetShowEditLinksModal}
                    showEditLinksModal={showEditLinksModal}
                    auth={auth}
                    notifyError={notifyError}
                    notifySuccess={notifySuccess}
                />
            }

            {showEditAboutModal &&
                <EditAboutModal
                    toggleSetShowEditAboutModal={toggleSetShowEditAboutModal}
                    showEditAboutModal={showEditAboutModal}
                    auth={auth}
                    notifyError={notifyError}
                    notifySuccess={notifySuccess}
                />
            }

        </AuthenticatedLayout>
    );
}
