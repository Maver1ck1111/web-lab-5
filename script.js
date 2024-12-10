window.onload = function() {
    var textX = document.querySelector('.up .insert');
    var textY = document.querySelector('.down .insert');

    var tempText = textX.innerHTML;

    textX.innerHTML = textY.innerHTML;
    textY.innerHTML = tempText;
};

window.onload = function() {
    var widthInput = document.querySelector('.width');
    var heightInput = document.querySelector('.height');
    var resultButton = document.querySelector('.result');
    var areaResult = document.querySelector('.area-result');

    function calculateArea() {
        var width = parseFloat(widthInput.value);
        var height = parseFloat(heightInput.value);

        if (isNaN(width) || isNaN(height)) {
            areaResult.innerHTML = 'Please enter valid numbers for width and height';
        } else if (width <= 0 || height <= 0) {
            areaResult.innerHTML = 'Width and height must be positive numbers.';
        } else if (width > 100 || height > 100) {
            areaResult.innerHTML = 'Width and height must be less than or equal to 100.';
        } else {
            var area = width * height; 
            areaResult.innerHTML = 'Area: ' + area + ' square units';
        }
    }

    resultButton.addEventListener('click', calculateArea);
};

document.addEventListener("DOMContentLoaded", () => {
    const cookies = document.cookie.split("; ").find(row => row.startsWith("minMaxData="));

    if (cookies) {
        const savedData = decodeURIComponent(cookies.split("=")[1]);
        
        const userChoice = confirm(`Saved data found: ${savedData}. Do you want to keep it?`);

        if (userChoice) {
            document.querySelector(".number-form").style.display = "none"; 
            document.querySelector(".min-max-result").textContent = savedData;
        } else {
            document.cookie = "minMaxData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.querySelector(".number-form").style.display = "block";
            document.querySelector(".min-max-result").textContent = "";
        }
    } else {
        document.querySelector(".number-form").style.display = "block"; 
    }

    const inputField = document.querySelector(".number-input");
    const submitButton = document.querySelector(".number-submit");
    const formContainer = document.querySelector(".number-form");
    const resultContainer = document.querySelector(".min-max-result");

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();

        const inputValues = inputField.value.split(",").map(value => {
            const number = Number(value.trim());
            return isNaN(number) ? NaN : number;
        });

        if (inputValues.length !== 10) {
            alert("Please enter exactly 10 numbers separated by commas.");
            return;
        }
        if (inputValues.some(value => isNaN(value))) {
            alert("All entered values must be valid numbers.");
            return;
        }
        if (inputValues.some(value => value < -1000 || value > 1000)) {
            alert("All numbers must be between -1000 and 1000.");
            return;
        }

        const minValue = Math.min(...inputValues);
        const maxValue = Math.max(...inputValues);

        const result = `Min: ${minValue}, Max: ${maxValue}`;
        alert(result);

        document.cookie = `minMaxData=${encodeURIComponent(result)}; path=/; max-age=86400`;

        resultContainer.textContent = result;
        formContainer.style.display = "none";
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('bold-checkbox');
    const textElement = document.querySelector('.center-up');

    const savedBoldState = localStorage.getItem('isBold');
    if (savedBoldState === 'true') {
        textElement.style.fontWeight = 'bold';
        checkbox.checked = true;
    } else {
        textElement.style.fontWeight = 'normal';
        checkbox.checked = false;
    }

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            textElement.style.fontWeight = 'bold';
            localStorage.setItem('isBold', 'true');
        } else {
            textElement.style.fontWeight = 'normal';
            localStorage.setItem('isBold', 'false');
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const divUpText = document.querySelector('.up');
    const insertDiv = divUpText.querySelector('.insert');
    const paragraph = divUpText.querySelector('p');
    const buttonContainer = divUpText.querySelector('.button-container');
    const newRowsContainer = divUpText.querySelector('.new-rows');

    loadData();

    divUpText.addEventListener('mouseenter', function () {
        insertDiv.style.display = 'none';
        paragraph.style.display = 'none';

        if (!newRowsContainer.hasChildNodes()) {
            showContainers();
        }
    });

    divUpText.addEventListener('mouseleave', function () {
        if (!newRowsContainer.hasChildNodes()) {
            insertDiv.style.display = 'block';
            paragraph.style.display = 'block';
            hideContainers();
        }
    });

    buttonContainer.querySelector('.insert-button').addEventListener('click', function () {
        addNewRow('');
        showContainers();
        hideIntroElements();
    });

    buttonContainer.querySelector('.delete-button').addEventListener('click', function () {
        const lastRow = newRowsContainer.lastElementChild;
        if (lastRow) {
            newRowsContainer.removeChild(lastRow);
            saveData();
        }
        if (!newRowsContainer.hasChildNodes()) {
            showIntroElements();
            hideContainers();
        }
    });

    function addNewRow(value) {
        const newRow = document.createElement('div');
        newRow.classList.add('new-row');

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = value;

        inputField.addEventListener('input', saveData);

        newRow.appendChild(inputField);
        newRowsContainer.appendChild(newRow);

        saveData();
    }

    function loadData() {
        const savedData = JSON.parse(localStorage.getItem('rowsData')) || [];

        newRowsContainer.innerHTML = '';

        savedData.forEach(data => {
            if (data.trim() !== '') {
                addNewRow(data);
            }
        });

        if (savedData.length > 0) {
            showContainers();
            hideIntroElements();
        }
    }

    function saveData() {
        const rows = document.querySelectorAll('.new-row input');
        const rowsData = Array.from(rows)
            .map(input => input.value)
            .filter(value => value.trim() !== '');
        localStorage.setItem('rowsData', JSON.stringify(rowsData));
    }

    function hideIntroElements() {
        insertDiv.style.display = 'none';
        paragraph.style.display = 'none';
    }

    function showIntroElements() {
        insertDiv.style.display = 'block';
        paragraph.style.display = 'block';
    }

    function showContainers() {
        buttonContainer.style.display = 'flex';
        newRowsContainer.style.display = 'block';
    }

    function hideContainers() {
        buttonContainer.style.display = 'none';
        newRowsContainer.style.display = 'none';
    }
});