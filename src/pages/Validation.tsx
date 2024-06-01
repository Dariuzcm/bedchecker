import { ChangeEvent, useState } from "react";
import CustomInput from "../components/CustomInput";
import { useStore } from "../store/store";
import {
  createToken,
  refreshUser,
  validateVerificationToken,
} from "../api/apiHandler";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/shadcdn/ui/card";
import { Button } from "@/shadcdn/ui/button";
import CustomLink from "@/components/Link";

function Validation() {
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const [ValidationNumber, setValidationNumber] = useState("");
  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (Number.isNaN(Number(value))) return;

    if (value.length < 6) setValidationNumber(value);
  };

  const handleOnClick = () => {
    validateVerificationToken(ValidationNumber, user, setLoading).then(() => {
      refreshUser(user).then((incomingUser) => {
        setUser(incomingUser);
        navigate('/home')
      });
    });
  };

  const handleResendCode = () => {
    createToken(user);
  };
  return (
    <>
      <section className="mx-auto h-full content-center">
        <Card className="max-w-[400px]">
          <CardHeader>
            <h1 className="text-xl mx-auto">Validación</h1>
          </CardHeader>
          <hr />
          <CardContent>
            <div className="p-3 flex flex-col gap-3">
              <p className="text-sm text-zinc-500">
                Te hemos enviado un token de validación a tu correo electrónico
                <span className="text-keppel-500 px-2">{user.email}</span> como
                parte de nuestro proceso de autenticación.
              </p>
              <p className="text-sm text-zinc-500">
                Este token es una medida de seguridad para verificar tu
                identidad y garantizar la protección de tu cuenta.
              </p>
              <hr />
              <CustomInput
                name="Token de validación"
                onChange={handleOnChange}
                style={{
                  letterSpacing: "15px",
                }}
                value={ValidationNumber}
              />
              <CustomLink to="" onClick={handleResendCode} className="text-end">
                Resend Validation token
              </CustomLink>
            </div>
          </CardContent>
          <hr />
          <CardFooter>
            <Button
              className={`${
                (ValidationNumber.length < 5 || Loading) && "opacity-50"
              }`}
              disabled={ValidationNumber.length < 5}        
              onClick={handleOnClick}
              variant="secondary"
            >
              Validar token
            </Button>
          </CardFooter>
        </Card>
      </section>
    </>
  );
}

export default Validation;
