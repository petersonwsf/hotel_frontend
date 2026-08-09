export const validateCPF = (cpf: string | undefined): boolean => {
    if (!cpf) return false;

    const cleanCPF = cpf.replace(/[^\d]/g, '');

    if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let checkDigit1 = 11 - (sum % 11);
    if (checkDigit1 === 10 || checkDigit1 === 11) checkDigit1 = 0;
    if (checkDigit1 !== parseInt(cleanCPF.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    let checkDigit2 = 11 - (sum % 11);
    if (checkDigit2 === 10 || checkDigit2 === 11) checkDigit2 = 0;
    if (checkDigit2 !== parseInt(cleanCPF.charAt(10))) return false;

    return true;
};