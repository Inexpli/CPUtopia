<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

final class CategoryController extends AbstractController
{
    #[Route('api/category', name: 'api_category_index', methods: ['GET'])]
    public function index(CategoryRepository $repository): Response
    {
        return $this->json($repository->findAll(), Response::HTTP_OK);
    }

    #[Route('api/category/add', name: 'api_category_add', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN')]
    public function add(
        Request $request,
        EntityManagerInterface $manager,
        ValidatorInterface $validator
    ) : Response 
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        $category = new Category();

        $category->setName($data['name']);

        $errors = $validator->validate($category);
        if (count($errors) > 0) {
            return $this->json(['errors' => (string) $errors], Response::HTTP_BAD_REQUEST);
        }

        $manager->persist($category);
        $manager->flush();

        return $this->json(['message' => 'Category added successfully'], Response::HTTP_CREATED);
    }

    #[Route('api/category/{id}', name: 'api_category_edit', methods: ['PUT', 'PATCH'])]
    #[IsGranted('ROLE_ADMIN')]
    public function update(
        int $id,
        Request $request,
        CategoryRepository $repository,
        EntityManagerInterface $manager,
        ValidatorInterface $validator
    ) : Response 
    {
        $category = $repository->find($id);
        if(!$category) {
            return $this->json(['error' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        if (!$data) {
            return $this->json(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        if(isset($data['name'])) $category->setName($data['name']);

        $errors = $validator->validate($category);
        if (count($errors) > 0) {
            return $this->json(['errors' => (string) $errors], Response::HTTP_BAD_REQUEST);
        }

        $manager->flush();

        return $this->json(['message' => 'Category updated successfully'], Response::HTTP_OK);
    }

    #[Route('api/category/{id}', name: 'api_category_delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN')]
    public function delete(
        int $id,
        CategoryRepository $repository,
        EntityManagerInterface $manager
    ): Response 
    {
        $category = $repository->find($id);
        
        if (!$category) {
            return $this->json(['error' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }
        
        $manager->remove($category);
        $manager->flush();
        
        return $this->json(['message' => 'Category deleted successfully'], Response::HTTP_OK);
    }
}
