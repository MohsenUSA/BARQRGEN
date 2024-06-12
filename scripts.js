document.addEventListener('DOMContentLoaded', () => {
    const inputValue = document.getElementById('inputValue');
    const clearButton = document.getElementById('clearButton');
    const generateButton = document.getElementById('generateButton');
    const typeSelect = document.getElementById('typeSelect');
    const generatedCodeContainer = document.getElementById('generatedCodeContainer');

    let generatedCode = null;

    inputValue.addEventListener('input', () => {
        clearButton.disabled = inputValue.value.trim() === '';
        generatedCode = null;
        generatedCodeContainer.innerHTML = '';
    });

    clearButton.addEventListener('click', () => {
        inputValue.value = '';
        generatedCodeContainer.innerHTML = '';
        clearButton.disabled = true;
        inputValue.focus();
    });

    generateButton.addEventListener('click', () => {
        if (inputValue.value.trim() !== '') {
            generatedCode = inputValue.value.trim().toUpperCase();
            generatedCodeContainer.innerHTML = '';

            if (typeSelect.value === 'barcode') {
                const barcode = document.createElement('img');
                barcode.id = 'barcode';
                generatedCodeContainer.appendChild(barcode);
                JsBarcode('#barcode', generatedCode, {
                    format: 'CODE128',
                    width: 2,
                    height: 50,
                    displayValue: true
                });
            } else if (typeSelect.value === 'qr') {
                const qrCode = document.createElement('canvas');
                const qr = new QRious({
                    element: qrCode,
                    value: generatedCode,
                    size: 150
                });
                generatedCodeContainer.appendChild(qrCode);
                const codeText = document.createElement('div');
                codeText.style.textAlign = 'center';
                codeText.textContent = generatedCode;
                generatedCodeContainer.appendChild(codeText);
            }
        }
    });
});
