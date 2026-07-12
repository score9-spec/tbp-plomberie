import PDFDocument from "pdfkit";
import { logoBase64 } from "./logoBase64";

export interface DevisPdfData {
  numero: string;
  nom: string;
  telephone: string;
  email?: string;
  serviceLabel: string;
  categoryLabel?: string;
  message?: string;
  tarifs?: { label: string; prix: string }[];
}

const COMPANY = {
  nom: "TBP plomberie",
  telephone: "0760730588",
  email: "tbpplomberie33@gmail.com",
  adresse: "3020 route des fontaines Minzac 24610",
  siren: "820 633 774",
};

const TVA_RATE = 0.1;

function prixBas(prix: string): number {
  const match = prix.match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return 0;
  return parseFloat(match[1].replace(",", "."));
}

function formatEuro(n: number): string {
  const fixed = n.toFixed(2);
  const [intPart, decPart] = fixed.split(".");
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${withThousands},${decPart} €`;
}

export function generateDevisPdf(data: DevisPdfData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const navy = "#0f172a";
    const blue = "#1d4ed8";
    const gray = "#64748b";
    const lightGray = "#94a3b8";
    const border = "#e2e8f0";

    const leftMargin = doc.page.margins.left;
    const rightEdge = doc.page.width - doc.page.margins.right;
    const contentWidth = rightEdge - leftMargin;

    // Header: logo left, DEVIS + company info right
    const logoBuffer = Buffer.from(logoBase64, "base64");
    doc.image(logoBuffer, leftMargin, doc.y, { width: 70 });

    const headerTop = doc.y;
    doc
      .font("Helvetica-Bold")
      .fontSize(26)
      .fillColor(navy)
      .text("DEVIS", leftMargin, headerTop, { width: contentWidth, align: "right" });
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(gray)
      .text(COMPANY.nom, leftMargin, doc.y + 4, { width: contentWidth, align: "right" })
      .text(COMPANY.telephone, { width: contentWidth, align: "right" })
      .text(COMPANY.email, { width: contentWidth, align: "right" })
      .text(COMPANY.adresse, { width: contentWidth, align: "right" })
      .text(`SIREN : ${COMPANY.siren}`, { width: contentWidth, align: "right" });

    doc.x = leftMargin;
    doc.y = headerTop + 100;

    // POUR / Numéro / Date row
    const infoY = doc.y;
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(gray)
      .text("POUR :", leftMargin, infoY);
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor(navy)
      .text(data.nom, leftMargin, doc.y + 2);
    doc.font("Helvetica").fontSize(10).fillColor(gray).text(data.telephone);
    if (data.email) doc.text(data.email);

    const dateStr = new Date().toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      timeZone: "Europe/Paris",
    });

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(gray)
      .text(`Numéro : ${data.numero}`, leftMargin, infoY, { width: contentWidth, align: "right" });
    doc
      .font("Helvetica")
      .fillColor(gray)
      .text(`Date : ${dateStr}`, leftMargin, doc.y + 2, { width: contentWidth, align: "right" });

    doc.x = leftMargin;
    doc.y = Math.max(doc.y, infoY + 60) + 20;

    // Table
    const colDesc = leftMargin;
    const colDescWidth = 250;
    const colQty = colDesc + colDescWidth;
    const colQtyWidth = 60;
    const colPrix = colQty + colQtyWidth;
    const colPrixWidth = 80;
    const colTva = colPrix + colPrixWidth;
    const colTvaWidth = 50;
    const colMontant = colTva + colTvaWidth;
    const colMontantWidth = rightEdge - colMontant;

    function tableHeader() {
      const y = doc.y;
      doc.rect(leftMargin, y, contentWidth, 24).fill(blue);
      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor("#ffffff")
        .text("Description", colDesc + 8, y + 7, { width: colDescWidth })
        .text("Quantité", colQty, y + 7, { width: colQtyWidth, align: "right" })
        .text("Prix unitaire", colPrix, y + 7, { width: colPrixWidth, align: "right" })
        .text("TVA", colTva, y + 7, { width: colTvaWidth, align: "right" })
        .text("Montant", colMontant, y + 7, { width: colMontantWidth - 8, align: "right" });
      doc.x = leftMargin;
      doc.y = y + 24 + 10;
    }

    tableHeader();

    let sousTotal = 0;

    if (data.tarifs && data.tarifs.length > 0) {
      // Category section row
      const catY = doc.y;
      doc
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor(blue)
        .text((data.categoryLabel ?? data.serviceLabel).toUpperCase(), colDesc, catY, { width: colDescWidth });
      doc.x = leftMargin;
      doc.y = catY + 18;

      for (const t of data.tarifs) {
        const unitPrice = prixBas(t.prix);
        const montant = unitPrice;
        sousTotal += montant;

        const rowY = doc.y;
        doc
          .font("Helvetica-Bold")
          .fontSize(10)
          .fillColor(navy)
          .text(t.label, colDesc, rowY, { width: colDescWidth });
        const labelBottom = doc.y;

        doc
          .font("Helvetica")
          .fontSize(9)
          .fillColor(lightGray)
          .text("Estimation basse — prix indicatif TTC", colDesc, labelBottom, { width: colDescWidth });

        doc
          .font("Helvetica")
          .fontSize(10)
          .fillColor(navy)
          .text("1", colQty, rowY, { width: colQtyWidth, align: "right" })
          .text(formatEuro(unitPrice), colPrix, rowY, { width: colPrixWidth, align: "right" })
          .text(`${(TVA_RATE * 100).toFixed(1)} %`, colTva, rowY, { width: colTvaWidth, align: "right" })
          .text(formatEuro(montant), colMontant, rowY, { width: colMontantWidth - 8, align: "right" });

        doc.x = leftMargin;
        doc.y = Math.max(doc.y, labelBottom) + 10;
      }

      doc.moveDown(0.5);
      doc.x = leftMargin;

      const tva = sousTotal * TVA_RATE;
      const total = sousTotal + tva;

      const totalsX = colPrix;
      const totalsWidth = rightEdge - totalsX;

      doc.moveTo(totalsX, doc.y).lineTo(rightEdge, doc.y).strokeColor(border).stroke();
      doc.moveDown(0.6);

      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor(gray)
        .text("SOUS-TOTAL :", totalsX, doc.y, { width: totalsWidth - 90, align: "left", continued: false });
      doc
        .font("Helvetica")
        .fillColor(navy)
        .text(formatEuro(sousTotal), totalsX + totalsWidth - 90, doc.y - doc.currentLineHeight(), {
          width: 90,
          align: "right",
        });

      doc
        .font("Helvetica")
        .fillColor(gray)
        .text("TVA :", totalsX, doc.y, { width: totalsWidth - 90, align: "left" });
      doc
        .font("Helvetica")
        .fillColor(navy)
        .text(formatEuro(tva), totalsX + totalsWidth - 90, doc.y - doc.currentLineHeight(), {
          width: 90,
          align: "right",
        });

      doc.moveDown(0.3);
      doc.moveTo(totalsX, doc.y).lineTo(rightEdge, doc.y).strokeColor(navy).stroke();
      doc.moveDown(0.4);

      doc
        .font("Helvetica-Bold")
        .fontSize(13)
        .fillColor(navy)
        .text("TOTAL", totalsX, doc.y, { width: totalsWidth - 100, align: "left" });
      doc
        .font("Helvetica-Bold")
        .fontSize(13)
        .fillColor(navy)
        .text(formatEuro(total), totalsX + totalsWidth - 100, doc.y - doc.currentLineHeight(), {
          width: 100,
          align: "right",
        });

      doc.x = leftMargin;
      doc.moveDown(1.2);
      doc
        .font("Helvetica")
        .fontSize(8)
        .fillColor(lightGray)
        .text(
          "Montants calculés sur le tarif minimum de chaque prestation, à titre indicatif et non contractuel. Le prix définitif et ferme vous sera communiqué après évaluation sur place, avant toute intervention.",
          leftMargin,
          doc.y,
          { width: contentWidth },
        );
    } else {
      doc
        .font("Helvetica")
        .fontSize(11)
        .fillColor(gray)
        .text(
          "Cette prestation nécessite une évaluation sur place. Un technicien vous contactera pour établir un devis précis.",
          leftMargin,
          doc.y,
          { width: contentWidth },
        );
    }

    // Commentaires
    doc.x = leftMargin;
    doc.moveDown(1.5);
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor(navy)
      .text("Commentaires", leftMargin, doc.y, { width: contentWidth });
    doc.moveDown(0.3);
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor(gray)
      .text(data.message || "Aucun commentaire particulier.", leftMargin, doc.y, { width: contentWidth });

    // Signature
    doc.x = leftMargin;
    doc.moveDown(2.5);
    const sigY = doc.y;
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(lightGray)
      .text("Cachet et signature TBP Plomberie", rightEdge - 200, sigY, { width: 200, align: "center" });
    doc
      .moveTo(rightEdge - 200, sigY - 6)
      .lineTo(rightEdge, sigY - 6)
      .strokeColor(border)
      .stroke();

    doc.end();
  });
}
