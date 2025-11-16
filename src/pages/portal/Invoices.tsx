import { DataTable } from "@/components/portal/DataTable";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

interface Invoice {
  id: string;
  client: string;
  amount: string;
  date: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

const invoices: Invoice[] = [
  {
    id: 'INV-001',
    client: 'Acme Corporation',
    amount: '$1,250.00',
    date: '2025-11-01',
    dueDate: '2025-11-15',
    status: 'Paid',
  },
  {
    id: 'INV-002',
    client: 'TechStart Inc',
    amount: '$850.00',
    date: '2025-11-05',
    dueDate: '2025-11-20',
    status: 'Paid',
  },
  {
    id: 'INV-003',
    client: 'Global Solutions',
    amount: '$2,100.00',
    date: '2025-11-10',
    dueDate: '2025-11-25',
    status: 'Pending',
  },
];

export default function InvoicesPage() {
  const columns = [
    {
      header: 'Invoice #',
      accessor: 'id' as keyof Invoice,
      className: 'font-mono text-sm',
    },
    {
      header: 'Client',
      accessor: 'client' as keyof Invoice,
      className: 'font-medium',
    },
    {
      header: 'Amount',
      accessor: 'amount' as keyof Invoice,
      className: 'font-semibold',
    },
    {
      header: 'Issue Date',
      accessor: 'date' as keyof Invoice,
      className: 'text-muted-foreground',
    },
    {
      header: 'Due Date',
      accessor: 'dueDate' as keyof Invoice,
      className: 'text-muted-foreground',
    },
    {
      header: 'Status',
      accessor: ((invoice: Invoice) => <StatusBadge status={invoice.status as any} />) as any,
    },
    {
      header: 'Actions',
      accessor: (() => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      )) as any,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">Manage and track your invoices</p>
        </div>
        <Button>Create Invoice</Button>
      </div>

      <DataTable
        data={invoices}
        columns={columns}
        searchPlaceholder="Search invoices..."
        actions={<Button variant="outline">Filters</Button>}
      />
    </div>
  );
}
