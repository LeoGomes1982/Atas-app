import React, { useState } from 'react';
import jsPDF from 'jspdf';

export default function App() {
  const [anexos, setAnexos] = useState([]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    setAnexos([...anexos, ...files]);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Ata da Supervisão", 20, 20);

    anexos.forEach((file, i) => {
      doc.text(`${i + 1}. ${file.name}`, 20, 40 + i * 10);
    });

    doc.save("ata.pdf");
  };

  return (
    <div className="p-6 text-center">
      <img src="/logo.png" alt="Logo" className="mx-auto w-32 mb-4" />
      <h1 className="text-2xl font-bold mb-6">Atas da Supervisão</h1>

      <input type="file" multiple onChange={handleUpload} className="mb-4" />
      <ul className="mb-4">
        {anexos.map((file, idx) => (
          <li key={idx} className="flex items-center gap-2 justify-center">
            {file.type.startsWith("image/") ? "🖼️" : "📎"} {file.name}
          </li>
        ))}
      </ul>

      <button
        onClick={exportPDF}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Exportar PDF
      </button>
    </div>
  );
}
