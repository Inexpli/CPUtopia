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
    #[Route('/product', name: 'product_index', methods: ['GET'])]
    public function index(ProductRepository $repository): Response
    {
        return $this->json($repository->findAll());
    }

    #[Route('/product/add', name: 'product_add', methods: ['POST'])]
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

        $product->setName($data['name'] ?? '');
        $product->setDescription($data['description'] ?? null);
        $product->setPrice($data['price'] ?? 0.0);
        $product->setStock($data['stock'] ?? 0);

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

    #[Route('/product/{id}/edit', name: 'product_edit', methods: ['PUT', 'PATCH'])]
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

        if (isset($data['name'])) $product->setName($data['name']);
        if (array_key_exists('description', $data)) $product->setDescription($data['description']);
        if (isset($data['price'])) $product->setPrice((string)$data['price']);
        if (isset($data['stock'])) $product->setStock($data['stock']);

        if (isset($data['category_id'])) {
            $category = $categoryRepository->find($data['category_id']);
            $product->setCategory($category); // może być null
        }

        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            return $this->json(['errors' => (string) $errors], Response::HTTP_BAD_REQUEST);
        }

        $manager->flush();

        return $this->json(['message' => 'Product updated successfully']);
    }

    #[Route('/product/{id}', name: 'product_show', methods: ['GET'])]
    public function show(int $id, ProductRepository $repository): Response
    {
        $product = $repository->find($id);

        if (!$product) {
            return $this->json(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        return $this->json($product);
    }

    #[Route('/product/{id}', name: 'product_delete', methods: ['DELETE'])]
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
}
