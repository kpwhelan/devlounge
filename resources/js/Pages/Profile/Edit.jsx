import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import UpdateLinksForm from './Partials/UpdateLinksForm';
import UpdateAboutMeForm from './Partials/UpdateAboutMeForm';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import UpdateTags from './Partials/UpdateTags';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const notifySuccess = (message) => toast.success("Successfully Updated!");
    const notifyError = (message) => toast.error(message);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <ToastContainer />

            <div className="py-12">
                <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 ">
                    <div className="w-[45%] p-4 sm:p-8 bg-primary-color shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                            notifyError={notifyError}
                            notifySuccess={notifySuccess}
                        />
                    </div>

                    <div className="w-[45%] p-4 sm:p-8 bg-primary-color shadow sm:rounded-lg">
                        <UpdatePasswordForm
                            notifyError={notifyError}
                            notifySuccess={notifySuccess}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="w-[45%] p-4 sm:p-8 bg-primary-color shadow sm:rounded-lg">
                        <UpdateLinksForm
                            notifyError={notifyError}
                            notifySuccess={notifySuccess}
                            className='max-w-xl'
                        />
                    </div>

                    <div className="w-[45%] p-4 sm:p-8 bg-primary-color shadow sm:rounded-lg">
                        <UpdateTags
                            notifyError={notifyError}
                            notifySuccess={notifySuccess}
                            className='max-w-xl'
                        />
                    </div>

                    <div className="w-[45%] p-4 sm:p-8 bg-primary-color shadow sm:rounded-lg">
                        <UpdateAboutMeForm
                            notifyError={notifyError}
                            notifySuccess={notifySuccess}
                            className='max-w-xl'
                        />
                    </div>

                    <div className="w-[45%] p-4 sm:p-8 bg-primary-color shadow sm:rounded-lg">
                        <DeleteUserForm
                            notifyError={notifyError}
                            notifySuccess={notifySuccess}
                            className="max-w-xl"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
