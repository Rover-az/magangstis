function loadCSV(url) {
	fetch(url)
    	.then(response => response.text())
    	.then(data => {
        	const tableData = parseCSV(data);
            generateTable(tableData);
    	})
    	.catch(error => console.error('Error fetching the CSV file:', error));
}
 
// Function to parse CSV data into a 2D array
function parseCSV(data) {
	const rows = data.split('\n');
	return rows.map(row => row.split(';'));
}
 
// Function to generate an HTML table from 2D array data
function generateTable(data) {
	const tableContainer = document.getElementById('table-container');
	const table = document.createElement('table');
	const thead = document.createElement('thead');
	const tbody = document.createElement('tbody');
 
	// Generate table header
	const headers = data[0];
	const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
    	const th = document.createElement('th');
    	th.textContent = headerText.trim();
        headerRow.appendChild(th);
	});
    thead.appendChild(headerRow);
 
	// Generate table body
    data.slice(1).forEach(rowData => {
    	const row = document.createElement('tr');
        rowData.forEach(cellData => {
        	const td = document.createElement('td');
            td.textContent = cellData.trim();
            row.appendChild(td);
    	});
        tbody.appendChild(row);
	});
 
	// Append thead and tbody to the table
    table.appendChild(thead);
    table.appendChild(tbody);
 
	// Insert the table into the DOM
    tableContainer.appendChild(table);
}
document.getElementById("table-container").innerHTML = loadCSV("../DataTables/sumberData.csv");