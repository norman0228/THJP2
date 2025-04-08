document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.calculate-btn').forEach(button => {
        button.addEventListener('click', function() {
            const country = this.dataset.country; // 判斷是泰國或日本
            calculate(country);
        });
    });
});

function calculate(country) {
    const prefix = country === 'th' ? 'th' : 'jp';
    
    // 獲取用戶輸入值
    const inputs = {
        price: parseFloat(document.getElementById(`${prefix}-price`).value) || 0,
        cost: parseFloat(document.getElementById(`${prefix}-cost`).value) || 0,
        rate: parseFloat(document.getElementById(`${prefix}-rate`).value) || 0,
        weight: parseFloat(document.getElementById(`${prefix}-weight`).value) || 0,
        shipping: parseFloat(document.getElementById(`${prefix}-shipping`).value) || 0
    };

    // 通用參數
    const taxRate = 0.05; // 稅率5%
    const corpTaxRate = 0.012; // 營所稅1.2%

    // 成本計算
    let costTWD; // 商品成本換算為台幣
    if(country === 'th') {
        costTWD = (inputs.cost / inputs.rate) * (1 + taxRate);
    } else {
        costTWD = inputs.cost * inputs.rate * (1 + taxRate);
    }

    // 運費計算
    const shippingCost = (inputs.weight / 1000) * inputs.shipping * (1 + taxRate);

    // 總成本
    const totalCost = costTWD + shippingCost;

    // 費用計算
    const platformFee = inputs.price * 0.10 * (1 + taxRate); // 平台抽佣10%加稅
    const paymentFee = inputs.price * 0.02 * (1 + taxRate); // 刷卡手續費2%加稅
    const corpTax = inputs.price * corpTaxRate; // 營所稅

    // 淨利潤計算
    const netProfit = inputs.price - (platformFee + paymentFee + corpTax) - totalCost;

    // 顯示結果（按要求順序）
    const results = document.getElementById(`${prefix}-results`);
    
results.innerHTML = `
        <h3>計算結果</h3>
        <p>獲利率：${((netProfit / inputs.price) * 100).toFixed(2).replace('-', '−')}%</p>
        <p>淨利潤：$${netProfit.toFixed(2).replace('-', '−')}</p>
        <p>總成本：$${totalCost.toFixed(2)}</p>
        <p>平台費用：$${platformFee.toFixed(2)}</p>
        <p>支付手續費：$${paymentFee.toFixed(2)}</p>
        <p>營所稅：$${corpTax.toFixed(2)}</p>`;
}
