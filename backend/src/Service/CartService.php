<?php


namespace App\Service;

use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Repository\ProductRepository;
use Symfony\Component\HttpFoundation\RequestStack;

class CartService
{

    private SessionInterface $session;

    public function __construct(
        RequestStack $requestStack,
        private ProductRepository $productRepository
    ) {
        $this->session = $requestStack->getSession();
    }

    private const CART_KEY = 'cart';

    public function add(int $productId, int $quantity = 1): void
    {
        $cart = $this->session->get(self::CART_KEY, []);
        
        if (isset($cart[$productId])) {
            $cart[$productId] += $quantity;
        } else {
            $cart[$productId] = $quantity;
        }

        $this->session->set(self::CART_KEY, $cart);
    }

    public function remove(int $productId): void
    {
        $cart = $this->session->get(self::CART_KEY, []);
        unset($cart[$productId]);
        $this->session->set(self::CART_KEY, $cart);
    }

    public function getCart(): array
    {
        $cart = $this->session->get(self::CART_KEY, []);

        $items = [];

        foreach ($cart as $productId => $quantity) {
            $product = $this->productRepository->find($productId);
            if ($product) {
                $items[] = [
                    'product' => $product,
                    'quantity' => $quantity,
                    'total' => $product->getPrice() * $quantity
                ];
            }
        }

        return $items;
    }

    public function clear(): void
    {
        $this->session->remove(self::CART_KEY);
    }
}
