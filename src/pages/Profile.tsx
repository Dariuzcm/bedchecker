import { useStore } from "../store/store";
import { CameraIcon } from "../icons/CameraIcon";
import SelfEditInput from "../components/SelfEditInput";
import { updateUser } from "../api/apiHandler";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/shadcdn/ui/card";
import { Avatar } from "@radix-ui/react-avatar";
import { Button } from "@/shadcdn/ui/button";

function Profile() {
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const navigation = useNavigate()
  const handleOnSave = () => {
    updateUser(user)
  };

  const handleOnCancel = () => {
    navigation('/Home')
  };

  return (
    <>
      <section>
        <Card className="h-[80vh] overflow-x-visible">
          <CardContent>
            <div className="flex flex-col justify-center content-center items-center w-full pt-6 gap-4">
              <div className="w-fit">
                <Avatar
                  className="w-24 h-24 border-1 border-solid border-x-zinc-500"
                  //src={user.photo || "/avatarEmpty.svg"}
                />
                <Button
                  //radius="full"
                  className="text-white relative -right-16 -top-8"
                  color="success"
                  onClick={() => navigation('/profile/imgSelector')}
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
                className="shadow-lg text-xl mt-[20%]"
                size="lg"
                color="primary"
                onClick={handleOnSave}
              >
                Guardar
              </Button>
              <Button
                className="shadow-lg text-xl"
                size="lg"
                color="danger"
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
