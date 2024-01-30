import { ThreeDots } from "react-loader-spinner";
import Modal from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { Typography } from "@material-tailwind/react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import InputError from "../InputError";
import PrimaryButton from "../PrimaryButton";
import { useForm } from "@inertiajs/react";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { useState } from "react";

export default function EditLinksModal({ toggleSetShowEditLinksModal,showEditLinksModal, auth, notifySuccess, notifyError }) {
    const [isProcessing, setIsProcessing] = useState(false);

    const { data, setData, processing, errors, reset } = useForm({
        github_url: auth.user.github_url ? auth.user.github_url : '',
        linkedin_url: auth.user.linkedin_url ? auth.user.linkedin_url : '',
        x_url: auth.user.x_url ? auth.user.x_url : '',
        instagram_url: auth.user.instagram_url ? auth.user.instagram_url : '',
        website_url: auth.user.website_url ? auth.user.website_url : '',
    });

    const toggleSetIsProcessing = () => {
        isProcessing ? setIsProcessing(false) : setIsProcessing(true);
    }

    const submit = (e) => {
        e.preventDefault();

        toggleSetIsProcessing();

        axios.patch(route('update-user'), {
            github_url: data.github_url,
            linkedin_url: data.linkedin_url,
            x_url: data.x_url,
            instagram_url: data.instagram_url,
            website_url: data.website_url
        })
        .then(response => {
            if (response.data.success) {
                // reset();
                setIsProcessing(false);
                auth.user = response.data.data.user;
                toggleSetShowEditLinksModal();
                notifySuccess(response.data.message);
            }
        })
        .catch(error => {
            setIsProcessing(false);
            notifyError(error.response.data.message);
        })
    };

    return (
        <Modal show={showEditLinksModal} className={'transition ease-in-out'}>

            {isProcessing &&
                <div className='w-[100%] flex justify-center'>
                    <ThreeDots className="mx-auto" visible={true} width="100" height='80' color='#121213' />
                </div>
            }

            <form onSubmit={submit} className='p-4'>
            {!isProcessing && <>
                <FontAwesomeIcon onClick={toggleSetShowEditLinksModal} color="black" icon={faCircleXmark} opacity={0.5} size='2x' className='fixed right-2 top-2 hover:cursor-pointer' />
                <Typography variant="h5" color="gray" className="mb-6 uppercase">
                    Edit Links
                </Typography>

                <div className='flex justify-between bg-primary-color p-4'>
                    <div className='w-[65%]'>
                        <div>
                            <InputLabel htmlFor="github_url" value="Github" />

                            <TextInput
                                id="github_url"
                                placeholder="https://example.com"
                                name="github_url"
                                value={data.github_url}
                                className="mt-1 block w-full"
                                autoComplete="github_url"
                                onChange={(e) => setData('github_url', e.target.value)}
                            />

                            <InputError message={errors.instagram_url} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="linkedin_url" value="Linkedin" />

                            <TextInput
                                id="linkedin_url"
                                placeholder="https://example.com"
                                name="linkedin_url"
                                value={data.linkedin_url}
                                className="mt-1 block w-full"
                                autoComplete="linkedin_url"
                                onChange={(e) => setData('linkedin_url', e.target.value)}
                            />

                            <InputError message={errors.linkedin_url} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="x_url" value={<FontAwesomeIcon icon={faXTwitter} />} />

                            <TextInput
                                id="x_url"
                                placeholder="https://example.com"
                                name="x_url"
                                value={data.x_url}
                                className="mt-1 block w-full"
                                autoComplete="x_url"
                                onChange={(e) => setData('x_url', e.target.value)}
                            />

                            <InputError message={errors.x_url} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="instagram_url" value="Instagram" />

                            <TextInput
                                id="instagram_url"
                                placeholder="https://example.com"
                                name="instagram_url"
                                value={data.instagram_url}
                                className="mt-1 block w-full"
                                autoComplete="instagram_url"
                                onChange={(e) => setData('instagram_url', e.target.value)}
                            />

                            <InputError message={errors.instagram_url} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="website_url" value="Personal Website" />

                            <TextInput
                                id="website_url"
                                placeholder="https://example.com"
                                name="website_url"
                                value={data.website_url}
                                className="mt-1 block w-full"
                                autoComplete="website_url"
                                onChange={(e) => setData('website_url', e.target.value)}
                            />

                            <InputError message={errors.website_url} className="mt-2" />
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
