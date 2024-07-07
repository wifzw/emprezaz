export default function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const month = date.getMonth() + 1;
  const day = date.getDate() + 1;
  const year = date.getFullYear();

  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
}