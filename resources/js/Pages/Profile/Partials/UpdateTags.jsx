import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Tag from "@/Components/Tag";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UpdateTags({ notifySuccess, notifyError, className = '' }) {
    let user = usePage().props.auth.user;
    const [isProcessing, setIsProcessing] = useState(false);
    const [isEditingTags, setIsEditingTags] = useState(false);
    const [tags, setTags] = useState(user.tags);

    // console.log(user)

    const toggleSetIsEditingTags = () => {
        isEditingTags ? setIsEditingTags(false) : setIsEditingTags(true);
    }

    const { data, setData, errors, isDirty } = useForm({
        tags: '',
    });

    const detachTag = (tag) => {
        axios.put(route('profile.detach.tag'), {
            tag: tag,
        })
        .then(()  => {
            let updatedTags = tags.splice(user.tags.indexOf(tag))
            setTags(updatedTags);
        })
        .catch(error => {
            if (error.response.data.errors) {
                for (const [key, value] of Object.entries(error.response.data.errors)) {
                    errors[key] = value;
                }
            }

            notifyError(error.response.data.message);
        })
    }

    const submit = (e) => {
        e.preventDefault();

        //if no changes were made, don't submit
        if (!isDirty) return;

        setIsProcessing(true);

        axios.patch(route('profile.update.tags'), {
            tags: data.tags
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
                <h2 className="text-xl font-medium">Update Tags</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    {/* <InputLabel htmlFor="tags" value="Tags" /> */}

                    {!isEditingTags && 
                        <div className="flex">
                            {tags.map((tag, index) => {
                                return <Tag key={index} tag={tag} isEditingTags={isEditingTags} className="m-1"/>
                            })}
                        </div>
                    }

                    {isEditingTags &&
                        <div>
                            <div className="bg-white flex p-2 rounded-md">
                               {tags.map((tag, index) => {
                                return <Tag key={index} tag={tag} detachTag={detachTag} isEditingTags={isEditingTags} className={`bg-gray-600 max-w-fit rounded-xl px-2 mx-1 animate-pulse ${isEditingTags ? 'flex justify-between items-center' : ''}`} />
                               })}
                            </div>
                            <div>
                                <InputLabel htmlFor="new_tags" value="Add new tags" />

                                <TextInput
                                    id="new_tags"
                                    placeholder="e.g.: #php #javascript"
                                    name="new_tags"
                                    value={data.tags}
                                    className="mt-1 block w-full"
                                    autoComplete="new_tags"
                                    onChange={(e) => setData('tags', e.target.value)}
                                    disabled={isProcessing}
                                />

                                <InputError message={errors.tags} className="mt-2" />
                            </div>
                        </div>
                    }
                </div>

                <div className="flex items-center gap-4">
                    {isEditingTags && <PrimaryButton disabled={isProcessing}>Save Tags</PrimaryButton>}

                    {!isEditingTags && <PrimaryButton onClick={toggleSetIsEditingTags} disabled={isProcessing}>Edit Tags</PrimaryButton>}

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
