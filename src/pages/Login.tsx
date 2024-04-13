import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { loginAction } from "../api/apiHandler";


export function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)

  const handleOnSubmit = async () => {

    loginAction(formValues.email, formValues.password, setLoading)
  };
  
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section className="mx-auto h-full content-center">
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3 text-center">
            <div className="flex flex-col mx-auto">
              <p className="text-md">Ingresar a Cuenta</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-col gap-3 py-9">
              <Input
                name="email"
                onChange={handleOnChange}
                value={formValues.email ? formValues.email :""}
                defaultValue=""
                type="email"
                label="Email"
                placeholder="Ingresa tu correo"
                disabled={loading}
              />
              <Input
                name="password"
                onChange={handleOnChange}
                defaultValue=""
                value={formValues.password ? formValues.password : ""}
                type="password"
                label="Contraseña"
                placeholder="Contraseña"
                disabled={loading}
              />
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <div className="flex flex-col gap-4 w-full px-5">
              
              <Button
                className={`${formValues.email.length === 0 || formValues.password.length === 0 && 'opacity-35'}`}
                disabled={(formValues.email.length === 0 || formValues.password.length === 0)}
                isLoading={loading} color="primary" onClick={handleOnSubmit}>
                Login
              </Button>
            </div>
          </CardFooter>
        </Card>
    </section>
  );
}
