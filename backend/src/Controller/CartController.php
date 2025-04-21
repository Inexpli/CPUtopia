<?php

namespace App\Controller;

use App\Service\CartService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class CartController extends AbstractController
{
    #[Route('api/cart/add/{id}', name: 'api_cart_add', methods: ['POST'])]
    public function add(int $id, Request $request, CartService $cartService): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $quantity = $data['quantity'] ?? 1;
        
        $cartService->add($id, $quantity);

        return $this->json(['message' => 'Product added to cart'], JsonResponse::HTTP_OK);
    }

    #[Route('api/cart', name: 'api_cart_view', methods: ['GET'])]
    public function view(CartService $cartService): JsonResponse
    {
        $items = $cartService->index();
        return $this->json($items, context: ['groups' => ['cart']]);
    }

    #[Route('api/cart/remove/{id}', name: 'api_cart_remove', methods: ['POST'])]
    public function remove(int $id, CartService $cartService): JsonResponse
    {
        $result = $cartService->remove($id);
        if (!$result) {
            return $this->json(
                ['error' => 'Product not found in cart'],
                JsonResponse::HTTP_NOT_FOUND
            );
        }
        return $this->json(
            ['message' => 'Product removed from cart'],
            JsonResponse::HTTP_OK
        );
    }


    #[Route('api/cart/clear', name: 'api_cart_clear', methods: ['POST'])]
    public function clear(CartService $cartService): JsonResponse
    {
        $cartService->clear();

        return $this->json(['message' => 'Cart cleared']);
    }
}
