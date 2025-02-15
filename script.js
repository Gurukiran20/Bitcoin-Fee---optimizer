const API_URL = "https://mempool.space/api/v1/fees/recommended";

document.getElementById("feeForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  
  const transactionSize = document.getElementById("transactionSize").value;
  const urgency = document.getElementById("urgency").value;
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    let feeRate;
    if (urgency === "high") {
      feeRate = data.fastestFee; // Fastest fee from API
    } else if (urgency === "medium") {
      feeRate = data.halfHourFee; // Medium urgency fee
    } else {
      feeRate = data.hourFee; // Low urgency fee
    }

    const totalFee = transactionSize * feeRate;

    document.getElementById("optimizedFee").innerText = totalFee.toFixed(2);
    
    resultDiv.classList.remove("hidden");
    errorDiv.classList.add("hidden");
  } catch (error) {
    document.getElementById("errorMessage").innerText = "Failed to fetch fee data.";
    errorDiv.classList.remove("hidden");
    resultDiv.classList.add("hidden");
  }
});
