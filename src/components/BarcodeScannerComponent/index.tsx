import { useState, useEffect } from "react";
import {
  BarcodeScanner,
  ScanOptions,
} from "@capacitor-community/barcode-scanner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shadcdn/ui/button";
import { Bed, Service } from "@/types/movementTypes";

interface BarcodeScannerComponentProps {
  isReady?: (isReady: boolean) => void;
  title: string
  onScanData: (content: Bed | Service) => unknown
}

const BarcodeScannerComponent = (props: BarcodeScannerComponentProps) => {
  const { isReady, onScanData, title } = props;
  const [isScanning, setisScanning] = useState(false);

  const navigation = useNavigate();

  const startScanner = async () => {
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
      setisScanning(true);
      isReady && isReady(true);
      const result = await BarcodeScanner.startScan(options);
      if (result.hasContent) {
        const parced: Bed | Service = JSON.parse(result.content)

        setisScanning(false)
        onScanData && onScanData(parced)
      }
    } catch (error) {
      console.error("Error al escanear código de barras:", error);
      await BarcodeScanner.stopScan();
    } finally {
      await BarcodeScanner.showBackground(); // Mostrar el fondo de la cámara
      await BarcodeScanner.stopScan(); // Detener el escaneo
    }
  };

  useEffect(() => {
    return () => {
      async function stop () {
        await BarcodeScanner.stopScan();
      }
      stop()
    };
  }, []);

  async function handleOnCancelScan(): Promise<void> {
    await BarcodeScanner.stopScan();
    setisScanning(false);
    navigation("/movements/create");
  }

  return (
    <>
      <Button size={'lg'} onClick={startScanner}>{title}</Button>
      {isScanning && (
        <div className="absolute z-50 bottom-9 w-[90%] text-center">
          <Button onClick={handleOnCancelScan}>Cancelar Escaneo</Button>
        </div>
      )}
    </>
  );
};

export default BarcodeScannerComponent;
