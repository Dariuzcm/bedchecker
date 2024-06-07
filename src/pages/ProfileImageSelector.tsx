import { FunctionComponent, useEffect, useRef, useState } from "react";

import AvatarEditor from "react-avatar-editor";
import { CameraUp } from "../icons/CameraUp";
import CameraSearch from "../icons/CameraSearch";
import CameraDelete from "../icons/CameraDelete";
import { useNavigate } from "react-router-dom";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import MaleAvatar from "@/assets/male_avatar.webp";
import { deletePhoto, updatePhoto } from "@/api/userServiceHandler";
import { useStore } from "@/store/store";
import { User } from "@/types/userTypes";
import { Card, CardContent } from "@/shadcdn/ui/card";
import { Button } from "@/shadcdn/ui/button";
import { Slider } from "@/shadcdn/ui/slider";
import { useToast } from "@/shadcdn/ui/use-toast";
import { Loader2 } from "lucide-react";

interface ProfileImageSelectorProps {}

const ProfileImageSelector: FunctionComponent<
  ProfileImageSelectorProps
> = () => {
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const { toast } = useToast()

  const [Scale, setScale] = useState(1);
  const [Image, setImage] = useState(user.photo || MaleAvatar);

  const navigation = useNavigate();

  const handleOnSave = () => {
    if (Image === MaleAvatar) {
      deletePhoto(user).then(() => {
        setUser({
          photo: undefined,
        });
    
      });
      return;
    }

    const { current } = setEditorRef;
    if (current) {
      (current.getImage() as HTMLCanvasElement).toBlob((blob) => {
        if (blob) {
          updatePhoto(user, blob).then(({ photo }: User) => {
            setUser({
              photo
            })
            toast({
              title: "Actualizando: Avatar de usuario",
              description: `Usuario actualizado: ${Date.now()}`,
            })
          })
        }
      })
    }
  };

  const handleOnCancel = () => {
    navigation("/profile");
  };

  async function handleTakeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    const imageUrl = image.webPath;

    if (imageUrl) setImage(imageUrl);
  }

  async function handleSearchImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
    const imageUrl = image.webPath;
    if (imageUrl) setImage(imageUrl);
  }

  function handleDeleteImage() {
    setImage(MaleAvatar);
  }

  async function checkPermissions() {
    const permissions = await Camera.checkPermissions();
    if (!permissions.camera || !permissions.photos) {
      await Camera.requestPermissions({
        permissions: ["camera", "photos"],
      });
    }
  }

  useEffect(() => {
    checkPermissions();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setEditorRef = useRef<AvatarEditor>(null);

  return (
    <>
      <section>
        <Card className="h-auto min-h-[80vh] overflow-x-visible">
          <CardContent>
            <div className="flex flex-col justify-center content-center items-center w-full pt-6 gap-4 px-3">
              <AvatarEditor
                ref={setEditorRef}
                crossOrigin={'*'}
                image={Image}
                width={200}
                height={200}
                border={50}
                scale={Scale}
                rotate={0}
                borderRadius={500}
              />
              <Slider
                step={0.1}
                min={0}
                max={2}
                value={[Scale]}
                onValueChange={(value) => setScale(value[0])}
              />
              <div className="flex w-full justify-between px-10">
                <Button
                  onClick={handleTakeImage}
                  className="bg-success-600 shadow-lg"
                  size={'icon'}
                >
                  <CameraUp className="text-white scale-150" />
                </Button>
                <Button
                  onClick={handleSearchImage}
                  size={'icon'}
                  className="bg-primary-500 shadow-lg"
                >
                  <CameraSearch className="text-white scale-150" />
                </Button>
                <Button
                  onClick={handleDeleteImage}
                  size={'icon'}
                  className="bg-danger-500 shadow-lg"
                >
                  <CameraDelete className="text-white scale-150" />
                </Button>
              </div>
              <Button
                className="shadow-lg text-xl mt-[20%] w-full"
                size="lg"
                variant="default"
                onClick={handleOnSave}
                disabled={true}
              >
               <Loader2 className="animate-spin"/> Guardar
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
};

export default ProfileImageSelector;
