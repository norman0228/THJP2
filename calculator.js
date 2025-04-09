function calculate(country) {
    const prefix = country === 'th' ? 'th' : 'jp';
    
    const inputs = {
        price: parseFloat(document.getElementById(`${prefix}-price`).value) || 0,
        cost: parseFloat(document.getElementById(`${prefix}-cost`).value) || 0,
        rate: parseFloat(document.getElementById(`${prefix}-rate`).value) || (country === 'th' ? 1.005 : 0.24),
        weight: parseFloat(document.getElementById(`${prefix}-weight`).value) || 0,
        shipping: parseFloat(document.getElementById(`${prefix}-shipping`).value) || (country === 'th' ? 140 : 220)
    };

    const taxRate = 0.05; // 稅率5%
    const corpTaxRate = 0.012; // 營所稅

    try {
        const costTWD = country === 'th' 
            ? (inputs.cost / inputs.rate) * (1 + taxRate) 
            : inputs.cost * inputs.rate * (1 + taxRate);
            
        const shippingCost = (inputs.weight / 1000) * inputs.shipping * (1 + taxRate);
        const totalCost = costTWD + shippingCost;

        const platformFee = inputs.price * 0.10 * (1 + taxRate);
        const paymentFee = inputs.price * 0.02 * (1 + taxRate);
        const corpTax = inputs.price * corpTaxRate;

        const netProfit = inputs.price - (platformFee + paymentFee + corpTax) - totalCost;
        const profitRate = (netProfit / inputs.price) * 100;

        document.getElementById(`${prefix}-results`).innerHTML = `
            <h3>計算結果</h3>
            <p>獲利率：${profitRate.toFixed(2)}%</p>
            <p>淨利潤：$${netProfit.toFixed(2)}</p>
            <p>總成本：$${totalCost.toFixed(2)}</p>
            <p>平台費用：$${platformFee.toFixed(2)}</p>
            <p>支付手續費：$${paymentFee.toFixed(2)}</p>
            <p>營所稅：$${corpTax.toFixed(2)}</p>`;
            
     } catch (error) {
         document.getElementById(`${prefix}-results`).innerHTML =
             `<p style='color:red;'>錯誤：${error.message}</p>`;
     }
}
