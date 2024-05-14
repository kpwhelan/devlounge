import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Avatar,
  } from "@material-tailwind/react";

export default function LoungePreviewCard({ lounge }) {
    return (
        <Card className="bg-devlounge-secondary mt-4">
            <CardBody>
                <Typography variant="h5" color="white">{lounge.name}</Typography>
                <Typography variant="h6" color="white">{lounge.description}</Typography>
                <Typography variant="paragraph" color="white">Members - {lounge.follower_count}</Typography>
                <Typography variant="small" color="white">Lounge opened - {new Date(lounge.created_at).toLocaleDateString("en-US")}</Typography>
            </CardBody>
        </Card>
    );
}