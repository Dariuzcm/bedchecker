import { Button, Card, CardBody, Slider } from "@nextui-org/react";

import { FunctionComponent, useEffect, useState } from "react";

import AvatarEditor from "react-avatar-editor";
import { CameraUp } from "../icons/CameraUp";
import CameraSearch from "../icons/CameraSearch";
import CameraDelete from "../icons/CameraDelete";
import { useNavigate } from "react-router-dom";
import { Camera, CameraResultType } from "@capacitor/camera";

import MaleAvatar from '@/assets/male_avatar.webp'

interface ProfileImageSelectorProps {}

const ProfileImageSelector: FunctionComponent<
  ProfileImageSelectorProps
> = () => {
  const [Scale, setScale] = useState(1);
  const [Image, setImage] = useState(MaleAvatar);

  const navigation = useNavigate();

  const handleOnSave = () => {};

  const handleOnCancel = () => {
    navigation("/profile");
  };

  async function handleTakeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    const imageUrl = image.webPath;

    setImage(imageUrl || "");
  }

  async function handleSearchImage() {
    const image = await Camera.pickImages({
      quality: 50,
      limit: 1,
    });
    const imageUrl = image.photos[0].webPath;
    setImage(imageUrl);
  }

  function handleDeleteImage() {
    setImage(MaleAvatar)
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

  return (
    <>
      <section>
        <Card className="h-[80vh] overflow-x-visible">
          <CardBody>
            <div className="flex flex-col justify-center content-center items-center w-full pt-6 gap-4 px-3">
              <AvatarEditor
                image={Image}
                width={200}
                height={200}
                border={50}
                scale={Scale}
                rotate={0}
                borderRadius={150}
              />
              <Slider
                color="foreground"
                size="sm"
                maxValue={2}
                minValue={0}
                step={0.1}
                defaultValue={Scale}
                label="Escala"
                onChange={(value) => setScale(value as number)}
              />
              <div className="flex w-full justify-between px-10">
                <Button
                  isIconOnly
                  onClick={handleTakeImage}
                  className="bg-keppel-600 shadow-lg"
                >
                  <CameraUp className="text-white scale-150" />
                </Button>
                <Button
                  isIconOnly
                  onClick={handleSearchImage}
                  className="bg-palatinate_blue-500 shadow-lg"
                >
                  <CameraSearch className="text-white scale-150" />
                </Button>
                <Button
                  isIconOnly
                  onClick={handleDeleteImage}
                  className="bg-crayola-500 shadow-lg"
                >
                  <CameraDelete className="text-white scale-150" />
                </Button>
              </div>
              <Button
                className="shadow-lg text-xl mt-[20%]"
                fullWidth
                size="lg"
                color="primary"
                onClick={handleOnSave}
              >
                Guardar
              </Button>
              <Button
                className="shadow-lg text-xl"
                fullWidth
                size="lg"
                color="danger"
                onClick={handleOnCancel}
              >
                Cancelar
              </Button>
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
};

export default ProfileImageSelector;