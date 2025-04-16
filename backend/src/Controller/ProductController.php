<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

final class ProductController extends AbstractController
{
    #[Route('api/product', name: 'api_product_index', methods: ['GET'])]
    public function index(ProductRepository $repository): Response
    {
        return $this->json($repository->findAll(), Response::HTTP_OK);
    }

    #[Route('api/product/add', name: 'api_product_add', methods: ['POST'])]
    public function add(
        Request $request,
        EntityManagerInterface $manager,
        ValidatorInterface $validator,
        CategoryRepository $categoryRepository
    ): Response 
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        $product = new Product();

        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice($data['price']);
        $product->setStock($data['stock']);

        if (!empty($data['category_id'])) {
            $category = $categoryRepository->find($data['category_id']);
            if ($category) {
                $product->setCategory($category);
            }
        }

        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            return $this->json(['errors' => (string) $errors], Response::HTTP_BAD_REQUEST);
        }

        $manager->persist($product);
        $manager->flush();

        return $this->json(['message' => 'Product added successfully'], Response::HTTP_CREATED);
    }

    #[Route('api/product/{id}/edit', name: 'api_product_edit', methods: ['PUT', 'PATCH'])]
    public function edit(
        int $id,
        Request $request,
        ProductRepository $repository,
        EntityManagerInterface $manager,
        ValidatorInterface $validator,
        CategoryRepository $categoryRepository
    ): Response 
    {
        $product = $repository->find($id);

        if (!$product) {
            return $this->json(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice((string)$data['price']);
        $product->setStock($data['stock']);

        if (!empty($data['category_id'])) {
            $category = $categoryRepository->find($data['category_id']);
            if ($category) {
                $product->setCategory($category);
            }
        }

        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            return $this->json(['errors' => (string) $errors], Response::HTTP_BAD_REQUEST);
        }

        $manager->flush();

        return $this->json(['message' => 'Product updated successfully'], Response::HTTP_OK);
    }

    #[Route('api/product/{id}', name: 'api_product_delete', methods: ['DELETE'])]
    public function delete(
        int $id,
        ProductRepository $repository,
        EntityManagerInterface $manager
    ): Response 
    {
        $product = $repository->find($id);
        
        if (!$product) {
            return $this->json(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }
        
        $manager->remove($product);
        $manager->flush();
        
        return $this->json(['message' => 'Product deleted successfully']);
    }

    #[Route('api/product/{id}', name: 'api_product_show', methods: ['GET'])]
    public function show(int $id, ProductRepository $repository): Response
    {
        $product = $repository->find($id);

        if (!$product) {
            return $this->json(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($product, Response::HTTP_OK);
    }
}
