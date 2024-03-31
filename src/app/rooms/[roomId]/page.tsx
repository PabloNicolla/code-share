import { getRoom } from "@/data-access/rooms";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { TagsList } from "@/components/tags-list";
import { CodeShareVideo } from "./video-player";
import { splitTags } from "@/lib/utils";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;

  const room = await getRoom(roomId);

  if (!room) {
    return <div className="container">Room not found</div>;
  }

  return (
    <div>
      <div className="container grid min-h-screen grid-cols-4">
        <div className="col-span-3 p-4 pr-2">
          <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <CodeShareVideo room={room} />
          </div>
        </div>
        <div className="col-span-1 p-4 pl-2">
          <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            <div className="text-base">{room?.name}</div>

            {room.githubRepo && (
              <Link
                href={room.githubRepo}
                className="flex items-center gap-2 text-center text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubLogoIcon /> GitHub Project
              </Link>
            )}

            <p className="text-base text-gray-600">{room?.description}</p>

            <TagsList tags={splitTags(room.tags)} />
          </div>
        </div>
      </div>
    </div>
  );
}
