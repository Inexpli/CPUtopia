<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

final class ProductController extends AbstractController
{
    #[Route('api/product', name: 'products', methods: ['GET'])]
    public function index(ProductRepository $repository): JsonResponse
    {
        return $this->json($repository->findAll(), JsonResponse::HTTP_OK);
    }


    #[Route('api/product/add', name: 'product_add', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN')]
    public function add(
        Request $request,
        EntityManagerInterface $manager,
        ValidatorInterface $validator,
        CategoryRepository $categoryRepository,
        #[Autowire('%product_images_directory%')] string $imagesDir
    ): JsonResponse {
        $name        = $request->request->get('name');
        $description = $request->request->get('description');
        $price       = $request->request->get('price');
        $stock       = $request->request->get('stock');
        $categoryId  = $request->request->get('category_id');

        /** @var UploadedFile|null $file */
        $file = $request->files->get('image');
if (!$file) {
    return $this->json(['error' => 'No image file uploaded'], 400);
}

        $product = new Product();
        $product->setName($name);
        $product->setDescription($description);
        $product->setPrice((float)$price);
        $product->setStock((int)$stock);

        if ($categoryId) {
            $cat = $categoryRepository->find($categoryId);
            $product->setCategory($cat);
        }

        if ($file instanceof UploadedFile) {
            $filename = uniqid().'.'.$file->guessExtension();
            $file->move($imagesDir, $filename);
            $product->setImage($filename);
        }

        $errors = $validator->validate($product);
        if (count($errors) > 0) {
            return $this->json(['errors' => (string)$errors], JsonResponse::HTTP_BAD_REQUEST);
        }

        $manager->persist($product);
        $manager->flush();

        return $this->json(['message' => 'Product added successfully'], JsonResponse::HTTP_CREATED);
    }

    #[Route('api/product/{id}', name: 'api_product_edit', methods: ['PUT', 'PATCH'])]
    #[IsGranted('ROLE_ADMIN')]
    public function edit(
        int $id,
        Request $request,
        ProductRepository $repository,
        EntityManagerInterface $manager,
        ValidatorInterface $validator,
        CategoryRepository $categoryRepository
    ): JsonResponse 
    {
        $product = $repository->find($id);

        if (!$product) {
            return $this->json(['error' => 'Product not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
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
            return $this->json(['errors' => (string) $errors], JsonResponse::HTTP_BAD_REQUEST);
        }

        $manager->flush();

        return $this->json(['message' => 'Product updated successfully'], JsonResponse::HTTP_OK);
    }

    #[Route('api/product/{id}', name: 'api_product_delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN')]
    public function delete(
        int $id,
        ProductRepository $repository,
        EntityManagerInterface $manager
    ): JsonResponse 
    {
        $product = $repository->find($id);
        
        if (!$product) {
            return $this->json(['error' => 'Product not found'], JsonResponse::HTTP_NOT_FOUND);
        }
        
        $manager->remove($product);
        $manager->flush();
        
        return $this->json(['message' => 'Product deleted successfully'], JsonResponse::HTTP_OK);
    }

    #[Route('api/product/{id}', name: 'api_product_show', methods: ['GET'])]
    public function show(int $id, ProductRepository $repository): JsonResponse
    {
        $product = $repository->find($id);

        if (!$product) {
            return $this->json(['error' => 'Product not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        return $this->json($product, JsonResponse::HTTP_OK);
    }
}
