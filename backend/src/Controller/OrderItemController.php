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
use Symfony\Component\Security\Http\Attribute\IsGranted;

final class OrderItemController extends AbstractController
{
    #[Route('api/orderItem', name: 'api_orderItem_index', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function index(OrderItemRepository $repository): JsonResponse
    {
        return $this->json($repository->findAll(), JsonResponse::HTTP_OK);
    }
}
