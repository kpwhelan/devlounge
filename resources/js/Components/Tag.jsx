import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { Typography } from "@material-tailwind/react";
import axios from "axios";

export default function Tag({ tag, isEditingTags, className }) {

    const deleteTag = () => {
        axios.put(route('profile.detach.tag'), {
            tag: tag,
        })
        .then(res  => {
            console.log(res)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className={className}>

            <Typography variant="small">
                {tag.name['en']}
            </Typography>
            {isEditingTags &&
                <FontAwesomeIcon onClick={deleteTag} color="white" icon={faCircleXmark} opacity={1} size='1x' className='hover:cursor-pointer ml-1' />
            }
        </div>
    );
}
