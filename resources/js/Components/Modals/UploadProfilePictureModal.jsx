import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import PrimaryButton from "../PrimaryButton";
import TextInput from "../TextInput";
import Modal from "../Modal";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import axios from "axios";

export default function UploadProfilePictureModal({ toggleSetShowUploadPictureModal, showUploadPictureModal }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [picData, setPicdata] = useState();

    const handleSelectedImage = (e) => {
        setPicdata(e.target.files[0]);
    }

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('profile_img', picData);

        axios.post(route('update-profile-picture'), formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => console.log(res))
        .catch(error => console.log(error));
    }

    return (
        <Modal show={showUploadPictureModal} className={'transition ease-in-out'}>

            {isProcessing &&
                <div className='w-[100%] flex justify-center'>
                    <ThreeDots className="mx-auto" visible={true} width="100" height='80' color='#121213' />
                </div>
            }

            <form onSubmit={submit} className='p-4'>
                {!isProcessing &&
                    <div>
                        <FontAwesomeIcon onClick={toggleSetShowUploadPictureModal} color="black" icon={faCircleXmark} opacity={0.5} size='2x' className='fixed right-2 top-2 hover:cursor-pointer' />
                        <Typography variant="h5" color="gray" className="mb-6 uppercase">
                            Upload Image
                        </Typography>

                        <div className='flex justify-between bg-primary-color p-4'>
                            <div className='w-full'>
                                <div className='mt-4'>
                                    <input
                                        id="profile_img"
                                        name="profile_img"
                                        type='file'
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        onChange={handleSelectedImage}
                                    />

                                    {/* <InputError message={errors.about_me} className="mt-2" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
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
