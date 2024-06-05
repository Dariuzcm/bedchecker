import { ChangeEvent, useState, useRef } from "react";
import {
  // capacitorLoginAction,
  loginAction,
} from "../api/userServiceHandler";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import { Card, CardContent, CardFooter, CardHeader } from "@/shadcdn/ui/card";
import { Button } from "@/shadcdn/ui/button";
import Divider from "@/components/Divider";
import CustomLink from "@/components/Link";

export function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useStore((state) => ({setUser: state.setUser}));

  const [Error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();
  const handleOnSubmit = async () => {
    loginAction(formValues.email, formValues.password, setLoading)
      .then((data) => {
        setUser({
          ...data.user,
          token: data.token,
        });
        navigation('/home')
      })
      .catch((error) => {
        setError(error.message);
        if (divRef.current) {
          divRef.current.innerHTML = error + `<p>${JSON.stringify(error)}</p>`;
        }
      });
  };

  const divRef = useRef<HTMLDivElement>(null);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <section className="h-full content-center">
      <Card className="max-w-[400px] mx-auto">
        <CardHeader className="flex gap-3 text-center">
          <div className="flex flex-col mx-auto">
            <p className="text-2xl font-semibold">Ingresar a Cuenta</p>
          </div>
        </CardHeader>
        <Divider />
        <CardContent>
          <div className="flex flex-col gap-3 pt-0 first:items-end">
            <div className="mb-6">
              <CustomLink to="/register">Crear Cuenta</CustomLink>
            </div>
            <CustomInput
              name="email"
              onChange={handleOnChange}
              value={formValues.email ? formValues.email : ""}
              defaultValue=""
              type="email"
              label="Email"
              placeholder="Ingresa tu correo"
              required
              disabled={loading}
            />
            <CustomInput
              name="password"
              onChange={handleOnChange}
              defaultValue=""
              value={formValues.password ? formValues.password : ""}
              type="password"
              placeholder="Contraseña"
              disabled={loading}
              required
            />
            <div className="w-full flex justify-center items-center pt-6">
              <CustomLink to="#">Reestablecer Contraseña</CustomLink>
            </div>
          </div>
        </CardContent>
        <Divider />
        <CardFooter>
          <div className="flex flex-col gap-4 w-full px-5">
            <Button
              size={"xl"}
              className={`text-white font-normal w-full mt-4 ${
                (formValues.email.length === 0 ||
                  formValues.password.length === 0) &&
                "opacity-35"
              }`}
              disabled={
                formValues.email.length === 0 ||
                formValues.password.length === 0
              }
              onClick={handleOnSubmit}
            >
              Login
            </Button>
          </div>
        </CardFooter>
      </Card>
      {Error && (
        <div
          className="w-auto border-solid border-crayola-400 bg-crayola-800 border-small rounded-sm m-3 p-3"
          ref={divRef}
        />
      )}
    </section>
  );
}
