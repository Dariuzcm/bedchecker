import { useState, useEffect } from "react";
import {
  BarcodeScanner,
  ScanOptions,
} from "@capacitor-community/barcode-scanner";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const BarcodeScannerComponent = () => {
  const [scannedContent, setScannedContent] = useState("");
  const [isScanning, setisScanning] = useState(true);

  const navigation = useNavigate()

  const startScanner = async () => {
    try {
      // Verificar los permisos
      await BarcodeScanner.checkPermission({ force: true });
      BarcodeScanner.hideBackground(); // Ocultar el fondo de la cámara

      const options: ScanOptions = {
        targetedFormats: [
          "QR_CODE",
          "EAN_13",
          "EAN_8",
          "UPC_A",
          "UPC_E",
          "CODE_39",
          "CODE_93",
          "CODE_128",
          "ITF",
          "CODABAR",
        ],
        cameraDirection: "back",
      };

      setisScanning(true)
      const result = await BarcodeScanner.startScan(options)

      if (result.hasContent) {
        setScannedContent(result.content);
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
    setisScanning(false)
    navigation('/movements/create')
  }

  return (
    <>
      <Button onClick={startScanner}>Escanear código de barras</Button>
      {scannedContent && (
        <div>
          <h2>Contenido escaneado:</h2>
          <p>{scannedContent}</p>
        </div>
      )}
      {isScanning && (
        <div className="absolute z-50 bottom-9 w-[90%] text-center">
          <Button onClick={handleOnCancelScan}>Cancelar Escaneo</Button>
        </div>
      )}
    </>
  );
};

export default BarcodeScannerComponent;
