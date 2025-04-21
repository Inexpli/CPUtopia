<?php

namespace App\Controller;

use App\Entity\OrderItem;
use App\Repository\OrderItemRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class OrderItemController extends AbstractController
{
    #[Route('api/orderItem', name: 'api_orderItem_index', methods: ['GET'])]
    public function index(OrderItemRepository $repository): JsonResponse
    {
        return $this->json($repository->findAll(), JsonResponse::HTTP_OK);
    }
    
    #[Route('api/orderItem/add', name: 'orderItem_add', methods: ['POST'])]
    public function add(
        Request $request, 
        EntityManagerInterface $manager,
        OrderItemRepository $repository,
        ProductRepository $productRepository
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $order = $repository->find($data['order_id']);
        $product = $productRepository->find($data['product_id']);

        if (!$order) {
            return $this->json(
                ['error' => 'Zamówienie o podanym ID nie zostało znalezione.'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        if (!$product) {
            return $this->json(
                ['error' => 'Produkt o podanym ID nie został znaleziony.'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $orderItem = new OrderItem();
        $orderItem->setOrder($order)
                  ->setProduct($product)
                  ->setQuantity((int) $data['quantity'])
                  ->setPrice((string) $data['price']);

        $manager->persist($orderItem);
        $manager->flush();

        return $this->json($orderItem, JsonResponse::HTTP_CREATED);
    }
}
