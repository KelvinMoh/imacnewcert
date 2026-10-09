async function generateCertificates() {
  const categoryInput = document.getElementById("category");
  const recipientInput = document.getElementById("recipient");
  const ordainedInput = document.getElementById("ordained");
  const regnoInput = document.getElementById("regno");
  const preview = document.getElementById("preview");

  const category = categoryInput?.value.trim();
  const ordained = ordainedInput?.value.trim();
   const regno = regnoInput?.value.trim();
  const recipient = recipientInput?.value.trim();

  if (!category || !recipient || !ordained || !regno) {
    alert("Please Fill all Fields!");
    return;
  }

  preview.innerHTML = ""; // Clear old results

  const bgURL = "./assets/bg4.png"; // Or use your own background

  const bg = new Image();
  bg.crossOrigin = "anonymous"; // Important for image export
  bg.src = bgURL;

  bg.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 830;
    canvas.height = 600;

    const ctx = canvas.getContext("2d");

    // Draw background
    ctx.drawImage(bg, 0, 0, 830, 600);

    // Text styles
    ctx.font = "50px serif";
    ctx.fillStyle = "#C8802E";
    ctx.textAlign = "center";

    // Title
    //ctx.fillText("Certificate of Ordination", 400, 210);

    // Category
    ctx.font = "48px Old English Text MT";
    ctx.fillText(category, 400, 215);


    // ordination Title
    ctx.font = "38px Old English Text MT";
    //ctx.fillText(ordained, 400, 370); OR
    ctx.fillText(` ${ordained}`, 300, 370);

    //Registration Number
    ctx.font = "20px bold";
    ctx.fillText(regno, 500, 370);

    // Recipient name
    ctx.font = "28px bold";
    ctx.fillText(` ${recipient}`, 400, 295);

    // Footer
    ctx.font = "16px italic";
    ctx.fillText("", 400, 500);
    //ctx.fillText("Issued by OpenCertify", 400, 500);

    // Add canvas to preview
    preview.appendChild(canvas);

    preview.style.textAlign = "center";
    preview.appendChild(canvas)

    // Add download button
    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download PNG";
    downloadBtn.classList.add("custom-button");
    downloadBtn.style.marginTop = "20px";
    downloadBtn.onclick = () => {
      const link = document.createElement("a");
      link.download = `${recipient.replace(/\s+/g, "_")}_certificate.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    preview.appendChild(downloadBtn);
  };

  bg.onerror = () => {
    alert("Failed to load certificate background image.");
  };
}
