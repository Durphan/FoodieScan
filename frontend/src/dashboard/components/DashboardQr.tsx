import { QRCodeCanvas } from "qrcode.react";
import "./DashboardQR.css";

export default function DashboardQr() {
  const qrData =
    "https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png";

  const downloadQR = () => {
    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement | null;

    if (!canvas) {
      console.error("No se encontró el elemento QR.");
      return;
    }
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "menu_qr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const printQR = () => {
    const printWindow = window.open("", "", "width=600,height=600");
    if (!printWindow) {
      console.error("No se pudo abrir la ventana de impresión.");
      return;
    }

    const canvas = document.getElementById("qr-canvas") as HTMLCanvasElement | null;
    if (!canvas) {
      console.error("No se encontró el canvas con ID 'qr-canvas'.");
      return;
    }

    const dataURL = canvas.toDataURL();

    printWindow.document.write(`
      <html>
        <head><title>Imprimir QR</title></head>
        <body>
          <img src="${dataURL}" style="width: 300px; height: 300px;" />
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container">
      <div className="content">
        <div className="qrSection">
          <div className="qrBox">
            <QRCodeCanvas id="qr-canvas" value={qrData} size={256} />
            <div className="buttonGroup">
              <button className="button" onClick={downloadQR}>
                Descargar QR
              </button>
              <button className="button" onClick={printQR}>
                Imprimir QR
              </button>
            </div>
          </div>
        </div>

        <div className="textSection">
          <h2>Código QR del Menú</h2>
          <p>
            Escanea este código QR para ver el menú digital de nuestro
            restaurante. También puedes compartirlo con tus clientes en redes
            sociales o imprimirlo para colocarlo en tu establecimiento.
          </p>

          <h3>Compartir dirección URL:</h3>
          <a href={qrData} target="_blank" rel="noopener noreferrer">
            {qrData}
          </a>
        </div>
      </div>
    </div>
  )
}
