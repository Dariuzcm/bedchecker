import { useState, useEffect } from 'react';
import { BarcodeScanner, ScanOptions  } from '@capacitor-community/barcode-scanner';

const BarcodeScannerComponent = () => {
  const [scannedContent, setScannedContent] = useState('');

  const startScanner = async () => {
    try {
      // Verificar los permisos
      await BarcodeScanner.checkPermission({ force: true });
      BarcodeScanner.hideBackground(); // Ocultar el fondo de la cámara

      const options: ScanOptions = {
        targetedFormats: ['QR_CODE', 'EAN_13', 'EAN_8', 'UPC_A', 'UPC_E', 'CODE_39', 'CODE_93', 'CODE_128', 'ITF', 'CODABAR'],
        cameraDirection: 'back',
      };

      const result = await BarcodeScanner.startScan(options);
      if (result.hasContent) {
        setScannedContent(result.content);
      }
    } catch (error) {
      console.error('Error al escanear código de barras:', error);
    } finally {
      BarcodeScanner.showBackground(); // Mostrar el fondo de la cámara
      BarcodeScanner.stopScan(); // Detener el escaneo
    }
  };

  useEffect(() => {
    //startScanner();
  }, []);

  return (
    <div>
      <button onClick={startScanner}>Escanear código de barras</button>
      {scannedContent && (
        <div>
          <h2>Contenido escaneado:</h2>
          <p>{scannedContent}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScannerComponent;