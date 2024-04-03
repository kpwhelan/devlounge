import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Avatar,
  } from "@material-tailwind/react";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUser } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Tag from "./Tag";

export default function UserPreviewCard({ user, auth }) {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const inFollowingList = auth.user.following.some(entry => entry.id === user.id);

        if (inFollowingList) setIsFollowing(true);
    }, []);

    const followUser = (user) => {
        axios.post(route('follow-user'), {
            user_id: user.id,
        })
        .then(res => {
            if (res.data.success) setIsFollowing(true);
        })
        .catch(error => console.log(err))
      }

    return (
        <Card className="mt-4 w-[80%]">
            <CardBody className="flex">
                {user.profile_picture_url &&
                        <Avatar src={auth.user.profile_picture_url} size="xxl"/>
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
                    <div className="flex">
                        {user.tags.map((tag, index) => {
                            return <Tag key={index} tag={tag} className="m-1 border-2 text-white rounded-lg px-2 py-1 bg-primary-color"/>
                        })}
                    </div>
                </div>
            </CardBody>

            <CardFooter className="pt-0">
                {!isFollowing && <Button onClick={() => followUser(user)}>Follow</Button>}
                {isFollowing && <Button onClick={followUser}>UnFollow</Button>}
            </CardFooter>
        </Card>
    );
}
