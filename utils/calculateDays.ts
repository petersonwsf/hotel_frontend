export function calcularDiferencaDias(dataInicioStr?: string, dataFimStr?: string): number {
    if (!dataInicioStr || !dataFimStr) return 0;

    const dataInicio = new Date(dataInicioStr);
    const dataFim = new Date(dataFimStr);

    if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
        return 0;
    }

    const diferencaEmMilissegundos = dataFim.getTime() - dataInicio.getTime();
    const milissegundosPorDia = 24 * 60 * 60 * 1000;
    const diferencaDias = diferencaEmMilissegundos / milissegundosPorDia;
    return Math.ceil(diferencaDias);
}