// Traer un Guest con sus reservas
const guest = await Guest.findOne({
  where: { guest_id: 1 },
  include: ReservationHeader,
});
console.log(guest.ReservationHeaders);

// Traer una reserva con sus detalles
const reserva = await ReservationHeader.findOne({
  where: { reservation_id: 1 },
  include: ReservationDetail,
});
console.log(reserva.ReservationDetails);
