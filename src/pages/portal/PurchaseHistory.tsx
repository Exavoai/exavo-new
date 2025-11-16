import { useState, useEffect } from "react";
import { DataTable } from "@/components/portal/DataTable";
import { StatusBadge } from "@/components/portal/StatusBadge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { mockApi, Order } from "@/lib/mockApi";

export default function PurchaseHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await mockApi.getOrders();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      header: 'Order ID',
      accessor: 'id' as keyof Order,
      className: 'font-mono text-sm',
    },
    {
      header: 'Service',
      accessor: 'service' as keyof Order,
      className: 'font-medium',
    },
    {
      header: 'Type',
      accessor: ((order: Order) => <StatusBadge status={order.type as any} />) as any,
    },
    {
      header: 'Amount',
      accessor: 'amount' as keyof Order,
      className: 'font-semibold',
    },
    {
      header: 'Start Date',
      accessor: 'startDate' as keyof Order,
      className: 'text-muted-foreground',
    },
    {
      header: 'End Date',
      accessor: 'endDate' as keyof Order,
      className: 'text-muted-foreground',
    },
    {
      header: 'Status',
      accessor: ((order: Order) => <StatusBadge status={order.status as any} />) as any,
    },
    {
      header: 'Actions',
      accessor: (() => (
        <Button variant="ghost" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Invoice
        </Button>
      )) as any,
    },
  ];

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Purchase History</h1>
        <p className="text-muted-foreground">View all your transactions and download invoices</p>
      </div>

      <DataTable
        data={orders}
        columns={columns}
        searchPlaceholder="Search orders..."
        actions={
          <Button variant="outline">Export All</Button>
        }
      />
    </div>
  );
}
