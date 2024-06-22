export function formatTimestamp(timestamp) {
  const timezoneOffset = 5.5 * 60;
  
  const date = new Date(timestamp);
  
  const localDate = new Date(date.getTime() + timezoneOffset * 60 * 1000);
  
  const year = localDate.getUTCFullYear();
  const month = localDate.toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
  const day = localDate.getUTCDate();
  let hours = localDate.getUTCHours();
  const minutes = localDate.getUTCMinutes();
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  const formattedDate = `${month} ${day},${year} ${hours}:${formattedMinutes}${ampm} (GMT+5:30)`;
  
  return formattedDate;

  }

  export function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  export function checkTimeLeft(startDate, endDate) {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (currentDate >= start && currentDate <= end) {
      const timeLeft = end - currentDate;
  
      // Calculate days, hours, minutes, and seconds left
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  
      return {
        status: true,
        timeleft: `${days}d : ${hours}h : ${minutes}m : ${seconds}s`
      };
    }
  
    return { status: false };
  }