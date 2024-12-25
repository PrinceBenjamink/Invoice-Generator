document.getElementById("generateInvoice").addEventListener("click", function () {
  const getFieldValue = (id) => document.getElementById(id).value;

  const customerName = getFieldValue("customerName");
  const customerAddress = getFieldValue("customerAddress");
  const customerPhone = getFieldValue("customerPhone");
  const invoiceType = getFieldValue("invoiceType");
  const itemDescription = getFieldValue("itemDescription");
  const quantity = parseInt(getFieldValue("quantity")) || 0;
  const price = parseFloat(getFieldValue("price")) || 0;
  const taxRate = parseFloat(getFieldValue("taxRate")) || 0;
  const salesperson = getFieldValue("salesperson");
  const job = getFieldValue("job");
  const dueDate = getFieldValue("dueDate");
  const paymentTerms = getFieldValue("paymentTerms");

  if (!customerName || !customerAddress || !customerPhone || !itemDescription || quantity <= 0 || price <= 0) {
    alert("Please fill in all required fields correctly.");
    return;
  }

  const subtotal = quantity * price;
  const tax = (subtotal * taxRate) / 100;
  const deliveryCharge = 30.0;
  const total = subtotal + tax + deliveryCharge;

  const invoiceHTML = `
    <div class="header">
      <h1>TREND SPHERE - THE CLOTHING BRAND</h1>
      <p>Make all checks payable to Mahendra Kumar</p>
    </div>
    <table>
      <tr>
        <th>TO</th><td>${customerName}</td>
        <th>PHONE</th><td>${customerPhone}</td>
      </tr>
      <tr>
        <th>ADDRESS</th><td>${customerAddress}</td>
        <th>TYPE</th><td>${invoiceType}</td>
      </tr>
      <tr>
        <th>SALESPERSON</th><td>${salesperson}</td>
        <th>JOB</th><td>${job}</td>
      </tr>
      <tr>
        <th>PAYMENT TERMS</th><td>${paymentTerms}</td>
        <th>DUE DATE</th><td>${dueDate}</td>
      </tr>
    </table>
    <hr>
    <table>
      <thead>
        <tr>
          <th>QTY</th><th>DESCRIPTION</th><th>UNIT PRICE</th><th>LINE TOTAL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${quantity}</td><td>${itemDescription}</td><td>${price.toFixed(2)}</td><td>${subtotal.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
    <hr>
    <table>
      <tr>
        <th>SUBTOTAL</th><td>${subtotal.toFixed(2)}</td>
        <th>DELIVERY CHARGE</th><td>${deliveryCharge.toFixed(2)}</td>
        <th>TOTAL</th><td>${total.toFixed(2)}</td>
      </tr>
    </table>
    <div class="footer">
      <p>THANK YOU</p>
      <p>8438434868 | TREND SPHERE@example.com</p>
      <p>Pollachi, Coimbatore, Tamil Nadu, India</p>
    </div>
  `;

  document.getElementById("invoiceContent").innerHTML = invoiceHTML;
  document.getElementById("invoice").style.display = "block";
});

document.getElementById("downloadInvoice").addEventListener("click", function () {
  const invoiceContent = document.getElementById("invoiceContent").innerHTML;
  const blob = new Blob([invoiceContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "invoice.html";
  link.click();
});

document.getElementById("printInvoice").addEventListener("click", function () {
  const printContent = document.getElementById("invoiceContent").innerHTML;
  const originalContent = document.body.innerHTML;

  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
});

document.getElementById("downloadInvoicePNG").addEventListener("click", function () {
  const invoiceElement = document.getElementById("invoiceContent");

  html2canvas(invoiceElement).then((canvas) => {
    const imageData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageData;
    link.download = "invoice.png";
    link.click();
  });
});
