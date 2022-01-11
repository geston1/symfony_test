<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\User\UserInterface;

class UserController extends AbstractController
{
    /**
     * @Route("/api/user", name="api_user")
     */
    public function index(UserInterface $user): Response
    {
        return new JsonResponse([
            'data' => $user->getUserIdentifier()
        ]);
    }
}
