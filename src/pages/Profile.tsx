import { useStore } from "../store/store";
import { CameraIcon } from "../icons/CameraIcon";
import SelfEditInput from "../components/SelfEditInput";
import { updateUser } from "../api/userServiceHandler";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/shadcdn/ui/card";
import { Button } from "@/shadcdn/ui/button";
import { Avatar, AvatarImage } from "@/shadcdn/ui/avatar";

function Profile() {
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const navigation = useNavigate();
  const handleOnSave = () => {
    updateUser(user);
  };

  const handleOnCancel = () => {
    navigation("/Home");
  };

  return (
    <>
      <section>
        <Card className="h-[80vh] overflow-x-visible">
          <CardContent>
            <div className="flex flex-col justify-center content-center items-center w-full pt-6 gap-4">
              <div className="w-fit">
                <Avatar
                  className="size-28 border-1 border-solid border-x-zinc-500"
                  //
                >
                  <AvatarImage src={user.photo || "/avatarEmpty.svg"} />
                </Avatar>
                <Button
                  className="text-white relative -right-16 -top-8 rounded-full"
                  variant="secondary"
                  size={"icon"}
                  onClick={() => navigation("/profile/imgSelector")}
                >
                  <CameraIcon />
                </Button>
              </div>
              <SelfEditInput
                ObjKey={"name"}
                defaultText="Nombre"
                object={user}
                partialEditor={setUser}
              />
              <SelfEditInput
                classNames={{
                  title: "text-md text-zinc-500",
                }}
                defaultText="Email"
                ObjKey={"email"}
                object={user}
                partialEditor={setUser}
              />
              <SelfEditInput
                classNames={{
                  title: "text-md text-zinc-400",
                }}
                ObjKey={"employeeNumber"}
                defaultText="Numero de empleado"
                object={user}
                partialEditor={setUser}
              />
              <Button
                className="shadow-lg text-xl mt-[20%] w-full"
                size="lg"
                variant="default"
                onClick={handleOnSave}
              >
                Guardar
              </Button>
              <Button
                className="shadow-lg text-xl w-full"
                size="lg"
                variant="destructive"
                onClick={handleOnCancel}
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

export default Profile;
