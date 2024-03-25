import { CreateRoomForm } from "./create-room-form";

export default function CreateRoomPage() {
  return (
    <div>
      <div className="container mx-auto flex flex-col gap-8 pb-24 pt-12">
        <h1 className="text-4xl font-bold">Create Room</h1>

        <CreateRoomForm />
      </div>
    </div>
  );
}
