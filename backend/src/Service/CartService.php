<?php


namespace App\Service;

use App\Entity\CartItem;
use App\Repository\CartItemRepository;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CartService
{

    private SessionInterface $session;

    public function __construct(
        RequestStack $requestStack,
        private ProductRepository $productRepository,
        private CartItemRepository $cartItemRepository,
        private EntityManagerInterface $manager,
        private Security $security,
    ) 
    {
        $this->session = $requestStack->getSession();
    }

    private const CART_KEY = 'cart';


    public function index(): array
    {
        $user = $this->security->getUser();

        if($user) {
            $cartItems = $this->cartItemRepository->findBy(['user' => $user]);

            $items = [];
            foreach ($cartItems as $cartItem) {
                $product = $cartItem->getProduct();
                $items[] = [
                    'product'  => $product,
                    'quantity' => $cartItem->getQuantity(),
                    'total'    => $product->getPrice() * $cartItem->getQuantity(),
                ];
            }
        }
        else {
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
        }
        return $items;
    }

    /**
     * @throws LogicException 
     */
    public function add(int $productId, int $quantity = 1): void
    {
        $user = $this->security->getUser();

        if($user) {
            $item = $this->cartItemRepository->findOneBy([
                'user'    => $user,
                'product' => $productId,
            ]);

            $product = $this->productRepository->find($productId);
            if (!$product) {
                throw new NotFoundHttpException("Product not found.");
            }

            if (!$item) {
                $item = new CartItem();
                $item->setUser($user);
                $item->setProduct($product);
                $item->setQuantity($quantity);
            } else {
                // Update existing item quantity
                $item->setQuantity($quantity);
            }
            
            $this->manager->persist($item);
            $this->manager->flush();
        }
        else {
            $cart = $this->session->get(self::CART_KEY, []);
            
            // For session cart, just set the new quantity directly
            $cart[$productId] = $quantity;
    
            $this->session->set(self::CART_KEY, $cart);
        }
    }

    /**
     * @throws LogicException 
     * @return bool
     */
    public function remove(int $productId): bool
    {
        $user = $this->security->getUser();

        if($user) {
            $item = $this->cartItemRepository->findOneBy([
                'user'    => $user,
                'product' => $productId,
            ]);
            
            if (!$item) {
                return false;
            }

            $this->manager->remove($item);
            $this->manager->flush();
            return true;
        }
        else {
            $cart = $this->session->get(self::CART_KEY, []);
            if (!isset($cart[$productId])) {
                return false;
            }
            unset($cart[$productId]);
            $this->session->set(self::CART_KEY, $cart);
            return true;
        }
    }

    public function clear(): void
    {
        $user = $this->security->getUser();

        if ($user) {
            $items = $this->cartItemRepository->findBy(['user' => $user]);
            foreach ($items as $item) {
                $this->manager->remove($item);
            }

            $this->manager->flush();
        }
        else {
            $this->session->remove(self::CART_KEY);
        }
    }
}
