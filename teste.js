let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

function bookRoom() {
    const userName = document.getElementById("userName").value;
    const roomName = document.getElementById("roomName").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;

    if (!userName || !roomName || !startTime || !endTime) {
        alert("Preencha todos os campos");
        return;
    }

    const conflict = bookings.some(booking =>
        booking.roomName === roomName &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
            (endTime > booking.startTime && endTime <= booking.endTime) ||
            (startTime <= booking.startTime && endTime >= booking.endTime))
    );

    if (conflict) {
        alert("Já existe uma reunião agendada para este horário nesta sala.");
        return;
    }

    bookings.push({ userName, roomName, startTime, endTime });
    localStorage.setItem("bookings", JSON.stringify(bookings));
    updateRooms();
}

function cancelBooking(index) {
    bookings.splice(index, 1);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    updateRooms();
}

function clearAllBookings() {
    if (confirm("Você tem certeza que deseja apagar todas as reservas?")) {
        bookings = [];
        localStorage.setItem("bookings", JSON.stringify(bookings));
        updateRooms();
    }
}

function updateRooms() {
    const roomsDiv = document.getElementById("rooms");
    roomsDiv.innerHTML = "";

    let rooms = { "Auditorio Cheila": [], "Sala 1": [], "Sala 2": [], "Sala 3": [], "Sala 4": [] };

    bookings.forEach((booking, index) => {
        rooms[booking.roomName].push(
            `De ${new Date(booking.startTime).toLocaleString()} até ${new Date(booking.endTime).toLocaleString()} 
            - Agendado por: ${booking.userName} 
            <button class='cancel-btn' onclick='cancelBooking(${index})'>Cancelar</button>`
        );
    });

    for (let room in rooms) {
        let schedule = rooms[room].join("<br>") || "Sem agendamentos";
        roomsDiv.innerHTML += `<div class='schedule'><strong>${room}</strong><br>${schedule}</div>`;
    }
}

document.addEventListener("DOMContentLoaded", updateRooms);