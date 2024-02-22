import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Tag from "@/Components/Tag";
import { useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function UpdateTags({ notifySuccess, notifyError, className = '' }) {
    const user = usePage().props.auth.user;
    console.log(user)
    const [isProcessing, setIsProcessing] = useState(false);
    const [isAddingTags, setIsAddingTags] = useState(false);

    const { data, setData, errors } = useForm({
        tags: user.tags,
    });

    const submit = (e) => {
        e.preventDefault();

        //if no changes were made, don't submit
        if (!isDirty) return;

        setIsProcessing(true);

        axios.patch(route('profile.edit'), {
            about_me: data.about_me
        })
        .then(res => {
            setIsProcessing(false);
            notifySuccess(res.data.data.message);
        })
        .catch(error => {
            setIsProcessing(false);

            if (error.response.data.errors) {
                for (const [key, value] of Object.entries(error.response.data.errors)) {
                    errors[key] = value;
                }
            }

            notifyError(error.response.data.message);
        })
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium">Update Tags</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="tags" value="Tags" />

                    <Tag />

                    {/* <textarea
                        id="tags"
                        name="tags"
                        type='textarea'
                        value={data.tags}
                        className="block h-72 overflow-scroll p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                        autoComplete="tags"
                        disabled={isProcessing}

                        onChange={(e) => setData('tags', e.target.value)}
                    />

                    <InputError message={errors.tags} className="mt-2" /> */}
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={isProcessing}>Save</PrimaryButton>

                    {/* <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition> */}
                </div>
            </form>
        </section>
    );
}
