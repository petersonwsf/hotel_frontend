export type StripePaymentStatus =
  | 'succeeded'
  | 'processing'
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'requires_action'
  | 'canceled';

interface PaymentStatusProps {
  status: StripePaymentStatus | string;
}

interface StatusConfig {
  label: string;
  className: string;
}

const statusMap: Record<string, StatusConfig> = {
  succeeded: {
    label: 'Pago',
    className: 'bg-green-100 text-emerald-700 border-emerald-700',
  },
  processing: {
    label: 'Em processamento',
    className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800',
  },
  requires_payment_method: {
    label: 'Aguardando pagamento',
    className: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-400 dark:border-orange-800',
  },
  requires_confirmation: {
    label: 'Aguardando confirmação',
    className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800',
  },
  requires_action: {
    label: 'Ação necessária',
    className: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-400 dark:border-purple-800',
  },
  canceled: {
    label: 'Cancelado',
    className: 'bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700',
  },
};

const defaultStatus: StatusConfig = {
  label: 'Status desconhecido',
  className: 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',
};

export default function PaymentStatus({ status }: PaymentStatusProps) {
  const config = statusMap[status] || defaultStatus;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-[1.5rem] py-0.5 text-md font-semibold transition-colors ${config.className}`}
    >
      {config.label}
    </span>
  );
}