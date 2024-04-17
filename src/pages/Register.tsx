import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { CustomInput } from "../components/CustomInput";
import { CloseIcon } from "../icons/Close";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigation = useNavigate()
  return (
    <>
      <section className="mx-auto h-full content-center">
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3 text-center justify-center">
            <div className="flex flex-col mx-auto">
              <p className="text-md font-semibold">Registro</p>
            </div>
            <Button
              radius="full"
              size="sm"
              isIconOnly
              onClick={() => navigation('/login')}
              color="danger"
            >
              <CloseIcon className="size-5" />
            </Button>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-col gap-3 pt-0 ">
              <CustomInput
                name="fullName"
                defaultValue=""
                type="text"
                label="Nombre"
                placeholder="Nombre completo"
                required
              />
              <CustomInput
                name="employeeId"
                defaultValue=""
                type="text"
                label="Numero de empleado"
                placeholder="Numero de empleado"
                required
              />
              <CustomInput
                name="email"
                defaultValue=""
                type="enail"
                label="Email"
                placeholder="Correo electrónico"
                required
              />
              <CustomInput
                name="password"
                defaultValue=""
                type="password"
                label="Contraseña"
                required
              />
              <CustomInput
                name="confirmPassword"
                defaultValue=""
                type="password"
                label="Confirmar Contraseña"
                required
              />
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex flex-col gap-4 w-full px-5">
              <Button color="secondary">Registrar</Button>
            </div>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
