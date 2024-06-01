import { Card, CardContent } from "@/shadcdn/ui/card";

export function NotFound() {
  return (
    <>
      <div>
        <Card>
          <CardContent>
            <div className="p-5">
              <div className="text-center m-3">
                <h1 className="font-semibold text-[30px] text-crayola">Error 404</h1>
                <h1 className="font-semibold text-[25px]">Página no encontrada</h1>
              </div>
              <p>¡Hola, querido usuario!</p>
              <p>
                Parece que la página que estás buscando no existe o ha sido
                eliminada.
              </p>
              <p>
                El error 404 es un código de estado HTTP que indica que el
                servidor web no pudo encontrar la página solicitada.
              </p>
              <p>
                Esto puede suceder por varias razones, como una URL incorrecta,
                una página que ya no existe o un sitio web que está en
                mantenimiento.
              </p>
              <p>
                Para seguir navegando en nuestro sitio, puedes regresar a la
                página de inicio o utilizar el menú de navegación.
              </p>
              <p>Gracias por tu comprensión y disculpa las molestias.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
