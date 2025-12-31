import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Transaction, TransactionType } from '@/types/finance';
import { useToast } from '@/hooks/use-toast';

interface EditTransactionDialogProps {
  transaction: Transaction;
  onUpdate: (id: string, updates: Partial<Omit<Transaction, 'id'>>) => void;
}

const categories = {
  income: ['Salario', 'Freelance', 'Inversiones', 'Ventas', 'Otros'],
  expense: ['Renta', 'Servicios', 'Supermercado', 'Transporte', 'Entretenimiento', 'Salud', 'Educación', 'Otros'],
};

export function EditTransactionDialog({ transaction, onUpdate }: EditTransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TransactionType>(transaction.type);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [category, setCategory] = useState(transaction.category);
  const [description, setDescription] = useState(transaction.description);
  const [date, setDate] = useState(transaction.date);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setType(transaction.type);
      setAmount(transaction.amount.toString());
      setCategory(transaction.category);
      setDescription(transaction.description);
      setDate(transaction.date);
    }
  }, [open, transaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor completa todos los campos',
        variant: 'destructive',
      });
      return;
    }

    onUpdate(transaction.id, {
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    });

    toast({
      title: 'Transacción actualizada',
      description: 'Los cambios se guardaron correctamente',
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card border-border/50 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Transacción</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={type === 'income' ? 'default' : 'outline'}
              onClick={() => { setType('income'); setCategory(''); }}
              className={type === 'income' ? 'bg-success hover:bg-success/90' : ''}
            >
              Ingreso
            </Button>
            <Button
              type="button"
              variant={type === 'expense' ? 'default' : 'outline'}
              onClick={() => { setType('expense'); setCategory(''); }}
              className={type === 'expense' ? 'bg-destructive hover:bg-destructive/90' : ''}
            >
              Gasto
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-amount">Monto</Label>
            <Input
              id="edit-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-muted/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-category">Categoría</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border/50">
                {categories[type].map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Descripción</Label>
            <Input
              id="edit-description"
              placeholder="Descripción del movimiento"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-muted/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-date">Fecha</Label>
            <Input
              id="edit-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-muted/50 border-border/50"
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Guardar Cambios
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
