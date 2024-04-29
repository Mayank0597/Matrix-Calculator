function calculate() {
    const rowsA = parseInt(document.getElementById('rowsA').value);
    const colsA = parseInt(document.getElementById('colsA').value);
    const rowsB = parseInt(document.getElementById('rowsB').value);
    const colsB = parseInt(document.getElementById('colsB').value);

    // Validate input dimensions
    if (colsA !== rowsB) {
        alert("Number of columns in Matrix A must be equal to number of rows in Matrix B for multiplication.");
        return;
    }

    // Construct Matrix A from user input
    const matrixA = [];
    for (let i = 0; i < rowsA; i++) {
        const row = [];
        for (let j = 0; j < colsA; j++) {
            const element = parseInt(prompt(`Enter element (${i+1},${j+1}) of Matrix A:`));
            row.push(element);
        }
        matrixA.push(row);
    }

    // Construct Matrix B from user input
    const matrixB = [];
    for (let i = 0; i < rowsB; i++) {
        const row = [];
        for (let j = 0; j < colsB; j++) {
            const element = parseInt(prompt(`Enter element (${i+1},${j+1}) of Matrix B:`));
            row.push(element);
        }
        matrixB.push(row);
    }

    // Prepare request data
    const requestData = {
        matrixA: matrixA,
        matrixB: matrixB
    };

    // Make a POST request to the backend
    fetch(`/calculate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(result => {
        displayMatrixResult(result);
    })
    .catch(error => console.error('Error:', error));
}

function displayMatrixResult(resultMatrix) {
    // Construct HTML for displaying the result matrix
    let resultHtml = '<table border="1">';
    resultMatrix.forEach(row => {
        resultHtml += '<tr>';
        row.forEach(element => {
            resultHtml += `<td>${element}</td>`;
        });
        resultHtml += '</tr>';
    });
    resultHtml += '</table>';

    // Display the result HTML in the result div
    document.getElementById('result').innerHTML = resultHtml;
}
