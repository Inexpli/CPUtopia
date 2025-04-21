<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class UserController extends AbstractController
{
    // Na potrzebe DEV'u
    #[Route('/api/user/me', name: 'api_me', methods: ['GET'])]
    public function me(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(
                ['error' => 'Unauthorized'],
                JsonResponse::HTTP_UNAUTHORIZED
            );
        }

        return $this->json([
            'id'    => $user->getId(),
            'email' => $user->getEmail(),
            'roles' => $user->getRoles(),
        ], JsonResponse::HTTP_OK);
    }

    #[Route('api/user/', name: 'users', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function index(UserRepository $repository) {
        return $this->json($repository->findAll(), JsonResponse::HTTP_OK);
    }

    #[Route('api/user/register', name: 'register', methods: ['POST'])]
    public function register(
        Request $request,
        UserPasswordHasherInterface $userPasswordHasher,
        EntityManagerInterface $entityManager,
        ValidatorInterface $validator
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);
        if (!$data || !isset($data['password']) || !isset($data['email'])) {
            return $this->json(
                ['status' => 'error', 'message' => 'Invalid JSON format'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }
        
        $user = new User();
        
        $user->setEmail($data['email']);
        $user->setPlainPassword($data['password']);
        $user->setRoles(['ROLE_USER']);

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return $this->json(
                ['status' => 'error', 'message' => implode(', ', $errorMessages)],
                JsonResponse::HTTP_BAD_REQUEST
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
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json(
            ['status' => 'success', 'message' => 'User has been registered successfuly'],
            JsonResponse::HTTP_CREATED
        );
    }

    #[Route('/api/user/login', name: 'login', methods: ['POST'])]
    public function loginCustom(
        Request $request,
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse 
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return $this->json(['message' => 'Email and password are required.'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $userRepository->findOneBy(['email' => $email]);

        if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
            return $this->json(['message' => 'Invalid credentials.'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        return $this->json(['message' => 'Login successful', 'user' => $user->getUserIdentifier()]);
    }

    #[Route('api/user/promote/{id}', name: 'promote', methods: ['PATCH'])]
    #[IsGranted('ROLE_ADMIN')]
    public function promote(int $id, UserRepository $repository, EntityManagerInterface $manager): JsonResponse 
    {
        $user = $repository->find($id);

        if(!$user) {
            return $this->json(['error' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $user->setRoles(['ROLE_ADMIN']);
        $manager->flush();

        return $this->json(['message' => 'User promoted successfully'], JsonResponse::HTTP_OK);
    }
}
