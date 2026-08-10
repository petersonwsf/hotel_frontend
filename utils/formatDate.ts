export function formatShortDate(dataStr: string | Date): string {
  const data = new Date(`${dataStr}T00:00:00`);
  const formatador = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
  });
  const resultado = formatador.format(data).replace('.', '').replace('de', '');
  return resultado.replace(/\s(\w)/, (m) => m.toUpperCase());
}