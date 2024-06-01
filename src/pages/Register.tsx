import CustomInput from "../components/CustomInput";
import { CloseIcon } from "../icons/Close";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import type { Token, User } from "../types/userTypes";
import { createToken, registration } from "../api/apiHandler";
import { useStore } from "../store/store";
import { Card, CardContent, CardFooter, CardHeader } from "@/shadcdn/ui/card";
import { Button } from "@/shadcdn/ui/button";
import Divider from "@/components/Divider";

type RegistryType = Pick<
  User,
  "name" | "photo" | "email" | "employeeNumber"
> & {
  password: string;
  confirmPassword: string;
};

export function Register() {
  const navigation = useNavigate();
  const { setUser } = useStore((state) => ({ setUser: state.setUser }));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_Loading, setLoading] = useState(false);
  const [registryValues, setRegistryValues] = useState<RegistryType>({
    confirmPassword: "",
    password: "",
    email: "",
    name: "",
    photo: "",
    employeeNumber: "",
  });

  const handleOnChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegistryValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInputs = (input: keyof RegistryType): string | undefined => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    switch (input) {
      case "name":
        if (registryValues.name.length < 4)
          return "Nombre invalido, tiene que ser mayor a 3 caracteres";
        break;
      case "photo":
        break;
      case "email":
        // eslint-disable-next-line no-case-declarations
        if (!regex.test(registryValues.email)) return "Email no valido";
        break;
      case "employeeNumber":
        if (Number.isNaN(Number(registryValues.employeeNumber)))
          return "Debe ser un Numero";
        if (registryValues.employeeNumber!.length < 10)
          return "Debe ser mayor a 10";
        break;
      case "password":
        if (registryValues.password.length < 6)
          return "Contraseña tiene que tener una al menos a 6 caracteres";
        break;
      case "confirmPassword":
        if (registryValues.password !== registryValues.confirmPassword)
          return "Contraseña no coincide";
        break;
    }
  };

  const validateAll = (): boolean => {
    const keys: (keyof RegistryType)[] = [
      "confirmPassword",
      "email",
      "employeeNumber",
      "name",
      "password",
    ];

    for (const key of keys) {
      const valid = validateInputs(key);
      if (valid) return true;
    }
    return false;
  };

  const handleOnClick = () => {
    registration(registryValues, setLoading).then(
      (data: { user: User; token: Token }) => {
        const { user, token } = data;
        const newUser = {
          ...user,
          token,
        };
        setUser({
          ...newUser,
        });
        createToken(newUser);
      }
    );
  };
  return (
    <>
      <section className="mx-auto h-full content-center">
        <Card className="max-w-[400px]">
          <CardHeader className="text-center justify-center">
            <div className="flex flex-col mx-auto">
              <p className="text-md font-semibold">Registro</p>
            </div>
            <div className="self-end fixed">
              <Button
                className="rounded-full size-10"
                size="sm"
                onClick={() => navigation("/login")}
                variant="destructive"
              >
                <CloseIcon className="size-5" />
              </Button>
            </div>
          </CardHeader>
          <Divider />
          <CardContent>
            <div className="flex flex-col gap-3 pt-0 ">
              <CustomInput
                onChange={handleOnChangeValue}
                name="name"
                value={registryValues.name}
                type="text"
                label="Nombre"
                // isInvalid={!!validateInputs("name") as boolean}
                // errorMessage={validateInputs("name")}
                placeholder="Nombre completo"
                required
              />
              <CustomInput
                onChange={handleOnChangeValue}
                name="employeeNumber"
                // isInvalid={!!validateInputs("employeeNumber") as boolean}
                // errorMessage={validateInputs("employeeNumber")}
                value={registryValues.employeeNumber?.toString()}
                type="text"
                label="Numero de empleado"
                placeholder="Numero de empleado"
                required
              />
              <CustomInput
                onChange={handleOnChangeValue}
                name="email"
                // isInvalid={!!validateInputs("email") as boolean}
                // errorMessage={validateInputs("email")}
                value={registryValues.email}
                type="email"
                label="Email"
                placeholder="Correo electrónico"
                required
              />
              <CustomInput
                onChange={handleOnChangeValue}
                name="password"
                // isInvalid={!!validateInputs("password") as boolean}
                // errorMessage={validateInputs("password")}
                label="Contraseña"
                placeholder="Contraseña"
                value={registryValues.password}
                type="password"
                required
              />
              <CustomInput
                onChange={handleOnChangeValue}
                name="confirmPassword"
                // isInvalid={!!validateInputs("confirmPassword") as boolean}
                // onError={validateInputs("confirmPassword")}
                label="Confirmar Contraseña"
                placeholder="Confirmar Contraseña"
                value={registryValues.confirmPassword}
                type="password"
                required
              />
            </div>
          </CardContent>
          <Divider />
          <CardFooter>
            <div className="flex flex-col gap-4 w-full px-5">
              <Button
                // isLoading={Loading}
                className={validateAll() ? "opacity-50" : ""}
                onClick={handleOnClick}
                // disabled={validateAll()}
                variant="secondary"
              >
                Registrar
              </Button>
            </div>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}
