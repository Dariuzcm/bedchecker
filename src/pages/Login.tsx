import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { ChangeEvent, MouseEvent, useState, useRef } from "react";
import { 
  //capacitorLoginAction, 
  loginAction,
} from "../api/apiHandler";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useStore((state) => ({setUser: state.setUser}));
  
  const [Error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate()
  const handleOnSubmit = async (e: MouseEvent<HTMLButtonElement>) => {

    loginAction(formValues.email, formValues.password, setLoading).then(
      (data) => {
        setUser({
          ...data.user,
          token: data.token,
        });
        navigation('/home')
      }
    ).catch( error => {
      setError(error.message)
      if(divRef.current) {
        divRef.current.innerHTML = error + `<p>${JSON.stringify(error)}</p>`
      }
    })
    
    
    e.preventDefault()
  };

  const divRef = useRef<HTMLDivElement>(null)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              value={formValues.email ? formValues.email : ""}
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
              className={`${
                (formValues.email.length === 0 ||
                formValues.password.length === 0) && "opacity-35"
              }`}
              disabled={
                formValues.email.length === 0 ||
                formValues.password.length === 0
              }
              isLoading={loading}
              color="primary"
              onClick={handleOnSubmit}
            >
              Login
            </Button>
          </div>
        </CardFooter>
      </Card>
      {Error && <div 
        className="w-auto border-solid border-red-400 bg-red-300 border-small rounded-sm m-3 p-3" 
        ref={divRef} 
      />}
    </section>
  );
}
