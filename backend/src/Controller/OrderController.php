<?php

namespace App\Controller;

use App\Service\OrderService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class OrderController extends AbstractController
{
    #[Route('/api/order/', name: 'api_order_create', methods: ['GET'])]
    public function index(OrderService $orderService): JsonResponse
    {
        $order = $orderService->index();

        return $this->json($order, JsonResponse::HTTP_OK);
    }

    #[Route('/api/order/create', name: 'api_order_create', methods: ['POST'])]
    public function create(OrderService $orderService): JsonResponse
    {
        $order = $orderService->add();

        return $this->json($order, JsonResponse::HTTP_OK);
    }

    // #[Route('/api/order/update', name: 'api_order_update', methods: ['PUT', 'PATCH'])]
    // public function update(Request $request, OrderService $orderService): JsonResponse {

    //     $data = json_decode($request->getContent(), true);
        
    //     if (!$data) {
    //         return $this->json(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
    //     }

    //     $order = $orderService->update();

    //     return $this->json($order, JsonResponse::HTTP_OK);
    // }
}
