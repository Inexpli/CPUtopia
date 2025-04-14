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

final class CategoryController extends AbstractController
{
    #[Route('/category', name: 'category_index', methods: ['GET'])]
    public function index(CategoryRepository $repository): Response
    {
        return $this->json($repository->findAll());
    }

    #[Route('/category/add', name: 'category_add', methods: ['POST'])]
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

        $category->setName($data['name'] ?? '');

        $errors = $validator->validate($category);
        if (count($errors) > 0) {
            return $this->json(['errors' => (string) $errors], Response::HTTP_BAD_REQUEST);
        }

        $manager->persist($category);
        $manager->flush();

        return $this->json(['message' => 'Category added successfully'], Response::HTTP_CREATED);
    }
}
