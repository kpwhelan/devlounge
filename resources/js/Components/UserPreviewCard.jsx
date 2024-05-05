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

export default function UserPreviewCard({ user, auth, handleShowProfile, highlight }) {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const inFollowingList = auth.user.following.some(entry => entry.id === user.id);

        if (inFollowingList) setIsFollowing(true);
    }, []);

    const followUser = () => {
        axios.post(route('follow-user', user.id))
        .then(res => {
            if (res.data.success) setIsFollowing(true);
            user.followers.push(auth.user.id);
        })
        .catch()
      }

      const unfollowUser = () => {
        axios.post(route('unfollow-user', user.id))
        .then(res => {
            if (res.data.success) setIsFollowing(false);
        })
      }

    return (
        <Card className='mt-4 w-[70%] mx-auto'>
            <div className={`flex justify-between items-center w-full ${highlight ? 'border-4 border-accent-color rounded-lg' : ''}`}>
                <CardBody className="flex">
                    <div className="hover:cursor-pointer">
                        {user.profile_picture_url &&
                            <Avatar src={auth.user.profile_picture_url} size="xl"/>
                        }

                        {!user.profile_picture_url &&
                            <div className='py-3 px-4 mb-2 border-white border-4 max-w-fit rounded-full'>
                                <FontAwesomeIcon icon={faUser} size='3x' />
                            </div>
                        }
                    </div>
                    <div className="flex items-center">
                        <div>
                            <div className="hover:cursor-pointer">
                                <Typography variant="h5" color="blue-gray" onClick={() => handleShowProfile(user)}>
                                    {user.first_name} {user.last_name}
                                </Typography>
                                <Typography variant="h6">
                                    {user.title}
                                </Typography>
                                <Typography variant="small">
                                    {Intl.NumberFormat(undefined, {notation: 'compact'}).format(user.followers.length)} {user.followers.length > 1 || user.followers.length == 0 ? 'followers' : 'follower'}
                                </Typography>
                            </div>
                            <div className="flex">
                                {user.tags.map((tag, index) => {
                                    return <Tag key={index} tag={tag} className="m-1 border-2 text-white rounded-lg px-2 py-1 bg-primary-color"/>
                                })}
                            </div>
                        </div>
                    </div>
                </CardBody>

                <CardFooter>
                    {!isFollowing && <Button onClick={followUser}>Follow</Button>}
                    {isFollowing && <Button onClick={unfollowUser}>UnFollow</Button>}
                </CardFooter>
            </div>
        </Card>
    );
}
