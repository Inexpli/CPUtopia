<?php

namespace App\Service;

use App\Entity\Order;
use App\Entity\OrderItem;
use App\Repository\CartItemRepository;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use App\Service\CartService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use LogicException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class OrderService
{
    private SessionInterface $session;

    public function __construct(
        private EntityManagerInterface $manager,
        private CartService $cartService,
        private CartItemRepository $cartRepository,
        private ProductRepository $productRepository,
        private OrderRepository $orderRepository,
        private Security $security,
        RequestStack $requestStack
    ) {
        $this->session = $requestStack->getSession();
    }

    private const CART_KEY = 'cart';


    public function index(): array {
        $user = $this->security->getUser();

        if(!$user) {
            throw new UnauthorizedHttpException('You are not logged in');
        }

        $cartItems = $this->orderRepository->findBy(['user' => $user]);

        $items = [];
        foreach ($cartItems as $cartItem) {
            $product = $cartItem->getProduct();
            $items[] = [
                'product'  => $product,
                'quantity' => $cartItem->getQuantity(),
                'total'    => $product->getPrice() * $cartItem->getQuantity(),
                'date'     => $product->getOrderDate(),
            ];
        }

        return $items;
    }
    
    /**
     * @throws LogicException 
     */
    public function add(): Order
    {
        $user = $this->security->getUser();

        $cartData = [];
        if ($user) {
            $cartItems = $this->cartRepository->findBy(['user' => $user]);
            foreach ($cartItems as $item) {
                $cartData[] = ['product' => $item->getProduct(), 'quantity' => $item->getQuantity()];
            }
        } else {
            $sessionCart = $this->session->get(self::CART_KEY, []);
            foreach ($sessionCart as $productId => $quantity) {
                $product = $this->productRepository->find($productId);
                if ($product) {
                    $cartData[] = ['product' => $product, 'quantity' => $quantity];
                }
            }
        }

        if (empty($cartData)) {
            throw new LogicException('Cart is empty.');
        }

        $order = new Order();
        if ($user) {
            $order->setUser($user);
        }
        $this->manager->persist($order);

        $totalAmount = 0;
        foreach ($cartData as $entry) {
            $product = $entry['product'];
            $quantity = $entry['quantity'];

            $orderItem = new OrderItem();
            $orderItem->setOrder($order)
                ->setProduct($product)
                ->setQuantity($quantity)
                ->setPrice((string) $product->getPrice());
            $this->manager->persist($orderItem);

            $totalAmount += $product->getPrice() * $quantity;
        }

        $order->setTotalAmount((string) $totalAmount)
              ->setStatus('new');

        $this->manager->flush();

        if ($user) {
            $this->cartService->clear();
        } else {
            $this->session->remove(self::CART_KEY);
        }

        return $order;
    }
}