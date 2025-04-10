<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Repository\ProductRepository;

final class ProductController extends AbstractController
{
    #[Route('/product', name: 'app_product')]
    public function index(ProductRepository $repository): Response
    {
        return $this->render('product/index.html.twig', [
            'products' => $repository->findAll(),
        ]);
    }

    #[Route('/product/{slug}', name: 'app_product_show')]
    public function show(string $slug, ProductRepository $repository): Response
    {
        $product = $repository->findOneBy(['slug' => $slug]);
        return $this->render('product/show.html.twig', [
            'product' => $product
        ]);
    }
}
