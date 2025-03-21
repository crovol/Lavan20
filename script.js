document.getElementById("pedidoForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const producto = document.getElementById("producto").value;
    const estado = document.getElementById("estado").value;
    const pago = document.getElementById("pago").value;
    
    // Calcula las fechas (evitando domingos)
    const fechaIngreso = new Date();
    let fechaRetiro = new Date();
    fechaRetiro.setDate(fechaIngreso.getDate() + 2);
    if (fechaRetiro.getDay() === 0) fechaRetiro.setDate(fechaRetiro.getDate() + 1);

    // Enviar datos a Google Sheets
    const response = await fetch('https://script.google.com/macros/s/AKfycbxKmTKftU_XAffWlqxjIXOq-j3DGWZHpas1fp5-5g-VN3Euhu2A7ebPoWOJIDI3mMzLcw/exec', {
        method: "POST",
        body: JSON.stringify({
            nombre,
            telefono,
            producto,
            estado,
            pago,
            fechaIngreso: fechaIngreso.toISOString().split('T')[0],
            fechaRetiro: fechaRetiro.toISOString().split('T')[0],
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        alert("Pedido guardado exitosamente.");
    } else {
        alert("Error al guardar el pedido.");
    }
});
