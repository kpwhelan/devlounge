import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUser } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { followUser } from "@/utils/FollowUtils";

export default function UserPreviewCard({ user, auth }) {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const inFollowingList = auth.user.following.some(entry => entry.user_id === user.id);

        if (inFollowingList) setIsFollowing(true);
    }, []);

    return (
        <Card className="mt-4 w-[80%]">
            <CardBody className="flex">
                {user.profile_picture_url &&
                        <img
                        src={user.profile_picture_url}
                        alt="user-profile-picture"
                        />
                    }

                {!user.profile_picture_url &&
                    <div className='py-3 px-4 mb-2 border-white border-4 max-w-fit rounded-full'>
                        <FontAwesomeIcon icon={faUser} size='3x' />
                    </div>
                }
                <div>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        {user.first_name} {user.last_name}
                    </Typography>
                    <Typography>
                    {user.title}
                    </Typography>
                </div>
            </CardBody>

            <CardFooter className="pt-0">
                {!isFollowing && <Button onClick={() => followUser(user)}>Follow</Button>}
                {isFollowing && <Button onClick={followUser}>UnFollow</Button>}
            </CardFooter>
        </Card>
    );
}
