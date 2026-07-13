import { useEffect, useState } from 'react';
import { CartLine, MenuItem } from '../types';

let _cart: CartLine[] = [];
let _listeners: Array<() => void> = [];

const notify = () => _listeners.forEach(fn => fn());

export const useCart = () => {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const listener = () => forceUpdate(n => n + 1);
    _listeners.push(listener);
    return () => {
      _listeners = _listeners.filter(fn => fn !== listener);
    };
  }, []);

  const addItem = (item: MenuItem, quantity: number, note: string) => {
    _cart = [..._cart, { item, quantity, note }];
    notify();
  };

  const removeItem = (itemId: string) => {
    _cart = _cart.filter(line => line.item.id !== itemId);
    notify();
  };

  const clear = () => {
    _cart = [];
    notify();
  };

  const itemCount = _cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = _cart.reduce(
    (sum, line) => sum + line.item.price * line.quantity,
    0,
  );

  return {
    cart: _cart,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    clear,
  };
};
