import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { CustomInput } from "../components/CustomInput";
import { useStore } from "../store/store";
import { Link } from "../components/Link";
import {
  createToken,
  refreshUser,
  validateVerificationToken,
} from "../api/apiHandler";
import { useNavigate } from "react-router-dom";

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
          <Divider />
          <CardBody>
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
              <Divider />
              <CustomInput
                label="Token de validación"
                onChange={handleOnChange}
                classNames={{
                  input: "mx-auto text-center",
                }}
                style={{
                  letterSpacing: "15px",
                }}
                value={ValidationNumber}
              />
              <Link onClick={handleResendCode} className="text-end">
                Resend Validation token
              </Link>
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
              className={`${
                (ValidationNumber.length < 5 || Loading) && "opacity-50"
              }`}
              disabled={ValidationNumber.length < 5}
              isLoading={Loading}
              onClick={handleOnClick}
              color="secondary"
              fullWidth
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
