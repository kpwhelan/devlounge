import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Tag from "@/Components/Tag";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { Card, List, ListItem } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UpdateTags({ notifySuccess, notifyError, className = '' }) {
    let user = usePage().props.auth.user;
    const [isProcessing, setIsProcessing] = useState(false);
    const [isEditingTags, setIsEditingTags] = useState(false);
    const [tags, setTags] = useState(user.tags);
    const [tagSearchResults, setTagSearchResults] = useState([]);
    const [tempTag, setTempTag] = useState('');

    // console.log(route('profile.search.tags'))

    const toggleSetIsEditingTags = () => {
        isEditingTags ? setIsEditingTags(false) : setIsEditingTags(true);
    }

    const { data, setData, errors, isDirty } = useForm({
        tags: [],
        tempThing: ''
    });

    const handleTagSelect = (tag) => {
        setTagSearchResults([]);


        setData('tags', [...data.tags, tag]);
        console.log(data.tags)
    }

    const handleNewTagInput = (e) => {
        const searchTerm = e.target.value;

        setTempTag(searchTerm);

        axios.get(route('profile.search.tags', searchTerm))
            .then(res => {
                setTagSearchResults(res.data.tags)
            })
            .catch(error => {console.log(error)})
    }

    const detachTag = (tag) => {
        axios.put(route('profile.detach.tag'), {
            tag: tag,
        })
        .then((res)  => {
            setTags(res.data.data.user.tags);
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
                                return <Tag key={index} tag={tag} isEditingTags={isEditingTags} className="m-1 border-2 rounded-lg p-1"/>
                            })}
                        </div>
                    }

                    {isEditingTags &&
                        <div>
                            <div className="bg-white flex p-2 rounded-md">
                               {tags.map((tag, index) => {
                                return <Tag key={index} tag={tag} detachTag={detachTag} isEditingTags={isEditingTags} className={`bg-gray-600 max-w-fit rounded-lg p-1 mx-1 animate-pulse ${isEditingTags ? 'flex justify-between items-center' : ''}`} />
                               })}
                            </div>
                            <div>
                                <InputLabel htmlFor="new_tags" value="Add new tags" />

                                <TextInput
                                    id="new_tags"
                                    placeholder="e.g.: #php #javascript"
                                    name="new_tags"
                                    value={tempTag}
                                    className="mt-1 block w-full"
                                    autoComplete="new_tags"
                                    onChange={(e) => handleNewTagInput(e)}
                                    disabled={isProcessing}
                                />

                                {(tagSearchResults && tagSearchResults.length >= 1) &&
                                    <Card className="mt-2">
                                        <List>
                                            <ListItem selected={true} onClick={() => handleTagSelect(tempTag)} className="p-1">{tempTag}</ListItem>
                                            {tagSearchResults.map(result => {
                                                return <ListItem key={result.id} onClick={() => handleTagSelect(result.name["en"])}  className="p-1">{result.name["en"]}</ListItem>
                                            })}
                                        </List>
                                    </Card>
                                }

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
