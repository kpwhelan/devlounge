import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function UserPreviewCard({ user }) {
    return (
        <Card className="mt-6 w-[80%]">
        <CardBody>
        {user.profile_picture_url &&
                <img
                src={user.profile_picture_url}
                alt="user-profile-picture"
                />
            }

        {!user.profile_picture_url &&
            <div className='py-3 px-4 mb-2 border-white border-4 max-w-fit rounded-full'>
                <FontAwesomeIcon icon={faUser} size='4x' />
            </div>
        }
        <Typography variant="h5" color="blue-gray" className="mb-2">
            {user.first_name} {user.last_name}
        </Typography>
        <Typography>
          {user.title}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Read More</Button>
      </CardFooter>
    </Card>
    );
}
