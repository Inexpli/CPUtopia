<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends AbstractController
{
    #[Route('api/users/', name: 'user_index', methods: ['GET'])]
    public function index(UserRepository $repository) {
        return $this->json($repository->findAll(), Response::HTTP_OK);
    }

    #[Route('api/register', name: 'register', methods: ['POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $userPasswordHasher,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator
    ): Response {
        $data = json_decode($request->getContent(), true);
        if (!$data || !isset($data['password']) || !isset($data['email'])) {
            return $this->json(
                ['status' => 'error', 'message' => 'Invalid JSON format'],
                Response::HTTP_BAD_REQUEST
            );
        }
        
        $user = new User();
        
        $user->setEmail($data['email']);
        $user->setPlainPassword($data['password']);

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return $this->json(
                ['status' => 'error', 'message' => implode(', ', $errorMessages)],
                Response::HTTP_BAD_REQUEST
            );
        }

        $user->setPassword(
            $userPasswordHasher->hashPassword($user, $user->getPlainPassword())
        );
        
        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return $this->json(
                ['status' => 'error', 'message' => implode(', ', $errorMessages)],
                Response::HTTP_BAD_REQUEST
            );
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json(
            ['status' => 'success', 'message' => 'User has been registered successfuly'],
            Response::HTTP_CREATED
        );
    }
}
