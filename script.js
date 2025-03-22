document.getElementById('pickupDate').value = getPickupDate();

document.getElementById('orderForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const product = document.getElementById('product').value;
    const status = document.getElementById('status').value;
    const paidStatus = document.getElementById('paidStatus').value;
    const pickupDate = document.getElementById('pickupDate').value;
    const entryDate = new Date().toLocaleDateString();

    const order = {
        name,
        phone,
        product,
        entryDate,
        pickupDate,
        status,
        paidStatus,
    };

    saveToGoogleSheets(order);
});

function getPickupDate() {
    const today = new Date();
    const pickupDate = new Date(today);
    pickupDate.setDate(today.getDate() + 2);
    
    // Si el retiro es domingo, ajustamos al lunes
    if (pickupDate.getDay() === 0) {
        pickupDate.setDate(pickupDate.getDate() + 1);
    }

    return pickupDate.toISOString().split('T')[0]; // formato YYYY-MM-DD
}

function saveToGoogleSheets(order) {
    const sheetId = 'TU_ID_DE_HOJA_DE_GOOGLE';  // Reemplázalo con tu ID de hoja de Google Sheets
    const sheetName = 'Pedidos';  // El nombre de la hoja dentro de Google Sheets

    const url = `https://script.google.com/macros/s/TU_SCRIPT_ID/exec?name=${order.name}&phone=${order.phone}&product=${order.product}&entryDate=${order.entryDate}&pickupDate=${order.pickupDate}&status=${order.status}&paidStatus=${order.paidStatus}&sheetId=${sheetId}&sheetName=${sheetName}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            alert('Pedido registrado con éxito');
        })
        .catch(error => {
            console.error('Error al registrar el pedido:', error);
            alert('Hubo un problema al registrar el pedido');
        });
}

function searchOrders() {
    const query = document.getElementById('searchQuery').value;
    // Aquí puedes implementar la lógica de búsqueda
}

