import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import InputError from "../InputError";
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput";
import Modal from "../Modal";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Typography } from "@material-tailwind/react";

export default function EditAboutModal({ auth, toggleSetShowEditAboutModal, showEditAboutModal, notifySuccess, notifyError }) {
    const [isProcessing, setIsProcessing] = useState(false);

    const { data, setData, processing, errors, reset } = useForm({
        about_me: auth.user.about_me ? auth.user.about_me : '',
    });

    const toggleSetIsProcessing = () => {
        isProcessing ? setIsProcessing(false) : setIsProcessing(true);
    }

    const submit = (e) => {
        e.preventDefault();

        toggleSetIsProcessing();

        axios.patch(route('update-user'), {
            about_me: data.about_me,
        })
        .then(response => {
            if (response.data.success) {
                auth.user = response.data.data.user;
                setIsProcessing(false);
                toggleSetShowEditAboutModal();
                notifySuccess(response.data.message);
            }
        })
        .catch(error => {
            setIsProcessing(false);
            notifyError(error.response.data.message);
        })
    };

    return (
        <Modal show={showEditAboutModal} className={'transition ease-in-out'}>

            {isProcessing &&
                <div className='w-[100%] flex justify-center'>
                    <ThreeDots className="mx-auto" visible={true} width="100" height='80' color='#121213' />
                </div>
            }

            <form onSubmit={submit} className='p-4'>
            {!isProcessing && <>
                <FontAwesomeIcon onClick={toggleSetShowEditAboutModal} color="black" icon={faCircleXmark} opacity={0.5} size='2x' className='fixed right-2 top-2 hover:cursor-pointer' />
                <Typography variant="h5" color="gray" className="mb-6 uppercase">
                    Edit About
                </Typography>

                <div className='flex justify-between bg-primary-color p-4'>
                    <div className='w-full'>
                        <div className='mt-4'>
                            <textarea
                                id="about_me"
                                name="about_me"
                                type='textarea'
                                value={data.about_me}
                                className="block h-72 overflow-scroll p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                                autoComplete="about_me"

                                onChange={(e) => setData('about_me', e.target.value)}
                            />

                            <InputError message={errors.about_me} className="mt-2" />
                        </div>
                    </div>
                </div>
                </>
                }
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={isProcessing}>
                        Send It!
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
