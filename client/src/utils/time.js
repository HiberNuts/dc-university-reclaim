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