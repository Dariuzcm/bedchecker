import { useEffect } from "react";
import {
  BarcodeScanner,
  ScanOptions,
} from "@capacitor-community/barcode-scanner";
import { Button } from "@/shadcdn/ui/button";
import { Bed, Service } from "@/types/movementTypes";
import "./style.css";

interface BarcodeScannerComponentProps {
  isReady?: (isReady: boolean) => void;
  title: string;
  onScanData: (content: ScanResponse<Service | Bed>) => void;
}
export type ScanResponse<T> = T & { type: "service" | "bed" };

const BarcodeScannerComponent = (props: BarcodeScannerComponentProps) => {
  const { isReady, onScanData, title } = props;

  const startScanner = async () => {
    const body = window.document.querySelector("body")!;
    const div = document.createElement('div')
    try {
      // Verificar los permisos
      const options: ScanOptions = {
        targetedFormats: [
          "QR_CODE",
          // "EAN_13",
          // "EAN_8",
          // "UPC_A",
          // "UPC_E",
          // "CODE_39",
          // "CODE_93",
          // "CODE_128",
          // "ITF",
          // "CODABAR",
        ],
        cameraDirection: "back",
      };
      await BarcodeScanner.checkPermission({ force: true });
      await BarcodeScanner.hideBackground();

      window.document.querySelector("main")!.classList.add("scanner-active");

      const button = document.createElement('button')

      div.className ="absolute z-50 bottom-24 right-0 left-0 text-center"
      div.id = "button-absolute-qr"
      button.innerText = 'Cancelar Escaneo'
      button.className = "bg-primary text-white hover:bg-primary/90 p-3 inline-flex items-center justify-center font-normal whitespace-nowrap rounded-lg text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      const square = document.createElement('div')
      square.className="absolute size-1/2 border-1 border-danger right-0 left-0 top-0 bottom-0"
      button.addEventListener('click', handleOnCancelScan)

      div.appendChild(square)
      div.appendChild(button)

      body.appendChild(div);

      isReady && isReady(true);
      const result = await BarcodeScanner.startScan(options);
      if (result.hasContent) {
        const parced = JSON.parse(result.content);

        onScanData && onScanData(parced);
      }
    } catch (error) {
      console.error("Error al escanear código de barras:", error);
      await BarcodeScanner.stopScan();
      window.document.querySelector("main")?.classList.remove("scanner-active");
    } finally {
      body.removeChild(div)
      await BarcodeScanner.showBackground(); // Mostrar el fondo de la cámara
      window.document.querySelector("main")!.classList.remove("scanner-active");
      await BarcodeScanner.stopScan(); // Detener el escaneo
    }
  };

  useEffect(() => {
    return () => {
      async function stop() {
        await BarcodeScanner.stopScan();
        window.document.querySelector("main")!.classList.remove("scanner-active");
        window.document.querySelector('#button-absolute-qr')?.remove()
      }
      stop();
    };
  }, []);

  async function handleOnCancelScan(): Promise<void> {
    await BarcodeScanner.stopScan();
    window.document.querySelector("main")!.classList.remove("scanner-active");
    window.document.querySelector('#button-absolute-qr')?.remove()
  }

  return (
    <>
      <Button size={"lg"} onClick={startScanner}>
        {title}
      </Button>
    </>
  );
};

export default BarcodeScannerComponent;
