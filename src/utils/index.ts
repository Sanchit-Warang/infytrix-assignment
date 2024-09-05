export const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const getDateFromTimeString = (timeString: string) => {
  const currentDate = new Date()

  const [hours, minutes] = timeString.split(':').map(Number)

  currentDate.setHours(hours)
  currentDate.setMinutes(minutes)
  currentDate.setSeconds(0)

  return currentDate
}

export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      slots.push(getDateFromTimeString(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`).toISOString());
    }
  }
  return slots;
};

export const timeSlots =  Array.from({ length: 25 }, (_, i) => i);
