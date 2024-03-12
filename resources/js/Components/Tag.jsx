import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { Typography } from "@material-tailwind/react";
import axios from "axios";

export default function Tag({ tag, isEditingTags, className, detachTag }) {

    return (
        <div className={className}>

            <Typography variant="small">
                {tag.name['en']}
            </Typography>
            {isEditingTags &&
                <FontAwesomeIcon onClick={() => detachTag(tag)} color="white" icon={faCircleXmark} opacity={1} size='1x' className='hover:cursor-pointer ml-1' />
            }
        </div>
    );
}
