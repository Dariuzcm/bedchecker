import { useState, useEffect } from "react";
import {
  BarcodeScanner,
  ScanOptions,
} from "@capacitor-community/barcode-scanner";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/store";
import { Bed, Service, Status } from "@/types/movementTypes";
import { Button } from "@/shadcdn/ui/button";

const BarcodeScannerComponent = () => {
  const { setBed, setService, setMovement, movement } = useStore((state) => ({
    setBed: state.setBed,
    setService: state.setService,
    setMovement: state.setMovement,
    movement: state.movement,
  }));
  const [isScanning, setisScanning] = useState(true);

  const navigation = useNavigate();

  const startScanner = async () => {
    try {
      // Verificar los permisos
      await BarcodeScanner.checkPermission({ force: true });
      BarcodeScanner.hideBackground(); // Ocultar el fondo de la cámara

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

      setisScanning(true);
      const result = await BarcodeScanner.startScan(options);

      if (result.hasContent) {
        switch (movement.status) {
          case Status.PREPARE:
            setMovement({ begin: new Date(), status: Status.PREPARE });
            setBed(result.content as Bed);
            break;
          case Status.ON_TRANSIT:
            setMovement({ status: Status.ON_TRANSIT });
            setService(result.content as Service);
            break;
          case Status.FINISH:
            setMovement({ status: Status.FINISH });
            setMovement({ end: new Date() });
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("Error al escanear código de barras:", error);
    } finally {
      BarcodeScanner.showBackground(); // Mostrar el fondo de la cámara
      BarcodeScanner.stopScan(); // Detener el escaneo
    }
  };

  useEffect(() => {
    startScanner();
    return () => {
      BarcodeScanner.stopScan();
    };
  }, []);

  function handleOnCancelScan(): void {
    BarcodeScanner.stopScan();
    setisScanning(false);
    navigation("/movements/create");
  }

  return (
    <>
      <Button onClick={startScanner}>Escanear código de barras</Button>
      {isScanning && (
        <div className="absolute z-50 bottom-9 w-[90%] text-center">
          <Button onClick={handleOnCancelScan}>Cancelar Escaneo</Button>
        </div>
      )}
    </>
  );
};

export default BarcodeScannerComponent;
