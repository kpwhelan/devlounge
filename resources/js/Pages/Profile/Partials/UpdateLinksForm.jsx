import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";

export default function UpdateLinksForm({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        github_url: user.github_url,
        linkedin_url: user.linkedin_url,
        x_url: user.x_url,
        instagram_url: user.instagram_url,
        website_url: user.website_url,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium">Update Links</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
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

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
