import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { getRooms } from "@/data-access/rooms";
import { TagsList, splitTags } from "@/components/tags-list";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={splitTags(room.tags)} />{" "}
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubLogoIcon /> GitHub Project
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}> Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home() {
  const rooms = await getRooms();

  return (
    <main className="container min-h-screen p-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl">Find Rooms</h1>
        <Button asChild>
          <Link href={"/create-room"}>Create Room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
