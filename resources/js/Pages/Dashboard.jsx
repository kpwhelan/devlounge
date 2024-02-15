import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { faUser} from '@fortawesome/free-regular-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import EditLinksModal from '@/Components/Modals/EditLinksModal';
import { Avatar, Typography } from '@material-tailwind/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import EditAboutModal from '@/Components/Modals/EditAboutModal';
import UploadProfilePictureModal from '@/Components/Modals/UploadProfilePictureModal';

export default function Dashboard({ auth }) {
    const notifySuccess = () => toast.success("Successfully Updated!");
    const notifyError = (message) => toast.error(message);

    const [showEditLinksModal, setShowEditLinksModal] = useState(false);
    const [showEditAboutModal, setShowEditAboutModal] = useState(false);
    const [showUploadPictureModal, setShowUploadPictureModal] = useState(false);

    const toggleSetShowEditLinksModal = () => {
        showEditLinksModal ? setShowEditLinksModal(false) : setShowEditLinksModal(true);
    }

    const toggleSetShowEditAboutModal = () => {
        showEditAboutModal ? setShowEditAboutModal(false) : setShowEditAboutModal(true);
    }

    const toggleSetShowUploadPictureModal = () => {
        showUploadPictureModal ? setShowUploadPictureModal(false) : setShowUploadPictureModal(true);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <ToastContainer />

            <div className="my-10 mx-auto py-10 px-10 bg-primary-color max-w-[40%] rounded-lg">
                <div className='mb-8 flex items-center justify-start'>
                    <div className='w-fit text-center'>
                        {auth.user.profile_picture_url &&
                            <Avatar size='xxl' src={auth.user.profile_picture_url} />
                        }
                        {!auth.user.profile_picture_url &&
                            <div className='py-3 px-4 mb-2 border-white border-2 max-w-fit rounded-full'>
                                <FontAwesomeIcon icon={faUser} size='2x' />
                            </div>
                        }

                        <Typography onClick={toggleSetShowUploadPictureModal} className="hover:cursor-pointer underline mx-auto text-lg hover:text-brown-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            upload
                        </Typography>
                    </div>

                    <div className='ml-6'>
                        <p className='text-2xl font-bold'>{auth.user.first_name} {auth.user.last_name}</p>
                        <p>{auth.user.title}</p>
                    </div>
                </div>

                <div className='pl-1 pt-2'>
                    <div className='flex justify-start items-center'>
                        <p className='text-gray-100 font-bold text-3xl'>Links</p>
                        <Typography onClick={toggleSetShowEditLinksModal} className="hover:cursor-pointer underline ml-4 text-lg hover:text-brown-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            edit
                        </Typography>
                    </div>
                    <p>Github: {auth.user.github_url}</p>
                    <p>Linkedin: {auth.user.linkedin_url}</p>
                    <p><FontAwesomeIcon icon={faXTwitter} />: {auth.user.x_url}</p>
                    <p>Instagram: {auth.user.instagram_url}</p>
                </div>

                <div className=' pl-1 pt-8'>
                    <div className='flex justify-start items-center'>
                        <p className='text-gray-100 font-bold text-3xl'>About</p>
                        <Typography onClick={toggleSetShowEditAboutModal} className="ml-4 hover:cursor-pointer underline text-lg hover:text-brown-50 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            edit
                        </Typography>
                    </div>

                    <p className='mb-4 whitespace-pre-line'>{auth.user.about_me}</p>
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

            {showUploadPictureModal &&
                <UploadProfilePictureModal
                    toggleSetShowUploadPictureModal={toggleSetShowUploadPictureModal}
                    showUploadPictureModal={showUploadPictureModal}
                 />
            }

        </AuthenticatedLayout>
    );
}
