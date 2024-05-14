import { ThreeDots } from "react-loader-spinner";
import Modal from "../Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";
import InputError from "../InputError";
import PrimaryButton from "../PrimaryButton";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

export default function NewLoungeModal({ showNewLoungeModal, toggleSetShowNewLoungeModal, addNewLounge }) {
    const [isProcessing, setIsProcessing] = useState(false);

    const { data, setData, processing, errors, setError, post, reset } = useForm({
       name: '',
       description: '',
    });

    const toggleSetIsProcessing = () => {
        isProcessing ? setIsProcessing(false) : setIsProcessing(true);
    }

    const submit = (e) => {
        e.preventDefault();

        toggleSetIsProcessing();

        axios.post(route('lounges.store'), {
            name: data.name,
            description: data.description
        })
        .then(res => {
            if (res.data.success) {
                toggleSetIsProcessing(false);
                toggleSetShowNewLoungeModal(false);

                addNewLounge(res.data.data[0]);
            }
        })
        .catch(error => {
            setIsProcessing(false);
            if (error.response.data.errors) {
                for (const [key, value] of Object.entries(error.response.data.errors)) {
                    errors[key] = value;
                }
            }
        });
    };

    return (
        <Modal show={showNewLoungeModal} className={'transition ease-in-out'}>

            {isProcessing &&
                <div className='w-[100%] flex justify-center'>
                    <ThreeDots className="mx-auto" visible={true} width="100" height='80' color='#121213' />
                </div>
            }

            <form onSubmit={submit} className='p-4 bg-devlounge-secondary'>
                {!isProcessing && <>
                    <FontAwesomeIcon onClick={toggleSetShowNewLoungeModal} color="white" icon={faCircleXmark} opacity={0.5} size='2x' className='fixed right-2 top-2 hover:cursor-pointer' />
                    <Typography variant="h5" color="white" className="mb-6 uppercase">
                        New Lounge
                    </Typography>

                    <div className=' p-4'>
                        {/* <div className='w-[65%]'> */}
                            <div>
                                <InputLabel htmlFor="name" value="Lounge Name" />

                                <TextInput
                                    id="name"
                                    placeholder=""
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="lounge_name"
                                    onChange={(e) => setData('name', e.target.value)}
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="description" value="Description" />

                                <TextInput
                                    id="description"
                                    placeholder=""
                                    name="description"
                                    valu={data.description}
                                    className="mt-1 block w-full"
                                    autoComplete="description"
                                    onChange={(e) => setData('description', e.target.value)}
                                />

                                <InputError message={errors.description} className="mt-2" />
                            </div>
                        {/* </div> */}
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
