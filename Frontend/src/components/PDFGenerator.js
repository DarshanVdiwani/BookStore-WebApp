import jsPDF from "jspdf";

const generatePDF = (data) => {
  const pdf = new jsPDF();

  // Set document title
  pdf.setFontSize(20);
  pdf.text("Invoice", 105, 15, null, null, "center");

  // Add customer information
  pdf.setFontSize(12);
  pdf.text("Customer Name: " + data.name, 10, 30);
  pdf.text("Email: " + data.email, 10, 40);
  pdf.text("Phone: " + data.phone, 10, 50);
  pdf.text("Address: " + data.address, 10, 60);

  // Add itemized bill
  pdf.text("Book Name", 10, 80);
  pdf.text("Price", 100, 80);
  pdf.text("Quantity", 150, 80);
  pdf.text("Total", 180, 80);

  let y = 90; // Starting y-coordinate for items

  data.items.forEach((item) => {
    pdf.text(item.name, 10, y);
    pdf.text(item.price, 100, y);
    pdf.text(item.quantity, 150, y);
    pdf.text(item.total, 180, y);
    y += 10;
  });

  // Calculate and add the total amount
  const totalAmount = data.items.reduce((sum, item) => sum + item.total, 0);
  pdf.text("Total Amount: Rs " + totalAmount, 140, y + 20);

  // Save the PDF
  pdf.save("bill.pdf");
};

export default generatePDF;
