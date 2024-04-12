import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@material-tailwind/react";
import { faUser} from '@fortawesome/free-regular-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

export default function ProfileComponent({ className, user, handleCloseProfile }) {
    return (
        <>
        {user &&
            <div className={className}>
                <div className='mb-2 flex items-center justify-start'>
                    <div className='w-fit text-center'>
                        {user.profile_picture_url &&
                            <Avatar size='xxl' src={user.profile_picture_url} />
                        }
                        {!user.profile_picture_url &&
                            <div className='py-3 px-4 mb-2 border-white border-2 max-w-fit rounded-full'>
                                <FontAwesomeIcon icon={faUser} size='2x' />
                            </div>
                        }
                    </div>

                    <div className='ml-6'>
                        <p className='text-2xl font-bold'>{user.first_name} {user.last_name}</p>
                        <p>{user.title}</p>
                    </div>

                    <FontAwesomeIcon onClick={handleCloseProfile} color="black" icon={faCircleXmark} opacity={0.5} size='2x' className='hover:cursor-pointer ml-auto' />
                </div>

                <div className='pl-1 pt-2'>
                    <div className='flex justify-start items-center'>
                        <p className='font-bold text-2xl'>Links</p>
                    </div>
                    <p>Github: {user.github_url}</p>
                    <p>Linkedin: {user.linkedin_url}</p>
                    <p><FontAwesomeIcon icon={faXTwitter} />: {user.x_url}</p>
                    <p>Instagram: {user.instagram_url}</p>
                </div>

                <div className='pl-1 pt-2'>
                    <div className='flex justify-start items-center'>
                        <p className=' font-bold text-2xl'>About</p>
                    </div>

                    <p className='mb-4 whitespace-pre-line'>{user.about_me}</p>
                </div>
            </div>
        }
        </>
    );
}
